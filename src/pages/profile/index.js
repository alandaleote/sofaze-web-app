import * as React from "react";
import { useAuthValue } from "../../auth-context";
import {
  Button,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  ThemeProvider,
} from "@mui/material";

import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

import "./profile.css";

const theme = createTheme();

function Profile() {
  const { currentUser } = useAuthValue();

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
            <Box noValidate sx={{ mb: 10 }}>
              <img src="/images/logo.png" alt="" />
            </Box>
            <Button onClick={() => signOut(auth)} size="small"  sx={{ mt: 3, mb: 2}}>
              Sair
            </Button>
            <CardContent>
              <strong>Email: </strong>
              {currentUser?.email}
            </CardContent>
            <CardContent>
              <strong>Email verificado: </strong>
              {`${currentUser?.emailVerified}`}
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Profile;
