"""
Bengal RAWR — Embedding Service
Generates and searches vector embeddings of syllabus text using
sentence-transformers (all-MiniLM-L6-v2) and pgvector.

Runs entirely locally — no external API keys required.
"""

import logging
from typing import Optional

from django.conf import settings

logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────
# Text chunking
# ─────────────────────────────────────────────

DEFAULT_CHUNK_SIZE = 300   # words per chunk
DEFAULT_CHUNK_OVERLAP = 50  # word overlap between consecutive chunks


def chunk_text(text: str, chunk_size: int = DEFAULT_CHUNK_SIZE, overlap: int = DEFAULT_CHUNK_OVERLAP) -> list[str]:
    """
    Split text into overlapping word-based chunks.

    Args:
        text: Full document text
        chunk_size: Target words per chunk
        overlap: Words of overlap between consecutive chunks

    Returns:
        List of text chunks
    """
    words = text.split()
    if not words:
        return []

    chunks = []
    start = 0
    while start < len(words):
        end = start + chunk_size
        chunk = ' '.join(words[start:end])
        if chunk.strip():
            chunks.append(chunk.strip())
        start += chunk_size - overlap

    return chunks


# ─────────────────────────────────────────────
# Embedding service singleton
# ─────────────────────────────────────────────

class EmbeddingService:
    """
    Lazy-loaded embedding service using sentence-transformers.
    The model (~80MB) is downloaded on first use and cached locally.
    """

    def __init__(self):
        self._model = None

    def _load_model(self):
        """Load the sentence-transformer model (lazy, first-call only)."""
        if self._model is not None:
            return

        try:
            from sentence_transformers import SentenceTransformer
            model_name = getattr(settings, 'EMBEDDING_MODEL_NAME', 'sentence-transformers/all-MiniLM-L6-v2')
            self._model = SentenceTransformer(model_name)
            logger.info(f"Embedding model '{model_name}' loaded successfully")
        except Exception as e:
            logger.error(f"Failed to load embedding model: {e}")
            raise

    def embed(self, text: str) -> list[float]:
        """
        Generate a single embedding vector for a text string.

        Args:
            text: Input text

        Returns:
            List of floats (384-dimensional vector)
        """
        self._load_model()
        embedding = self._model.encode(text, normalize_embeddings=True)
        return embedding.tolist()

    def embed_batch(self, texts: list[str]) -> list[list[float]]:
        """
        Generate embeddings for a batch of texts (more efficient).

        Args:
            texts: List of input strings

        Returns:
            List of embedding vectors
        """
        self._load_model()
        embeddings = self._model.encode(texts, normalize_embeddings=True, batch_size=32)
        return [e.tolist() for e in embeddings]

    def chunk_and_embed(self, full_text: str) -> list[dict]:
        """
        Split text into chunks, then generate embeddings for each.

        Args:
            full_text: Full document text

        Returns:
            List of dicts: [{'text': str, 'embedding': list[float]}, ...]
        """
        chunks = chunk_text(full_text)
        if not chunks:
            return []

        embeddings = self.embed_batch(chunks)
        return [
            {'text': chunk, 'embedding': emb}
            for chunk, emb in zip(chunks, embeddings)
        ]

    def search(self, query: str, course_id: Optional[int] = None, limit: int = 5) -> list[dict]:
        """
        Perform semantic search across stored syllabus embeddings.

        Uses pgvector's cosine distance operator for efficient similarity search.

        Args:
            query: Natural language search query
            course_id: Optional — restrict search to a specific course
            limit: Max number of results

        Returns:
            List of dicts with 'chunk_text', 'course_id', 'course_name',
            'syllabus_filename', 'distance'
        """
        from pgvector.django import CosineDistance
        from apps.syllabus.models import SyllabusEmbedding

        query_vector = self.embed(query)

        queryset = SyllabusEmbedding.objects.select_related('course', 'syllabus')
        if course_id:
            queryset = queryset.filter(course_id=course_id)

        results = (
            queryset
            .annotate(distance=CosineDistance('embedding', query_vector))
            .order_by('distance')[:limit]
        )

        return [
            {
                'chunk_text': r.chunk_text,
                'chunk_index': r.chunk_index,
                'course_id': r.course_id,
                'course_name': r.course.name,
                'course_code': r.course.code,
                'syllabus_filename': r.syllabus.original_filename,
                'distance': round(float(r.distance), 4),
                'similarity': round(1.0 - float(r.distance), 4),
            }
            for r in results
        ]


# Module-level singleton
_service_instance = None


def get_embedding_service() -> EmbeddingService:
    """Return (and lazily initialize) the module-level embedding service."""
    global _service_instance
    if _service_instance is None:
        _service_instance = EmbeddingService()
    return _service_instance
