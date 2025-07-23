// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import { Box } from "@mui/material";
import logo from "/assets/logo.svg";

const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none",
      }}
    >
      <Box component="img" src={logo} alt="Logo" width={45} height={45} />
    </Box>
  );
};

export default Logo;
