import * as React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";

import Card from "../../atoms/card";

import "./listCards.css";

export default function ListCards(props) {
  return (
    <Container maxWidth="100%" width="100%" padding="5px">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "5px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            margin: "1rem",
            paddingLeft: "1rem",
            width: "100%",
          }}
        >
          <Typography>Listas</Typography>
        </Box>

        <div className="container-list-cards">
          <Card
            title="Supermercado"
            icons={<ShoppingCartIcon sx={{ fontSize: 32 }} />}
            color="#ff5864"
          ></Card>

          <Card
            title="Mala para viagem"
            icons={<LocalAirportIcon sx={{ fontSize: 32 }} />}
            color="#3f88c5"
          />
          <Card
            title="Reparos na casa"
            icons={<FormatPaintIcon sx={{ fontSize: 32 }} />}
            color="#ffba06"
          />
        </div>
      </Box>
    </Container>
  );
}
