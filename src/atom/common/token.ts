import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const token = atom<string>({
  key: "token",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
