import { WORKLOAD_THRESHOLD } from './constants';

/**
 * Calculate weekly workload totals from a flat list of events.
 * Returns { weekNumber: totalWeight, ... }
 */
export function calculateWeeklyLoad(events) {
  const weeklyLoad = {};

  events.forEach(event => {
    const eventDate = new Date(event.date);
    const weekNumber = getWeekNumber(eventDate);
    const weight = event.weight || event.workload || 1;

    if (!weeklyLoad[weekNumber]) {
      weeklyLoad[weekNumber] = 0;
    }
    weeklyLoad[weekNumber] += weight;
  });

  return weeklyLoad;
}

/**
 * Calculate average workload intensity across all weeks.
 */
export function calculateWorkloadIntensity(weeklyLoad) {
  const values = Object.values(weeklyLoad);
  if (values.length === 0) return 0;
  const totalLoad = values.reduce((acc, load) => acc + load, 0);
  return totalLoad / values.length;
}

/**
 * Convert heatmap_data from the API ({ "2026-03-12": 5, ... })
 * into a sorted array for rendering:
 *   [{ date: "2026-03-12", value: 5, intensity: 0.71 }, ...]
 *
 * Intensity is normalized 0–1 relative to the max value in the dataset.
 */
export function calculateHeatmapData(heatmapObj) {
  if (!heatmapObj || typeof heatmapObj !== 'object') return [];

  const entries = Object.entries(heatmapObj).map(([dateStr, value]) => ({
    date: dateStr,
    value,
  }));

  if (entries.length === 0) return [];

  const maxVal = Math.max(...entries.map(e => e.value), 1);

  return entries
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(entry => ({
      ...entry,
      intensity: entry.value / maxVal,
    }));
}

/**
 * Calculate a 0–1 intensity score for a single heatmap cell.
 * Used by the Heatmap component for colouring.
 */
export function calculateWorkloadScore(value, maxValue = 10) {
  if (!value || value <= 0) return 0;
  return Math.min(value / maxValue, 1);
}

/**
 * Convert the weekly_workload API response object into a sorted array
 * suitable for Recharts BarChart:
 *   [{ week: "2026-W11", total: 9, ...by_course, ...by_type }, ...]
 */
export function weeklyWorkloadToChartData(weeklyWorkload) {
  if (!weeklyWorkload || typeof weeklyWorkload !== 'object') return [];

  return Object.entries(weeklyWorkload)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([weekKey, data]) => ({
      week: weekKey,
      total: data.total || 0,
      byCourse: data.by_course || {},
      byType: data.by_type || {},
    }));
}

/**
 * Get ISO week number for a date.
 */
function getWeekNumber(date) {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startDate.getDay() + 1) / 7);
}