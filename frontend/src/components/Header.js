import { Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Stack
      bgcolor="black"
      sx={{
        cursor: "pointer",
      }}
      onClick={() => navigate("/")}
      width="100%"
      fontWeight="bold"
      color="#ECD8A4"
      fontSize="30px"
      position="fixed"
      padding="10px 0px 10px 20px">
      GLOG
    </Stack>
  );
};

export default Header;
