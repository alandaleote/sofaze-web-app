import React from "react";

import { CssBaseline, Grid } from "@mui/material";

import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/molecules/nav-bar";

const theme = createTheme();

export default function Home() {
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
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img src="/images/logo.png" alt="" />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Navbar />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
