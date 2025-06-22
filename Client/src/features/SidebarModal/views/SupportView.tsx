import { Typography, Button, Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

const SupportView = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        width: 400,
        gap: 2,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.primary,
          letterSpacing: 0,
          fontSize: 24,
          fontWeight: 800,
        }}
      >
        {t(`help.contact`)}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        href="https://wa.me/46720464311"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ display: "flex", gap: 2 }}
      >
        <WhatsAppIcon />
        <Typography variant="body1">{t(`help.whatsApp`)}</Typography>
      </Button>
      <Button
        variant="contained"
        color="primary"
        href="mailto:ghaessesa58@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ display: "flex", gap: 2 }}
      >
        <EmailIcon />
        <Typography variant="body1">{t(`help.mailUs`)}</Typography>
      </Button>
    </Box>
  );
};

export default SupportView;
