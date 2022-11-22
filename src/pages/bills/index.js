import React from "react";

import { CssBaseline, Grid } from "@mui/material";

import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/molecules/nav-bar";
import FormPayable from "../../components/molecules/formPayable";

const theme = createTheme();

export default function Bills() {
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
          sx={{ height: "100%", overflow: "hidden" }}
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
              mt={10}
              mb={5}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src="/images/logo.png" alt="" width={100} />
            </Box>

            <Box
              noValidate
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                height: "100%",
              }}
            >
              <FormPayable />
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
      </Grid>
    </ThemeProvider>
  );
}
