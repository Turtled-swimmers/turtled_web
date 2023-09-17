import { useState } from "react";
import styled from "styled-components";
import CalendarHeader from "../common/CalendarHeader";
import Footer from "../common/Footer";
import DayCards from "./DayCards";
import MonthCalendar from "./MonthCalendar";

export default function Calendar() {
  const [clickedDay, setClickedDay] = useState("");

  return (
    <>
      <CalendarHeader />
      <MonthCalendar />
      <DayCards clickedDay={clickedDay} />
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
