// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import { Box, Link, Typography, useTheme } from "@mui/material";

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
        © 2025{" "}
        <Link
          href="https://www.linkedin.com/in/ghayth-sabeaallil"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color={theme.palette.text.secondary}
        >
          Ghayth Sabeaallil
        </Link>
        . All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
