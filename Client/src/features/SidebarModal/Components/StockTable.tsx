import { useTranslation } from "react-i18next";
import type { productResponse } from "../types/productType";
import { DataGrid, type GridRowsProp, type GridColDef } from "@mui/x-data-grid";

type StockTableProps = {
  products: productResponse[];
};

const StockTable = ({ products }: StockTableProps) => {
  const { t } = useTranslation();

  const rows: GridRowsProp = products.map((product) => ({
    id: product._id,
    barCode: product.bar_code,
    name: product.name,
    buy: product.buying_price,
    sell: product.selling_price,
    buyingamount: product.buying_amount,
    sellingAmount: product.selling_amount,
  }));

  const columns: GridColDef[] = [
    { field: "barCode", headerName: t("table.barCode"), flex: 2 },
    { field: "name", headerName: t("table.name"), flex: 4 },
    { field: "buy", headerName: t("table.buy"), flex: 2 },
    { field: "sell", headerName: t("table.sell"), flex: 2 },
    { field: "buyingamount", headerName: t("table.amount"), flex: 2 },
    {
      field: "sellingAmount",
      headerName: t("table.sellingAmount"),
      flex: 2,
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
