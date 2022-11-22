import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@material-ui/core";

export default function Card(props) {
  const { title = "title", icons, color = "#ff5864", children } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 164,
          height: 107,
        },
      }}
    >
      <Paper
        elevation={3}
        rounded={true}
        variant="outlined"
        sx={{
          background: color,
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "1rem",
            gap: "1rem",
            background: color,
          }}
        >
          <Box>{icons}</Box>
          <Typography>{title}</Typography>
          {children}
        </Box>
      </Paper>
    </Box>
  );
}
