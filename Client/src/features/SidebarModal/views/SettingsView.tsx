import { Box, Typography, useTheme } from "@mui/material";
import { SwitchMode } from "../Components/SwitchMode";
import { SwitchLang } from "../Components/SwitchLang";
import { useTranslation } from "react-i18next";
import Btn from "../../../shared/components/Btn";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutApi } from "../api/api";

const SettingsView = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        flexDirection: "column",
        width: 250,
        alignItems: "center",
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
        {t(`settings.title`)}
      </Typography>
      <SwitchMode />
      <SwitchLang />
      <Btn
        text={t(`settings.logout`)}
        icon={LogoutIcon}
        disabled={false}
        onClick={logoutApi.logout}
      />
    </Box>
  );
};

export default SettingsView;
