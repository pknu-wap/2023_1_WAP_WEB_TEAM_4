import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

export const memberIdState = atom({
  key: "memberId",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const nicknameState = atom({
  key: "nickname",
  default: "",
});

export const profileImageState = atom({
  key: "profileImage",
  default: "",
});

export const blogUrlState = atom({
  key: "blogUrl",
  default: "",
});
