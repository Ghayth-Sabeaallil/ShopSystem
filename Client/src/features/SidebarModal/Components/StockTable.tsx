import { useTranslation } from "react-i18next";
import type { productResponse } from "../types/productType";
import {
  DataGrid,
  type GridRowsProp,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { getDataGridLocale } from "../../../utils/getDataGridLocale";
import i18n from "../../../utils/i18n";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type StockTableProps = {
  products: productResponse[];
};

const StockTable = ({ products }: StockTableProps) => {
  const { t } = useTranslation();
  const currentLocaleText = getDataGridLocale(i18n.language);

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
    {
      field: "actions",
      headerName: t("table.actions"),
      headerAlign: "center",
      flex: 2,
      renderCell: (params: GridRenderCellParams) => {
        const product = products.find((b) => b._id === params.row.id);
        if (!product) return null;

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 1,
            }}
          >
            <Tooltip title={t("table.edit")}>
              <IconButton
                sx={{ padding: "5px" }}
                onClick={() => {}}
                color="primary"
                aria-label="edit"
              >
                <EditIcon fontSize="medium" color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("table.delete")}>
              <IconButton
                sx={{ padding: "5px" }}
                onClick={() => {
                  console.log(product);
                }}
                color="primary"
                aria-label="delete"
              >
                <DeleteIcon fontSize="medium" color="error" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <DataGrid
        showToolbar
        localeText={currentLocaleText}
        sx={{
          width: "100%",
          height: 700,
        }}
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 15]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </>
  );
};

export default StockTable;
