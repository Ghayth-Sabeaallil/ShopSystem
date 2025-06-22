import { useReceipt } from "../../shared/context/Context/ReceiptContext";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

const SellCharts = () => {
  const { receipts } = useReceipt();
  const theme = useTheme();
  const { t } = useTranslation();

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
          الأرباح
        </Typography>
        <BarChart
          xAxis={[{ data: ["group A", "group B", "group C"] }]}
          series={[
            { data: [4, 3, 5] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
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
          المبيعات
        </Typography>
        <BarChart
          xAxis={[{ data: ["group A", "group B", "group C"] }]}
          series={[
            { data: [4, 3, 5] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
          ]}
          height={300}
        />
      </Box>
    </Box>
  );
};

export default SellCharts;
