// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import { Box, Switch } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeModeContext } from "../../../shared/context/ThemeModeContext/ThemeModeContext";

export const SwitchMode = () => {
  const { colorMode, toggleColorMode } = useThemeModeContext();

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <LightModeIcon fontSize="medium" color="primary" />
      <Switch checked={colorMode === "dark"} onChange={toggleColorMode} />
      <DarkModeIcon fontSize="medium" color="primary" />
    </Box>
  );
};
