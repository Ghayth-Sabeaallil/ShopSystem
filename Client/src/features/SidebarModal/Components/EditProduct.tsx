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

type EditProductProps = {
  id: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  barCode: string;
  setBarCode: React.Dispatch<React.SetStateAction<string>>;
  buyingPrice: number;
  setbuyingPrice: React.Dispatch<React.SetStateAction<number>>;
  sellingPrice: number;
  setsellingPrice: React.Dispatch<React.SetStateAction<number>>;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  openEditDialog: boolean;
  setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditProduct({
  id,
  name,
  setName,
  barCode,
  setBarCode,
  buyingPrice,
  setbuyingPrice,
  sellingPrice,
  setsellingPrice,
  amount,
  setAmount,
  openEditDialog,
  setOpenEditDialog,
}: EditProductProps) {
  const theme = useTheme();
  const { t } = useTranslation();

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
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
          }}
        >
          <Box
            sx={{
              padding: 3,
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[3],
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ marginBottom: 3, textAlign: "center" }}
            >
              {t("EditProduct")}
            </Typography>
            <TextField
              required
              autoFocus
              margin="dense"
              label={t("common.barCode")}
              fullWidth
              variant="outlined"
              value={barCode}
              onChange={(e) => {
                setBarCode(e.target.value);
              }}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              label={t("common.name")}
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <TextField
              required
              autoFocus
              margin="dense"
              label={t("common.buy")}
              fullWidth
              type="number"
              variant="outlined"
              value={buyingPrice}
              onChange={(e) => {
                setbuyingPrice(Number(e.target.value));
              }}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              label={t("common.sell")}
              fullWidth
              type="number"
              variant="outlined"
              value={sellingPrice}
              onChange={(e) => {
                setsellingPrice(Number(e.target.value));
              }}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              label={t("common.amount")}
              fullWidth
              variant="outlined"
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
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
        </Box>
      </Dialog>
    </>
  );
}
