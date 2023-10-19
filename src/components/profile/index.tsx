import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getMypage } from "../../api/auth";
import { OffAlarmIc, OnAlarmIc } from "../../assets";
import { token } from "../../atom/common/token";

export default function Profile() {
  const [deviceToken, setDeviceToken] = useRecoilState(token);
  const navigate = useNavigate();

  const { data: profile } = useQuery(["profile"], getMypage, {
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function handleMoveToMedal() {
    navigate("/medal");
  }

  function handleMoveToAlarma() {
    navigate("/alarm");
  }

  return (
    <ProfileWrapper>
      <Box isAlarm={true}>
        <NickName>{profile?.username}</NickName>
        <Email>{profile?.email}</Email>
      </Box>
      <Box isAlarm={true}>
        <Content>알림 허용</Content>
        <div>{deviceToken ? <OnAlarmIc /> : <OffAlarmIc />}</div>
      </Box>
      <Box isAlarm={false}>
        <Content onClick={handleMoveToMedal}>메달</Content>
      </Box>
      <Box isAlarm={false}>
        <Content>버전 정보</Content>
        <Sub>0.0.1</Sub>
      </Box>
      <Box isAlarm={false}>
        <Content>문의하기</Content>
        <Sub>{profile?.support_email}</Sub>
      </Box>
      <Box isAlarm={false}>
        <Content>로그아웃</Content>
      </Box>
      <Box isAlarm={false} onClick={handleMoveToAlarm}>
        <Content>디바이스 토큰 확인</Content>
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
