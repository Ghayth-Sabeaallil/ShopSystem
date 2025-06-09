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
import Alert from "../../../shared/components/Alert";
import { useState } from "react";
import { useProduct } from "../../../shared/context/Context/ProductContext";
import { productApi } from "../api/productApi";
import EditProduct from "./EditProduct";

type StockTableProps = {
  products: productResponse[];
};

const StockTable = ({ products }: StockTableProps) => {
  const { t } = useTranslation();
  const currentLocaleText = getDataGridLocale(i18n.language);
  const [alertModal, setAlertModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [barCode, setBarCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [buyingPrice, setbuyingPrice] = useState<number>(0);
  const [sellingPrice, setsellingPrice] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [productId, setProductId] = useState<string>("");
  const { setProducts } = useProduct();

  const handleDelete = (productId: string) => {
    productApi.deleteProduct(productId);
    setProducts(
      products.filter((item: productResponse) => item._id !== productId)
    );
  };

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
    { field: "barCode", headerName: t("common.barCode"), flex: 2 },
    { field: "name", headerName: t("common.name"), flex: 4 },
    { field: "buy", headerName: t("common.buy"), flex: 2 },
    { field: "sell", headerName: t("common.sell"), flex: 2 },
    { field: "buyingamount", headerName: t("common.amount"), flex: 2 },
    {
      field: "sellingAmount",
      headerName: t("common.sellingAmount"),
      flex: 2,
    },
    {
      field: "actions",
      headerName: t("common.actions"),
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
            <Tooltip title={t("common.edit")}>
              <IconButton
                sx={{ padding: "5px" }}
                onClick={() => {
                  setEditModal(true);
                  setName(product.name);
                  setBarCode(product.bar_code);
                  setbuyingPrice(product.buying_price);
                  setsellingPrice(product.selling_price);
                  setAmount(product.buying_amount);
                  setProductId(product._id);
                }}
                color="primary"
                aria-label="edit"
              >
                <EditIcon fontSize="medium" color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("common.delete")}>
              <IconButton
                sx={{ padding: "5px" }}
                onClick={() => {
                  setAlertModal(true);
                  setProductId(product._id);
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
        disableRowSelectionOnClick
      />
      <EditProduct
        id={productId}
        name={name}
        setName={setName}
        openEditDialog={editModal}
        setOpenEditDialog={setEditModal}
        barCode={barCode}
        setBarCode={setBarCode}
        buyingPrice={buyingPrice}
        setbuyingPrice={setbuyingPrice}
        sellingPrice={sellingPrice}
        setsellingPrice={setsellingPrice}
        amount={amount}
        setAmount={setAmount}
      />
      <Alert
        setModalOpen={setAlertModal}
        modalOpen={alertModal}
        itemId={productId}
        handleDelete={handleDelete}
        text={t("alert.msg")}
      />
    </>
  );
};

export default StockTable;
