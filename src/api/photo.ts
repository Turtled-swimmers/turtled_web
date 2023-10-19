import axios from "axios";
import { getCookie } from "./cookie";

export async function uploadPhoto() {
  const data = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/predict/upload`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

  return data.data;
}
