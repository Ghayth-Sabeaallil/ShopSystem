import { Box } from "@mui/material";

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
      <Box
        component="img"
        src="/assets/logo.svg"
        alt="Logo"
        width={45}
        height={45}
      />
    </Box>
  );
};

export default Logo;
