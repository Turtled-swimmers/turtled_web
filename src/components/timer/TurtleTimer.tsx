import { useEffect, useState } from "react";
import styled from "styled-components";

interface TurtleTimerProp {
  loopTime: string;
  loopCycle: number;
}

export default function TurtleTimer({ loopTime, loopCycle }: TurtleTimerProp) {
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
    <TurtleTimerWrapper>
      <span>{parseInt(`${time / 60}`)}</span>
      <span> : </span>
      <span>{getSeconds(time)}</span>
    </TurtleTimerWrapper>
  );
}

const TurtleTimerWrapper = styled.div`
  margin-top: 5rem;
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
