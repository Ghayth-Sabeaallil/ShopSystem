import { Backdrop, Box, Modal, Fade } from "@mui/material";
//import NotificationsView from "./views/NotificationsView";
import SupportView from "./views/SupportView";
import { useTheme } from "@mui/material/styles";
import { Suspense } from "react";
import type { SidebarModalProps } from "./types/SidebarModalTypes";
import SettingsView from "./views/SettingsView";

export default function SidebarModal({
  open,
  onClose,
  currentView,
}: SidebarModalProps) {
  const theme = useTheme();

  {
    /*
        case "notifications":
        return <NotificationsView onClose={onClose} />;
        */
  }

  const renderView = () => {
    switch (currentView) {
      case "support":
        return (
          <Suspense>
            <SupportView onClose={onClose} />
          </Suspense>
        );
      case "settings":
        return (
          <Suspense>
            <SettingsView onClose={onClose} />
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
            minWidth: "fit-content",
            maxWidth: "100vw",
            maxHeight: { xs: "100vh", md: "90vh" },
            bgcolor: theme.palette.background.default,
            boxShadow: theme.shadows[4],
            borderRadius: `${theme.shape.borderRadius}px`,
            padding: 10,
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
