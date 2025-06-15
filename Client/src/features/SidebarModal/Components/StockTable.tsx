import { useTranslation } from "react-i18next";
import type { productRequest, productResponse } from "../types/productType";
import {
  DataGrid,
  type GridRowsProp,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { getDataGridLocale } from "../../../utils/getDataGridLocale";
import i18n from "../../../utils/i18n";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "../../../shared/components/Alert";
import { useState } from "react";
import { useProduct } from "../../../shared/context/Context/ProductContext";
import { productApi } from "../api/productApi";
import EditProduct from "./EditProduct";
import PercentIcon from "@mui/icons-material/Percent";
import Sales from "./Sales";

const StockTable = () => {
  const { t } = useTranslation();
  const currentLocaleText = getDataGridLocale(i18n.language);
  const [alertModal, setAlertModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [saleModal, setSaleModal] = useState<boolean>(false);
  const [sellPrice, setSellPrice] = useState<number>(0);
  const [salePrice, setSalePrice] = useState<number>(0);
  const [numberOfDays, setNumberOfDays] = useState<Date>();
  const [product, setProduct] = useState<productRequest>({
    name: "",
    bar_code: "",
    buying_price: 0,
    selling_price: 0,
    buying_amount: 0,
    selling_amount: 0,
    minimum_amount: 0,
  });
  const [productId, setProductId] = useState<string>("");
  const { products, setProducts } = useProduct();

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
    {
      field: "sell",
      headerName: t("common.sell"),
      flex: 2,
      renderCell: (params: GridRenderCellParams) => {
        const product = products.find((b) => b._id === params.row.id);
        if (!product) return null;

        if (product.sale_price && product.sale_price < product.selling_price) {
          return (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography
                sx={{ textDecoration: "line-through", color: "gray" }}
              >
                {product.selling_price}
              </Typography>
              <Typography sx={{ color: "red", fontWeight: "bold" }}>
                {product.sale_price}
              </Typography>
            </Box>
          );
        }
      },
    },
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
                  setProduct({
                    name: product.name,
                    bar_code: product.bar_code,
                    buying_price: product.buying_price,
                    selling_price: product.selling_price,
                    buying_amount: product.buying_amount,
                    selling_amount: product.selling_amount,
                    minimum_amount: product.minimum_amount,
                  });
                  setProductId(product._id);
                }}
                color="primary"
                aria-label="edit"
              >
                <EditIcon fontSize="medium" color="success" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("common.sale")}>
              <IconButton
                sx={{ padding: "5px" }}
                onClick={() => {
                  setSaleModal(true);
                  setProductId(product._id);
                  setSellPrice(product.selling_price);
                  if (product.sale_price) {
                    setSalePrice(product.sale_price);
                    setNumberOfDays(product.sale_expires_at);
                  }
                }}
                color="primary"
                aria-label="delete"
              >
                <PercentIcon fontSize="medium" color="info" />
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
        disableVirtualization
        showToolbar
        localeText={currentLocaleText}
        sx={{
          width: "100%",
          height: 700,
          "& .low-stock": {
            backgroundColor: "rgba(255, 238, 0, 0.29)",
            "&:hover": {
              backgroundColor: "rgba(251, 255, 0, 0.12)",
            },
          },
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
        getRowClassName={(params) => {
          const product = products.find((p) => p._id === params.row.id);
          if (
            product &&
            product.buying_amount - product.selling_amount <=
              product.minimum_amount
          ) {
            return "low-stock";
          }
          return "";
        }}
      />

      <EditProduct
        id={productId}
        product={product}
        setProduct={setProduct}
        openEditDialog={editModal}
        setOpenEditDialog={setEditModal}
      />
      <Alert
        setModalOpen={setAlertModal}
        modalOpen={alertModal}
        itemId={productId}
        handleDelete={handleDelete}
        text={t("alert.msg")}
      />
      <Sales
        id={productId}
        salePrice={salePrice}
        setSalePrice={setSalePrice}
        sellingPrice={sellPrice}
        openEditDialog={saleModal}
        setOpenEditDialog={setSaleModal}
      />
    </>
  );
};

export default StockTable;
