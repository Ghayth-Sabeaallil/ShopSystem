import { useTranslation } from "react-i18next";
import type { productResponse } from "../types/productType";
import { DataGrid, type GridRowsProp, type GridColDef } from "@mui/x-data-grid";

type StockTableProps = {
  products: productResponse[];
};

const StockTable = ({ products }: StockTableProps) => {
  const { t } = useTranslation();

  const rows: GridRowsProp = products.map((product) => ({
    id: product.bar_code,
    barCode: product.bar_code,
    name: product.name,
    buy: product.buying_price,
    sell: product.selling_price,
    buyingamount: product.buying_amount,
    sellingAmount: product.selling_amount,
  }));

  const columns: GridColDef[] = [
    { field: "barCode", headerName: t("table.barCode"), width: 120 },
    { field: "name", headerName: t("table.name"), flex: 1, minWidth: 150 },
    { field: "buy", headerName: t("table.buy"), width: 100 },
    { field: "sell", headerName: t("table.sell"), width: 100 },
    { field: "buyingamount", headerName: t("table.amount"), width: 100 },
    {
      field: "sellingAmount",
      headerName: t("table.sellingAmount"),
      width: 120,
    },
  ];

  return (
    <>
      <DataGrid
        sx={{ width: "100%", height: 400 }}
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20 },
          },
        }}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </>
  );
};

export default StockTable;
