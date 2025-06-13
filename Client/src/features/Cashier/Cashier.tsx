import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Cashier = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        width: "40%",

        minHeight: "100vh",
        backgroundColor: theme.palette.primary.light,
      }}
    ></Box>
  );
};

export default Cashier;
