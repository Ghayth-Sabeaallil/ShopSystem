import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PrintIcon from "@mui/icons-material/Print";
import { useProduct } from "../../shared/context/Context/ProductContext";
import CancelIcon from "@mui/icons-material/Cancel";
import Btn from "../../shared/components/Btn";
import { useTranslation } from "react-i18next";
import DiscountIcon from "@mui/icons-material/Discount";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";
import type { CashierProduct } from "./types/CashierType";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowsProp,
} from "@mui/x-data-grid";
import { getDataGridLocale } from "../../utils/getDataGridLocale";
import i18n from "../../utils/i18n";
import i18next from "../../utils/i18n";
import { cashierApi } from "./api/cashierApi";
import { getFormattedTimestamp } from "../../utils/getReceiptBarcode";
const Cashier = () => {
  const theme = useTheme();
  const { products, setProducts } = useProduct();
  const [cashierProduct, setCashierProduct] = useState<CashierProduct[]>([]);
  const [barCode, setBarCode] = useState<string>("");
  const { t } = useTranslation();
  const currentLocaleText = getDataGridLocale(i18n.language);

  const rows: GridRowsProp = cashierProduct.map((product) => ({
    id: product.id,
    name: product.name,
    sell: product.sale_price ? product.sale_price : product.selling_price,
    amount: product.amount,
  }));

  const columns: GridColDef[] = [
    { field: "name", headerName: t("common.name"), flex: 4 },
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
    { field: "amount", headerName: t("common.amount"), flex: 2 },
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
            <Tooltip title={t("common.delete")}>
              <IconButton
                sx={{ padding: "5px" }}
                onClick={() => {
                  setCashierProduct((prev) =>
                    prev.filter((item) => item.id !== product._id)
                  );
                  setBarCode("");
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

  const getProduct = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const pro = products.find((product) => product.bar_code === barCode);
      if (pro) {
        setCashierProduct((prev) => {
          const existingProduct = prev.find((item) => item.id === pro._id);
          if (existingProduct) {
            return prev.map((item) =>
              item.id === pro._id ? { ...item, amount: item.amount + 1 } : item
            );
          } else {
            return [
              ...prev,
              {
                id: pro._id,
                name: pro.name,
                selling_price: pro.selling_price,
                sale_price: pro.sale_price,
                amount: 1,
              },
            ];
          }
        });

        setBarCode("");
      }
      if (pro) setBarCode("");
    }
  };

  const calculateTotal = () => {
    return cashierProduct.reduce((total, item) => {
      const price = item.sale_price ?? item.selling_price;
      return total + price * item.amount;
    }, 0);
  };

  const updateDb = () => {
    cashierApi.updateProduct(cashierProduct);
    cashierApi.addReceipt(cashierProduct, getFormattedTimestamp());
    setProducts(
      products.map((product) => {
        const update = cashierProduct.find(
          (p: CashierProduct) => p.id === product._id
        );
        if (update) {
          return {
            ...product,
            selling_amount: (product.selling_amount ?? 0) + update.amount,
            buying_amount: (product.buying_amount ?? 0) - update.amount,
          };
        }
        return product;
      })
    );
    setCashierProduct([]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        justifyItems: "center",
        justifySelf: "center",
        gap: 2,
        width: "40%",
        height: "95vh",
        backgroundColor: theme.palette.secondary.dark,
        padding: 2,
      }}
    >
      <DataGrid
        localeText={currentLocaleText}
        rows={rows}
        columns={columns}
        hideFooter
        sx={{ height: 200 }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="body1"
          dir={i18next.language === "ar" ? "rtl" : "ltr"}
          sx={{
            color: theme.palette.text.primary,
            letterSpacing: 0,
            fontSize: 24,
            fontWeight: 800,
          }}
        >
          {t("common.total")} : {calculateTotal()}
        </Typography>
        <form onKeyDown={getProduct}>
          <TextField
            margin="dense"
            label={t("cashier.product")}
            fullWidth
            type="text"
            variant="outlined"
            value={barCode}
            onChange={(e) => {
              setBarCode(e.target.value);
            }}
            autoFocus
          />
        </form>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Btn
            text={t("cashier.cancel")}
            icon={CancelIcon}
            disabled={cashierProduct.length === 0}
            onClick={() => setCashierProduct([])}
          />
          <Btn
            text={t("cashier.finish")}
            icon={PrintIcon}
            disabled={cashierProduct.length === 0}
            onClick={updateDb}
          />
          {/*
          <Btn
            text={t("cashier.discount")}
            icon={DiscountIcon}
            disabled={cashierProduct.length === 0}
            onClick={() => {}}
          />*/}
        </Box>
      </Box>
    </Box>
  );
};

export default Cashier;
