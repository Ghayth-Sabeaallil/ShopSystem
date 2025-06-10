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
import { useTranslation } from "react-i18next";

type EditProductProps = {
  id: string;
  sellingPrice: number;
  salePrice: number;
  setSalePrice: React.Dispatch<React.SetStateAction<number>>;
  openEditDialog: boolean;
  setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditProduct({
  id,
  sellingPrice,
  salePrice,
  setSalePrice,
  openEditDialog,
  setOpenEditDialog,
}: EditProductProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const marks = [
    {
      value: 0,
      label: "0 Days",
    },
    {
      value: 25,
      label: "2 Days",
    },
    {
      value: 50,
      label: "4 Days",
    },
    {
      value: 75,
      label: "6 Days",
    },

    {
      value: 100,
      label: "8 Days",
    },
  ];

  function valuetext(value: number) {
    return `${value}°C`;
  }

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
              autoFocus
              label={t("common.sale")}
              fullWidth
              type="number"
              variant="outlined"
              value={salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))}
            />
            <Slider
              aria-label="Restricted values"
              defaultValue={0}
              getAriaValueText={valuetext}
              step={25}
              marks={marks}
            />
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => {}}
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
