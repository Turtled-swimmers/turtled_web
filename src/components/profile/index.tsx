import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getMypage, postDeviceToken, postDeviceTokenWithoutLogin } from "../../api/auth";
import { removeCookie } from "../../api/cookie";
import { OffAlarmIc, OnAlarmIc } from "../../assets";
import { token } from "../../atom/common/token";
import { isLogined } from "../../utils/join/isLogined";

export default function Profile() {
  const [deviceToken, setDeviceToken] = useRecoilState(token);
  const navigate = useNavigate();

  const { data: profile } = useQuery(["profile"], getMypage, {
    onError: (err) => {
      console.log(err);
    },
    enabled: !!isLogined(),
  });

  function handleMoveToMedal() {
    navigate("/medal");
  }

  function handleMoveToAlarm() {
    navigate("/alarm");
  }

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID,
    measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  function registerServiceWorker() {
    navigator.serviceWorker
      .register("firebase-messaging-sw.js")
      .then(function (registration) {
        console.log("Service Worker 등록 성공:", registration);
      })
      .catch(function (error) {
        console.log("Service Worker 등록 실패:", error);
      });
  }

  async function handleAllowAlarm() {
    const permission = await Notification.requestPermission();

    registerServiceWorker();

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
    });

    setDeviceToken(token);

    if (permission === "denied") {
      console.log("알림 권한 허용 안됨");
    }
  }

  const { mutate: postTokenWithoutLogin } = useMutation(["postDeviceTokenWithoutLogin"], postDeviceTokenWithoutLogin, {
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: postToken } = useMutation(["postDeviceToken"], postDeviceToken, {
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    if (deviceToken !== "" && deviceToken !== undefined) {
      if (isLogined()) {
        postToken(deviceToken);
      } else {
        postTokenWithoutLogin(deviceToken);
      }
    }
  }, [deviceToken]);

  function handleLogout() {
    removeCookie("accessToken", {});
    navigate("/");
  }

  return (
    <ProfileWrapper>
      {isLogined() ? (
        <Box isAlarm={true}>
          <NickName>{profile?.username}</NickName>
          <Email>{profile?.email}</Email>
        </Box>
      ) : (
        <Box isAlarm={false} onClick={() => navigate("/login")}>
          <NickName>로그인</NickName>
        </Box>
      )}

      <Box isAlarm={true} onClick={handleAllowAlarm}>
        <Content>알림 허용</Content>
        <div>{deviceToken ? <OnAlarmIc /> : <OffAlarmIc />}</div>
      </Box>
      {isLogined() && (
        <Box isAlarm={false}>
          <Content onClick={handleMoveToMedal}>메달</Content>
        </Box>
      )}

      <Box isAlarm={false}>
        <Content>버전 정보</Content>
        <Sub>0.0.1</Sub>
      </Box>
      <Box isAlarm={false}>
        <Content>문의하기</Content>
        <Sub>{profile?.support_email}</Sub>
      </Box>
      {/* <Box isAlarm={false} onClick={() => navigate("/login")}>
        <Content>로그인</Content>
      </Box>
      */}
      {isLogined() && (
        <Box isAlarm={false}>
          <Content onClick={handleLogout}>로그아웃</Content>
        </Box>
      )}
      {/* <Box isAlarm={false} onClick={handleMoveToAlarm}>
        <Content>디바이스 토큰 확인</Content>
      </Box> */}
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.section`
  margin-top: 3rem;
  margin-bottom: 15rem;
  overflow-y: scroll;
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
