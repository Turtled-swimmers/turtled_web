import { format, getMonth, isSunday, isToday } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface DayItemProps {
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  date: Date;
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
          {/* <>
          {successedItem && (myChildLength as number) >= 4
            ? successedItem?.dailyScheduleList?.slice(0, 2).map((lesson) => {
                const { schedule, lessonIdx } = lesson;
                const { startTime, studentName, idx } = schedule;

                return (
                  <ScheduleWrapper $backgroundcolor={STUDENT_COLOR[lessonIdx % 10]} key={idx}>
                    {startTime} {studentName.slice(0, 2)}
                  </ScheduleWrapper>
                );
              })
            : successedItem?.dailyScheduleList.map((lesson) => {
                const { schedule, lessonIdx } = lesson;
                const { startTime, studentName, idx } = schedule;

                return <Circle />;
              })}
        </> */}
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
  justify-content: center;

  width: 4.1rem;
  height: 5rem;
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
