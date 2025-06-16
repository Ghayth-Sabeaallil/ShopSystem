import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Btn from "../../../shared/components/Btn";
import AddIcon from "@mui/icons-material/Add";
import Input from "../../../shared/components/Input";
import { useState } from "react";
import { productApi } from "../api/productApi";
import { useProduct } from "../../../shared/context/Context/ProductContext";
import type { productRequest } from "../types/productType";

const AddProduct = () => {
  const { t } = useTranslation();

  const [error, setError] = useState<string>();
  const { products, setProducts } = useProduct();
  const [product, setProduct] = useState<productRequest>({
    name: "",
    bar_code: "",
    buying_price: 0,
    selling_price: 0,
    buying_amount: 0,
    selling_amount: 0,
    minimum_amount: 0,
  });

  const addProduct = async () => {
    setError(undefined);
    try {
      const item = await productApi.addProduct(product);
      setProducts([...products, item]);
      setProduct({
        name: "",
        bar_code: "",
        buying_price: 0,
        selling_price: 0,
        buying_amount: 0,
        selling_amount: 0,
        minimum_amount: 0,
      });
    } catch (err: any) {
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data?.msg?.includes("already exists")
      ) {
        setError(t("stock.productExists"));
      } else {
        setError(t("stock.addError"));
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row", lg: "row" },
          gap: 1,
        }}
      >
        <Input
          name={t(`common.barCode`)}
          label={t(`common.barCode`)}
          type="string"
          value={product.bar_code}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              bar_code: e.target.value,
            }))
          }
        />
        <Input
          name={t(`common.name`)}
          label={t(`common.name`)}
          type="string"
          value={product.name}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
        <Input
          name={t(`common.buy`)}
          label={t(`common.buy`)}
          type="number"
          value={product.buying_price}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              buying_price: Number(e.target.value),
            }))
          }
        />
        <Input
          name={t(`common.sell`)}
          label={t(`common.sell`)}
          type="number"
          value={product.selling_price}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              selling_price: Number(e.target.value),
            }))
          }
        />
        <Input
          name={t(`common.amount`)}
          label={t(`common.amount`)}
          type="number"
          value={product.buying_amount}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              buying_amount: Number(e.target.value),
            }))
          }
        />
        <Input
          name={t(`common.minimum`)}
          label={t(`common.minimum`)}
          type="number"
          value={product.minimum_amount}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              minimum_amount: Number(e.target.value),
            }))
          }
        />
      </Box>
      {error && <Box sx={{ color: "red", fontWeight: "bold" }}>{error}</Box>}
      <Btn
        text={t(`stock.add`)}
        icon={AddIcon}
        disabled={
          product.bar_code &&
          product.name &&
          product.buying_price &&
          product.selling_price &&
          product.buying_amount &&
          product.minimum_amount
            ? false
            : true
        }
        onClick={addProduct}
      />
    </Box>
  );
};

export default AddProduct;
