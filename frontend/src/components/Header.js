import { Stack, Button, IconButton, useMediaQuery } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useRecoilState, useSetRecoilState } from "recoil";
import { searchOpenState, selectValueState } from "../states/homeState";
import MenuIcon from "@mui/icons-material/Menu";
import { isNavigateOpenState } from "../states/mainState";
import { useTheme } from "@mui/material/styles";

const Header = ({ isHome }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(searchOpenState);
  const setSelectValue = useSetRecoilState(selectValueState);
  const [isNavigateOpen, setIsNavigateOpen] =
    useRecoilState(isNavigateOpenState);
  return (
    <Stack
      position="fixed"
      width="100%"
      direction="row"
      alignItems="center"
      top={0}
      height="80px"
      justifyContent="space-between"
      bgcolor="header.background"
      zIndex={100}>
      <Stack direction="row" alignItems="center">
        {!isNavigateOpen && (
          <IconButton
            sx={{ color: "header.logo" }}
            onClick={() => setIsNavigateOpen(true)}>
            <MenuIcon />
          </IconButton>
        )}
        <Stack alignItems="flex-start" marginLeft="12px">
          <Stack
            sx={{
              cursor: "pointer",
              ":hover": {
                color: "header.logoHover",
              },
              ":active": {
                color: "header.logoActive",
              },
            }}
            onClick={() => navigate("/home")}
            fontWeight="bold"
            color="header.logo"
            fontSize="28px">
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
              color: "header.title",
              ":hover": {
                color: "header.titleHover",
              },
              ":active": {
                color: "header.titleActive",
              },
            }}>
            CHAEYEON'S BLOG
          </Button>
        </Stack>
      </Stack>
      <Stack marginRight="28px" direction="row" spacing={4} alignItems="center">
        <Button onClick={() => navigate("/register")}>회원가입</Button>
        <Button onClick={() => navigate("/login")}>로그인</Button>
        {isHome && (
          <IconButton
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              setSelectValue(0);
            }}>
            {isSearchOpen ? (
              <HomeIcon sx={{ color: "white" }} />
            ) : (
              <SearchIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        )}
        <Stack
          onClick={() => navigate("/mypage")}
          width="40px"
          height="40px"
          borderRadius="20px"
          bgcolor="white"
          sx={{ cursor: "pointer" }}
        />
      </Stack>
    </Stack>
  );
};

export default Header;
