import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Grid, Box } from "@mui/material";
//import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
//import LocalAirportIcon from "@mui/icons-material/LocalAirport";
//import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Navbar from "../../components/molecules/nav-bar";
import ListCards from "../../components/molecules/listCards";

const theme = createTheme();

export default function Home(props) {
  const listCards = [
    // {
    //   title: "Supermercado",
    //   icons: <ShoppingCartIcon sx={{ fontSize: 32 }} />,
    //   color: "#ff5864",
    //   width: "164px",
    //   height: "107px",
    // },
    // {
    //   title: "Mala para viagem",
    //   icons: <LocalAirportIcon sx={{ fontSize: 32 }} />,
    //   color: "#3f88c5",
    //   width: "164px",
    //   height: "107px",
    // },
    // {
    //   title: "Reparos na casa",
    //   icons: <FormatPaintIcon sx={{ fontSize: 32 }} />,
    //   color: "#ffba06",
    //   width: "164px",
    //   height: "107px",
    // },
    {
      title: "Tarefas",
      link: "lista-de-tarefas",
      icons: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 32 }} />,
      color: "#ffba06",
      width: "164px",
      height: "107px",
    },
    {
      title: "Contas",
      icons: <AttachMoneyOutlinedIcon sx={{ fontSize: 32 }} />,
      color: "#21A179",
      width: "164px",
      height: "107px",
    },
  ];

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
            <Box component="div" mt={6} padding="1rem">
              <ListCards listCards={listCards} subTitle="Listas" />
            </Box>
          </Box>
          <Box
            component="div"
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
