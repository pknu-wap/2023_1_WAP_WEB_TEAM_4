import { createTheme } from "@mui/material";
import { gray, mint, yellow } from "./color";

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
      light: "#000000",
      main: "#000000",
      dark: "#000000",
      mainHover: "#000000",
      mainActive: "#000000",
      lightHover: "#000000",
      lightActive: "#000000",
    },
    pointColor: {
      main: yellow[500],
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
    },
    sideNavigation: {
      background: "#000000",
      hover: "#C6E3CC",
      active: "#B5DBBC",
      pointColorTitle: yellow[300],
      pointColorContent: yellow[500],
    },
  },
});
