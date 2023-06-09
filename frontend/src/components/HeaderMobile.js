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
import Jump from "react-reveal/Jump";
import { memberIdState } from "../states/loginState";

const HeaderMobile = ({ isHome, isMain }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [memberId, setMemberId] = useRecoilState(memberIdState);
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
      bgcolor="header.background"
      justifyContent="space-between"
      zIndex={200}>
      <Stack direction="row">
        {isMain && !isNavigateOpen && (
          <IconButton
            sx={{ color: "header.logo" }}
            onClick={() => setIsNavigateOpen(true)}>
            <MenuIcon />
          </IconButton>
        )}
        <Stack alignItems="flex-start" marginLeft="8px">
          <Jump>
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
          </Jump>
        </Stack>
      </Stack>
      <Stack direction="row">
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
        {memberId ? (
          <Button
            color={theme === "DARK" ? "primary" : "white"}
            onClick={() => {
              setMemberId(0);
              navigate("/login");
            }}>
            로그아웃
          </Button>
        ) : null}
        {memberId ? (
          <Button
            color={theme === "DARK" ? "primary" : "white"}
            onClick={() => navigate("/mypage")}>
            마이페이지
          </Button>
        ) : null}
        {!memberId && (
          <Button
            color={theme === "DARK" ? "primary" : "white"}
            onClick={() => navigate("/login")}>
            로그인
          </Button>
        )}
        {!memberId && (
          <Button
            color={theme === "DARK" ? "primary" : "white"}
            onClick={() => navigate("/register")}>
            회원가입
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default HeaderMobile;
