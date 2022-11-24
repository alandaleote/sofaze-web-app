import React from "react";
import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import "./layout.css";
import { Link } from "react-router-dom";

export default function Layout(props) {
  const {
    title,
    backgroudGradient,
    colorButton,
    list = [],
    link,
    children,
  } = props;

  console.log(list);

  const useStyles = makeStyles(() => ({
    containerLayout: {
      background: backgroudGradient
        ? `${backgroudGradient}`
        : "linear-gradient(180deg, #21A179 19.98%, rgba(255, 255, 255, 0) 100%)",
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
      fontSize: "32px",
      lineHeight: "37px",
    },
  }));

  const classes = useStyles();

  function onGoBack() {
    window.history.back();
  }

  return (
    <Container className={classes.containerLayout}>
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
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "1rem",
            margin: "1rem",
            top: "5rem",
            gap: "3rem",
          }}
        >
          <IconButton className={classes.close} onClick={onGoBack}>
            <ArrowBackOutlinedIcon sx={{ fontSize: 32, color: "#ffffff" }} />
          </IconButton>

          <Typography
            className={classes.typographyTitle}
            variant="h1"
            component="h3"
          >
            {title}
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
            marginTop: "100px",
            borderRadius: "30px 30px 0px 0px",
          }}
        >
          {link && (
            <div className="button-add">
              <IconButton>
                <Link to={link}>
                  <AddCircleIcon
                    sx={{ fontSize: 70, color: `${colorButton}` }}
                  />
                </Link>
              </IconButton>
            </div>
          )}
          {children}
        </Box>
      </Box>
    </Container>
  );
}
