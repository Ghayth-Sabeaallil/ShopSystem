import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Slider,
  TextField,
  Typography,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { productApi } from "../api/productApi";
import { useProduct } from "../../../shared/context/Context/ProductContext";
import type { productResponse } from "../types/productType";

type EditProductProps = {
  id: string;
  sellingPrice: number;
  salePrice: number;
  setSalePrice: React.Dispatch<React.SetStateAction<number>>;
  openEditDialog: boolean;
  setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sales({
  id,
  sellingPrice,
  salePrice,
  setSalePrice,
  openEditDialog,
  setOpenEditDialog,
}: EditProductProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [procentValue, setProcentValue] = useState<number>(0);
  const [numberOfDays, setNumberOfDays] = useState<number>(1);
  const { products, setProducts } = useProduct();

  useEffect(() => {
    setProcentValue(((sellingPrice - salePrice) / sellingPrice) * 100);
  }, [salePrice]);

  const updateSale = (id: string, salePrice: number, numberOfDays: number) => {
    const saleExpiresAt = new Date(
      Date.now() + numberOfDays * 24 * 60 * 60 * 1000
    );
    productApi.updateSale(id, salePrice, saleExpiresAt);
    setProducts(
      products.map((item: productResponse) =>
        item._id === id
          ? { ...item, sale_price: salePrice, sale_expires_at: saleExpiresAt }
          : item
      )
    );
  };

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
            bgcolor: theme.palette.background.default,
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
            {t("common.sale")}
          </Typography>
          <TextField
            required
            margin="dense"
            fullWidth
            label={t("common.sell")}
            variant="outlined"
            value={sellingPrice}
            disabled
          />
          <TextField
            required
            margin="dense"
            label={t("common.sale")}
            fullWidth
            variant="outlined"
            value={salePrice === 0 ? sellingPrice : salePrice}
            disabled
          />
          <Slider
            value={procentValue} // Controlled: use value instead of defaultValue
            aria-label="Default"
            valueLabelDisplay="auto"
            color="primary"
            valueLabelFormat={(value) => `${value}%`}
            onChange={(_, value) => {
              const percent = typeof value === "number" ? value : 0;
              setProcentValue(percent);
              setSalePrice(sellingPrice - sellingPrice * (percent / 100));
            }}
          />

          <TextField
            label={t("stock.days")}
            type="number"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(Number(e.target.value))}
            InputProps={{ inputProps: { min: 1 } }}
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
                updateSale(id, salePrice, numberOfDays);
                setProcentValue(0);
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
                setProcentValue(0);
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
