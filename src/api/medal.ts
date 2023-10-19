import axios from "axios";
import { getCookie } from "./cookie";

export async function getMedal() {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/profile/medal`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  return data.data;
}
