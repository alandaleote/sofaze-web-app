import React, { useState } from "react";

import { Checkbox, IconButton } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";

import "./taskBill.css";
import FormUpdateTask from "../../molecules/formUpdateTask";

export default function TaskBill(props) {
  const {
    name = "",
    description = "",
    date = "",
    dateLabel = "",
    id = "",
    title = "",
    completed,
  } = props;

  const [checked, setChecked] = React.useState(completed);
  const [stateBills, setStateBills] = useState("defaultForm");

  const handleChange = async (event) => {
    setChecked(event.target.checked);
    if (event.target.checked !== completed) {
      const taskDocReff = doc(db, "Bills", id);

      try {
        await updateDoc(taskDocReff, {
          completed: event.target.checked,
        });
      } catch (err) {
        alert(err);
      }
    }
  };

  function handleClick() {
    setStateBills("updateBill");
  }

  const handleDelete = async () => {
    const taskDocRefDelete = doc(db, "Bill", id);
    try {
      await deleteDoc(taskDocRefDelete);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {stateBills === "defaultForm" && (
        <div className="container-box-bills">
          <div className="container-bill">
            <Checkbox
              checked={checked}
              onChange={handleChange}
              onClick={() => setChecked(!checked)}
              color="success"
              inputProps={{ "aria-label": "controlled" }}
            />
            <div className="container-content">
              <span className="name">{name && name}</span>
              <span className="description">{description && description}</span>
              <span className="date">
                {dateLabel}
                {date && date}
              </span>
            </div>
          </div>
          <div className="container-actions">
            <IconButton onClick={handleClick}>
              <ModeEditOutlineOutlinedIcon
                sx={{ fontSize: 24, color: "#f7971b" }}
              />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverOutlinedIcon
                sx={{ fontSize: 24, color: "#ff5864" }}
              />
            </IconButton>
          </div>
        </div>
      )}
      {stateBills === "updateBills" && (
        <FormUpdateTask
          toEditName={name}
          toEditDescription={description}
          toEditeDate={date}
          toEditeTitle={title}
          id={id}
        />
      )}
    </>
  );
}
