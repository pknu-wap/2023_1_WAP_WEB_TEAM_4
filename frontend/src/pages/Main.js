import React from "react";
import Header from "../components/Header";
import SideNavigation from "../components/SideNavigation";
import Post from "../components/Post";
import { Stack, useMediaQuery } from "@mui/material";
import Anchor from "../components/Anchor";
import { useTheme } from "@mui/material/styles";

const Main = () => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  console.log(isTablet);
  return (
    <Stack style={{ width: "100%", height: "100%" }}>
      <Stack direction="row" height="100%">
        {!isTablet && <SideNavigation />}
        <Header />
        <Stack alignItems="center" width="100%" padding="80px 40px 84px 254px">
          <Post />
          {!isLg && <Anchor />}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Main;
