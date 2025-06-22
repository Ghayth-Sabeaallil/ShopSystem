import { useReceipt } from "../../shared/context/Context/ReceiptContext";
import { BarChart } from "@mui/x-charts/BarChart";
const SellCharts = () => {
  const { receipts } = useReceipt();

  return (
    <div>
      <BarChart
        xAxis={[{ data: ["group A", "group B", "group C"] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        height={300}
      />
      <h1>Sell Charts</h1>
      {receipts.length > 0 ? (
        <ul>
          {receipts.map((receipt) => (
            <li key={receipt._id}>
              {receipt.bar_code} - Total:{" "}
              {receipt.items
                .map((item) => item.amount)
                .reduce((a, b) => a + b, 0)}{" "}
              items
            </li>
          ))}
        </ul>
      ) : (
        <p>No receipts available.</p>
      )}
    </div>
  );
};

export default SellCharts;
