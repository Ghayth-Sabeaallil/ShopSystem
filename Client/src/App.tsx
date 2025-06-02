import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import {
  ThemeModeProvider,
  useThemeModeContext,
} from "./shared/context/ThemeModeContext";
import theme from "./theme/theme";
import Sidebar from "./features/sideBar/Sidebar";

function App() {
  return (
    <ThemeModeProvider>
      <AppWithTheme />
    </ThemeModeProvider>
  );
}

export default App;

function AppWithTheme() {
  const { colorMode } = useThemeModeContext();
  const muiTheme = useMemo(() => theme(colorMode), [colorMode]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box display="flex">
        <Sidebar />
      </Box>
    </ThemeProvider>
  );
}
