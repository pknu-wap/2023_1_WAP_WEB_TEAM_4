import { Stack, useMediaQuery } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import { isNavigateOpenState } from "../states/mainState";
import SideNavigation from "./SideNavigation";
import Header from "./Header";
import HeaderMobile from "./HeaderMobile";
const Layout = ({ children, isMain, isHome }) => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDeskop = useMediaQuery(theme.breakpoints.up("lg"));
  const [isNavigateOpen, setIsNavigateOpen] =
    useRecoilState(isNavigateOpenState);

  return (
    <Stack
      height="100%"
      minHeight="100vh"
      width="100%"
      backgroundColor="background.main">
      {isPhone ? (
        <HeaderMobile isMain={isMain} isHome={isHome} />
      ) : (
        <Header isMain={isMain} isHome={isHome} />
      )}
      <Stack direction="row" width="100%" height="100%" paddingTop="80px">
        {children}
      </Stack>
    </Stack>
  );
};

export default Layout;
