import React from "react";
import Header from "../components/Header";
import SideNavigation from "../components/SideNavigation";
import Post from "../components/Post";
import { Stack } from "@mui/material";
import Anchor from "../components/Anchor";

const Main = () => {
  return (
    <Stack style={{ width: "100%", height: "100%" }}>
      <Stack direction="row" height="100%">
        <SideNavigation />
        <Header />
        <Stack alignItems="center" width="100%" padding="80px 20px 84px 100px">
          <Post />
          <Anchor />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Main;
