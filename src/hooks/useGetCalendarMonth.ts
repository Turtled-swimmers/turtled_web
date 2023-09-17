import { CALENDAR } from "../core/calendar";

export default function useGetCalendarMonth() {
  const monthData = CALENDAR;

  return { monthData };
}
