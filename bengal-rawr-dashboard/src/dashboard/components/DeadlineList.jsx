import React from 'react';
import { useWorkloadData } from '../hooks/useWorkloadData';

const DeadlineList = () => {
  const { upcomingDeadlines, isLoading, error } = useWorkloadData();

  if (isLoading) {
    return <div>Loading deadlines...</div>;
  }

  if (error) {
    return <div>Error loading deadlines: {error.message}</div>;
  }

  const sortedDeadlines = upcomingDeadlines.sort((a, b) => new Date(a.date) - new Date(b.date));

  const groupedByCourse = sortedDeadlines.reduce((acc, deadline) => {
    const course = deadline.course_name;
    if (!acc[course]) {
      acc[course] = [];
    }
    acc[course].push(deadline);
    return acc;
  }, {});

  return (
    <div className="deadline-list">
      {Object.entries(groupedByCourse).map(([course, deadlines]) => (
        <div key={course} className="course-group">
          <h3 className="course-title">{course}</h3>
          <ul className="deadline-items">
            {deadlines.map((deadline) => (
              <li key={deadline.id} className={`deadline-item ${deadline.urgency}`}>
                <span className="deadline-title">{deadline.title}</span>
                <span className="deadline-date">{new Date(deadline.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DeadlineList;