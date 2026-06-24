import React, { useState, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { uploadSyllabus } from '../services/api';

const UploadPanel = ({ onSuccess } = {}) => {
  const [file, setFile] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const res = await uploadSyllabus(file, {
        course_name: courseName || undefined,
        course_code: courseCode || undefined,
      });
      setResult(res);
      // Invalidate all dashboard queries so data refreshes
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      queryClient.invalidateQueries({ queryKey: ['heatmapData'] });
      queryClient.invalidateQueries({ queryKey: ['weeklyWorkload'] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['conflicts'] });
      if (onSuccess) onSuccess(res);
      // Reset form
      setFile(null);
      setCourseName('');
      setCourseCode('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  return (
    <div>
      <form onSubmit={handleUpload} className="upload-form">
        {/* Drop zone */}
        <div
          className={`upload-dropzone ${file ? 'has-file' : ''}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {file ? (
            <div className="upload-file-info">
              <span className="upload-file-icon">📄</span>
              <span className="upload-file-name">{file.name}</span>
              <span className="upload-file-size">
                ({(file.size / 1024).toFixed(1)} KB)
              </span>
            </div>
          ) : (
            <div className="upload-placeholder">
              <span className="upload-icon">☁️</span>
              <p>Drop a PDF, DOCX, or TXT file here</p>
              <p className="upload-hint">or click to browse</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={(e) => setFile(e.target.files[0] || null)}
            style={{ display: 'none' }}
          />
        </div>

        {/* Optional metadata */}
        <div className="upload-fields">
          <input
            type="text"
            placeholder="Course Name (optional)"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="upload-input"
          />
          <input
            type="text"
            placeholder="Course Code (optional)"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className="upload-input"
          />
        </div>

        <button
          type="submit"
          disabled={!file || uploading}
          className="upload-btn"
        >
          {uploading ? 'Processing…' : 'Upload & Analyze'}
        </button>
      </form>

      {/* Result feedback */}
      {result && (
        <div className="upload-result success">
          <strong>✓ Processed!</strong>
          <span>{result.events_extracted} events extracted</span>
          <span>{result.conflicts_detected} conflicts detected</span>
        </div>
      )}

      {error && (
        <div className="upload-result error">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default UploadPanel;
