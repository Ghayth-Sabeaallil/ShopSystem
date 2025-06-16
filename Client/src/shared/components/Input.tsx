import { TextField } from "@mui/material";

type InputProps = {
  name: string;
  label: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: string;
};

const Input = ({ name, label, value, type, onChange }: InputProps) => {
  return (
    <TextField
      onChange={onChange}
      type={type}
      label={label}
      name={name}
      value={value}
      required
      fullWidth
    />
  );
};

export default Input;
