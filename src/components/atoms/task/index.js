import * as React from "react";

import { Checkbox } from "@mui/material";

import "./task.css";

export default function Task(props) {
  const { name, description, date } = props;

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div className="container-task">
      <Checkbox
        checked={checked}
        onChange={handleChange}
        color="success"
        inputProps={{ "aria-label": "controlled" }}
      />
      <div className="container-content">
        <span className="name">{name && name}</span>
        <span className="description">{description && description}</span>
        <span className="date">{date && date}</span>
      </div>
    </div>
  );
}
