import * as React from "react";
import { useAuthValue } from "../../auth-context";
import {
  Alert,
  Button,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";

import { db } from "../../firebase/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Layout from "../../components/organisms/layout";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import FormAddUsers from "../../components/molecules/formAddUsers";
import "./profile.css";
import TaskUser from "../../components/atoms/taskUser";
const theme = createTheme();

function Profile() {
  const { currentUser } = useAuthValue();
  const [listUsers, setListUsers] = React.useState([]);
  const [state, setState] = React.useState("default");

  React.useEffect(() => {
    onSnapshot(collection(db, "Users"), (snapshot) => {
      const filterUsers = snapshot?.docs?.map((doc) => {
        return { ...doc?.data(), id: doc?.id };
      });
      setListUsers(filterUsers);
    });
  }, []);

  function handleListUsers() {
    setState("listUsers");
  }

  function handleAddUsers() {
    setState("addUsers");
  }
  function handleUpdateUsers() {
    setState("updateUsers");
  }

  console.log(listUsers);

  const handleGoBackForm = () => {
    setState("default");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        className="container"
        container
        component="main"
        sx={{ height: "100%", display: "flex", justifyContent: "flex-start" }}
      >
        <CssBaseline />

        <Layout
          title="Configurações"
          backgroudGradient="linear-gradient(
            180deg,
            #3f88c5 19.98%,
            rgba(255, 255, 255, 0) 100%
          );"
          colorButton="#3f88c5"
        >
          {state === "default" && (
            <div className="container-layout-profile">
              <div>
                <h3>Seus dados</h3>
                <p>
                  <strong>Email: </strong>
                  {currentUser?.email}
                </p>

                <p>
                  {" "}
                  <strong>Email verificado: </strong>
                  {`${currentUser?.emailVerified}`}
                </p>
              </div>
              <div>
                <h3>Configurações</h3>

                <div className="container-config">
                  <IconButton
                    sx={{ dispaly: "flex", gap: "1rem", fontSize: 16 }}
                    onClick={handleListUsers}
                  >
                    <PeopleOutlinedIcon
                      sx={{ fontSize: 32, color: "#21a179" }}
                    />
                    <span className="container-config__title">
                      Listar usuários
                    </span>
                  </IconButton>
                </div>
                {listUsers.length === 0 && (
                  <div className="users-empty">
                    <Alert
                      fullWidth
                      severity="warning"
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
                      <p>Nenhum usuário cadastrado</p>
                    </Alert>
                  </div>
                )}

                <div className="container-config">
                  <IconButton
                    sx={{ dispaly: "flex", gap: "1rem", fontSize: 16 }}
                    onClick={handleAddUsers}
                  >
                    <GroupAddOutlinedIcon
                      sx={{ fontSize: 32, color: "#3f88c5" }}
                    />
                    <span className="container-config__title">
                      Adicionar usuários
                    </span>
                  </IconButton>
                </div>
                <div className="container-config">
                  <IconButton
                    sx={{ dispaly: "flex", gap: "1rem", fontSize: 16 }}
                    onClick={handleUpdateUsers}
                  >
                    <ModeOutlinedIcon sx={{ fontSize: 32, color: "#ffba06" }} />
                    <span className="container-config__title">
                      Alterar ou deletar usuários
                    </span>
                  </IconButton>
                </div>
              </div>
            </div>
          )}
          {state === "listUsers" && listUsers.length > 0 && (
            <div className="container-layout-profile">
              <div className="go-back">
                <Button
                  sx={{
                    fontSize: "12px",
                    textTransform: "none",
                    margin: "5px",
                    color: "#3f88c5",
                  }}
                  onClick={handleGoBackForm}
                >
                  Voltar para as configurações
                </Button>
              </div>
              <div className="container-list-users">
                <h3>Usuários cadastrados</h3>

                {listUsers?.map((user) => {
                  return (
                    <div className="list-users">
                      <span>Nome: {user.name}</span>
                      <span>E-mail: {user.email}</span>
                      <span>Descrição: {user.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {state === "addUsers" && (
            <div className="container-layout-profile">
              <div className="go-back">
                <Button
                  sx={{
                    fontSize: "12px",
                    textTransform: "none",
                    margin: "5px",
                    color: "#3f88c5",
                  }}
                  onClick={handleGoBackForm}
                >
                  Voltar para as configurações
                </Button>
              </div>
              <div className="container-list-users">
                <h3>Cadastrar usuários</h3>
                <FormAddUsers listUsers={listUsers} />
              </div>
            </div>
          )}

          {state === "updateUsers" && (
            <div className="container-layout-profile">
              <div className="go-back">
                <Button
                  sx={{
                    fontSize: "12px",
                    textTransform: "none",
                    margin: "5px",
                    color: "#3f88c5",
                  }}
                  onClick={handleGoBackForm}
                >
                  Voltar para as configurações
                </Button>
              </div>
              <div className="container-list-users">
                <h2>Usuários cadastrados</h2>

                {listUsers?.map((user, index) => {
                  console.log(user);
                  return (
                    <>
                      <Divider />

                      <div className="list-task-users">
                        <h3>{`Usuário: 000-${index}`} </h3>
                        <TaskUser
                          name={user.name}
                          description={user.description}
                          email={user.email}
                          id={user.id}
                        />
                      </div>
                      <Divider />
                    </>
                  );
                })}
              </div>
            </div>
          )}
        </Layout>
      </Grid>
    </ThemeProvider>
  );
}

export default Profile;
