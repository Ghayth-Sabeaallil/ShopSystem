// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

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
        width: "75%",
        fontSize: 18,
        fontWeight: 700,
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
