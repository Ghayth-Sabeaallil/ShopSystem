// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import SidebarButton from "./SidebarButton";
import { useTheme } from "@mui/material/styles";
import type { SidebarComponentProps } from "../types/SidebarButtonProps";
import { useTranslation } from "react-i18next";

const SideBarIcon: React.FC<SidebarComponentProps> = ({
  icon: Icon,
  open,
  onClick,
  label,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <SidebarButton
      icon={<Icon sx={{ fontSize: 35, color: theme.palette.text.secondary }} />}
      label={t(`sideBar.${label.toLocaleLowerCase()}`)}
      open={open}
      onClick={onClick}
    />
  );
};

export default SideBarIcon;
