import React from "react";

import {
  Button,
  CssBaseline,
  Grid,
  Paper,
} from "@mui/material";

import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const theme = createTheme();

export default function Home() {
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
            <Box
              container
              noValidate
              sx={{
                mb: 10,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Link className="link" to="/" variant="body2">
                  Profile
                </Link>
              </Box>
              <Button onClick={() => signOut(auth)} size="small">
                Sair
              </Button>
            </Box>
            <Box noValidate sx={{ mb: 10 }}>
              <img src="/images/logo.png" alt="" />
            </Box>

            <CardContent>
              Conteúdo
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}