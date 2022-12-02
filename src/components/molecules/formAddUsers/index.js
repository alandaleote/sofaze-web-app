import React, { useState } from "react";
import { Alert, Box, Button, Modal, TextField } from "@mui/material";
import { db } from "../../../firebase/firebase.config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuthValue } from "../../../auth-context";
import { Grid } from "@material-ui/core";
import "./formAddUser.css";
import { useNavigate } from "react-router-dom";

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

export default function FormAddUsers(props) {
  const { listUsers = [] } = props;

  const navigate = useNavigate();

  const { currentUser } = useAuthValue();

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState("default");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [filteredEmail, setFilteredEmail] = useState("");


  function filterEmailUser(value) {
    if (value?.data.email === email) return value;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    listUsers.length > 0 && setFilteredEmail(listUsers.filter(filterEmailUser));
    console.log(filteredEmail)
      try {
        await addDoc(collection(db, "Users"), {
          name: name,
          email: email,
          uid: currentUser?.uid,
          description: description,
          created: Timestamp.now(),
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

  const handleClose = () => {
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
              <Button
                sx={{ fontSize: "12px", textTransform: "none", margin: "5px" }}
                onClick={handleGoHome}
              >
                Voltar
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
      {state === "default" && (
        <form className="container-form-tasks-add-users">
          <div className="container-inputs">
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name && name}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Descrição"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description && description}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email && email}
              autoFocus
            />
          </div>

          <Button
            className="button-entry"
            type="button"
            onClick={handleSubmit}
            disabled={name === "" || email === "" || description === ""}
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
