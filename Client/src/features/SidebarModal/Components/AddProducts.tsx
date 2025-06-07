import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Btn from "../../../shared/components/Btn";
import AddIcon from "@mui/icons-material/Add";
import Input from "../../../shared/components/Input";
import { useState } from "react";
import { useAuth } from "../../../shared/context/authContext/AuthContext ";
import { productApi } from "../api/productApi";

const AddProduct = () => {
  const { t } = useTranslation();
  const [barCode, setBarCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [buyingPrice, setbuyingPrice] = useState<number>(0);
  const [sellingPrice, setsellingPrice] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const { userId } = useAuth();

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
      <Btn
        text={t(`stock.add`)}
        icon={AddIcon}
        disabled={
          barCode && name && buyingPrice && sellingPrice && amount
            ? false
            : true
        }
        onClick={() =>
          productApi.add(
            userId,
            name,
            barCode,
            buyingPrice,
            sellingPrice,
            amount,
            0
          )
        }
      />
    </Box>
  );
};

export default AddProduct;
