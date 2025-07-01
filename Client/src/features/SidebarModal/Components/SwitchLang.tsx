// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import { Box, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

export const SwitchLang = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<{ value: unknown }>
      | any
  ) => {
    const value = event.target.value;
    i18n.changeLanguage(value as string);
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Select
        value={i18n.language}
        onChange={handleLanguageChange}
        size="small"
        variant="outlined"
        sx={{ minWidth: 80, letterSpacing: 0, fontSize: 22, fontWeight: 500 }}
      >
        <MenuItem value="ar">العربية</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
    </Box>
  );
};
