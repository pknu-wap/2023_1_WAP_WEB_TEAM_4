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
        minHeight: "100%",
        backgroundColor: "background.main",
      }}>
      <Stack direction="row" height="100%">
        {isNavigateOpen && <SideNavigation />}
        <Header />
        <Post />
      </Stack>
    </Stack>
  );
};

export default Main;
