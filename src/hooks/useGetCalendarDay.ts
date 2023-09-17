import { DAYS_CALENDAR } from "../core/daysCalendar";

export default function useGetCalendarDay(clickedDay: string) {
  const dayData = DAYS_CALENDAR;

  return { dayData };
}
