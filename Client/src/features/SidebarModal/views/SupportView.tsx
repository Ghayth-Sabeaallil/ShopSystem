import { Typography, Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import wahtsappSVG from "/assets/WhatsAppButtonGreenLarge.svg";

const SupportView = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="body1">{t(`help.contact`)}</Typography>
      <a aria-label="Chat on WhatsApp" href="https://wa.me/46720464311">
        <img alt="Chat on WhatsApp" src={wahtsappSVG} />
      </a>
      <Button
        variant="contained"
        color="primary"
        href="mailto:ghaessesa58@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Typography variant="body1">{t(`help.mailUs`)}</Typography>
      </Button>
    </Box>
  );
};

export default SupportView;
