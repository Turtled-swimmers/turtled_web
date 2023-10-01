import { useState } from "react";
import styled from "styled-components";
import { ArrowLeftIc, ArrowRightIc } from "../../assets";
import TurtleTimer from "./TurtleTimer";

export default function Timer() {
  const [loopTime, setLoopTime] = useState("0:00");
  const [loopCycle, setLoopCycle] = useState(0);

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

  function handleSetTimes() {
    setLoopCycle((il) => il + 1);
  }

  function handleStopStretching() {
    window.location.reload();
  }

  return (
    <TimerWrapper>
      <Title>몇 분 주기로 알림 받으실래요?</Title>
      <TimeSetWrapper>
        <ArrowLeftIc onClick={handleMinusTime} />
        <LootTimeWrapper>{loopTime}</LootTimeWrapper>
        <ArrowRightIc onClick={handlePlusTime} />
      </TimeSetWrapper>

      <TurtleTimer loopTime={loopTime} loopCycle={loopCycle} handleSetTimes={handleSetTimes} />
      <ButtonWrapper onClick={handleSetTimes}>
        {loopCycle > 0 ? (
          <StopButton onClick={handleStopStretching}>스트레칭 그만하기</StopButton>
        ) : (
          <StretchingButton>스트레칭 시작하기</StretchingButton>
        )}
      </ButtonWrapper>
    </TimerWrapper>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StopButton = styled.button`
  display: flex;
  height: 4.8rem;
  padding: 1.2rem 12rem;
  margin: 5rem 0;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  align-self: stretch;
  border-radius: 1rem;
  border: 3px solid ${({ theme }) => theme.colors.green};
  background: white;
  box-shadow: 0px 3px 3px 0px rgba(95, 88, 88, 0.2);

  color: ${({ theme }) => theme.colors.green};
  ${({ theme }) => theme.fonts.sub};
`;

const StretchingButton = styled.button`
  display: flex;
  height: 4.8rem;
  padding: 1.2rem 12rem;
  margin: 5rem 0;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  align-self: stretch;
  border-radius: 1rem;
  border: 3px solid ${({ theme }) => theme.colors.green};
  background: ${({ theme }) => theme.colors.green};
  box-shadow: 0px 3px 3px 0px rgba(95, 88, 88, 0.2);

  color: white;
  ${({ theme }) => theme.fonts.sub};
`;

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
