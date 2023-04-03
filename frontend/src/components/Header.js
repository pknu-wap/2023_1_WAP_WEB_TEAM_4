import { Stack, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Stack position="fixed" padding="10px 0px 10px 20px" bgcolor="black">
      <Stack
        sx={{
          cursor: "pointer",
        }}
        onClick={() => navigate("/home")}
        width="100%"
        fontWeight="bold"
        color="#ECD8A4"
        fontSize="40px">
        GLOG
      </Stack>
      <Button
        size="small"
        disableRipple
        onClick={() => navigate("/")}
        sx={{
          height: "30px",
          marginTop: "-5px",
          marginLeft: "-3px",
          color: "#EED083",
          ":hover": {
            color: "#F1C040",
          },
        }}>
        CHAEYEON'S BLOG
      </Button>
    </Stack>
  );
};

export default Header;
