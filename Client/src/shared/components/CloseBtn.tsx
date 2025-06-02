import { Button, useTheme, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type CloseBtnProps = {
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  CloseModal?: () => void;
};

const CloseBtn = ({ setShowModal, CloseModal }: CloseBtnProps) => {
  const theme = useTheme();
  return (
    <Tooltip title="Close" placement="left">
      <Button
        onClick={() => {
          if (CloseModal) {
            CloseModal();
          } else if (setShowModal) {
            setShowModal(false);
          }
        }}
        sx={{
          backgroundColor: "transparent",
          paddingRight: 1,
          paddingTop: 1,
          transform: "scale(1)",
          minWidth: "unset",
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <CloseIcon sx={{ color: theme.palette.text.primary }} />
      </Button>
    </Tooltip>
  );
};

export default CloseBtn;
