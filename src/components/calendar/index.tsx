import { useState } from "react";
import styled from "styled-components";
import CalendarHeader from "../common/CalendarHeader";
import Footer from "../common/Footer";
import DayCards from "./DayCards";
import MonthCalendar from "./MonthCalendar";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | string>("");

  return (
    <>
      <CalendarHeader />
      <MonthCalendar setSelectedDate={setSelectedDate} />
      {selectedDate && <DayCards selectedDate={`${selectedDate}`} />}
      <Footer />
    </>
  );
}

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;
