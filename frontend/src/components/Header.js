import { Stack } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Stack
      bgcolor="black"
      style={{
        width: "100%",
        fontWeight: "bold",
        color: "#ECD8A4",
        fontSize: "30px",
        position: "fixed",
        padding: "10px 0px 10px 20px",
      }}>
      GLOG
    </Stack>
  );
};

export default Header;
