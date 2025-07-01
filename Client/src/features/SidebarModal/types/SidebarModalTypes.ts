// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

export type SidebarView = "stock" | "receipt" | "support" | "settings" | "";

export type SidebarModalProps = {
  open: boolean;
  onClose: () => void;
  currentView: SidebarView;
};
