import React from "react";

import { CssBaseline, Grid } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../../components/organisms/layout";
import FormAddBills from "../../components/molecules/formAddBills";

const theme = createTheme();

export default function AddBills() {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        className="container"
        container
        component="main"
        sx={{ height: "100%" }}
      >
        <CssBaseline />

        <Layout
          title="Controle de Contas"
          backgroudGradient="linear-gradient(
            180deg,
            #21a179 19.98%,
            rgba(255, 255, 255, 0) 100%
          );"
          colorButton="#21a179"
        >
          <FormAddBills />
        </Layout>
      </Grid>
    </ThemeProvider>
  );
}
