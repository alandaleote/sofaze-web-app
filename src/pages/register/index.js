import * as React from "react";
import { useState } from "react";
import { auth , db} from "../../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, addDoc, Timestamp } from "firebase/firestore";

import { Alert, Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Logo } from "../../components/icons";
import "./register.css";

const theme = createTheme();

export default function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = React.useState("");
  const [msgType, setMsgType] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setMsgType("errorPasswordVerify");
        setError("As senhas não correspondem.");
        return;
      }
    }
    return isValid;
  };

  const register = (e) => {
    e.preventDefault();
    setError("");
    if (validatePassword()) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              addDoc(collection(db, "Users"), {
                name: name,
                email: email,
                uid: auth.currentUser?.uid,
                description: description,
                created: Timestamp.now(),
              });

              setMsgType("sucesso");
              navigate("/verify-email");
            })
            .catch((error) => {
              console.log(error)
              setMsgType("error");
              alert(error.message);
              switch (error.message) {
                default:
                  setMsg("Um erro ocorreu. Tente novamente mais tarde!");
              }
            });
        })
        .catch((error) => {
          alert(error.message);
          setMsgType("error");
          switch (error.message) {
            case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
              setMsg(
                "O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login com falha. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde."
              );
              break;
            case "Firebase: Error (auth/wrong-password).":
              setMsg("Senha inválida");
              break;
            case "Firebase: Error (auth/user-not-found).":
              setMsg("Este usuário não é válido!");
              break;
            case "The email address is already in use by another account":
              setMsg("Este email já está sendo utilizado por outro usuário.");
              break;
            case "Firebase: Error (auth/invalid-email).":
              setMsg("O formato do seu email ou senha é inválido!");
              break;
            default:
              setMsg(
                "Não foi possível realizar o cadastro. Tente novamente mais tarde!"
              );
          }
        });
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
          item
          xs={12}
          sm={8}
          md={5}
          sx={{ height: "100vh" }}
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
              <Logo width={200} />
            </Box>

            <Avatar sx={{ bgcolor: "#ff5864" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Cadastro
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nome"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Descrição"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description && description}
                autoFocus
              />
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

              <TextField
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <TextField
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="button"
                onClick={register}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, background: "#3f88c5" }}
              >
                Entrar
              </Button>
              <Grid container mb="10px">
                {msgType === "errorPasswordVerify" && (
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
                    <p>{error} &#128580;</p>
                  </Alert>
                )}
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
              </Grid>
              <Grid item>
                <Link className="link" to="/login" variant="body2">
                  {"Já tem uma conta? Faça o login!"}
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
