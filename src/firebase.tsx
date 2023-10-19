// // //firebase.js
// // import firebase from "firebase/compat/app";
// // import "firebase/compat/firestore";

// // const firebaseConfig = {
// //   // firebase 설정과 관련된 개인 정보 apiKey: import.meta.env.VITE_APP_API_KEY,
// //   authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
// //   projectId: import.meta.env.VITE_APP_PROJECT_ID,
// //   storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
// //   messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
// //   appId: import.meta.env.VITE_APP_APP_ID,
// //   measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
// // };

// // // firebaseConfig 정보로 firebase 시작
// // firebase.initializeApp(firebaseConfig);

// // // firebase의 firestore 인스턴스를 변수에 저장
// // const firestore = firebase.firestore();

// // // 필요한 곳에서 사용할 수 있도록 내보내기
// // // 다른 곳에서 불러올때 firestore로 불러와야 함!!
// // export { firestore };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const {
//   VITE_APP_API_KEY,
//   VITE_APP_AUTH_DOMAIN,
//   VITE_APP_PROJECT_ID,
//   VITE_APP_STORAGE_BUKET,
//   VITE_APP_MESSAGING_SENDER_ID,
//   VITE_APP_APP_ID,
// } = import.meta.env;

// const firebaseConfig = {
//   apiKey: VITE_APP_API_KEY,
//   authDomain: VITE_APP_AUTH_DOMAIN,
//   projectId: VITE_APP_PROJECT_ID,
//   storageBucket: VITE_APP_STORAGE_BUKET,
//   messagingSenderId: VITE_APP_MESSAGING_SENDER_ID,
//   appId: VITE_APP_APP_ID,
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);
// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const authService = getAuth(app);

// // firestore 공유
// export const dbService = getFirestore();

// // storage 공유
// export const storageService = getStorage();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  // firebase 설정과 관련된 개인 정보
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

// firebaseConfig 정보로 firebase 시작
const app = initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const db = getFirestore(app);
