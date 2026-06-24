import React from 'react';
import { useHeatmapData } from '../hooks/useHeatmapData';
import { calculateHeatmapData } from '../utils/workloadCalculator';

const HEAT_COLORS = [
  { min: 0,    bg: '#FFFFFF', border: '#E5E3DF' },   // empty
  { min: 0.01, bg: '#D1F0E1', border: '#A7E3C6' },   // faint green
  { min: 0.3,  bg: '#7BCFA5', border: '#5BB88A' },   // medium green
  { min: 0.6,  bg: '#2DB66E', border: '#1F9458' },   // accent green
  { min: 0.8,  bg: '#1A6B42', border: '#0E4A2C' },   // deep green
];

function getHeatStyle(intensity) {
  let swatch = HEAT_COLORS[0];
  for (const s of HEAT_COLORS) {
    if (intensity >= s.min) swatch = s;
  }
  return { backgroundColor: swatch.bg, borderColor: swatch.border };
}

const Heatmap = ({ heatmapData: parentData }) => {
  const { data: fullData, isLoading } = useHeatmapData();

  const rawHeatmap = fullData?.heatmap ?? parentData ?? {};
  const cells = calculateHeatmapData(rawHeatmap);

  if (isLoading && !parentData) {
    return <div className="card-loading">Loading heatmap…</div>;
  }

  if (cells.length === 0) {
    return (
      <div className="empty-state" style={{ padding: '2rem 0' }}>
        <div className="empty-state-icon">📅</div>
        <div className="empty-state-title">No heatmap data</div>
        <div className="empty-state-body">Upload a syllabus to populate your workload heatmap.</div>
      </div>
    );
  }

  // Group by month
  const months = {};
  cells.forEach(cell => {
    const monthKey = cell.date.substring(0, 7);
    if (!months[monthKey]) months[monthKey] = [];
    months[monthKey].push(cell);
  });

  return (
    <div>
      <div className="heatmap-container">
        {Object.entries(months).map(([month, dayCells]) => (
          <div key={month} className="heatmap-month">
            <div className="heatmap-month-label">{formatMonth(month)}</div>
            <div className="heatmap-cells">
              {dayCells.map(cell => (
                <div
                  key={cell.date}
                  className="heatmap-cell"
                  style={getHeatStyle(cell.intensity)}
                  title={`${cell.date} — workload ${cell.value}`}
                >
                  <span className="heatmap-cell-day">
                    {parseInt(cell.date.split('-')[2], 10)}
                  </span>
                  {cell.value > 0 && (
                    <span className="heatmap-cell-value">{cell.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="heatmap-legend">
        <span className="legend-label">Less</span>
        {HEAT_COLORS.map((s, i) => (
          <div key={i} className="legend-swatch" style={{ backgroundColor: s.bg, borderColor: s.border }} />
        ))}
        <span className="legend-label">More</span>
      </div>
    </div>
  );
};

function formatMonth(monthKey) {
  const [year, month] = monthKey.split('-');
  return new Date(parseInt(year), parseInt(month) - 1, 1)
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    .toUpperCase();
}

export default Heatmap;