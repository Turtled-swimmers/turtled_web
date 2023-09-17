import { format, getMonth, isSunday, isToday } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface DayItemProps {
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  date: Date;
  key: string;
  successedItem: { calendar_date: string; is_true: boolean } | undefined;
}

export default function DayItem(props: DayItemProps) {
  const { setSelectedDate, date, successedItem } = props;

  const formattedDate = format(date, "d");
  const isSundayDate: boolean = isSunday(date);
  const isTodayDate: boolean = isToday(date);
  const currentDate: Date = new Date();

  return (
    <DayItemContainer>
      <DayItemWrapper>
        <DayBox key={date.toString()} $isSunday={isSundayDate}>
          <DayText $isToday={isTodayDate} $isNotvalid={getMonth(date) !== getMonth(currentDate)}>
            {formattedDate}
          </DayText>
          {successedItem?.is_true && <Circle />}
        </DayBox>
      </DayItemWrapper>
    </DayItemContainer>
  );
}

const DayItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const DayItemWrapper = styled.div`
  display: flex;
`;

const DayBox = styled.article<{ $isSunday: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 4.1rem;
  height: 6rem;
  color: ${({ $isSunday }) => $isSunday && "#FCB3A6"};
`;

const Circle = styled.div`
  display: flex;
  width: 0.8rem;
  height: 0.8rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 2rem;
  background: #98cdb3;
`;

const DayText = styled.div<{ $isToday: boolean; $isNotvalid: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, $isToday }) => $isToday && "white"};
  background-color: ${({ theme, $isToday }) => $isToday && theme.colors.green};

  border-radius: 50%;
  width: 4.1rem;
  height: 4rem;
  ${({ theme }) => theme.fonts.caption}
`;
