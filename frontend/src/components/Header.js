import { Stack, Button, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const Header = ({ isSearchOpen, setIsSearchOpen }) => {
  const navigate = useNavigate();

  return (
    <Stack
      position="fixed"
      padding="10px 0px"
      width="100%"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="black"
      zIndex={100}>
      <Stack alignItems="flex-start" marginLeft="20px">
        <Stack
          sx={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/home")}
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
      <Stack marginRight="28px" direction="row" spacing={4} alignItems="center">
        <IconButton onClick={() => setIsSearchOpen(!isSearchOpen)}>
          {isSearchOpen ? (
            <HomeIcon sx={{ color: "white" }} />
          ) : (
            <SearchIcon sx={{ color: "white" }} />
          )}
        </IconButton>
        <Stack
          width="40px"
          height="40px"
          borderRadius="20px"
          bgcolor="white"></Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
