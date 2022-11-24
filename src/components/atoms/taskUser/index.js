import React, { useState } from "react";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";

import "./taskUser.css";
import FormUpdateUser from "../../molecules/formUpdateUser";
import { IconButton } from "@mui/material";

export default function TaskUser(props) {
  const {
    name = "",
    description = "",
    email = "",
    id = "",
  } = props;

  const [state, setState] = useState("defaultForm");

  const handleDelete = async () => {
    const userDocRefDelete = doc(db, "Users", id);
    try {
      await deleteDoc(userDocRefDelete);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {state === "defaultForm" && (
        <div className="container-box">
          <div className="container-user">
            <div className="container-content">
              <span >Name: {name && name}</span>
              <span >Descrição: {description && description}</span>
              <span >E-mail: {email && email}</span>
            </div>
          </div>
          <div className="container-actions">
            <IconButton onClick={() => setState("updateUser")}>
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
      {state === "updateUser" && (
        <FormUpdateUser
          toEditName={name}
          toEditDescription={description}
          toEditeEmail={email}
          id={id}
        />
      )}
    </>
  );
}
