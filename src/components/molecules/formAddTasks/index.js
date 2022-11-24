import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Modal,
  Select,
  TextField,
} from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";

import { db } from "../../../firebase/firebase.config";
import { collection, onSnapshot, addDoc, Timestamp } from "firebase/firestore";

import "./formAddTasks.css";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  span: {
    fontSize: "10px",
  },
  select: {
    background: "white",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function FormAddTasks(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  //const [listCategory, setListCategory] = useState([]);
  //const [category, setCategory] = useState("");

  const [listUsers, setListUsers] = useState([]);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState("default");
  const [userId, setUserId] = useState("");
  const [titleTask, setTitleTask] = useState("");
  const [descriptionTask, setDescriptionTask] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Task"), {
        title: titleTask,
        description: descriptionTask,
        completed: false,
        created: Timestamp.now(),
        date_end: dateEnd,
        user_id: userId,
      });
      setMessageSuccess("Formulário enviado com sucesso!");
      setState("submiting");
      setOpen(true);
    } catch (err) {
      setMessageError("Erro ao enviar o formulário. Tente novamente!");
      setOpen(true);
      setState("submiting");
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "Users"), (snapshot) => {
      const filterUsers = snapshot?.docs?.map((doc) => {
        return { ...doc?.data(), id: doc?.id };
      });
      setListUsers(filterUsers);
      console.log(filterUsers);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleGoBackForm = () => {
    setOpen(false);
    setState("default");
  };

  const handleGoHome = () => {
    setState("default");
    navigate("/");
  };

  // const handleChange = (event) => {
  //   const value = event.target.value;
  //   setCategory(value);
  // };

  // const handleClick = (event) => {
  //   setCategory(event.target.value);
  // };

  // useEffect(() => {
  //   onSnapshot(collection(db, "CategoryTask"), (snapshot) => {
  //     const filterCategory = snapshot?.docs?.map((doc) => {
  //       return { ...doc?.data(), id: doc?.id };
  //     });
  //     setListCategory(filterCategory);
  //     console.log(filterCategory);
  //   });
  // }, []);

  return (
    <>
      {state === "submiting" && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <Grid container mb="10px">
              {messageError && (
                <Alert
                  fullWidth
                  severity="error"
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                    padding: "0 15px",
                    fontSize: "12px",
                  }}
                >
                  <p>
                    <strong>Ops! </strong>
                    {messageError} &#128580;
                  </p>
                </Alert>
              )}
              {messageSuccess && (
                <Alert
                  fullWidth
                  severity="success"
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                    padding: "0 15px",
                    fontSize: "12px",
                  }}
                >
                  <p>
                    <strong>Ops! </strong>
                    {messageSuccess}
                  </p>
                </Alert>
              )}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                sx={{ fontSize: "12px", textTransform: "none", margin: "5px" }}
                onClick={handleGoBackForm}
              >
                Voltar para o formulaŕio
              </Button>
              <Button
                sx={{ fontSize: "12px", textTransform: "none", margin: "5px" }}
                onClick={handleGoHome}
              >
                Voltar para a Home
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
      {state === "default" && (
        <form className="container-form-tasks">
          <div className="container-inputs">
            {/* <FormControl fullWidth>
          <span className={classes.span} id="demo-simple-select-label">
            Categorias
          </span>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            native
            value={category}
            onChange={handleChange}
          >
            {listCategory.length > 0 &&
              listCategory?.map((category, index) => {
                return (
                  <option
                    key={index}
                    value={category?.id}
                    name={category.title}
                    onClick={handleClick}
                  >
                    {category.title}
                  </option>
                );
              })}
          </Select>
        </FormControl> */}
            <FormControl fullWidth>
              <span className={classes.span} id="demo-simple-select-label">
                Usuários
              </span>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                native
                onChange={(e) => setUserId(e.target.value)}
                value={userId && userId}
              >
                {listUsers.length > 0 &&
                  listUsers?.map((user, index) => {
                    return (
                      <option
                        key={index}
                        value={user?.id}
                        name={user.name}
                        onClick={(e) => setUserId(e.target.value)}
                      >
                        {user.name}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Nome da tarefa"
              name="title"
              onChange={(e) => setTitleTask(e.target.value)}
              value={titleTask && titleTask}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Descrição da tarefa"
              name="description"
              onChange={(e) => setDescriptionTask(e.target.value)}
              value={descriptionTask && descriptionTask}
              autoFocus
            />

            <div className="input-date">
              <label>Data final:</label>
              <input
                required
                onChange={(e) => setDateEnd(e.target.value)}
                type="date"
                className="form-control"
                value={dateEnd && dateEnd}
              />
            </div>
          </div>

          <Button
            className="button-entry"
            type="button"
            onClick={handleSubmit}
            disabled={false}
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 3, background: "#21a179" }}
          >
            Enviar
          </Button>
        </form>
      )}
    </>
  );
}
