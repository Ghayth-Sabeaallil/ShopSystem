import { Button } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

type BtnProps = {
  text: string;
  icon: SvgIconComponent;
  disabled: boolean;
  onClick: () => void;
};

const Btn = ({ text, onClick, disabled, icon: Icon }: BtnProps) => {
  const { i18n } = useTranslation();

  return (
    <Button
      sx={{
        minWidth: "fit-content",
        direction: i18n.language == "ar" ? "ltr" : "rtl",
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
      }}
      disabled={disabled}
      color="primary"
      onClick={onClick}
      variant="contained"
      startIcon={<Icon />}
    >
      {text}
    </Button>
  );
};

export default Btn;
