import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { postDeviceToken, postDeviceTokenWithoutLogin } from "../api/auth";
import { token } from "../atom/common/token";
import Footer from "../components/common/Footer";
import Timer from "../components/timer";
import { FOOTER_CATEGORY } from "../core/footerCategory";
import useFooterMove from "../hooks/useFooterMove";
import { isLogined } from "../utils/join/isLogined";

export default function MainPage() {
  const { handleMoveToPage } = useFooterMove();
  useEffect(() => {
    handleMoveToPage(FOOTER_CATEGORY.streching);
  }, []);
  const [deviceToken, setDeviceToken] = useRecoilState(token);

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

  useEffect(() => {
    handleAllowAlarm();
  }, []);

  const { mutate: postTokenWithoutLogin } = useMutation(["postDeviceTokenWithoutLogin"], postDeviceTokenWithoutLogin, {
    onSuccess: (res) => {
      console.log("성공");
    },
    onError: (err) => {
      console.log("에러");
    },
  });

  const { mutate: postToken } = useMutation(["postDeviceToken"], postDeviceToken, {
    onSuccess: () => {
      console.log("성공");
    },
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

  return (
    <>
      <Timer />
      <Footer />
    </>
  );
}
