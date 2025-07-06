// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import { Box, Typography, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        textAlign: "center",
        padding: 0.5,
        backgroundColor: theme.palette.secondary.main,
        boxShadow: theme.shadows[8],
      }}
    >
      <Typography variant="body2" color={theme.palette.text.primary}>
        © 2025 Ghayth Sabeaallil. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
