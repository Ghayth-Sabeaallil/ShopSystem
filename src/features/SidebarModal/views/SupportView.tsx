import { Typography, Button, Stack, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CallIcon from "@mui/icons-material/Call";
import CloseBtn from "../../../shared/components/CloseBtn";

type SupportViewProps = {
  onClose: () => void;
};
const SupportView = ({ onClose }: SupportViewProps) => {
  const theme = useTheme();

  return (
    <Stack spacing={2} alignItems="center" textAlign="center">
      <CloseBtn CloseModal={onClose} />
      <Typography variant="body1">help</Typography>

      <Typography variant="body1" fontStyle="italic">
        contactUs
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ transform: "translateX(-14px)" }}
      >
        <CallIcon fontSize="small" color="action" />
        <Link
          href="tel:0337991472"
          underline="hover"
          variant="body2"
          sx={{ color: theme.palette.text.primary }}
        >
          central: 033-799 14 72
        </Link>
      </Stack>

      <Button
        variant="contained"
        color="primary"
        href="https://www.ekelundstyr.se/service"
        target="_blank"
        rel="noopener noreferrer"
      >
        contact
      </Button>
    </Stack>
  );
};

export default SupportView;
