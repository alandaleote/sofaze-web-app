import React from "react";

import { CssBaseline, Grid } from "@mui/material";

import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Layout from "../../components/organisms/layout";

const theme = createTheme();

export default function ListBills() {
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
            noValidate
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              height: "100%",
            }}
          >
            <Layout
              title="Controle de Contas"
            />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
