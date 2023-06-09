import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

export const isNavigateOpenState = atom({
  key: "isNavigateOpen",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
