// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PrintIcon from "@mui/icons-material/Print";
import { useProduct } from "../../shared/context/Context/ProductContext";
import CancelIcon from "@mui/icons-material/Cancel";
import Btn from "../../shared/components/Btn";
import { useTranslation } from "react-i18next";
import logo from "/assets/logo.svg";

import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
import { useReceipt } from "../../shared/context/Context/ReceiptContext";
import { useAuth } from "../../shared/context/Context/AuthContext ";
const Cashier = () => {
  const theme = useTheme();
  const { products, setProducts } = useProduct();
  const { receipts, setReceipts } = useReceipt();
  const { marketName, marketAddress, marketPhone } = useAuth();
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
            <Tooltip title={t("common.remove")}>
              <IconButton
                sx={{ padding: "5px" }}
                onClick={() => setAmount(product._id, "remove")}
                color="primary"
                aria-label="Remove"
              >
                <RemoveCircleOutlineIcon fontSize="medium" color="warning" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("common.add")}>
              <IconButton
                sx={{ padding: "5px" }}
                onClick={() => setAmount(product._id, "add")}
                color="primary"
                aria-label="Add"
              >
                <AddCircleOutlineIcon fontSize="medium" color="success" />
              </IconButton>
            </Tooltip>
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

  const setAmount = (id: string, action: string) => {
    setCashierProduct((prev) => {
      const existingProduct = prev.find((item) => item.id === id);
      if (existingProduct) {
        if (action === "remove") {
          return prev.map((item) =>
            item.id === id && item.amount > 1
              ? { ...item, amount: item.amount - 1 }
              : item
          );
        } else {
          return prev.map((item) =>
            item.id === id ? { ...item, amount: item.amount + 1 } : item
          );
        }
      }
      return prev;
    });
  };

  const calculateTotal = () => {
    return cashierProduct.reduce((total, item) => {
      const price = item.sale_price ?? item.selling_price;
      return total + price * item.amount;
    }, 0);
  };

  const updateDb = async () => {
    const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cashierApi.updateProduct(cashierProduct, "selling");
    const barCode = getFormattedTimestamp();
    const receipt = await cashierApi.addReceipt(
      cashierProduct,
      barCode,
      expireAt
    );
    cashierApi.printReceipt(
      cashierProduct,
      barCode,
      i18next.language,
      marketName,
      marketAddress,
      marketPhone
    );
    setReceipts([...receipts, receipt]);

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

  function CustomNoRowsOverlay() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <img
          src={logo}
          alt="CashierLogo"
          style={{ width: 100, opacity: 0.5 }}
        />
      </Box>
    );
  }

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
        backgroundColor: theme.palette.secondary.main,
        padding: 2,
      }}
    >
      <DataGrid
        localeText={currentLocaleText}
        rows={rows}
        columns={columns}
        hideFooter
        sx={{ height: 200 }}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
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
            text={t("cashier.pay")}
            icon={PrintIcon}
            disabled={cashierProduct.length === 0}
            onClick={updateDb}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Cashier;
