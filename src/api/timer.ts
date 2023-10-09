import axios from "axios";
import { getCookie } from "./cookie";

export async function postAlarm() {
  const data = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/timers/alarm`,
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

export async function doneAlarm(count: number) {
  const data = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/timers/done`,
    { count: count },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

  return data.data;
}
