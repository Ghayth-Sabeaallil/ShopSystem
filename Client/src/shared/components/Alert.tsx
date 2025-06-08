import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

type AlertProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  itemId: any;
  handleDelete: Function;
  text: string;
};

export default function Alert({
  setModalOpen,
  modalOpen,
  itemId,
  handleDelete,
  text,
}: AlertProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth="sm"
        disableRestoreFocus
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReportProblemIcon
            color={"warning"}
            fontSize="large"
            className="animate-pulse"
          />
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
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
            {text}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              handleDelete(itemId);
              setModalOpen(false);
            }}
            color="primary"
            sx={{
              letterSpacing: 0,
              fontSize: 18,
              fontWeight: 600,
            }}
            variant="contained"
          >
            {t("alert.delete")}
          </Button>
          <Button
            onClick={() => setModalOpen(false)}
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
      </Dialog>
    </>
  );
}
