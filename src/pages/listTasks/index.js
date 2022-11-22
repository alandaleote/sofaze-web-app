import React from "react";

import { CssBaseline, Grid } from "@mui/material";

import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/molecules/nav-bar";
import FormPayable from "../../components/molecules/formPayable";
import LayoutLists from "../../components/organisms/layoutLists";

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
            <LayoutLists title="Lista de tarefas" />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
