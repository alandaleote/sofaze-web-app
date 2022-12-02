import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase/firebase.config";
import {
  collection,
  onSnapshot,
  addDoc,
  Timestamp,
  where,
  query,
} from "firebase/firestore";
import { useAuthValue } from "../../../auth-context";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { Grid } from "@material-ui/core";
import formatDate from "../../../utils/functions";
import "./formAddTask.css";

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
  const navigate = useNavigate();

  const { currentUser } = useAuthValue();

  //const [listCategory, setListCategory] = useState([]);
  //const [category, setCategory] = useState("");

  const [listUsers, setListUsers] = useState([]);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState("default");
  const [user, setUser] = useState("");
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
        date_end: formatDate(dateEnd),
        user_name: user,
        uid: currentUser?.uid,
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

  React.useEffect(() => {
    const q = query(
      collection(db, "Users"),
      where("uid", "==", currentUser.uid)
    );
    onSnapshot(q, (querySnapshot) => {
      setListUsers(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [currentUser.uid]);

  const handleClose = () => {
    setOpen(false);
    setState("default");
  };

  const handleGoBackList = () => {
    setOpen(false);
    setState("default");
    navigate("/lista-de-tarefas");
  };

  const handleGoHome = () => {
    setState("default");
    navigate("/");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setUser(value);
  };

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
              {messageError ? (
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
              ) : (
                messageSuccess && (
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
                    <p>{messageSuccess}</p>
                  </Alert>
                )
              )}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                sx={{ fontSize: "12px", textTransform: "none", margin: "5px" }}
                onClick={handleGoBackList}
              >
                Voltar para a lista
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
        <form className="container-form-tasks-add">
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
              <InputLabel id="demo-simple-select-label">Usuários</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChange}
                value={user}
                label="Usuários"
                fullWidth
                required
              >
                {listUsers.length > 0 &&
                  listUsers?.map((user, index) => {
                    return (
                      <MenuItem key={index} value={user.data.name}>
                        {user.data.name}
                      </MenuItem>
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
                id="date"
                required
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
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
            disabled={
              titleTask === "" ||
              user === "" ||
              dateEnd === undefined ||
              dateEnd === ""
            }
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
