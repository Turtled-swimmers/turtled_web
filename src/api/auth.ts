import axios from "axios";
import { getCookie } from "./cookie";

interface LoginType {
  email: string;
  password: string;
}

export async function login(formData: LoginType) {
  console.log("asdf");
  const data = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/login/local`,
    { userName: formData.email, password: formData.password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  console.log(data);

  return data.data.jwt.access_token;
}

interface SignupType {
  email: string;
  password: string;
  username: string;
  checked_password: string;
}

export async function signup(formData: SignupType) {
  const data = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/signup`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

export async function registerToken(token: string) {
  const data = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/register`,
    { token: token },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return data;
}

export async function getMypage() {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  return data.data;
}

export async function postDeviceToken(token: string) {
  const data = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/register`,
    { token: token },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

  return data;
}

export async function postDeviceTokenWithoutLogin(token: string) {
  const data = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/register/login`,
    { user_id: null, token: token },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
        token: token,
      },
    },
  );

  return data;
}
