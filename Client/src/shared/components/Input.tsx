import { TextField } from "@mui/material";

type InputProps = {
  text: string;
  label: string;
  value: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type: string;
};

const Input = ({ text, label, value, type, onChange }: InputProps) => {
  return (
    <TextField
      onChange={onChange}
      type={type}
      label={label}
      name={text}
      value={value}
      required
    />
  );
};

export default Input;
