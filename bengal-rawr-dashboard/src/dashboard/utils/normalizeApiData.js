import { normalize } from 'normalizr';

export function normalizeApiData(apiData) {
  const courses = apiData.courses.map(course => ({
    course_name: course.course_name,
    events: course.events.map(event => ({
      title: event.title,
      date: event.date,
      type: event.type,
      weight: event.weight,
    })),
  }));

  return { courses };
}