import { Box, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PrintIcon from "@mui/icons-material/Print";
import { useProduct } from "../../shared/context/Context/ProductContext";
import CancelIcon from "@mui/icons-material/Cancel";
import Btn from "../../shared/components/Btn";
import { useTranslation } from "react-i18next";
import DiscountIcon from "@mui/icons-material/Discount";
import { useState } from "react";
import type { CashierProduct } from "./types/CashierType";
const Cashier = () => {
  const theme = useTheme();
  const { products } = useProduct();
  const [cashierProduct, setCashierProduct] = useState<CashierProduct[]>([]);
  const [barCode, setBarCode] = useState<string>("");
  const { t } = useTranslation();

  const getProduct = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const pro = products.find((product) => product.bar_code === barCode);
      if (pro) setBarCode("");
      console.log(pro);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        justifyItems: "center",
        justifySelf: "center",
        width: "40%",
        height: "95vh",
        backgroundColor: theme.palette.secondary.dark,
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "100%",
          backgroundColor: theme.palette.secondary.light,
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "15%",
        }}
      >
        <form onKeyDown={getProduct}>
          <TextField
            margin="dense"
            label={t("cashier.product")}
            fullWidth
            type="text"
            variant="outlined"
            value={barCode}
            onChange={(e) => {
              setBarCode(e.target.value);
            }}
            autoFocus
          />
        </form>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Btn
            text={t("cashier.cancel")}
            icon={CancelIcon}
            disabled={cashierProduct.length === 0}
            onClick={() => {}}
          />
          <Btn
            text={t("cashier.finish")}
            icon={PrintIcon}
            disabled={cashierProduct.length === 0}
            onClick={() => {}}
          />
          <Btn
            text={t("cashier.discount")}
            icon={DiscountIcon}
            disabled={cashierProduct.length === 0}
            onClick={() => {}}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Cashier;
