import { format, getMonth, isSunday, isToday } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { TurtleIc } from "../../assets";

interface DayItemProps {
  setSelectedDate: Dispatch<SetStateAction<Date | string>>;
  date: Date;
  key: string;
  successedItem: { calendar_date: string; has_event: boolean } | undefined;
}

export default function DayItem(props: DayItemProps) {
  const { setSelectedDate, date, successedItem } = props;

  const formattedDate = format(date, "d");
  const isSundayDate: boolean = isSunday(date);
  const isTodayDate: boolean = isToday(date);
  const currentDate: Date = new Date();

  function handleShowRecord() {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    let dateString = year + "-" + month + "-" + day;
    setSelectedDate(dateString);
  }

  return (
    <DayItemContainer>
      <DayItemWrapper>
        <DayBox key={date.toString()} $isSunday={isSundayDate}>
          <DayText $isToday={isTodayDate} $isNotvalid={getMonth(date) !== getMonth(currentDate)}>
            {formattedDate}
          </DayText>
          {successedItem?.has_event && <Circle onClick={handleShowRecord} />}
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

const Circle = styled(TurtleIc)`
  display: flex;
  width: 6rem;
  height: 6rem;
  margin-top: -4.8rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 2rem;
  /* background: #98cdb3; */

  cursor: pointer;
`;

const DayText = styled.div<{ $isToday: boolean; $isNotvalid: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, $isToday }) => $isToday && "white"};
  background-color: ${({ theme, $isToday }) => $isToday && theme.colors.green};

  border-radius: 50%;
  width: ${({ $isToday }) => $isToday && 4.1}rem;
  height: 4rem;
  ${({ theme }) => theme.fonts.caption}
`;
