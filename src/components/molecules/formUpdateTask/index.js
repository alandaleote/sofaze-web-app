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
import { doc, updateDoc, collection, onSnapshot } from "firebase/firestore";
import { Grid } from "@material-ui/core";
import formatDate from "../../../utils/functions";
import "./formUpdateTask.css";

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

export default function FormUpdateTask(props) {
  const { id, toEditTitle, toEditDescription, toEditName, toEditDate } = props;

  const classes = useStyles();
  const navigate = useNavigate();

  const [listUsers, setListUsers] = useState([]);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState("default");
  const [user, setUser] = useState(toEditName);
  const [titleTask, setTitleTask] = useState(toEditTitle);
  const [descriptionTask, setDescriptionTask] = useState(toEditDescription);
  const [dateEnd, setDateEnd] = useState(toEditDate);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "Task", id);
    try {
      await updateDoc(taskDocRef, {
        title: titleTask,
        description: descriptionTask,
        date_end: formatDate(dateEnd),
        user_name: user,
      });
      setMessageSuccess("Dados atualizados com sucesso!");
      setState("submiting");
      setOpen(true);
    } catch (err) {
      setMessageError("Erro ao editar os dados. Tente novamente!");
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
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
    setState("default");
  };

  const handleGoBackForm = () => {
    setOpen(false);
    setState("default");
  };

  const handleGoHome = () => {
    setState("default");
    navigate("/");
  };

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
              {messageError && (
                <Button
                  sx={{
                    fontSize: "12px",
                    textTransform: "none",
                    margin: "5px",
                  }}
                  onClick={handleGoBackForm}
                >
                  Voltar para o formulário
                </Button>
              )}
              <Button
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  margin: "5px",
                }}
                onClick={handleGoHome}
              >
                Ir para Home
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
      {state === "default" && (
        <form className="container-form-tasks-update">
          <div className="container-inputs">
            <FormControl fullWidth>
              <span className={classes.span} id="demo-simple-select-label">
                Usuários
              </span>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                native
              >
                {listUsers.length > 0 &&
                  listUsers?.map((user, index) => {
                    return (
                      <option
                        key={index}
                        value={user.id}
                        name={user.name}
                        onClick={(e) => setUser(user.name)}
                        onChange={(e) => setUser(user.name)}
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
            onClick={handleUpdate}
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 3, background: "#21a179" }}
          >
            Editar
          </Button>
        </form>
      )}
    </>
  );
}
