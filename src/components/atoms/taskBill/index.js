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
    user_name = "",
    category_id = "",
    category_name = "",
    title = "",
    description = "",
    date = "",
    dateLabel = "",
    id = "",
    completed,
  } = props;

  const [checked, setChecked] = React.useState(completed);
  const [stateBills, setStateBills] = useState("defaultForm");

  console.log(stateBills)

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

  const formatValue = (value) => {
    value = value.replace(".", ',');
    value = "R$ " + value;
    return value;
  }

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
              <span className="name">{title && title}</span>
              <span className="description">{pay_bill && formatValue(pay_bill)}</span>
              <span className="date">
                {dateLabel}
                {date && date}
              </span>
              <span className="name">{user_name && user_name}</span>
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
          toEditTitle={title}
          toEditDescription={description}
          toEditDate={date}
          toEditPayBill={pay_bill}
          toEditUserName={user_name}
          toEditCategoryId={category_id}
          toEditCategoryName={category_name}
          id={id}
        />
      )}
    </>
  );
}
