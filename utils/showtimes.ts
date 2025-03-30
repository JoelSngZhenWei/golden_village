export function generateShowtimes(startDateStr: string, endDateStr: string): string[] {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const timesPerDay = ["10:00", "13:00", "16:30", "19:00", "21:30"];
  const showtimes: string[] = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const isoDate = d.toISOString().split("T")[0];
    const day = d.getDate(); // Day of the month (1-31)

    let numTimes = 3; // default

    if (day % 4 === 0) {
      numTimes = 2;
    } else if (day % 5 === 0 || day % 7 === 0) {
      numTimes = 4;
    }

    // Use first N times deterministically from the base array
    const selectedTimes = timesPerDay.slice(0, numTimes);

    selectedTimes.forEach((time) => {
      showtimes.push(`${isoDate}T${time}:00`);
    });
  }

  return showtimes;
}
