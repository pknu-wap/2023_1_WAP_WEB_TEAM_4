import { Alert, Snackbar } from "@mui/material";
import React from "react";

const Toast = (open, setOpen, message) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen && setOpen(false)}
    >
      <Alert
        onClose={() => setOpen && setOpen(false)}
        severity="error"
        variant=""
        sx={{ color: "white", width: "100%", backgroundColor: "red" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
