import React from "react";
import Header from "../components/Header";
import SideNavigation from "../components/SideNavigation";
import Post from "../components/Post";
import { Stack, useMediaQuery } from "@mui/material";
import Anchor from "../components/Anchor";
import { useTheme } from "@mui/material/styles";

const Main = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack
      sx={{
        minHeight: "100%",
        backgroundColor: "background.main",
      }}>
      <Stack direction="row" height="100%">
        {!isTablet && <SideNavigation />}
        <Header />

        <Post />
      </Stack>
    </Stack>
  );
};

export default Main;
