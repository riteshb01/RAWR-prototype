import React from 'react';
import { useHeatmapData } from '../hooks/useHeatmapData';
import { calculateWorkloadScore } from '../utils/workloadCalculator';
import { Tooltip } from 'react-tooltip';

const Heatmap = () => {
  const { heatmapData, isLoading, error } = useHeatmapData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading heatmap data.</div>;

  const weeks = Object.keys(heatmapData);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="heatmap">
      <div className="heatmap-header">
        <h2>Workload Heatmap</h2>
        <div className="heatmap-days">
          {days.map(day => (
            <div key={day} className="heatmap-day">{day}</div>
          ))}
        </div>
      </div>
      <div className="heatmap-body">
        {weeks.map(week => (
          <div key={week} className="heatmap-week">
            {days.map((day, index) => {
              const workloadScore = calculateWorkloadScore(heatmapData[week][day]);
              return (
                <div
                  key={day}
                  className="heatmap-cell"
                  style={{ backgroundColor: `rgba(255, 0, 0, ${workloadScore})` }}
                  onMouseEnter={() => Tooltip.show(`Workload: ${workloadScore}`)}
                  onMouseLeave={() => Tooltip.hide()}
                >
                  {workloadScore}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Heatmap;