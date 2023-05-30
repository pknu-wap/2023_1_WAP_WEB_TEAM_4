import { atom } from "recoil";

export const postState = atom({
  key: "post",
  default: "#### asdfasdfasdf",
});
export const titleState = atom({
  key: "title",
  default: "123",
});

export const sectionsState = atom({
  key: "sections",
  default: [],
});
