import React from 'react';
import { useWorkloadData } from '../hooks/useWorkloadData';
import Panel from '../../shared/components/Panel';

const AlertsPanel = () => {
  const { impossibleWeeks } = useWorkloadData();

  return (
    <Panel title="Alerts" icon="⚠️">
      {impossibleWeeks.length === 0 ? (
        <div className="text-green-500">✅ No impossible weeks detected!</div>
      ) : (
        <ul className="space-y-2">
          {impossibleWeeks.map((week) => (
            <li key={week.week} className="bg-red-100 border border-red-300 p-4 rounded">
              <div className="font-semibold">{week.week}</div>
              <div className="text-red-600">{week.status}</div>
              <div className="text-gray-600">{week.reason}</div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
};

export default AlertsPanel;