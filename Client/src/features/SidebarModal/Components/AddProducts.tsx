import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Input from "../../../shared/components/Input";

const AddProduct = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Input text={t(`stock.barCode`)} label={t(`stock.barCode`)} value={""} />
      <Input text={t(`stock.name`)} label={t(`stock.name`)} value={""} />
      <Input
        text={t(`stock.buyPrice`)}
        label={t(`stock.buyPrice`)}
        value={""}
      />
      <Input
        text={t(`stock.sellPrice`)}
        label={t(`stock.sellPrice`)}
        value={""}
      />
      <Input text={t(`stock.amount`)} label={t(`stock.amount`)} value={""} />
    </Box>
  );
};

export default AddProduct;
