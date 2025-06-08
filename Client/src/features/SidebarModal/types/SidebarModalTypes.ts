export type SidebarView = "stock" | "add" | "discount" | "support" | "settings" | "";

export type SidebarModalProps = {
  open: boolean;
  onClose: () => void;
  currentView: SidebarView;
};
