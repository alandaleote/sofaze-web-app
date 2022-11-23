import * as React from "react";
import ChromeReaderModeOutlinedIcon from "@mui/icons-material/ChromeReaderModeOutlined";
import "./card.css";

export default function Card(props) {
  const {
    title = "title",
    icons = <ChromeReaderModeOutlinedIcon />,
    colorBackground = "#ff5864",
    colorText = "#ffffff",
    width = "164px",
    height = "107px",
    children,
  } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        background: `${colorBackground}`,
        color: `${colorText}`,
        minWidth: `${width}`,
        width: `${width}`,
        height: `${height}`,
      }}
    >
      <div className="container-card">
        <div>{icons}</div>
        <p className="title-card">{title}</p>
      </div>
      {children}
    </div>
  );
}
