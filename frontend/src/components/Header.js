import {
  Stack,
  Button,
  IconButton,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { searchOpenState, selectValueState } from "../states/homeState";
import MenuIcon from "@mui/icons-material/Menu";
import { isNavigateOpenState } from "../states/mainState";
import { useTheme } from "@mui/material/styles";
import { GetLogoutApi } from "../apis/api/common-api";
import { memberIdState } from "../states/loginState";
import { loadingState, themeState, visitIdState } from "../states/common";
import Jump from "react-reveal/Jump";
import { useGetMypageQuery } from "../apis/api/mypage-api";

const Header = ({ isHome, isMain }) => {
  const navigate = useNavigate();
  const themes = useTheme();
  const theme = useRecoilValue(themeState);
  const isMobile = useMediaQuery(themes.breakpoints.down("xs"));
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(searchOpenState);
  const setSelectValue = useSetRecoilState(selectValueState);
  const [isNavigateOpen, setIsNavigateOpen] =
    useRecoilState(isNavigateOpenState);
  const [visitId, setVisitId] = useRecoilState(visitIdState);
  const { data } = useGetMypageQuery({ loginedMemberId: memberId });
  const [loading, setLoading] = useRecoilState(loadingState);

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
      zIndex={200}>
      <Stack direction="row" alignItems="center">
        {isMain && !isNavigateOpen && (
          <IconButton
            sx={{ color: "header.logo" }}
            onClick={() => setIsNavigateOpen(true)}>
            <MenuIcon />
          </IconButton>
        )}
        <Stack alignItems="flex-start" marginLeft="12px">
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
              fontSize="32px">
              {/* GLOG */}
              <Stack fontFamily="Glog">GLOG</Stack>
            </Stack>
          </Jump>
        </Stack>
      </Stack>
      <Stack marginRight="28px" direction="row" spacing={4} alignItems="center">
        {loading && <CircularProgress color="white" />}
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
        {memberId ? (
          data?.profileImage ? (
            <img
              src={data?.profileImage}
              onClick={() => {
                navigate("/");
                setVisitId(0);
              }}
              alt="User_Picture"
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            />
          ) : (
            <Stack
              onClick={() => {
                navigate("/");
                setVisitId(0);
              }}
              width="40px"
              height="40px"
              borderRadius="20px"
              sx={{ cursor: "pointer", backgroundColor: "#ffffff" }}
            />
          )
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};

export default Header;
