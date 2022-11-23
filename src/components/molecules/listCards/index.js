import * as React from "react";
import { Box, Container, Typography } from "@material-ui/core";

import Card from "../../atoms/card";

import "./listCards.css";

export default function ListCards(props) {
  const { listCards = [], subTitle, children } = props;

  return (
    <Container
      component="div"
      maxWidth="100%"
      width="100%"
      overflowX={listCards > 2 ? "auto" : "hidden"}
      sx={{
        display: "flex",
        marginLeft: "0",
        marginRight: "0",
        paddingLeft: "0",
        paddingRight: "0",
        padding: "0",
        margin: "0",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            margin: "1rem 0",
            width: "100%",
          }}
        >
          {listCards.length > 0 && <Typography>{subTitle}</Typography>}
        </Box>

        {listCards.length > 0 && (
          <div className="container-list-cards">
            {listCards.map((card, index) => {
              return (
                <Card
                  key={index}
                  title={card?.title}
                  icons={card?.icons}
                  colorBackground={card?.color}
                  width={card?.width}
                  heith={card.heith}
                />
              );
            })}
          </div>
        )}
        {children}
      </Box>
    </Container>
  );
}
