import { atom } from "recoil";

// export const postState = atom({
//   key: "post",
//   default: "",
// });
// export const titleState = atom({
//   key: "title",
//   default: "",
// });
export const postState = atom({
  key: "post",
  default: "#### asdfsafasdf ### asdfasdfasdf",
});
export const titleState = atom({
  key: "title",
  default: "Title",
});

export const sectionsState = atom({
  key: "sections",
  default: [],
});
