import React from 'react';
import { EVENT_TYPE_CONFIG } from '../utils/constants';
import { formatDate } from '../utils/dateUtils';

const DeadlineList = ({ events = [] }) => {
  if (events.length === 0) {
    return (
      <div className="empty-state" style={{ padding: '1.5rem 0' }}>
        <div className="empty-state-title">No upcoming deadlines</div>
        <div className="empty-state-body">Nothing due in the next 30 days.</div>
      </div>
    );
  }

  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  const grouped = {};
  sorted.forEach(evt => {
    const course = evt.course_name || evt.course_code || 'Unknown Course';
    if (!grouped[course]) grouped[course] = [];
    grouped[course].push(evt);
  });

  return (
    <div className="deadline-groups">
      {Object.entries(grouped).map(([course, courseEvents]) => (
        <div key={course}>
          <div className="deadline-course-name">{course}</div>
          <ul className="deadline-items">
            {courseEvents.map(evt => {
              const config = EVENT_TYPE_CONFIG[evt.event_type] || EVENT_TYPE_CONFIG.other;
              const daysUntil = getDaysUntil(evt.date);
              const urgency = daysUntil <= 3 ? 'urgent' : daysUntil <= 7 ? 'soon' : '';

              return (
                <li key={evt.id} className={`deadline-item ${urgency}`}>
                  <span className="deadline-type-dot" style={{ backgroundColor: config.color }} />
                  <div className="deadline-info">
                    <div className="deadline-title">{evt.title}</div>
                    <div className="deadline-meta">{config.label} · weight {evt.workload}</div>
                  </div>
                  <div className="deadline-date-col">
                    <span className="deadline-date">{formatDate(evt.date)}</span>
                    <span className="deadline-countdown">
                      {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil}d`}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

function getDaysUntil(dateStr) {
  const target = new Date(dateStr);
  const today  = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((target - today) / 86400000));
}

export default DeadlineList;