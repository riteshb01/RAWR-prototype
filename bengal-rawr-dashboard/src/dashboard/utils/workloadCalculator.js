export function calculateWeeklyLoad(events) {
  const weeklyLoad = {};

  events.forEach(event => {
    const eventDate = new Date(event.date);
    const weekNumber = getWeekNumber(eventDate);
    const weight = event.weight || 1; // Default weight if not provided

    if (!weeklyLoad[weekNumber]) {
      weeklyLoad[weekNumber] = 0;
    }

    weeklyLoad[weekNumber] += weight;
  });

  return weeklyLoad;
}

export function calculateWorkloadIntensity(weeklyLoad) {
  const totalLoad = Object.values(weeklyLoad).reduce((acc, load) => acc + load, 0);
  const intensityScore = totalLoad / Object.keys(weeklyLoad).length; // Average workload

  return intensityScore;
}

function getWeekNumber(date) {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startDate.getDay() + 1) / 7);
}