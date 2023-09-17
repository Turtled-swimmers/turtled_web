import { useState } from "react";
import styled from "styled-components";
import { NotificationIc } from "../../assets";
import Header from "./Header";

export default function TurtledHeader() {
  const [isExist, setIsExist] = useState(true);

  return (
    <Header>
      <MainColor>T</MainColor>
      <h1>urtled</h1>
      {isExist && <Circle />}
      <NotificationIcon />
    </Header>
  );
}

const MainColor = styled.h1`
  color: ${({ theme }) => theme.colors.green};
`;

const NotificationIcon = styled(NotificationIc)`
  position: absolute;
  right: 4rem;
  width: 2rem;
`;

const Circle = styled.div`
  display: flex;
  width: 1rem;
  height: 1rem;
  padding: 0.6rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
  border-radius: 2rem;
  background: #98cdb3;

  position: absolute;
  z-index: 2;
  right: 3.5rem;
  margin-top: -1.5rem;
`;
