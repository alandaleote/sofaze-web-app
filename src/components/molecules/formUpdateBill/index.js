import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../../auth-context";
import { db } from "../../../firebase/firebase.config";
import {
  doc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
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
import "./formUpdateBill.css";

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

export default function FormUpdateBill(props) {
  const {
    id,
    toEditDescription,
    toEditDate,
    toEditName,
    toEditPayBill,
    toEditUserId,
    toEditUserName,
    toEditCategoryId,
    toEditCategoryName,
  } = props;

  const categoryList = [
    { id: "others", name: "Outros" },
    { id: "transport", name: "Transporte" },
    { id: "supermarket", name: "Supermercado" },
    { id: "fun", name: "Diversão" },
  ];

  const { currentUser } = useAuthValue();
  const classes = useStyles();
  const navigate = useNavigate();

  const [listUsers, setListUsers] = useState([]);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState("default");
  const [user, setUser] = useState({ id: toEditUserId, name: toEditUserName });
  const [name, setName] = useState(toEditName);
  const [payBill, setPayBill] = useState(toEditPayBill);
  const [categoryBill, setCategoryBill] = useState({
    id: toEditCategoryId,
    name: toEditCategoryName,
  });
  const [description, setDescription] = useState(toEditDescription);
  const [dateEnd, setDateEnd] = useState(toEditDate);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "Bills", id);
    try {
      await updateDoc(taskDocRef, {
        category_id: categoryBill?.id,
        category_name: categoryBill?.name,
        user_name: user?.id,
        user_id: user?.name,
        name: name,
        pay_bill: parseFloat(payBill).toFixed(2),
        description: description,
        date_end: formatDate(dateEnd),
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
        <form className="container-form-bills-update">
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
                        value={user.data.id}
                        name={user.data.name}
                        onClick={(e) =>
                          setUser({
                            id: e.target.value,
                            name: user.data.name,
                          })
                        }
                        onChange={(e) =>
                          setUser({
                            id: e.target.value,
                            name: user.data.name,
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
                {categoryList.length > 0 &&
                  categoryList?.map((category, index) => {
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
              id="name"
              label="Nome da conta"
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
              label="Descrição da conta"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description && description}
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
            onClick={handleUpdate}
            disabled={false}
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
