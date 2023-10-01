import { atom } from "recoil";

export const alarm = atom<boolean>({
  key: "alarm",
  default: false,
});
