import { Box, Typography, useTheme } from "@mui/material";

import CloseBtn from "../../../shared/components/CloseBtn";
import { SwitchMode } from "../Components/SwitchMode";
import { SwitchLang } from "../Components/SwitchLang";
import { useTranslation } from "react-i18next";

type SupportViewProps = {
  onClose: () => void;
};
const SettingsView = ({ onClose }: SupportViewProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box>
      <CloseBtn CloseModal={onClose} />
      <Box sx={{ display: "flex", gap: 3, flexDirection: "column" }}>
        <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.primary,
              letterSpacing: 0,
              fontSize: 24,
              fontWeight: 800,
              width: "100%",
              textAlign: "left",
            }}
          >
            {t(`sideBar.mode`)}
          </Typography>
          <SwitchMode />
        </Box>
        <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
          <Typography
            sx={{
              color: theme.palette.text.primary,
              letterSpacing: 0,
              fontSize: 24,
              fontWeight: 800,
              width: "100%",
              textAlign: "left",
            }}
          >
            {t(`sideBar.language`)}
          </Typography>
          <SwitchLang />
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsView;
