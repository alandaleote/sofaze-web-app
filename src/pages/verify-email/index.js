import { useAuthValue } from "../../auth-context";
import { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase.config";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";

import "./verifyEmail.css";
import { Logo } from "../../components/icons";

const theme = createTheme();

function VerifyEmail() {
  const { currentUser } = useAuthValue();
  const [time, setTime] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser
        ?.reload()
        .then(() => {
          if (currentUser?.emailVerified) {
            clearInterval(interval);
            navigate("/");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }, 1000);
  }, [navigate, currentUser]);

  useEffect(() => {
    let interval = null;
    if ( time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTime(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [time]);

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setTime(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        className="container"
        container
        component="main"
        sx={{ height: "100vh" }}
      >
        <CssBaseline />
        <Grid
          className="container"
          item
          xs={12}
          sm={8}
          md={5}
          elevation={6}
          square
        >
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <Box component="form" noValidate sx={{ mb: 5 }}>
              <Logo width={200} />
            </Box>
            <Avatar sx={{ bgcolor: "#f44336", width: "70px", height: "70px" }}>
              <MarkEmailReadOutlinedIcon
                sx={{ width: "40px", height: "40px" }}
              />
            </Avatar>

            <Typography component="h1" variant="h5" textAlign="center">
              Verifique seu endere??o de e-mail
            </Typography>
            <Grid container mb="10px" justifyContent="center">
              <Typography component="p" fontWeight={600} textAlign="center">
                <span>Um e-mail de verifica????o foi enviado para:&nbsp; </span>
              </Typography>
              <Typography component="span" color="#42a5f5" textAlign="center">
                {currentUser?.email}
              </Typography>
            </Grid>
            <Typography component="p" textAlign="center">
              Siga as instru????es no e-mail para verificar sua conta!
            </Typography>
            <Button
              type="button"
              onClick={resendEmailVerification}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 5, background: "#3f88c5" }}
            >
              Reenviar email {time}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default VerifyEmail;
