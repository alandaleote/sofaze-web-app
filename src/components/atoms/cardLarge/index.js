import * as React from "react";
import ChromeReaderModeOutlinedIcon from "@mui/icons-material/ChromeReaderModeOutlined";

import "./cardLarge.css";

export default function CardLarge(props) {
  const {
    title = "title",
    icons = <ChromeReaderModeOutlinedIcon />,
    colorBackground = "#ff5864",
    colorText = "#ffffff",
    content,
    children,
  } = props;
  return (
    <div
      className="container-card-large"
      style={{ background: `${colorBackground}`, color: `${colorText}` }}
    >
      <div className="icons-card-large">{icons}</div>
      <p className="title-card-large">{title}</p>
      <p className="content-card-large">{content}</p>
      {children}
    </div>
  );
}
