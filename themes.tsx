import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useThemeColorContext } from "./context/ColorModeContext";

export enum themePalette {
  BLACK = "#000000",
  PINK = "#f4326b",
  WHITE = "#FFFFFF",
  GREEN = "#19bc5f",
  PURPLE = "#8031a2",
  YELLOW = "#feb829",
  GREY = "#a5b1c2",
  GREY2 = "#95a5a6",
  BLUE = "#273c75",
  LIGHTBLUE = "#26B8E9",
  FONT_GLOBAL = "'Noto Sans JP', sans-serif",
}

const ThemeContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { mode } = useThemeColorContext();

  const theme = createTheme({
    palette: {
      mode: mode as "light" | "dark",
      ...(mode === "dark"
        ? {
            //Palette color DARK
            primary: {
              main: themePalette.PINK,
            },
            secondary: {
              main: themePalette.GREEN,
            },
            //Color de texto y de navbar
            text: {
              primary: themePalette.WHITE,
            },
          }
        : {
            //Palette color LIGHT
            primary: {
              main: themePalette.LIGHTBLUE,
            },
            secondary: {
              main: themePalette.YELLOW,
            },
            text: {
              primary: themePalette.BLACK,
            },
          }),
    },
    typography: {
      fontFamily: themePalette.FONT_GLOBAL,
      fontSize: 18,
    },
    components: {
      MuiButton: {
        defaultProps: {
          style: {
            textTransform: "none",
            width: "180px",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: mode === "light" ? themePalette.GREY2 : "",
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: "#ee2e2e",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeContext;
