import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

export const themeState = atom({
  key: "Theme",
  default: "DARK",
  effects_UNSTABLE: [persistAtom],
});

export const visitIdState = atom({
  key: "visitId",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
