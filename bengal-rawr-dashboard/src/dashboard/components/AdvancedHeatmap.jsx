import React from 'react';

/**
 * Returns a smooth gradient colour from green → amber → red 
 * based on ratio (0–1). Zero returns transparent.
 */
const getGradientColor = (val, max) => {
  if (val === 0 || max === 0) return 'transparent';
  const ratio = val / max;
  // green(142°) → amber(36°) → red(0°)
  const hue = ratio <= 0.5
    ? 142 - (142 - 36) * (ratio / 0.5)   // green → amber
    : 36 - 36 * ((ratio - 0.5) / 0.5);     // amber → red
  const sat = 70 + ratio * 15;              // slightly more vivid as intensity grows
  const light = 50 - ratio * 10;            // slightly darker at peak
  return `hsl(${Math.round(hue)}, ${Math.round(sat)}%, ${Math.round(light)}%)`;
};

/**
 * A single bubble cell.
 *  - Size scales from 28% → 92% of the cell based on intensity.
 *  - Shows the numeric value inside.
 *  - Empty cells render as a subtle dashed ring.
 */
const BubbleCell = ({ value, max, label }) => {
  const isEmpty = value === 0;
  const ratio = max > 0 ? value / max : 0;

  // Circle diameter as a % of cell size (min 28%, max 92%)
  const sizePct = isEmpty ? 28 : 28 + ratio * 64;
  const bg = getGradientColor(value, max);
  // Ensure text is readable on the coloured background
  const textColor = ratio > 0.45 ? '#fff' : 'var(--ink-2)';

  return (
    <div
      title={label}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '48px',
        width: '100%',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: `${sizePct}%`,
          aspectRatio: '1',
          maxWidth: '44px',
          maxHeight: '44px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isEmpty ? 'none' : bg,
          border: isEmpty
            ? '1.5px dashed var(--border)'
            : `2px solid ${bg}`,
          boxShadow: isEmpty
            ? 'none'
            : `0 2px 8px ${bg}44`,
          transition: 'all 0.25s ease',
          cursor: isEmpty ? 'default' : 'pointer',
        }}
      >
        <span
          style={{
            fontSize: isEmpty ? '0.55rem' : ratio > 0.5 ? '0.85rem' : '0.72rem',
            fontWeight: isEmpty ? 400 : 700,
            color: isEmpty ? 'var(--ink-4)' : textColor,
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
            userSelect: 'none',
          }}
        >
          {isEmpty ? '–' : value}
        </span>
      </div>
    </div>
  );
};

/**
 * A legend bar showing the gradient scale.
 */
const GradientLegend = ({ low = 'Low', high = 'High' }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '1.25rem',
    fontSize: '0.65rem',
    color: 'var(--ink-3)',
    fontWeight: 500,
  }}>
    <span>{low}</span>
    <div style={{
      width: '120px',
      height: '8px',
      borderRadius: '4px',
      background: 'linear-gradient(to right, hsl(142,70%,50%), hsl(36,78%,47%), hsl(0,85%,40%))',
    }} />
    <span>{high}</span>
  </div>
);

/**
 * Advanced Workload Matrix (Categorical Heatmap)
 * Expected prop: categoricalData = { weeks: [], categories: [{name: "", values: []}] }
 */
const AdvancedHeatmap = ({ categoricalData }) => {
  if (!categoricalData || !categoricalData.categories || categoricalData.categories.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--ink-3)' }}>
        No workload data available.
      </div>
    );
  }

  // Compute global max for the view to scale the circles properly
  const catMax = Math.max(...categoricalData.categories.flatMap(c => c.values));

  return (
    <div style={{ width: '100%' }}>
      <div style={{ overflowX: 'auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `90px repeat(${categoricalData.weeks.length}, 1fr)`,
          gap: '2px',
          minWidth: '540px',
        }}>
          {/* Header row */}
          <div />
          {categoricalData.weeks.map(w => (
            <div key={w} style={{
              textAlign: 'center',
              fontSize: '0.7rem',
              color: 'var(--ink-4)',
              fontWeight: 600,
              paddingBottom: '0.5rem',
            }}>
              {w}
            </div>
          ))}

          {/* Data rows */}
          {categoricalData.categories.map(cat => (
            <React.Fragment key={cat.name}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--ink-2)',
                paddingRight: '0.5rem',
                textTransform: 'capitalize',
              }}>
                {cat.name}
              </div>
              {cat.values.map((val, colIdx) => (
                <BubbleCell
                  key={colIdx}
                  value={val}
                  max={catMax}
                  label={`${cat.name} in ${categoricalData.weeks[colIdx]}: ${val} weight`}
                />
              ))}
            </React.Fragment>
          ))}
        </div>

        <GradientLegend low="0 workload" high={`${catMax} workload`} />

        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--ink-3)', marginTop: '1rem' }}>
          This view helps you understand <strong>what kind of work</strong> is piling up. Notice how some task types drop off when Exams pick up.
        </p>
      </div>
    </div>
  );
};

export default AdvancedHeatmap;
