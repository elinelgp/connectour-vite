// src/providers/MuiProviders.tsx
import { CssBaseline } from "@mui/joy";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import {
  THEME_ID as MATERIAL_THEME_ID,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
} from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { themeJoy, themeMui } from "../core/theme";

export function MuiProviders({ children }: { children: React.ReactNode }) {
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: themeMui }}>
      <JoyCssVarsProvider theme={themeJoy}>
        <SnackbarProvider>
          <CssBaseline enableColorScheme />
          {children}
        </SnackbarProvider>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}
