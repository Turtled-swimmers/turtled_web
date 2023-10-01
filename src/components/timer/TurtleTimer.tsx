import { useEffect, useState } from "react";
import styled from "styled-components";
import { TimerBackIc, TimerFrontIc, TurtleIc } from "../../assets";

interface TurtleTimerProp {
  loopTime: string;
  loopCycle: number;
  handleSetTimes: () => void;
}

export default function TurtleTimer({ loopTime, loopCycle, handleSetTimes }: TurtleTimerProp) {
  const [time, setTime] = useState(0); // 남은 시간 (단위: 초)
  const timeToStrech = Number(loopTime.split(":")[0]) * 60;

  useEffect(() => {
    if (loopCycle === 0) return;
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [loopCycle]);

  useEffect(() => {
    if (loopCycle === 0) return;
    if (time > timeToStrech) {
      handleSetTimes();
      setTime(0);
      alert("Time OVER!");
    }
  }, [time]);

  function getSeconds(time: number) {
    const seconds = Number(time % 60);
    if (seconds < 10) {
      return "0" + String(seconds);
    } else {
      return String(seconds);
    }
  }

  return (
    <>
      <TurtleTimerContainer>
        <TurtleTimerWrapper>
          <span>{parseInt(`${time / 60}`)}</span>
          <span> : </span>
          <span>{getSeconds(time)}</span>
        </TurtleTimerWrapper>
        <TimerUIWrapper>
          <TurtleIcon />
          <TimerFrontIcon />
          <TimerBackIcon />
          <TimerPercent percent={(time / timeToStrech) * 100} />
        </TimerUIWrapper>

        {/* <Donut percent={(time / timeToStrech) * 100} /> */}
      </TurtleTimerContainer>
    </>
  );
}

const Donut = styled.div<{ percent: number }>`
  width: 29.7rem;
  height: 29.7rem;

  /* width: calc(100% - 16px);
  padding-bottom: calc(100% - 16px); */
  /* margin: 0 auto; */
  border-radius: 50%;
  position: relative;
  text-align: center;
  /* transition: background 0.3s ease-in-out; */
  background: conic-gradient(
    ${({ theme }) => theme.colors.green} 0% ${({ percent }) => percent}%,
    ${({ theme }) => theme.colors.gray1} ${({ percent }) => percent}% 100%
  );
`;

const TurtleIcon = styled(TurtleIc)`
  position: absolute;
  z-index: 5;

  width: 25rem;
  height: 25rem;
`;

const TurtleTimerContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
`;

const TimerUIWrapper = styled.section`
  width: 31.5rem;
  height: 31.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 1rem;
`;

const TimerPercent = styled.div<{ percent: number }>`
  margin-top: -0.5rem;

  border-radius: 50%;

  width: 29.7rem;
  height: 29.7rem;

  background-color: ${({ theme }) => theme.colors.gray1};
  background: conic-gradient(
    ${({ theme }) => theme.colors.green} 0% ${({ percent }) => percent}%,
    ${({ theme }) => theme.colors.gray1} ${({ percent }) => percent}% 100%
  );
`;

const TimerBackIcon = styled(TimerBackIc)`
  position: absolute;
  z-index: 2;
`;

const TimerFrontIcon = styled(TimerFrontIc)`
  position: absolute;
  z-index: 3;
`;

const TurtleTimerWrapper = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11.8976rem;
  height: 5.099rem;
  flex-shrink: 0;
  border-radius: 1rem;
  border: 3px solid #fff;
  background: ${({ theme }) => theme.colors.green};

  box-shadow: 0px 4px 3px 0px rgba(95, 88, 88, 0.2);

  color: white;
  ${({ theme }) => theme.fonts.title};
`;
