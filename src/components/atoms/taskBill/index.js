import React, { useState } from "react";

import { Checkbox, IconButton } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";

import "./taskBill.css";
import FormUpdateBill from "../../molecules/formUpdateBill";

export default function TaskBill(props) {
  const {
    pay_bill = "",
    user_id = ",",
    user_name = "",
    category_id = "",
    category_name = "",
    name = "",
    description = "",
    date = "",
    dateLabel = "",
    id = "",
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
    const taskDocRefDelete = doc(db, "Bills", id);
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
              <span className="name">{category_name && category_name}</span>
              <span className="name">{name && name}</span>
              <span className="description">{pay_bill && pay_bill}</span>
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
      {stateBills === "updateBill" && (
        <FormUpdateBill
          toEditName={name}
          toEditDescription={description}
          toEditDate={date}
          toEditPayBill={pay_bill}
          toEditUserId={user_id}
          toEditUserName={user_name}
          toEditCategoryId={category_id}
          toEditCategoryName={category_name}
          id={id}
        />
      )}
    </>
  );
}
