import styled from "styled-components";
import useGetCalendarDay from "../../hooks/useGetCalendarDay";
import DayCard from "./DayCard";

interface DayCarsProps {
  clickedDay: string;
}

export default function DayCards(props: DayCarsProps) {
  const { clickedDay } = props;
  const { dayData } = useGetCalendarDay(clickedDay);

  return (
    <>
      {clickedDay.length > 0 && (
        <DayCardsContainer>
          {dayData?.map(({ start_time, end_time, repeat_time, count }, idx) => (
            <DayCard
              key={idx}
              session={idx + 1}
              startTime={start_time}
              endTime={end_time}
              repeatTime={repeat_time}
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
