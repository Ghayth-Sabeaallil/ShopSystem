import { useReceipt } from "../../shared/context/Context/ReceiptContext";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import { getReceiptsPerDay, getTopSellingItems } from "../../utils/chartsData";
import { PieChart } from "@mui/x-charts";

const SellCharts = () => {
  const { receipts } = useReceipt();
  const theme = useTheme();
  const { t } = useTranslation();
  const receiptsPerDay = getReceiptsPerDay(receipts);
  const topSellingItems = getTopSellingItems(receipts);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        justifyItems: "center",
        justifySelf: "center",
        gap: 2,
        width: "50%",
        height: "95vh",
        backgroundColor: theme.palette.secondary.dark,
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.primary,
            letterSpacing: 0,
            fontSize: 24,
            fontWeight: 800,
            textAlign: "center",
          }}
        >
          {t("cashier.receiptsPerDay")}{" "}
        </Typography>
        <BarChart
          xAxis={[{ data: receiptsPerDay.xData }]}
          series={[
            {
              data: receiptsPerDay.yData,
            },
          ]}
          height={300}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.primary,
            letterSpacing: 0,
            fontSize: 24,
            fontWeight: 800,
            textAlign: "center",
          }}
        >
          {t("cashier.topSelling")}
        </Typography>
        <PieChart
          series={[
            {
              data: topSellingItems,
            },
          ]}
          width={400}
          height={400}
        />
      </Box>
    </Box>
  );
};

export default SellCharts;
