import { addMonths, subMonths } from "date-fns";
import { useState } from "react";
import useGetCalendarMonth from "../../hooks/useGetCalendarMonth";
import Days from "./Days";
import DaysOfWeek from "./DaysOfWeek";
import YearNMonth from "./YearNMonth";

export default function MonthCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const { monthData } = useGetCalendarMonth();

  function handleToPrevMonth() {
    setCurrentDate(subMonths(currentDate, 1));
  }

  function handleToNextMonth() {
    setCurrentDate(addMonths(currentDate, 1));
  }
  console.log(monthData);

  return (
    <>
      <YearNMonth
        currentDate={currentDate}
        handleToPrevMonth={handleToPrevMonth}
        handleToNextMonth={handleToNextMonth}
      />
      <DaysOfWeek />
      <Days currentDate={currentDate} />
    </>
  );
}
