import { Typography, Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const SupportView = () => {
  const { t } = useTranslation();

  return (
    <Box>
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
    </Box>
  );
};

export default SupportView;
