import { getCookie } from "../../api/cookie";

export function isLogin() {
  return getCookie("accessToken") !== undefined;
}

export function isCookieNull() {
  return getCookie("accessToken") === null;
}

export function isCookieAuthenticated() {
  return getCookie("accessToken") === "false";
}

export function isLogined() {
  return isLogin() && !isCookieNull();
}

export function blockAccess(): any {
  // 인증이 반드시 필요한 페이지
  // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로
  (!isLogin() || isCookieNull()) &&
    alert("Please use this function after logging in.\n해당 기능은 로그인 후 이용해주세요.");
  return (!isLogin() || isCookieNull()) && true;
}
