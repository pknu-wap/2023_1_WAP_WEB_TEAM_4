import { atom } from "recoil";

export const searchOpenState = atom({
  key: "searchOpen",
  default: false,
});

export const selectValueState = atom({
  key: "selectValue",
  default: 0,
});
