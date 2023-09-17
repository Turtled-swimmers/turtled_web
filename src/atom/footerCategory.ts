import { atom } from "recoil";
import { FOOTER } from "../core/footerCategory";

export const footerCategory = atom<FooterType[]>({
  key: "footerCategory",
  default: FOOTER,
});
