import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import HeaderMobile from "../components/HeaderMobile";
import SideNavigation from "../components/SideNavigation";
import Post from "../components/Post";
import { Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import { isNavigateOpenState } from "../states/mainState";

const Main = () => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("xs"));
  const isDeskop = useMediaQuery(theme.breakpoints.up("lg"));
  const [isNavigateOpen, setIsNavigateOpen] =
    useRecoilState(isNavigateOpenState);
  const [navigateWidth, setNavigateWidth] = useState(0);
  const [anchorWidth, setAnchoreWidth] = useState(0);

  useEffect(() => {
    isNavigateOpen ? setNavigateWidth(180) : setNavigateWidth(0);
    isDeskop ? setAnchoreWidth(300) : setAnchoreWidth(0);
  }, [isNavigateOpen, isDeskop]);

  return (
    <Stack
      sx={{
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "background.main",
      }}>
      <Stack direction="row" height="100%">
        {isNavigateOpen && <SideNavigation />}
        {isPhone ? <HeaderMobile /> : <Header />}
        {/* <Post /> */}
        <Stack
          margin={`80px ${40 + anchorWidth}px 84px ${40 + navigateWidth}px`}
          width="100%"
          height="100%"
          color="white"
          bgcolor="white">
          asdfadsfds
        </Stack>
        {isDeskop && (
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
