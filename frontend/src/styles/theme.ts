import { createTheme, PaletteMode, ThemeOptions } from "@mui/material"
import IndieFlower from "/fonts/IndieFlower-Regular.ttf"

const opts = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode: mode,
    primary: {
      main: "#7E4274",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: 'IndieFlower',
    fontSize: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        }
      }
    },
  }
})

export function createCustomTheme(mode: PaletteMode) {
  return createTheme(opts(mode))
}
