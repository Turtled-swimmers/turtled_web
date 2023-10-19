import { addDays, endOfMonth, endOfWeek, isSameDay, startOfMonth, startOfWeek } from "date-fns";
import styled from "styled-components";
import useGetCalendarMonth from "../../hooks/useGetCalendarMonth";
import DayItem from "./DayItem";
import { SelectedDataType } from "./MonthCalendar";

interface DaysProp extends SelectedDataType {
  currentDate: Date;
}

interface DateType {
  calendar_date: string;
}

export default function Days(props: DaysProp) {
  const { currentDate, setSelectedDate } = props;
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate: Date = endOfWeek(monthEnd);
  const { monthData } = useGetCalendarMonth(`${currentDate.getFullYear()}` + "-" + `${currentDate.getMonth() + 1}`);
  // const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const rows: React.ReactNode[] = [];
  let days: React.ReactNode[] = [];
  let day: Date = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const successedItem = monthData?.find(({ calendar_date }: DateType) => isSameDay(new Date(calendar_date), day));
      days.push(
        <DayItem setSelectedDate={setSelectedDate} date={day} key={day.toString()} successedItem={successedItem} />,
      );

      day = addDays(day, 1);

      if (days.length === 7) {
        rows.push(
          <WeekWrapper key={day.toString()}>
            <DayWrapper>{[...days]}</DayWrapper>
          </WeekWrapper>,
        );
      }
    }

    days = [];
  }

  return (
    <>
      <DaysWrapper>{[...rows]}</DaysWrapper>
    </>
  );
}

const DaysWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

const WeekWrapper = styled.article`
  width: 90%;
  padding: 0 2rem;
`;

const DayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  align-items: center;

  gap: 0.3rem;
`;
