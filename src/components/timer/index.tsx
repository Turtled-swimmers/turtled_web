import { useState } from "react";
import styled from "styled-components";
import { ArrowLeftIc, ArrowRightIc } from "../../assets";

export default function Timer() {
  const [loopTime, setLoopTime] = useState("0:00");

  function handleMinusTime() {
    if (Number(loopTime.split(":")[0]) === 0) {
      setLoopTime("60:00");
    } else {
      setLoopTime(`${Number(loopTime.split(":")[0]) - 1}` + ":00");
    }
  }

  function handlePlusTime() {
    if (Number(loopTime.split(":")[0]) === 60) {
      setLoopTime("0:00");
    } else {
      setLoopTime(`${Number(loopTime.split(":")[0]) + 1}` + ":00");
    }
  }

  return (
    <TimerWrapper>
      <Title>몇 분 주기로 알림 받으실래요?</Title>
      <TimeSetWrapper>
        <ArrowLeftIc onClick={handleMinusTime} />
        <LootTimeWrapper>{loopTime}</LootTimeWrapper>
        <ArrowRightIc onClick={handlePlusTime} />
      </TimeSetWrapper>
    </TimerWrapper>
  );
}

const Title = styled.h1`
  ${({ theme }) => theme.fonts.title};
  margin: 3rem 0;
`;

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LootTimeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10.3rem;
  height: 4.4143rem;
  flex-shrink: 0;
  border-radius: 1rem;
  margin: 0 1rem;

  color: ${({ theme }) => theme.colors.green};
  border: 3px solid ${({ theme }) => theme.colors.green};

  box-shadow: 0px 4px 3px 0px rgba(95, 88, 88, 0.2);

  ${({ theme }) => theme.fonts.title};
`;

const TimeSetWrapper = styled.section`
  display: flex;

  align-items: center;
`;
