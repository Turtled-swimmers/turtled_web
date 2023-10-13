import axios from "axios";
import { getCookie } from "./cookie";

export async function getLists(count: number) {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/challenges/list`, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${getCookie("accessToken")}`,
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbXkwNDgwQG5hdmVyLmNvbSIsImV4cCI6MTY5NzE5Mzc3Mn0.W61U2L-El6HsJIoCJ06IBsvdjFXDpN3eeI5-r3hFFjg`,
    },
  });
  console.log(data);

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
