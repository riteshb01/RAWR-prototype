/**
 * Normalize the raw dashboard API response into a shape
 * that the dashboard components consume.
 *
 * Input  (from GET /dashboard/):
 *   { total_courses, total_events, total_conflicts, critical_weeks,
 *     upcoming_events[], recent_conflicts[], heatmap_data{} }
 *
 * Output (for Dashboard component):
 *   { stats, upcomingEvents, recentConflicts, heatmapData }
 */
export function normalizeDashboardData(apiData) {
  if (!apiData) return null;

  return {
    stats: {
      totalCourses: apiData.total_courses ?? 0,
      totalEvents: apiData.total_events ?? 0,
      totalConflicts: apiData.total_conflicts ?? 0,
      criticalWeeks: apiData.critical_weeks ?? 0,
    },
    upcomingEvents: (apiData.upcoming_events ?? []).map(evt => ({
      id: evt.id,
      title: evt.title,
      date: evt.date,
      eventType: evt.event_type,
      courseName: evt.course_name,
      courseCode: evt.course_code,
      workload: evt.workload,
    })),
    recentConflicts: (apiData.recent_conflicts ?? []).map(c => ({
      id: c.id,
      weekKey: c.week_key,
      weekStart: c.week_start,
      weekEnd: c.week_end,
      totalLoad: c.total_load,
      threshold: c.threshold,
      severity: c.severity,
      message: c.message,
      coursesAffected: c.courses_affected ?? [],
    })),
    heatmapData: apiData.heatmap_data ?? {},
  };
}