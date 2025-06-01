import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import Logo from "./components/Logo";
import SidebarModal from "../SidebarModal/SidebarModal";
import type { SidebarView } from "../SidebarModal/types/SidebarModalTypes";

import {
  PrimarySideBarButtons,
  SecondarySideBarButtons,
} from "../../shared/lib/SideBarButtons";
import SideBarIcon from "./components/SideBarIcon";

const drawerWidth = 97;

export default function Sidebar() {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<SidebarView>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleOpenModal = (view: SidebarView) => {
    if (!view) return;
    setCurrentView(view);
    setModalOpen(true);
  };

  return (
    <>
      <IconButton
        sx={{
          position: "fixed",
          top: "50%",
          left: 0,
          zIndex: 30,
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.text.primary,
          boxShadow: theme.shadows[3],
          width: 30,
          height: 40,
          display: { xs: "flex", sm: "none" },
          borderRadius: "0",
          opacity: "75%",
        }}
        onClick={() => setDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <Box
        sx={{
          width: drawerWidth,
          height: "100%",
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.text.primary,
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: theme.spacing(2),
          overflow: "hidden",
          boxShadow: theme.shadows[4],
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 510,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Logo />
          {PrimarySideBarButtons.map((item, index) => (
            <SideBarIcon
              key={index}
              label={item.label}
              icon={item.icon}
              open={true}
              onClick={() =>
                handleOpenModal(item.label.toLowerCase() as SidebarView)
              }
            />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            paddingBottom: "20px",
          }}
        >
          {SecondarySideBarButtons.map((item, index) => (
            <SideBarIcon
              key={index}
              label={item.label}
              icon={item.icon}
              open={true}
              onClick={() =>
                handleOpenModal(item.label.toLowerCase() as SidebarView)
              }
            />
          ))}
        </Box>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <Box
          sx={{
            width: drawerWidth,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: theme.spacing(2),
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: theme.shadows[4],
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Logo />
            {PrimarySideBarButtons.map((item, index) => (
              <SideBarIcon
                key={index}
                label={item.label}
                icon={item.icon}
                open={true}
                onClick={() =>
                  handleOpenModal(item.label.toLowerCase() as SidebarView)
                }
              />
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              paddingBottom: "20px",
            }}
          >
            {SecondarySideBarButtons.map((item, index) => (
              <SideBarIcon
                key={index}
                label={item.label}
                icon={item.icon}
                open={true}
                onClick={() =>
                  handleOpenModal(item.label.toLowerCase() as SidebarView)
                }
              />
            ))}
          </Box>
        </Box>
      </Drawer>

      <SidebarModal
        open={modalOpen && currentView !== ""}
        onClose={() => setModalOpen(false)}
        currentView={currentView}
      />
    </>
  );
}
