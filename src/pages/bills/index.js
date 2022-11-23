import React from "react";

import { CssBaseline, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LayoutLists from "../../components/organisms/layoutLists";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

const theme = createTheme();

export default function Bills() {
  const listCards = [
    {
      title: "Supermercado",
      icons: <ShoppingCartIcon sx={{ fontSize: 32 }} />,
      color: "#ff5864",
      width: "100px",
      height: "120px",
    },
    {
      title: "Mala para viagem",
      icons: <LocalAirportIcon sx={{ fontSize: 32 }} />,
      color: "#3f88c5",
      width: "100px",
      height: "120px",
    },
    {
      title: "Reparos na casa",
      icons: <FormatPaintIcon sx={{ fontSize: 32 }} />,
      color: "#ffba06",
      width: "100px",
      height: "120px",
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

        <LayoutLists
          title="Page bills"
          listCards={listCards}
          icons={<AttachMoneyOutlinedIcon sx={{ fontSize: 48 }} />}
          colorBackgroundCard="#21a179"
          titleCard="Controle de contas"
          contentCard="Próximo vencimento: conta de luz 10 de dezembro"
        ></LayoutLists>
      </Grid>
    </ThemeProvider>
  );
}
