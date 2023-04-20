import { createTheme } from "@mui/material";
import { gray, mint } from "./color";

export const lightTheme = createTheme({
  breakpoints: {
    values: {
      xl: 1920,
      lg: 1440,
      md: 900,
      sm: 600,
      xs: 375,
    },
  },
  spacing: 4,
  palette: {
    mode: "light",
    primary: {
      light: mint[50],
      main: mint[500],
      dark: mint[600],
      mainHover: mint[600],
      mainActive: mint[700],
      lightHover: mint[100],
      lightActive: mint[200],
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
    background: {
      main: "#f5f5f5",
      color: "black",
    },
    pointColor: {
      main: "#38AB9D",
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
  },
});
