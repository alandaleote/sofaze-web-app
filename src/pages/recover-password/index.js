import * as React from "react";
import { auth } from "../../firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";

import {
  Alert,
  Typography,
  TextField,
  Grid,
  Box,
  Paper,
  Button,
  ThemeProvider,
  createTheme,
  Avatar,
} from "@mui/material";

import { Link } from "react-router-dom";
import { Logo } from "../../components/icons";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const theme = createTheme();

export default function RecoverPassword() {
  const [email, setEmail] = React.useState("");
  const [msgType, setMsgType] = React.useState("");
  const [msg, setMsg] = React.useState("");

  function recoverPassword() {
    sendPasswordResetEmail(auth, email)
      .then((result) => {
        setMsgType("success");
        setMsg("Enviamos um link no seu email para você redefinir a sua senha");
      })
      .catch((error) => {
        setMsgType("error");
        setMsg("Verifique se o email está correto!");
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid
        className="container"
        container
        component="main"
        sx={{ height: "100vh" }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          sx={{ height: "100vh" }}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              mx: 4,
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box component="form" noValidate sx={{ mb: 10 }}>
              <Logo />
            </Box>

            <Avatar sx={{ bgcolor: "#ff5864" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Recuperar senha
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <Button
                type="button"
                onClick={recoverPassword}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Recuperar senha
              </Button>
              <Grid container mb="10px">
                {msgType === "error" && (
                  <Alert
                    fullWidth
                    severity="error"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                      padding: "0 15px",
                      fontSize: "14px",
                    }}
                  >
                    <p>{msg} &#128580;</p>
                  </Alert>
                )}
                {msgType === "success" && (
                  <Alert
                    fullWidth
                    severity="success"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                      padding: "0 15px",
                      fontSize: "14px",
                    }}
                  >
                    <p>{msg} &#128580;</p>
                  </Alert>
                )}
              </Grid>
              <Grid item>
                <Link className="link" to="/login" variant="body2">
                  Voltar para login!
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
