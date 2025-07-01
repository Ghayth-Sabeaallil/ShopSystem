// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import type { SvgIconComponent } from "@mui/icons-material";
import type { ReactNode } from "react";

export type SidebarButtonProps = {
  icon: string | ReactNode;
  label: string;
  open: boolean;
  onClick?: () => void;
};

export type SidebarComponentProps = {
  label: string,
  icon: SvgIconComponent,
  open: boolean;
  onClick: () => void;
};
