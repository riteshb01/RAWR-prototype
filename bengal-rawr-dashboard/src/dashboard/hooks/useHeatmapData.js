import { useQuery } from 'react-query';
import { getDashboardData } from '../services/api';
import { calculateHeatmapData } from '../utils/workloadCalculator';

export function useHeatmapData() {
  const { data, error, isLoading } = useQuery('dashboardData', getDashboardData);

  const heatmapData = data ? calculateHeatmapData(data.courses) : [];

  return {
    heatmapData,
    isLoading,
    error,
  };
}