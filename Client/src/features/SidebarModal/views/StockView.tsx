import { Typography, Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useProduct } from "../../../shared/context/Context/ProductContext";
import StockTable from "../Components/StockTable";
import AddProduct from "../Components/AddProducts";
import { useEffect } from "react";
import { useAuth } from "../../../shared/context/Context/AuthContext ";
import { productApi } from "../api/productApi";

const StockView = () => {
  const { t } = useTranslation();
  const { products, setProducts } = useProduct();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      if (isAuthenticated) {
        const response = await productApi.getProducts();
        setProducts(response.data);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
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
      <AddProduct />
      <StockTable products={products} />
    </Box>
  );
};

export default StockView;
