import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

import { Alert, CssBaseline, Grid } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../../components/organisms/layout";
import Task from "../../components/atoms/task";

import "./listTasks.css";
//import { formatDateToday } from "../../utils/functions";

const theme = createTheme();

export default function ListTasks() {
  const [tasks, setTasks] = useState([]);
  // const [filteredDateEqual, setFilteredDateEqual] = useState([]);
  // const [filteredDateNext, setFilteredDateNext] = useState([]);

  //const today = new Date();

  //const newDate = formatDateToday(today);

  // function filterDateEqual(value) {
  //   if (
  //     value?.data?.date_end.replace(/[^\d]+/g, "") ===
  //     newDate.replace(/[^\d]+/g, "")
  //   )
  //     return value;
  // }

  // function filterDateNext(value) {
  //   if (
  //     value?.data?.date_end.replace(/[^\d]+/g, "") >
  //     newDate.replace(/[^\d]+/g, "")
  //   )
  //     return value;
  // }

  // function renderTasksEqual() {
  //   tasks.length > 0 && setFilteredDateEqual(tasks?.filter(filterDateEqual));
  // }
  // function renderTasksNext() {
  //   tasks.length > 0 && setFilteredDateNext(tasks?.filter(filterDateNext));
  // }

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const q = query(collection(db, "Task"), orderBy("created", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  // useEffect(() => {
  //   renderTasksNext();
  //   renderTasksEqual();
  // });

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{ height: "100%", display: "flex", justifyContent: "flex-start" }}
      >
        <CssBaseline />

        <Layout
          link="/adicionar-tarefas"
          title="Lista de tarefas"
          backgroudGradient=" linear-gradient(180deg, #F5BE2E 19.98%, rgba(255, 255, 255, 0) 100%); linear-gradient(180deg, #F5BE2E 19.98%, rgba(255, 255, 255, 0) 100%);"
          colorButton="#F5BE2E"
        >
          {tasks.length > 0 ? (
            <div className="container-layout-tasks">
              {tasks.map((task, index) => {
                console.log(task);
                return (
                  <Task
                    key={index}
                    name={task?.data?.user_name}
                    description={task?.data?.description}
                    date={task?.data?.date_end}
                    id={task?.id}
                    title={task?.data?.title}
                    completed={task?.data?.completed}
                    dateLabel="Recorrente - hoje: "
                  />
                );
              })}

              {/* {filteredDateEqual.length > 0 && (
                <div className="title-next">Hoje</div>
              )}
              {filteredDateEqual.length > 0 &&
                filteredDateEqual.map((task, index) => {
                  console.log(task)
                  return (
                    <Task
                      key={index}
                      name={task?.data?.user_name}
                      description={task?.data?.description}
                      date={task?.data?.date_end}
                      id={task?.id}
                      title={task?.data?.title}
                      completed={task?.data?.completed}
                      dateLabel="Recorrente - hoje: "
                    />
                  );
                })}

              {filteredDateNext.length > 0 && (
                <div className="title-next">Proxímos</div>
              )}
              {filteredDateNext.length > 0 &&
                filteredDateNext.map((task, index) => {
                  console.log(task)
                  return (
                    <Task
                      key={index}
                      name={task?.data?.user_name}
                      description={task?.data?.description}
                      date={task?.data?.date_end}
                      id={task?.id}
                      title={task?.data?.title}
                      completed={task?.data?.completed}
                      dateLabel="Recorrente - próximo: "
                    />
                  );
                })} */}
            </div>
          ) : (
            <div className="tasks-empty">
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
                <p>Nenhuma tarefa cadastrada</p>
              </Alert>
            </div>
          )}
        </Layout>
      </Grid>
    </ThemeProvider>
  );
}
