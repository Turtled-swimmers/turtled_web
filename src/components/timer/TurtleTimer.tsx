import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { alarm, getTurtle, postAlarm } from "../../api/timer";
import { TimerBackIc, TimerFrontIc, TurtleIc } from "../../assets";
import { token } from "../../atom/common/token";
import { isLogined } from "../../utils/join/isLogined";

interface TurtleTimerProp {
  loopTime: string;
  loopCycle: number;
  handleSetTimes: () => void;
}

export default function TurtleTimer({ loopTime, loopCycle, handleSetTimes }: TurtleTimerProp) {
  const [time, setTime] = useState(0); // 남은 시간 (단위: 초)
  const timeToStrech = Number(loopTime.split(":")[0]) * 60 + Number(loopTime.split(":")[1]);
  const deviceToken = useRecoilValue(token);
  const [startTime, setStartTime] = useState("");

  const { mutate: sendAlarm } = useMutation(
    () => postAlarm(deviceToken, Number(loopTime.split(":")[0]) * 60 + Number(loopTime.split(":")[1]), startTime),
    {
      onError: (err) => {
        console.log(err);
      },
    },
  );

  const { mutate: getAlarm } = useMutation(() => alarm(deviceToken), {
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);

    let dateString = year + "-" + month + "-" + day;

    let hours = ("0" + today.getHours()).slice(-2);
    let minutes = ("0" + today.getMinutes()).slice(-2);
    let seconds = ("0" + today.getSeconds()).slice(-2);

    let timeString = hours + ":" + minutes + ":" + seconds;

    setStartTime(dateString + " " + timeString);
  }, []);

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
      sendAlarm();
      setTime(0);
      getAlarm();
      //   alert("Time OVER!");
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

  const { data: turtle, isError } = useQuery(["turtle"], getTurtle, {
    onSuccess: () => {},
    onError: (err) => {
      console.log(err);
    },
    enabled: !!isLogined(),
  });
  console.log(turtle);
  return (
    <>
      <TurtleTimerContainer>
        <TurtleTimerWrapper>
          <span>{parseInt(`${time / 60}`)}</span>
          <span> : </span>
          <span>{getSeconds(time)}</span>
        </TurtleTimerWrapper>
        <TimerUIWrapper>
          {/* <Circle percent={Math.floor((time / timeToStrech) * 100)} /> */}
          {!isLogined() ? <TurtleIcon /> : <Turtle src={turtle.image} />}
          <TimerFrontIcon />
          <TimerBackIcon />

          <TimerPercent percent={Math.ceil((time / timeToStrech) * 100)} />
        </TimerUIWrapper>
      </TurtleTimerContainer>
    </>
  );
}

const Turtle = styled.img`
  width: 25rem;
  height: 25rem;
  position: absolute;
  z-index: 100;
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

const Circle = styled.div<{ percent: number }>`
  position: absolute;
  z-index: 15;

  /* top: ${({ percent }) =>
    0 <= percent && percent < 5
      ? 24.5
      : 5 <= percent && percent < 12.5
      ? 25 + percent * 0.58
      : 12.5 <= percent && percent < 25
      ? 24.5 + percent * 0.58
      : 25 <= percent && percent < 50
      ? 39 + (percent - 25) * 0.58
      : 50 <= percent && percent < 75
      ? 53.5 - (percent - 50) * 0.58
      : 39 - (percent - 75) * 0.58}rem;
  left: ${({ percent }) =>
    0 <= percent && percent < 5
      ? 18.5
      : 5 <= percent && percent < 12.5
      ? 20 + (percent + 5) * 0.58
      : 12.5 <= percent && percent < 25
      ? 18.5 + percent * 0.58 + (5 - 0.4 * (percent - 12.5))
      : 25 <= percent && percent < 50
      ? 33 - (percent - 25) * 0.58
      : 50 <= percent && percent < 75
      ? 18.5 - (percent - 50) * 0.58
      : 4 + (percent - 75) * 0.58}rem; */
  width: 2.5495rem;
  height: 2.5495rem;

  background: ${({ theme }) => theme.colors.green};

  border: 3px solid white;
  border-radius: 50%;
  filter: drop-shadow(0px 3px 5px rgba(95, 88, 88, 0.15));
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
