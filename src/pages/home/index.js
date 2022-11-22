import React from "react";

import { CssBaseline, Grid } from "@mui/material";

import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/molecules/nav-bar";
import ListCards from "../../components/molecules/listCards";

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

        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Box
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img src="/images/logo.png" alt="" />
            <Box mt={6}>
              <ListCards />
            </Box>
          </Box>
          <Box
            mb={3}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Navbar />
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
