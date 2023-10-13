import axios from "axios";
import { getCookie } from "./cookie";

export async function postAlarm(token: string, cycle: number, start: string) {
  console.log("post alarm");
  const data = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/timers/alarm`,
    {
      device_token: token,
      repeat_cycle: cycle,
      start_time: start,
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

export async function doneAlarm(token: string, end: string, count: number) {
  console.log("done alarm");
  const data = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/timers/done`,
    {
      device_token: token,
      end_time: end,
      count: count,
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
