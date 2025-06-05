import { useState } from "react";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import type { SidebarButtonProps } from "../types/SidebarButtonProps";

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  label,
  open,
  onClick,
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const theme = useTheme();

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);
    if (onClick) onClick();
  };

  return (
    <Button
      onClick={handleClick}
      sx={{
        width: 80,
        height: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        cursor: "pointer",
        transition: "background 0.2s ease-in-out, transform 0.1s ease-in-out",
        backgroundColor: isClicked ? theme.palette.action.hover : "transparent",
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
        padding: "12px",
        marginTop: 2,
      }}
    >
      {typeof icon === "string" ? (
        <img
          src={icon}
          alt={`${label} Icon`}
          style={{
            transition: theme.transitions.create("transform", {
              duration: theme.transitions.duration.short,
            }),
            transform: isClicked ? "scale(0.9)" : "scale(1)",
          }}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: isClicked ? "scale(0.9)" : "scale(1)",
            transition: theme.transitions.create("transform", {
              duration: theme.transitions.duration.short,
            }),
          }}
        >
          {icon}
        </Box>
      )}
      {open && (
        <Typography
          variant="body2"
          color={theme.palette.text.secondary}
          sx={{ fontWeight: 900 }}
        >
          {label}
        </Typography>
      )}
    </Button>
  );
};

export default SidebarButton;
