import styled from "styled-components";
import { TurtleIc } from "../assets";

export default function Loading() {
  return (
    <Background>
      <LoadingImage />
      <LoadingText>Loading</LoadingText>
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;

  background-color: rgb(0 0 0 / 40%);
  flex-direction: column;
`;

const LoadingImage = styled(TurtleIc)`
  z-index: 10;
  height: 20rem;

  animation: rotate 3s ease-out;
  animation-iteration-count: infinite;

  @keyframes rotate {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.strong`
  color: white;

  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 108%;
  margin-top: -4rem;
`;
