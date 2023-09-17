import { addMonths, subMonths } from "date-fns";
import { useState } from "react";
import Days from "./Days";
import DaysOfWeek from "./DaysOfWeek";
import YearNMonth from "./YearNMonth";

export default function MonthCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  function handleToPrevMonth() {
    setCurrentDate(subMonths(currentDate, 1));
  }

  function handleToNextMonth() {
    setCurrentDate(addMonths(currentDate, 1));
  }

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
