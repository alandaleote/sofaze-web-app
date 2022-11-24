import React, { useState } from "react";

import { IconButton } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";

import "./task.css";
import FormUpdateTask from "../../molecules/formUpdateTask";

export default function Task(props) {
  const {
    name = "",
    description = "",
    date = "",
    id = "",
    title = "",
    completed,
  } = props;

  const [checked, setChecked] = React.useState(completed);
  const [state, setState] = useState("defaultForm");

  const handleChange = async () => {
    const taskDocRef = doc(db, "tasks", id);
    try {
      await updateDoc(taskDocRef, {
        completed: checked,
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = async () => {
    const taskDocRef = doc(db, "tasks", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {state === "defaultForm" && (
        <div className="container">
          <div className="container-task">
            <label
              htmlFor={`checkbox-${id}`}
              className="checkbox-custom-label"
              onClick={() => setChecked(!checked)}
            ></label>
            <input
              id={`checkbox-${id}`}
              className="checkbox-custom"
              name="checkbox"
              checked={checked}
              onChange={handleChange}
              type="checkbox"
            />
            <div className="container-content">
              <span className="name">{name && name}</span>
              <span className="description">{description && description}</span>
              <span className="date">{date && date}</span>
            </div>
          </div>
          <div className="container-actions">
            <IconButton onClick={() => setState("update")}>
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
      {state === "update" && (
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
