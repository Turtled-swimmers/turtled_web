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

export async function checkMedal(id: string, token: string) {
  console.log(id);
  console.log(token);
  const data = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/challenges/check_medal`,
    {
      medal_id: id,
      device_token: token,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

  return data.data;
}

export async function changeMedal(id: string, token: string) {
  const data = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/challenges/change_medal`,
    {
      medal_id: id,
      device_token: token,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

  return data.data;
}
