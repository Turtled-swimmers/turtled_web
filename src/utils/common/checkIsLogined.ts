import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string | undefined, options: object) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string, options: object) => {
  return cookies.remove(name);
};

export function checkIsLogin() {
  return getCookie("accessToken") !== undefined;
}

export function checkIsCookieNull() {
  return getCookie("accessToken") === null;
}

export function checkIsCookieAuthenticated() {
  return getCookie("accessToken") === "false";
}
