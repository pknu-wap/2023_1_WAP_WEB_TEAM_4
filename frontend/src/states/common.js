import { atom } from "recoil";

export const openSnackBarState = atom({
  key: "OpenSnackBar",
  default: false,
});

export const SnackBarAlertTypeState = atom({
  key: "SnackBarAlertType",
  default: undefined,
});

export const snackBarMessageState = atom({
  key: "SnackBarMessage",
  default: "",
});

export const snackBarDurationState = atom({
  key: "SnackBarDuration",
  default: 3000,
});

export const themeState = atom({
  key: "Theme",
  default: "DARK",
});

export const cookies = atom({
  key: "Cookies",
  default: "",
});
