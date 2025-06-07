import { Button } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

type BtnProps = {
  text: string;
  icon: SvgIconComponent;
  disabled: boolean;
  onClick: () => void;
};

const Btn = ({ text, onClick, disabled, icon: Icon }: BtnProps) => {
  return (
    <Button
      sx={{
        width: "50%",
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
