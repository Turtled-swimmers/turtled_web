import { format } from "date-fns";
import styled from "styled-components";
import { ArrowLeftIc, ArrowRightIc } from "../../assets";

interface YearandMonthProps {
  currentDate: Date;
  handleToPrevMonth: () => void;
  handleToNextMonth: () => void;
}

export default function YearNMonth(props: YearandMonthProps) {
  const { currentDate, handleToPrevMonth, handleToNextMonth } = props;

  return (
    <YearNMonthHeader>
      <ArrowLeftIcon onClick={handleToPrevMonth} />
      {format(currentDate, "yyyy")}년 {format(currentDate, "MM")}월
      <ArrowRightIcon onClick={handleToNextMonth} />
    </YearNMonthHeader>
  );
}

const YearNMonthHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 4rem;

  ${({ theme }) => theme.fonts.sub}
`;

const ArrowLeftIcon = styled(ArrowLeftIc)`
  margin-right: 2rem;

  cursor: pointer;
`;

const ArrowRightIcon = styled(ArrowRightIc)`
  margin-left: 2rem;

  cursor: pointer;
`;
