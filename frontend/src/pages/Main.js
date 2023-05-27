import React from "react";
import Header from "../components/Header";
import SideNavigation from "../components/SideNavigation";
import Post from "../components/Post";
import { Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import { isNavigateOpenState } from "../states/mainState";

const Main = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [isNavigateOpen, setIsNavigateOpen] =
    useRecoilState(isNavigateOpenState);

  return (
    <Stack
      sx={{
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "background.main",
      }}>
      <Stack direction="row" height="100%">
        {isNavigateOpen && <SideNavigation />}
        <Header />
        {/* <Post /> */}
        <Stack p="80px 40px 84px 254px" bgcolor="white"></Stack>
        {!isTablet && (
          <Stack
            marginTop="14%"
            justifyContent="center"
            overflow="scroll"
            bgcolor="red"
            style={{
              maxHeight: "400px",
              height: "100%",
              maxWidth: "200px",
              width: "100%",
              position: "fixed",
              top: 0,
              right: 100,
            }}></Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Main;
