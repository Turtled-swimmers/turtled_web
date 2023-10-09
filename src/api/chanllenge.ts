import axios from "axios";
import { getCookie } from "./cookie";

export async function getLists(count: number) {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/challenges/list`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  return data.data;
}

export async function getDaysData(date: string) {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/challenges/history/details`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
      date: date,
    },
  });

  return data.data;
}

export async function getMonthData(date: string) {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/challenges/history`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
      current_month: date,
    },
  });

  return data.data;
}
