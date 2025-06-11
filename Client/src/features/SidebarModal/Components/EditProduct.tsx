import {
  Box,
  Button,
  Dialog,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import type { productRequest, productResponse } from "../types/productType";
import { productApi } from "../api/productApi";
import { useProduct } from "../../../shared/context/Context/ProductContext";

type EditProductProps = {
  id: string;
  product: productRequest;
  setProduct: React.Dispatch<React.SetStateAction<productRequest>>;
  openEditDialog: boolean;
  setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditProduct({
  id,
  product,
  setProduct,
  openEditDialog,
  setOpenEditDialog,
}: EditProductProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { products, setProducts } = useProduct();

  return (
    <>
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        disableRestoreFocus
        fullWidth
        maxWidth="sm"
      >
        <Box
          sx={{
            padding: 3,
            backgroundColor: theme.palette.background.default,
            boxShadow: theme.shadows[3],
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            }}
          >
            {t("common.edit")}
          </Typography>
          <TextField
            required
            autoFocus
            margin="dense"
            label={t("common.barCode")}
            fullWidth
            variant="outlined"
            value={product.bar_code}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                bar_code: e.target.value,
              }))
            }
          />

          <TextField
            required
            margin="dense"
            label={t("common.name")}
            fullWidth
            variant="outlined"
            value={product.name}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />

          <TextField
            required
            margin="dense"
            label={t("common.buy")}
            fullWidth
            type="number"
            variant="outlined"
            value={product.buying_price}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                buying_price: Number(e.target.value),
              }))
            }
          />
          <TextField
            required
            margin="dense"
            label={t("common.sell")}
            fullWidth
            type="number"
            variant="outlined"
            value={product.selling_price}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                selling_price: Number(e.target.value),
              }))
            }
          />
          <TextField
            required
            margin="dense"
            label={t("common.amount")}
            fullWidth
            type="number"
            variant="outlined"
            value={product.buying_amount}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                buying_amount: Number(e.target.value),
              }))
            }
          />
          <TextField
            required
            margin="dense"
            label={t("common.amount")}
            fullWidth
            type="number"
            variant="outlined"
            value={product.selling_amount}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                selling_amount: Number(e.target.value),
              }))
            }
          />
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => {
                productApi.updateProduct(id, product);

                setProducts(
                  products.map((item: productResponse) =>
                    item._id === id ? { ...item, ...product } : item
                  )
                );

                setOpenEditDialog(false);
              }}
              color="primary"
              sx={{
                letterSpacing: 0,
                fontSize: 18,
                fontWeight: 600,
              }}
              variant="contained"
            >
              {t("common.save")}
            </Button>
            <Button
              onClick={() => {
                setOpenEditDialog(false);
              }}
              variant="text"
              sx={{
                color: (theme) => theme.palette.text.primary,
                letterSpacing: 0,
                fontSize: 20,
                fontWeight: 600,
                "&:hover": {
                  textDecoration: "underline",
                  backgroundColor: "transparent",
                },
              }}
            >
              {t("alert.cancel")}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
