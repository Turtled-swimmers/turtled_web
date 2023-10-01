import { useRecoilState } from "recoil";
import styled from "styled-components";
import { OffAlarmIc, OnAlarmIc } from "../../assets";
import { alarm } from "../../atom/common/alram";

export default function Profile() {
  const [isToggle, setIsToggle] = useRecoilState(alarm);

  function handleToggle() {
    setIsToggle((it) => !it);
  }

  return (
    <ProfileWrapper>
      <Box isAlarm={true}>
        <NickName>Swimmers</NickName>
        <Email>email@naver.com</Email>
      </Box>
      <Box isAlarm={true}>
        <Content>알림 허용</Content>
        <div onClick={handleToggle}>{isToggle ? <OnAlarmIc /> : <OffAlarmIc />}</div>
      </Box>
      <Box isAlarm={false}>
        <Content>버전 정보</Content>
        <Sub>0.0.1</Sub>
      </Box>
      <Box isAlarm={false}>
        <Content>문의하기</Content>
        <Sub>turtled@gmail.com</Sub>
      </Box>
      <Box isAlarm={false}>
        <Content>로그아웃</Content>
      </Box>
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.section`
  margin-top: 3rem;
`;

const Box = styled.div<{ isAlarm: boolean }>`
  display: flex;
  flex-direction: ${({ isAlarm }) => (isAlarm ? "row" : "column")};
  justify-content: ${({ isAlarm }) => isAlarm && "space-between"};
  margin: 0 2rem;
  padding: 2rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray1};
`;

const Content = styled.h1`
  ${({ theme }) => theme.fonts.content}
`;

const Sub = styled.p`
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.caption};
`;

const NickName = styled.h1`
  ${({ theme }) => theme.fonts.title}
`;

const Email = styled.h1`
  ${({ theme }) => theme.fonts.sub}
  margin-left: 1rem;
  color: ${({ theme }) => theme.colors.gray1};
`;
