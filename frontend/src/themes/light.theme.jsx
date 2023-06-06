import { createTheme } from "@mui/material";
import { gray, mint } from "./color";

export const lightTheme = createTheme({
  breakpoints: {
    values: {
      xl: 1920,
      lg: 1440,
      md: 900,
      sm: 600,
      xs: 460,
    },
  },
  spacing: 4,
  palette: {
    mode: "light",
    primary: {
      buttonColor: mint[500],
      700: mint[700],
      600: mint[600],
      500: mint[500],
      400: mint[400],
      300: mint[300],
      200: mint[200],
      100: mint[100],
    },
    gray: {
      light: gray[50],
      main: gray[500],
      dark: gray[600],
      mainHover: gray[600],
      mainActive: gray[700],
      lightHover: gray[100],
      lightActive: gray[200],
    },
    white: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#ffffff",
    },
    background: {
      main: "#f5f5f5",
      color: "black",
      contractColor: "#ffffff",
    },
    header: {
      background: "#38AB9D",
      logo: "#ffffff",
      logoHover: mint[200],
      logoActive: mint[300],
      title: "#ffffff",
      titleHover: mint[200],
      titleActive: mint[300],
    },
    sideNavigation: {
      background: "#e5e5e5",
      hover: "#C6E3CC",
      active: "#B5DBBC",
      pointColorTitle: mint[700],
      pointColorContent: mint[600],
    },
    text: {
      subColor: "#ffffff",
    },
  },
});
