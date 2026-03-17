import { API_BASE } from '../utils/constants';

export async function getDashboardData() {
  const response = await fetch(`${API_BASE}/dashboard`);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
}

export async function getCourseEvents() {
  const response = await fetch(`${API_BASE}/courses/events`);
  if (!response.ok) {
    throw new Error('Failed to fetch course events');
  }
  return response.json();
}