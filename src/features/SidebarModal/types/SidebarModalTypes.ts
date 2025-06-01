export type SidebarView = "stock" | "discount" | "support" | "settings" | "";

export type SidebarModalProps = {
  open: boolean;
  onClose: () => void;
  currentView: SidebarView;
};
