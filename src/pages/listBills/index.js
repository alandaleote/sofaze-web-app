import React from "react";

import { Alert, CssBaseline, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Layout from "../../components/organisms/layout";
import Task from "../../components/atoms/task";

const theme = createTheme();

export default function ListBills() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100%" }}>
        <CssBaseline />
        <Layout
          title="Controle de Contas"
          link="/adicionar-contas"
          backgroudGradient="linear-gradient(
            180deg,
            #21a179 19.98%,
            rgba(255, 255, 255, 0) 100%
          );"
          colorButton="#21a179"
        >
          <div className="container-layout-tasks">
            <Task
              name="Energia"
              description=""
              date="5/12/2022"
              title="Energia"
              completed={false}
              dateLabel="Vencimento - próximo: "
            />
          </div>

          <div className="tasks-empty">
            <Alert
              fullWidth
              severity="warning"
              sx={{
                width: "100%",
                height: "auto",
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
                padding: "0 15px",
                fontSize: "12px",
              }}
            >
              <p>Nenhuma tarefa cadastrada</p>
            </Alert>
          </div>
        </Layout>
      </Grid>
    </ThemeProvider>
  );
}
