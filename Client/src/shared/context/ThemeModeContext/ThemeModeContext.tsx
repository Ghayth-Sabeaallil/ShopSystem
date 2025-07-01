// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ThemeContextType = {
  colorMode: "light" | "dark";
  toggleColorMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeModeProviderProps = {
  children: ReactNode;
};

export const ThemeModeProvider = ({ children }: ThemeModeProviderProps) => {
  const [colorMode, setColorMode] = useState<"light" | "dark">("dark");

  const toggleColorMode = () => {
    const newMode = colorMode === "dark" ? "light" : "dark";
    setColorMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  useEffect(() => {
    const stored = localStorage.getItem("themeMode");
    if (stored === "light" || stored === "dark") {
      setColorMode(stored);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeModeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a CustomThemeProvider");
  }
  return context;
};
