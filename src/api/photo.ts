import axios from "axios";
import { getCookie } from "./cookie";

export async function uploadPhoto(formData: File | null) {
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
