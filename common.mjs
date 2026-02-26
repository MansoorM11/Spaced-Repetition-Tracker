export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

export function calculateRevisionDates(startDateString) {
  const baseDate = new Date(startDateString + "T00:00:00Z");
  const revisionDates = [];

  function addDays(days) {
    const date = new Date(baseDate);
    date.setUTCDate(date.getUTCDate() + days);
    return date;
  }

  function addMonths(months) {
    const date = new Date(baseDate);
    date.setUTCMonth(date.getUTCMonth() + months);
    return date;
  }

  revisionDates.push(addDays(7));
  revisionDates.push(addMonths(1));
  revisionDates.push(addMonths(3));
  revisionDates.push(addMonths(6));
  revisionDates.push(addMonths(12));

  return revisionDates.map((date) => date.toISOString().split("T")[0]);
}
