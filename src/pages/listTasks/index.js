import React from "react";

import { CssBaseline, Grid } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../../components/organisms/layout";

const theme = createTheme();

export default function ListTasks() {
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
          link="/adicionar-tarefas"
          title="Lista de tarefas"
          backgroudGradient=" linear-gradient(180deg, #F5BE2E 19.98%, rgba(255, 255, 255, 0) 100%); linear-gradient(180deg, #F5BE2E 19.98%, rgba(255, 255, 255, 0) 100%);"
          colorButton="#F5BE2E"
        />
      </Grid>
    </ThemeProvider>
  );
}
