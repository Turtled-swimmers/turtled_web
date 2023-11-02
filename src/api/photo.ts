import axios from "axios";
import { getCookie } from "./cookie";

// 로그인ㅇ
export async function uploadPhoto(formData: File | null) {
  console.log(formData);
  const data = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/predicts/user_upload`,
    { servey_video: formData },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

  return data.data;
}

// 로그인x
export async function uploadPhotoWithoutLogin(formData: File | null) {
  console.log(formData);
  const data = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/predicts/upload`,
    { servey_video: formData },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

  return data.data;
}

export async function getHistory() {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/predicts/predict_history`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  // console.log(data);
  return data.data;
}

export async function getHistoryDetail(id: string) {
  const data = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/predicts/predict_history_detail`,
    {
      record_id: id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );
  console.log(data);
  return data.data;
}
