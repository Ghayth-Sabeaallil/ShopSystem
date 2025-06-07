import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Btn from "../../../shared/components/Btn";
import AddIcon from "@mui/icons-material/Add";
import Input from "../../../shared/components/Input";

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
      <Box
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        <Input
          text={t(`stock.barCode`)}
          label={t(`stock.barCode`)}
          value={""}
        />
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
      <Btn
        text={t(`stock.add`)}
        icon={AddIcon}
        disabled={true}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Box>
  );
};

export default StockView;
