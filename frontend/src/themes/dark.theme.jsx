import { createTheme } from "@mui/material";
import { gray, mint } from "./color";

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
      light: "black",
      main: "black",
      dark: "black",
      mainHover: "black",
      mainActive: "black",
      lightHover: "black",
      lightActive: "black",
    },
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
});
