import { Typography, Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ReceiptTable from "../Components/ReceiptTable";

const ReceiptView = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        textAlign: "center",
        width: "80vw",
        height: "65vh",
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
      <ReceiptTable />
    </Box>
  );
};

export default ReceiptView;
