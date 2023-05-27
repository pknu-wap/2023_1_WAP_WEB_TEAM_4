import { createTheme } from "@mui/material";
import { darkYellow, gray, yellow } from "./color";

export const darkTheme = createTheme({
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
    mode: "dark",
    primary: {
      buttonColor: darkYellow[600],

      700: darkYellow[700],
      600: darkYellow[600],
      500: yellow[500],
      400: yellow[400],
      300: yellow[300],
      200: darkYellow[200],
      100: darkYellow[100],
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
      main: "black",
      color: "white",
      contractColor: "#000000",
    },
    header: {
      background: "#000000",
      logo: yellow[500],
      logoHover: yellow[600],
      logoActive: yellow[700],
      title: darkYellow[500],
      titleHover: darkYellow[600],
      titleActive: darkYellow[700],
    },
    sideNavigation: {
      background: "#000000",
      hover: yellow[600],
      active: yellow[700],
      pointColorTitle: darkYellow[400],
      pointColorContent: yellow[500],
    },
  },
});
