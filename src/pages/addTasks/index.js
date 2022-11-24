import React from "react";

import { CssBaseline, Grid } from "@mui/material";

import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../../components/organisms/layout";
import FormAddTasks from "../../components/molecules/formAddTasks";

const theme = createTheme();

export default function AddTasks() {

  
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
              title="Adicionar tarefas"
              backgroudGradient=" linear-gradient(180deg, #F5BE2E 19.98%, rgba(255, 255, 255, 0) 100%); linear-gradient(180deg, #F5BE2E 19.98%, rgba(255, 255, 255, 0) 100%);"
              colorButton="#F5BE2E"
            > 
            <FormAddTasks/>
            </Layout>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
