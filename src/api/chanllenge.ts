import axios from "axios";
import { getCookie } from "./cookie";

export async function getLists() {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/challenges/list`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  // console.log(data);

  return data.data;
}

export async function getDaysData(date: string) {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/challenges/history/detail/${date}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
      // current_date: date,
    },
  });

  return data.data;
}

export async function getMonthData(date: string) {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/challenges/history/${date}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
      current_month: date,
    },
  });

  return data.data;
}
