/**
 * Bengal RAWR — API Service Layer
 * All fetch calls to the Django REST backend.
 */
import { API_BASE } from '../utils/constants';

/**
 * GET /dashboard/ — Main dashboard summary
 * Returns: { total_courses, total_events, total_conflicts, critical_weeks,
 *            upcoming_events[], recent_conflicts[], heatmap_data{} }
 */
export async function getDashboardData() {
  const response = await fetch(`${API_BASE}/dashboard/`);
  if (!response.ok) {
    throw new Error(`Dashboard fetch failed (${response.status})`);
  }
  return response.json();
}

/**
 * GET /dashboard/heatmap/ — Full heatmap + conflict analysis
 * Returns: { heatmap{}, weekly_loads{}, conflicts[], summary{} }
 */
export async function getHeatmapData() {
  const response = await fetch(`${API_BASE}/dashboard/heatmap/`);
  if (!response.ok) {
    throw new Error(`Heatmap fetch failed (${response.status})`);
  }
  return response.json();
}

/**
 * GET /dashboard/weekly-workload/ — Weekly workload breakdown
 * Returns: { weekly_workload{}, threshold }
 */
export async function getWeeklyWorkload() {
  const response = await fetch(`${API_BASE}/dashboard/weekly-workload/`);
  if (!response.ok) {
    throw new Error(`Weekly workload fetch failed (${response.status})`);
  }
  return response.json();
}

/**
 * GET /courses/ — List all courses
 * Returns: [ { id, name, code, professor, semester, event_count, conflict_count } ]
 */
export async function getCourses() {
  const response = await fetch(`${API_BASE}/courses/`);
  if (!response.ok) {
    throw new Error(`Courses fetch failed (${response.status})`);
  }
  const data = await response.json();
  // DRF paginated response wraps results in { results: [] }
  return data.results || data;
}

/**
 * GET /events/ — List all events with optional filters
 */
export async function getEvents(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = query ? `${API_BASE}/events/?${query}` : `${API_BASE}/events/`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Events fetch failed (${response.status})`);
  }
  const data = await response.json();
  return data.results || data;
}

/**
 * GET /conflicts/ — List detected conflict weeks
 */
export async function getConflicts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = query ? `${API_BASE}/conflicts/?${query}` : `${API_BASE}/conflicts/`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Conflicts fetch failed (${response.status})`);
  }
  const data = await response.json();
  return data.results || data;
}

/**
 * POST /upload-syllabus/ — Upload a syllabus file
 */
export async function uploadSyllabus(file, metadata = {}) {
  const formData = new FormData();
  formData.append('file', file);
  if (metadata.course_name) formData.append('course_name', metadata.course_name);
  if (metadata.course_code) formData.append('course_code', metadata.course_code);
  if (metadata.professor) formData.append('professor', metadata.professor);
  if (metadata.semester) formData.append('semester', metadata.semester);

  const response = await fetch(`${API_BASE}/upload-syllabus/`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Upload failed (${response.status})`);
  }
  return response.json();
}