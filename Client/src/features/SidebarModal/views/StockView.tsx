import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Btn from "../../../shared/components/Btn";
import AddIcon from "@mui/icons-material/Add";
import Input from "../../../shared/components/Input";

const StockView = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="body1">{t(`stock.stock`)}</Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: 1,
        }}
      >
        <Input
          text={t(`stock.barCode`)}
          label={t(`stock.barCode`)}
          value={""}
        />
        <Input text={t(`stock.name`)} label={t(`stock.name`)} value={""} />
        <Input text={t(`stock.price`)} label={t(`stock.price`)} value={""} />
        <Input text={t(`stock.amount`)} label={t(`stock.amount`)} value={""} />
        <Btn
          text={t(`stock.add`)}
          icon={AddIcon}
          disabled={true}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Box>
    </Box>
  );
};

export default StockView;
