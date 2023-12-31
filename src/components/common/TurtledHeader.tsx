import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NotificationIc } from "../../assets";
import Header from "./Header";

export default function TurtledHeader() {
  const [isExist, setIsExist] = useState(true);
  const navigate = useNavigate();
  function handleMoveToHome() {
    navigate("/home");
  }
  return (
    <Header>
      <Div onClick={handleMoveToHome}>
        <MainColor>T</MainColor>
        <h1>urtled</h1>
      </Div>
      {isExist && <Circle />}
      <NotificationIcon />
    </Header>
  );
}

const Div = styled.div`
  display: flex;
`;
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
