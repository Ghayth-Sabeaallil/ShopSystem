import { Typography, Button, Stack } from "@mui/material";
import CloseBtn from "../../../shared/components/CloseBtn";
import { useTranslation } from "react-i18next";

type SupportViewProps = {
  onClose: () => void;
};
const SupportView = ({ onClose }: SupportViewProps) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={2} alignItems="center" textAlign="center">
      <CloseBtn CloseModal={onClose} />
      <Typography variant="body1">{t(`help.contact`)}</Typography>
      <Typography variant="body1">0046 720 464 311</Typography>
      <Button
        variant="contained"
        color="primary"
        href="mailto:ghaessesa58@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t(`help.mailUs`)}
      </Button>
    </Stack>
  );
};

export default SupportView;
