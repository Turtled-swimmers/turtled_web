import styled from "styled-components";

interface DayCardProps {
  session: number;
  startTime: string;
  endTime: string;
  repeatTime: number;
  count: number;
}

export default function DayCard(props: DayCardProps) {
  const { session, startTime, endTime, repeatTime, count } = props;

  return (
    <Card>
      <Title># {session}</Title>
      <Content>시작 시간 : {startTime}</Content>
      <Content>종료 시간 : {endTime}</Content>
      {/* <Content>타이머 주기 : {repeatTime}분</Content>
      <Content>스트레칭 횟수 : {count}번</Content> */}
    </Card>
  );
}

const Card = styled.div`
  width: 87%;

  padding: 1rem 2rem;
  margin: 0.5rem;

  border-radius: 0.8rem;
  background: #f8f9fe;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.caption}
`;

const Content = styled.p`
  ${({ theme }) => theme.fonts.content}
`;
