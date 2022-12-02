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
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import formatDate from "../../../utils/functions";
import "./formAddBill.css";

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

const categoryList = [
  { id: "others", name: "Outros" },
  { id: "transport", name: "Transporte" },
  { id: "supermarket", name: "Supermercado" },
  { id: "fun", name: "Diversão" },
];

export default function FormAddBills(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currentUser } = useAuthValue();

  const [listUsers, setListUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [listCategory, setListCategory] = useState(categoryList);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState("default");
  const [user, setUser] = useState({ user_id: "", user_name: "" });
  const [categoryBill, setCategoryBill] = useState({ id: "others", name: "Outros" });
  const [nameBill, setNameBill] = useState("");
  const [descriptionBill, setDescriptionBill] = useState("");
  const [payBill, setPayBill] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Bills"), {
        name: nameBill,
        description: descriptionBill,
        pay_bill: parseFloat(payBill).toFixed(2),
        completed: false,
        created: Timestamp.now(),
        date_end: formatDate(dateEnd),
        user_id: user.user_id,
        user_name: user.user_name,
        category_id: categoryBill?.id,
        category_name: categoryBill?.name,
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

  const handleGoBackList= () => {
    setOpen(false);
    setState("default");
    navigate("/controle-de-contas");
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
                onClick={handleGoBackList}
              >
                Voltar para lista de contas
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
        <form className="container-form-bills-add">
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
                        name={user.data.name}
                        onClick={(e) =>
                          setUser({
                            user_id: e.target.value,
                            user_name: user.data.name,
                          })
                        }
                        onChange={(e) =>
                          setUser({
                            user_id: e.target.value,
                            user_name: user.data.name,
                          })
                        }
                      >
                        {user.data.name}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <span className={classes.span} id="demo-simple-select-label">
                Categorias
              </span>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                native
              >
                {listCategory.length > 0 &&
                  listCategory?.map((category, index) => {
                    return (
                      <option
                        key={index}
                        value={category.id}
                        name={category.name}
                        onClick={(e) =>
                          setCategoryBill({
                            id: e.target.value,
                            name: category.name,
                          })
                        }
                        onChange={(e) =>
                          setCategoryBill({
                            id: e.target.value,
                            name: category.name,
                          })
                        }
                      >
                        {category?.name}
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
              label="Nome da conta"
              name="title"
              onChange={(e) => setNameBill(e.target.value)}
              value={nameBill && nameBill}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Descrição da conta"
              name="description"
              onChange={(e) => setDescriptionBill(e.target.value)}
              value={descriptionBill && descriptionBill}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="pay"
              label="Valor da conta ex: $0.00"
              name="pay"
              onChange={(e) => setPayBill(e.target.value)}
              value={payBill && payBill}
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
              nameBill === "" || descriptionBill === "" || payBill === ""
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
