import { Button, Stack } from "@mui/material";
import React from "react";

function SideButton({ label, onClick, sub }) {
  return (
    <Stack
      onClick={onClick}
      sx={{
        ":hover": { color: "primary.main", cursor: "pointer" },
        marginLeft: sub ? "8px" : "0px",
      }}>
      {label}
    </Stack>
  );
}

export default SideButton;
