import { useEffect, useState } from 'react';
import { getDashboardData } from '../services/api';

export function useWorkloadData() {
  const [workloadData, setWorkloadData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkloadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDashboardData();
        setWorkloadData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkloadData();
  }, []);

  return { workloadData, loading, error };
}