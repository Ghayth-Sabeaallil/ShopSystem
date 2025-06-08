import { Typography, Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useProduct } from "../../../shared/context/Context/ProductContext";
import StockTable from "../Components/StockTable";

const StockView = () => {
  const { t } = useTranslation();
  const { products } = useProduct();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        textAlign: "center",
        width: "100%",
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
        {t(`stock.stock`)}
      </Typography>
      <StockTable products={products} />
    </Box>
  );
};

export default StockView;
