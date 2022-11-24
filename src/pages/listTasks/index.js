import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

import { CssBaseline, Grid } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../../components/organisms/layout";
import Task from "../../components/atoms/task";

import "./listTasks.css";

const theme = createTheme();

export default function ListTasks() {
  const [tasks, setTasks] = useState([]);

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
          link="/adicionar-tarefas"
          title="Lista de tarefas"
          backgroudGradient=" linear-gradient(180deg, #F5BE2E 19.98%, rgba(255, 255, 255, 0) 100%); linear-gradient(180deg, #F5BE2E 19.98%, rgba(255, 255, 255, 0) 100%);"
          colorButton="#F5BE2E"
        >
          <div className="container-layout-tasks">
            {tasks &&
              tasks.map((task, index) => {
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
                  />
                );
              })}
          </div>
        </Layout>
      </Grid>
    </ThemeProvider>
  );
}
