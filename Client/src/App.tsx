import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import {
  ThemeModeProvider,
  useThemeModeContext,
} from "./shared/context/ThemeModeContext/ThemeModeContext";
import theme from "./theme/theme";
import Sidebar from "./features/sideBar/Sidebar";
import LoginPage from "./features/loginPage/LoginPage";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "./shared/context/Context/AuthContext ";
import { ProductsProvider } from "./shared/context/Context/ProductContext";
import Cashier from "./features/Cashier/Cashier";

function App() {
  return (
    <ThemeModeProvider>
      <AuthProvider>
        <ProductsProvider>
          <AppWithTheme />
        </ProductsProvider>
      </AuthProvider>
    </ThemeModeProvider>
  );
}

export default App;

function AppWithTheme() {
  const { colorMode } = useThemeModeContext();
  const muiTheme = useMemo(() => theme(colorMode), [colorMode]);
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // ⏳ show while verifying auth
  }
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Box sx={{ display: "flex" }}>
                  <Sidebar />
                  <Cashier />
                </Box>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
