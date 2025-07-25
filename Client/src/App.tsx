// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import {
  Box,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
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
import SellCharts from "./features/SellCharts/SellCharts";
import { ReceiptsProvider } from "./shared/context/Context/ReceiptContext";
import Footer from "./features/Footer/Footer";

function App() {
  return (
    <ThemeModeProvider>
      <AuthProvider>
        <ProductsProvider>
          <ReceiptsProvider>
            <AppWithTheme />
          </ReceiptsProvider>
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
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={"4rem"} />
      </Box>
    );
  }
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter basename="/ShopSystem">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,

                    alignItems: "center",
                    paddingRight: 2,
                  }}
                >
                  <Sidebar />
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      width: "100%",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                      }}
                    >
                      <Cashier />
                      <SellCharts />
                    </Box>
                    <Footer />
                  </Box>
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
