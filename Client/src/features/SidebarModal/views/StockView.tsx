import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import AddProduct from "../Components/AddProducts";

const StockView = () => {
  const { t } = useTranslation();
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
      <Typography variant="body1">{t(`stock.stock`)}</Typography>
      <AddProduct />
    </Box>
  );
};

export default StockView;
