import React from "react";
import {
  Box,
  Container,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";

import ListCards from "../../molecules/listCards";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CardLarge from "../../atoms/cardLarge";

export default function LayoutLists(props) {
  const {
    titleCard,
    contentCard,
    colorBackgroundCard,
    icons,
    listCards = [],
    children,
  } = props;

  const useStyles = makeStyles(() => ({
    container: {
      background:
        "linear-gradient(180deg, #21A179 19.98%, rgba(255, 255, 255, 0) 100%)",
      maxWidth: "100%",
      maxHeight: "890px",
      height: "100%",
      width: "100%",
      margin: "0",
      padding: "0",
      marginTop: "-2rem",
    },
    typographyTitle: {
      color: "#ffffff",
      fontWeight: "900",
      fontSize: "48px",
      lineHeight: "56px",
    },
    typographySubTitle: {
      color: "#ffffff",
      fontWeight: "100",
      fontSize: "24px",
      lineHeight: "28px",
    },
  }));

  const classes = useStyles();

  const today = new Date();

  const day = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
  }).format(today);

  const month = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
  }).format(today);

  function onGoBack() {
    window.history.back();
  }

  return (
    <Container className={classes.container}>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          padding: "0",
          margin: "0",
        }}
      >
        <Box
          component="div"
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            marginLeft: "1rem",
            top: "10rem",
            gap: "3rem",
          }}
        >
          <div style={{ position: "absolute", top: "-5rem", left: "-1rem" }}>
            <IconButton className={classes.close} onClick={onGoBack}>
              <ArrowBackOutlinedIcon sx={{ fontSize: 32, color: "#ffffff" }} />
            </IconButton>
          </div>

          <Typography
            className={classes.typographyTitle}
            variant="h1"
            component="h3"
          >
            {day}
          </Typography>
          <Typography
            className={classes.typographySubTitle}
            variant="h1"
            component="h3"
          >
            {month}
          </Typography>
        </Box>

        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "1.5rem",
            mx: 2,
            height: "100vh",
            background: "#ffffff",
            marginTop: "150px",
            borderRadius: "30px 30px 0px 0px",
          }}
        >
          <CardLarge
            icons={icons}
            title={titleCard}
            content={contentCard}
            colorBackground={colorBackgroundCard}
          />
          <ListCards listCards={listCards} />
          {children}
        </Box>
      </Box>
    </Container>
  );
}
