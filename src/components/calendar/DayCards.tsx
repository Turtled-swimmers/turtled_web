import styled from "styled-components";
import useGetCalendarDay from "../../hooks/useGetCalendarDay";
import DayCard from "./DayCard";

interface DayCarsProps {
  selectedDate?: string;
}

interface dayType {
  timer_start_time: string;
  timer_end_time: string;
  repeat_cycle: number;
  count: number;
}

export default function DayCards(props: DayCarsProps) {
  const { selectedDate } = props;
  const { dayData } = useGetCalendarDay(selectedDate);

  return (
    <>
      {selectedDate && (
        <DayCardsContainer>
          {dayData &&
            dayData?.map(({ timer_start_time, timer_end_time, repeat_cycle, count }: dayType, idx: number) => (
              <DayCard
                key={idx}
                session={idx + 1}
                startTime={timer_start_time}
                endTime={timer_end_time}
                repeatTime={repeat_cycle}
                count={count}
              />
            ))}
        </DayCardsContainer>
      )}
    </>
  );
}

const DayCardsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  width: 100%;

  padding-bottom: 15rem;
`;
