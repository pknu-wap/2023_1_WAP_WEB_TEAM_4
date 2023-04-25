import { atom } from "recoil";

export const postState = atom({
  key: "post",
  default: "",
});
export const titleState = atom({
  key: "title",
  default: "",
});

export const sectionsState = atom({
  key: "sections",
  default: [],
});
