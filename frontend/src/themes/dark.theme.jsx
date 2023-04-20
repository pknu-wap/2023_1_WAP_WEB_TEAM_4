import { createTheme } from "@mui/material";
import { darkYellow, gray, mint, yellow } from "./color";

export const darkTheme = createTheme({
  breakpoints: {
    values: {
      xl: 1920,
      lg: 1440,
      md: 900,
      sm: 600,
      xs: 375,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        select: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                border: `1px solid ${theme?.palette.primary.main}`,
              },
            },
          },
        },
      }),
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiRadio: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },

  spacing: 4,
  palette: {
    mode: "dark",
    primary: {
      light: yellow[300],
      main: darkYellow[300],
      mainHover: darkYellow[400],
      mainActive: darkYellow[500],
      buttonColor: darkYellow[600],
      200: darkYellow[200],
      100: yellow[100],

      dark: darkYellow[600],
      lightHover: yellow[100],
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
      hover: "#C6E3CC",
      active: "#B5DBBC",
      pointColorTitle: darkYellow[400],
      pointColorContent: yellow[500],
    },
  },
});
