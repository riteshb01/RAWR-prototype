export function validateCourseData(course) {
  if (!course || typeof course !== 'object') {
    return { valid: false, error: 'Invalid course data' };
  }
  const { course_name, events } = course;
  if (!course_name || typeof course_name !== 'string') {
    return { valid: false, error: 'Course name is required and must be a string' };
  }
  if (!Array.isArray(events)) {
    return { valid: false, error: 'Events must be an array' };
  }
  for (const event of events) {
    const eventValidation = validateEventData(event);
    if (!eventValidation.valid) {
      return { valid: false, error: `Event error: ${eventValidation.error}` };
    }
  }
  return { valid: true };
}

export function validateEventData(event) {
  if (!event || typeof event !== 'object') {
    return { valid: false, error: 'Invalid event data' };
  }
  const { title, date, type, weight } = event;
  if (!title || typeof title !== 'string') {
    return { valid: false, error: 'Event title is required and must be a string' };
  }
  if (!date || !isValidDate(date)) {
    return { valid: false, error: 'Event date is required and must be a valid date' };
  }
  if (!type || typeof type !== 'string') {
    return { valid: false, error: 'Event type is required and must be a string' };
  }
  if (typeof weight !== 'number' || weight < 0) {
    return { valid: false, error: 'Event weight must be a non-negative number' };
  }
  return { valid: true };
}

function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}