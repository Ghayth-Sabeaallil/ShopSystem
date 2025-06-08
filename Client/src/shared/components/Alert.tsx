import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
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
          <Typography>{text}</Typography>
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
            variant="contained"
          >
            {t("delete")}
          </Button>
          <Button
            onClick={() => setModalOpen(false)}
            variant="text"
            sx={{
              color: (theme) => theme.palette.text.primary,
              fontWeight: 500,
              "&:hover": {
                textDecoration: "underline",
                backgroundColor: "transparent",
              },
            }}
          >
            {t("cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
