import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      backgroundColor: {
        main: "#F97B22"  //Beaver Orange
      },

      headingColor: {
        main: "#FFFFFF"
      },

      boxColor: {
        main: "#0d1b2a"
      },

      sidebarColor: {
        main: "#0d1b2a"
      },

      shadowColor: {
        main: "#000000"
      },

      grey: {
        
      500: "#000000",
        
      },
      primary: {
        
      500: "#000000",
        
      },
      greenAccent: {
    
      600: "#1b263b", //background color
      },

    }
// Light Theme
// _______________________________________________________________________________________
    : {
      backgroundColor: {
        main: "#D73F09"  //Beaver Orange
      },

      headingColor: {
        main: "#000000",
      },

      boxColor: {
        main: "#FFFFFF"
      },

      sidebarColor: {
        main: "#FFFFFF"
      },

      shadowColor: {
        main: "#ECEFF1"
      },
      grey: {

        500: "#666666",
       
      },
      primary: {
        
        500: "#141b2d",
      },
      greenAccent: {

        500: "#4cceac",
        600: "#70d8bd",
        
      },
    }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            main: colors.primary[500],
          },

          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.greenAccent[100],
          },
          background: {
            default: colors.greenAccent[600],
          },
        }
        : {
          // palette values for light mode
          primary: {
            main: colors.primary[500],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: "#fcfcfc",
          },
        }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
        textShadow: `3px 0px 0px ${colors.shadowColor.main}`,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 50,
        textShadow: `4px 0px 2px ${colors.shadowColor.main}`,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
        textShadow: `2px 1px 2px ${colors.shadowColor.main}`,

      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
        textShadow: `2px 1px 2px ${colors.shadowColor.main}`,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 25,
        textShadow: `2px 1px 2px ${colors.shadowColor.main}`,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
        textShadow: `2px 1px 2px ${colors.shadowColor.main}`,
      },
    }
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => { },
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
