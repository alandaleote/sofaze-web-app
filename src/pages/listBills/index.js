import React, { useEffect, useState } from "react";

import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { useAuthValue } from "../../auth-context";

import { Alert, CssBaseline, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../../components/organisms/layout";
import TaskBill from "../../components/atoms/taskBill";

import "./listBills.css";

const theme = createTheme();

export default function ListBills() {
  const [bills, setBills] = useState([]);
  const { currentUser } = useAuthValue();

  useEffect(() => {
    const q = query(
      collection(db, "Bills"),
      where("uid", "==", currentUser.uid)
    );
    onSnapshot(q, (querySnapshot) => {
      setBills(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [currentUser.uid]);
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100%" }}>
        <CssBaseline />
        <Layout
          title="Controle de Contas"
          link="/adicionar-contas"
          backgroudGradient="linear-gradient(
            180deg,
            #21a179 19.98%,
            rgba(255, 255, 255, 0) 100%
          );"
          colorButton="#21a179"
        >
          {bills.length > 0 ? (
            <div className="container-layout-bills">
              {bills.map((bill, index) => {
                return (
                  <TaskBill
                    key={index}
                    title={bill?.data?.name}
                    category_name={bill?.data?.category_name}
                    category_id={bill?.data?.category_id}
                    completed={bill?.data?.completed}
                    description={bill?.data?.description}
                    date={bill?.data?.date_end}
                    id={bill?.id}
                    pay_bill={bill?.data?.pay_bill}
                    user_name={bill?.data?.user_name}
                    dateLabel="Vencimento: "
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
                <p>Nenhuma conta cadastrada</p>
              </Alert>
            </div>
          )}
        </Layout>
      </Grid>
    </ThemeProvider>
  );
}
