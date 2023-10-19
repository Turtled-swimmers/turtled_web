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

  background-color: white;
  flex-direction: column;
`;

const LoadingImage = styled(TurtleIc)`
  z-index: 10;
  height: 20rem;

  animation: rotate 1s ease-out;
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
  margin-top: -4rem;

  ${({ theme }) => theme.fonts.title};
`;
