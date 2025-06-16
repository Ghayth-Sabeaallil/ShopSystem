import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import bg from "/assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { logApi } from "./api/loginApi";
import { useAuth } from "../../shared/context/Context/AuthContext ";

const LoginPage = () => {
  const theme = useTheme();
  const { verifyAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
  }, [username, password]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await logApi.login(username, password);
      await verifyAuth();
      navigate("/");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin();
    }
  };

  const onClickHandle = () => {
    handleLogin();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: theme.palette.primary.dark,
        position: "relative",
      }}
    >
      <Box
        component="img"
        src={bg}
        alt="Logo"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.12,
          width: 700,
          height: 700,
          zIndex: 1,
        }}
      />
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          textAlign: "center",
          background: theme.palette.secondary.main,
          borderRadius: "12px",
          boxShadow: theme.shadows[8],
          zIndex: 2,
          position: "relative",
        }}
      >
        <Typography
          variant="h5"
          marginBottom={2}
          color={theme.palette.primary.main}
        >
          Logga in
        </Typography>
        <form onKeyDown={handleKeyDown}>
          <TextField
            required
            fullWidth
            label="E-post"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            required
            fullWidth
            label="Lösenord"
            variant="outlined"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onClickHandle}
            disabled={!username || !password}
            sx={{
              marginTop: 2,
              height: 50,
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "none",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            {loading ? "Logging in..." : "Logga in"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
