import styled from "styled-components";

export default function DaysOfWeek() {
  const DAY_OF_WEEK: string[] = ["일", "월", "화", "수", "목", "금", "토"];

  const dateList: JSX.Element[] = DAY_OF_WEEK.map((day, idx) => (
    <DayWrapper $isSunday={idx === 0} key={idx}>
      {day}
    </DayWrapper>
  ));
  return (
    <DaysContainer>
      <DaysWrapper>{dateList}</DaysWrapper>
    </DaysContainer>
  );
}

const DayWrapper = styled.p<{ $isSunday: boolean }>`
  color: ${({ $isSunday }) => $isSunday && "#FCB3A6"};
`;

const DaysWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  width: 90%;
  padding: 0 3.7rem;

  ${({ theme }) => theme.fonts.caption}
`;

const DaysContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
