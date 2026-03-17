# Bengal RAWR Dashboard

## Overview

Bengal RAWR is a data-driven dashboard designed to transform extracted syllabus data into clear, actionable workload insights for students. The dashboard visualizes academic workloads, highlights potential conflicts, and provides tools for managing deadlines effectively.

## Features

- **Workload Heatmap**: Visualizes daily academic intensity based on workload scores.
- **Weekly Workload Graph**: Displays total workload per week, highlighting weeks that exceed specified thresholds.
- **Upcoming Deadlines Panel**: Lists upcoming deadlines sorted by date and grouped by course, with color coding for urgency.
- **Course Distribution Widget**: Shows workload contribution per course using pie or stacked bar charts.
- **Impossible Week Detector**: Flags weeks where the workload exceeds a certain threshold, providing insights into potential overload.

## Project Structure

```
bengal-rawr-dashboard
├── src
│   ├── app.jsx
│   ├── main.jsx
│   ├── routes
│   │   └── index.jsx
│   ├── dashboard
│   │   ├── components
│   │   │   ├── Heatmap.jsx
│   │   │   ├── WeeklyChart.jsx
│   │   │   ├── DeadlineList.jsx
│   │   │   ├── CourseBreakdown.jsx
│   │   │   └── AlertsPanel.jsx
│   │   ├── hooks
│   │   │   ├── useWorkloadData.js
│   │   │   └── useHeatmapData.js
│   │   ├── services
│   │   │   └── api.js
│   │   ├── store
│   │   │   └── uiStore.js
│   │   ├── utils
│   │   │   ├── workloadCalculator.js
│   │   │   ├── dateUtils.js
│   │   │   ├── normalizeApiData.js
│   │   │   └── validators.js
│   │   └── index.jsx
│   ├── shared
│   │   ├── components
│   │   │   ├── ErrorState.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   └── Panel.jsx
│   │   ├── hooks
│   │   │   └── useDebouncedValue.js
│   │   └── utils
│   │       └── constants.js
│   └── styles
│       └── index.css
├── public
│   └── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd bengal-rawr-dashboard
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to view the dashboard.

## Development

- The project uses **React** for building the user interface.
- **React Query** is utilized for data fetching and state management.
- **Zustand** is used for managing client-side state.
- **TailwindCSS** is employed for styling, providing a utility-first approach to design.

## API Integration

The dashboard fetches data from a backend API that provides course and event information. The expected API response structure is as follows:

```json
{
  "courses": [
    {
      "course_name": "CIS 375",
      "events": [
        {
          "title": "Midterm Exam",
          "date": "2026-03-20",
          "type": "exam",
          "weight": 0.3
        }
      ]
    }
  ]
}
```

## Contribution

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.