import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '../services/api';

/**
 * Fetches the main dashboard summary from /dashboard/.
 *
 * Returns:
 *   data  — { total_courses, total_events, total_conflicts, critical_weeks,
 *             upcoming_events[], recent_conflicts[], heatmap_data{} }
 *   isLoading — boolean
 *   error     — Error | null
 */
export function useWorkloadData() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: getDashboardData,
  });

  return { data: data ?? null, isLoading, error };
}