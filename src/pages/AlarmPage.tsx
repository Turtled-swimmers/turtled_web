import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { alarm } from "../atom/common/alram";
import Footer from "../components/common/Footer";
import { FOOTER_CATEGORY } from "../core/footerCategory";
import useFooterMove from "../hooks/useFooterMove";

export default function AlarmPage() {
  // 임시
  const { handleMoveToPage } = useFooterMove();
  useEffect(() => {
    handleMoveToPage(FOOTER_CATEGORY.profile);
  }, []);

  const [deviceToken, setDeviceToken] = useState("");
  const [isToggle, setIsToggle] = useRecoilState(alarm);

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
    import { useNavigate } from "react-router-dom";

    setDeviceToken(token);

    if (permission === "denied") {
      console.log("알림 권한 허용 안됨");
    }
  }

  useEffect(() => {
    // mutate(deviceToken);
    if (deviceToken) {
      setIsToggle(true);
    }
  }, [deviceToken]);

  function handleCopyClipBoard(token: string) {
    console.log(token);
    try {
      navigator.clipboard.writeText(token).then(() => {
        alert("클립보드에 토큰이 복사되었어요.");
      });
    } catch (err) {
      alert("링크 복사에 실패했습니다");
    }
  }

  const navigate = useNavigate();

  return (
    <>
      <Button type="button" onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
      <Button type="button" onClick={handleAllowAlarm}>
        알림 허용
      </Button>
      <Button type="button" onClick={() => handleCopyClipBoard(deviceToken)}>
        토큰 복사하기
      </Button>
      {deviceToken}
      <Footer />
    </>
  );
}

const Button = styled.button`
  border: 1px solid black;

  padding: 1rem;
  margin: 1rem;
`;
