import * as React from "react";
import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";

import Card from "../../atoms/card";

export default function LayoutLists(props) {
  const useStyles = makeStyles((theme) => ({
    inputLabel: {
      margin: theme.spacing(1),
      top: "-1.2rem",
      left: "-1.2rem",
    },
    select: {
      background: "white",
    },
  }));
  const { title, list = [] } = props;

  return (
    <Container className="" maxWidth="100%" width="100%" padding="5px">
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
          <Typography>{title}</Typography>
        </Box>
      </Box>
    </Container>
  );
}
