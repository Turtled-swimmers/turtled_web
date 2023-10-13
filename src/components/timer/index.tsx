import { useState } from "react";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { doneAlarm } from "../../api/timer";
import { ArrowLeftIc, ArrowRightIc, ShowStrechIc, TurtleIc } from "../../assets";
import stretch from "../../assets/image/stretch.png";
import { token } from "../../atom/common/token";
import Modal from "../common/Modal";
import TurtledHeader from "../common/TurtledHeader";
import TurtleTimer from "./TurtleTimer";

export default function Timer() {
  const [loopTime, setLoopTime] = useState("0:00");
  const [loopCycle, setLoopCycle] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [isShowEndModal, setIsShowEndModal] = useState(false);
  const deviceToken = useRecoilValue(token);
  const [endTime, setEndTime] = useState("");

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

  const { mutate: stopStretching } = useMutation(["stopStretching"], () => doneAlarm(deviceToken, endTime, loopCycle), {
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function handleStopStretching() {
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);

    let dateString = year + "-" + month + "-" + day;

    let hours = ("0" + today.getHours()).slice(-2);
    let minutes = ("0" + today.getMinutes()).slice(-2);
    let seconds = ("0" + today.getSeconds()).slice(-2);

    let timeString = hours + ":" + minutes + ":" + seconds;

    setEndTime(dateString + " " + timeString);
    setIsShowEndModal(true);
    stopStretching();

    console.log("ddd");
  }

  function handleShowStrech() {
    setIsShow(true);
  }

  function handleCloseStrech() {
    setIsShow(false);
  }

  return (
    <>
      {isShow && (
        <Modal handleClickSingleButton={handleCloseStrech}>
          <ModalWrapper>
            <ModalTitle>스트레칭 방법</ModalTitle>
            <ModalSub>스트레칭이 어렵다면 그림을 따라해봐요!</ModalSub>
            <img src={stretch} alt="스트레칭 그림" />
          </ModalWrapper>
        </Modal>
      )}
      {isShowEndModal && (
        <Modal handleClickSingleButton={() => window.location.reload()}>
          <ModalWrapper>
            <ModalTitle>스트레칭 끝 !</ModalTitle>
            <ModalSub>총 {loopCycle - 2}번을 하셨습니다!</ModalSub>
            <ModalContent>타이머 주기 : {loopTime.split(":")[0]}분</ModalContent>
            <TurtleIcon />
          </ModalWrapper>
        </Modal>
      )}
      <TurtledHeader />
      <ShowStrechIcon onClick={handleShowStrech} />
      <TimerWrapper>
        <Title>{loopCycle === 0 ? <>몇 분 주기로 알림 받으실래요?</> : <>부지런히..하다보면 언젠가는..!</>}</Title>
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
    </>
  );
}

const TurtleIcon = styled(TurtleIc)`
  width: 25rem;
  height: 25rem;
`;

const ModalContent = styled.p`
  ${({ theme }) => theme.fonts.content};
`;

const ModalWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.h1`
  ${({ theme }) => theme.fonts.title};
`;

const ModalSub = styled.p`
  ${({ theme }) => theme.fonts.sub};
`;

const ShowStrechIcon = styled(ShowStrechIc)`
  position: absolute;
  z-index: 5;
  top: 22rem;
  right: 5rem;
`;

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
