import * as React from "react";
import { useAuthValue } from "../../auth-context";
import { CssBaseline, Grid } from "@mui/material";

import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";

import { createTheme, ThemeProvider } from "@mui/material/styles";

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
        sx={{ height: "100%" }}
      >
        <CssBaseline />

        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          sx={{ height: "100%" }}
          elevation={6}
          square
        >
          <Box
            sx={{
              mx: 4,
              height: "100vh",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Box
              noValidate
              sx={{
                mb: 10,
                display: "flex",
                flexDirection: "column",
                gap: 5,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img src="/images/logo.png" alt="" />
              <Box>
                <CardContent>
                  <strong>Email: </strong>
                  {currentUser?.email}
                </CardContent>
                <CardContent>
                  <strong>Email verificado: </strong>
                  {`${currentUser?.emailVerified}`}
                </CardContent>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Profile;
