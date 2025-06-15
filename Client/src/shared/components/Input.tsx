import { TextField } from "@mui/material";

type InputProps = {
  name: string; // More semantic than 'text'
  label: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>; // Make required for consistency
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
      fullWidth // optional: makes the field responsive
    />
  );
};

export default Input;
