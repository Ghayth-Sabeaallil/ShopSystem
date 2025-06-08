import { Backdrop, Box, Modal, Fade } from "@mui/material";
import SupportView from "./views/SupportView";
import { useTheme } from "@mui/material/styles";
import { Suspense } from "react";
import type { SidebarModalProps } from "./types/SidebarModalTypes";
import SettingsView from "./views/SettingsView";
import StockView from "./views/StockView";
import AddView from "./views/AddView";

export default function SidebarModal({
  open,
  onClose,
  currentView,
}: SidebarModalProps) {
  const theme = useTheme();

  const renderView = () => {
    switch (currentView) {
      case "stock":
        return (
          <Suspense>
            <StockView />
          </Suspense>
        );
      case "add":
        return (
          <Suspense>
            <AddView />
          </Suspense>
        );
      case "support":
        return (
          <Suspense>
            <SupportView />
          </Suspense>
        );
      case "settings":
        return (
          <Suspense>
            <SettingsView />
          </Suspense>
        );

      default:
        return <p>noViewAvailable</p>;
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      disableRestoreFocus
      slots={{ backdrop: Backdrop }}
      disableScrollLock={true}
      slotProps={{ backdrop: { timeout: 500, onClick: onClose } }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            Width: "fit-content",
            maxWidth: "100%",
            maxHeight: { xs: "100vh", md: "90vh" },
            bgcolor: theme.palette.background.default,
            boxShadow: theme.shadows[4],
            borderRadius: `${theme.shape.borderRadius}px`,
            padding: 5,
            overflowY: "auto",
            outline: "none",
          }}
        >
          {renderView()}
        </Box>
      </Fade>
    </Modal>
  );
}
