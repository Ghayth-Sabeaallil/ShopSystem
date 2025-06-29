import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowsProp,
} from "@mui/x-data-grid";
import { useProduct } from "../../../shared/context/Context/ProductContext";
import type { CashierProduct } from "../../Cashier/types/CashierType";
import { getDataGridLocale } from "../../../utils/getDataGridLocale";
import i18n from "../../../utils/i18n";
import { useReceipt } from "../../../shared/context/Context/ReceiptContext";
import Btn from "../../../shared/components/Btn";
import { receiptApi } from "../api/receiptApi";
import { cashierApi } from "../../Cashier/api/cashierApi";

const ReceiptTable = () => {
  const { products } = useProduct();
  const { receipts, setReceipts } = useReceipt();
  const [receiptProduct, setReceiptProduct] = useState<CashierProduct[]>([]);
  const [barCode, setBarCode] = useState<string>("");
  const { t } = useTranslation();
  const currentLocaleText = getDataGridLocale(i18n.language);

  const rows: GridRowsProp = receiptProduct.map((product) => ({
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
            {(receiptProduct.find((item) => item.id === product._id)?.amount ??
              0) > 1 && (
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
            )}

            <Tooltip title={t("common.delete")}>
              <IconButton
                sx={{ padding: "5px" }}
                onClick={() => {
                  setReceiptProduct((prev) =>
                    prev.filter((item) => item.id !== product._id)
                  );
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

  const getReceipt = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const res = receipts.find((receipt) => receipt.bar_code === barCode);
      if (res) {
        setReceiptProduct(
          (res.items as CashierProduct[]).map((item) => ({
            id: item.id,
            name: item.name,
            selling_price: item.selling_price,
            sale_price: item.sale_price,
            amount: item.amount,
          }))
        );
      }
    }
  };

  const setAmount = (id: string, action: string) => {
    setReceiptProduct((prev) => {
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

  const updateDb = async (items: CashierProduct[], code: string) => {
    const receipt = await receiptApi.updateReceipt(items, code);
    cashierApi.updateProduct(items, "return");
    setReceipts((prevReceipts) => {
      if (items.length === 0) {
        return prevReceipts.filter((r) => r.bar_code !== receipt.bar_code);
      }

      const index = prevReceipts.findIndex(
        (r) => r.bar_code === receipt.bar_code
      );
      if (index !== -1) {
        const updatedReceipts = [...prevReceipts];
        updatedReceipts[index] = receipt;
        return updatedReceipts;
      } else {
        return [...prevReceipts, receipt];
      }
    });
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
          src="/assets/receipt.svg"
          alt="Logo"
          style={{ width: 100, opacity: 0.5 }}
        />
      </Box>
    );
  }

  return (
    <>
      <form onKeyDown={getReceipt}>
        <TextField
          margin="dense"
          label={t("common.receipt")}
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
      <DataGrid
        disableVirtualization
        disableRowSelectionOnClick
        localeText={currentLocaleText}
        rows={rows}
        columns={columns}
        hideFooter
        sx={{ width: "100%", height: 1000 }}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 2,
        }}
      >
        <Btn
          text={t("common.save")}
          icon={SaveIcon}
          disabled={false}
          onClick={async () => {
            const currentProducts = [...receiptProduct];
            const currentBarCode = barCode;

            await updateDb(currentProducts, currentBarCode);

            // Now that context is updated, clear the UI
            setReceiptProduct([]);
            setBarCode("");
          }}
        />
      </Box>
    </>
  );
};

export default ReceiptTable;
