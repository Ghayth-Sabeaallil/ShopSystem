import { TextField } from "@mui/material";

type InputProps = {
  text: string;
  label: string;
  value: string;
};

const Input = ({ text, label, value }: InputProps) => {
  return <TextField label={label} name={text} value={value} required />;
};

export default Input;
