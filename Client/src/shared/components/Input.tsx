import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

type InputProps = {
  text: string;
  label: string;
  value: string;
};

const Input = ({ text, label, value }: InputProps) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  return (
    <TextField
      fullWidth
      InputLabelProps={{
        sx: isRtl
          ? {
              left: "auto",
              right: 30,
              transformOrigin: "top right",
            }
          : {
              left: 0,
              transformOrigin: "top left",
            },
      }}
      inputProps={{
        style: { textAlign: isRtl ? "right" : "left" },
      }}
      label={label}
      name={text}
      value={value}
      required
    />
  );
};

export default Input;
