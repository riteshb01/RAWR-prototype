export const COLORS = {
  urgent: '#dc2626', // Red for urgent deadlines
  upcoming: '#f59e0b', // Yellow for upcoming deadlines
  safe: '#22c55e', // Green for safe deadlines
};

export const WORKLOAD_THRESHOLDS = {
  highPressure: 7, // Workload threshold for high pressure weeks
  critical: 12, // Workload threshold for critical weeks
};

export const DATE_FORMAT = 'YYYY-MM-DD'; // Standard date format used in the application

export const API_ENDPOINTS = {
  dashboard: '/api/v1/dashboard/',
  courseEvents: '/api/v1/course-events/',
};