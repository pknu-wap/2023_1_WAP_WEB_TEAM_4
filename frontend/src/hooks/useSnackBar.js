import { useState } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useRecoilState } from "recoil";
import {
  openSnackBarState,
  SnackBarAlertTypeState,
  snackBarDurationState,
  snackBarMessageState,
} from "../states/common";

export const useSnackBar = () => {
  const [isOpen, setIsOpen] = useRecoilState(openSnackBarState);
  const [type, setType] = useRecoilState(SnackBarAlertTypeState);

  const [message, setMessage] = useRecoilState(snackBarMessageState);
  const [duration, setDuration] = useRecoilState(snackBarDurationState);
  const [onClose, setOnClose] = useState();

  const openSnackBar = ({ message, duration = 3000, type, onClose }) => {
    setIsOpen(true);
    setMessage(message);
    setDuration(duration);
    setType(type);
    setOnClose(onClose);
  };

  const closeSnackBar = () => {
    setIsOpen(false);
    setMessage("");
    setDuration(3000);
    setType(undefined);
    setOnClose(undefined);
  };

  const CustomSnackbar = () => (
    <Snackbar
      //   anchorOrigin={{ vertical: "top", horizontal: "left" }}
      open={true}
      autoHideDuration={3000}
      sx={{ boxShadow: 1, width: "500px", backgroundColor: "red" }}
    >
      <Alert severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );

  return { openSnackBar, closeSnackBar, CustomSnackbar };
};
