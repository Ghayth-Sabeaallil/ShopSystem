import { Typography, Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const ReceiptView = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        textAlign: "center",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.primary,
          letterSpacing: 0,
          fontSize: 24,
          fontWeight: 800,
        }}
      >
        {t(`sideBar.receipt`)}
      </Typography>
    </Box>
  );
};

export default ReceiptView;
