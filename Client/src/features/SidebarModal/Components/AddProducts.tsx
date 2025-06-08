import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Btn from "../../../shared/components/Btn";
import AddIcon from "@mui/icons-material/Add";
import Input from "../../../shared/components/Input";
import { useState } from "react";
import { productApi } from "../api/productApi";
import { useProduct } from "../../../shared/context/Context/ProductContext";

const AddProduct = () => {
  const { t } = useTranslation();
  const [barCode, setBarCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [buyingPrice, setbuyingPrice] = useState<number>(0);
  const [sellingPrice, setsellingPrice] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>();
  const { products, setProducts } = useProduct();

  const addProduct = async () => {
    setError(undefined);
    try {
      const item = await productApi.addProduct(
        name,
        barCode,
        buyingPrice,
        sellingPrice,
        amount,
        0
      );
      setProducts([...products, item]);

      setBarCode("");
      setName("");
      setAmount(0);
      setbuyingPrice(0);
      setsellingPrice(0);
    } catch (err: any) {
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data?.msg?.includes("already exists")
      ) {
        setError(t("stock.productExists")); // use a translated message if available
      } else {
        setError(t("stock.addError")); // generic error fallback
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
          text={t(`stock.barCode`)}
          label={t(`stock.barCode`)}
          type="string"
          value={barCode}
          onChange={(e) => setBarCode(e.target.value)}
        />
        <Input
          text={t(`stock.name`)}
          label={t(`stock.name`)}
          type="string"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          text={t(`stock.buyPrice`)}
          label={t(`stock.buyPrice`)}
          type="number"
          value={buyingPrice}
          onChange={(e) => setbuyingPrice(Number(e.target.value))}
        />
        <Input
          text={t(`stock.sellPrice`)}
          label={t(`stock.sellPrice`)}
          type="number"
          value={sellingPrice}
          onChange={(e) => setsellingPrice(Number(e.target.value))}
        />
        <Input
          text={t(`stock.amount`)}
          label={t(`stock.amount`)}
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </Box>
      {error && <Box sx={{ color: "red", fontWeight: "bold" }}>{error}</Box>}
      <Btn
        text={t(`stock.add`)}
        icon={AddIcon}
        disabled={
          barCode && name && buyingPrice && sellingPrice && amount
            ? false
            : true
        }
        onClick={addProduct}
      />
    </Box>
  );
};

export default AddProduct;
