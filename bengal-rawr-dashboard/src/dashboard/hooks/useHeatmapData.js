import { useQuery } from '@tanstack/react-query';
import { getHeatmapData } from '../services/api';

/**
 * Fetches the full heatmap dataset from /dashboard/heatmap/.
 *
 * Returns:
 *   data  — { heatmap{}, weekly_loads{}, conflicts[], summary{} }
 *   isLoading — boolean
 *   error     — Error | null
 */
export function useHeatmapData() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['heatmapData'],
    queryFn: getHeatmapData,
  });

  return { data: data ?? null, isLoading, error };
}