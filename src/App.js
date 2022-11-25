import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import VerifyEmail from "./pages/verify-email";
import { AuthProvider } from "./auth-context";
import { auth } from "./firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "./PrivateRoute";
import Home from "./pages/home";
import RecoverPassword from "./pages/recover-password";
import Bills from "./pages/bills";
import ListTasks from "./pages/listTasks";
import ListBills from "./pages/listBills";
import AddTasks from "./pages/addTasks";
import AddBills from "./pages/addBills";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
  return (
    <Router>
      <AuthProvider value={{ currentUser }}>
        <Routes>
          <Route
            exact
            path="/configuracoes"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/lista-de-tarefas"
            element={
              <PrivateRoute>
                <ListTasks />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/adicionar-tarefas"
            element={
              <PrivateRoute>
                <AddTasks />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/controle-de-contas"
            element={
              <PrivateRoute>
                <ListBills />
              </PrivateRoute>
            }
          />
            <Route
            exact
            path="/adicionar-contas"
            element={
              <PrivateRoute>
                <AddBills />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/contas"
            element={
              <PrivateRoute>
                <Bills />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              !currentUser?.emailVerified ? (
                <Login />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              !currentUser?.emailVerified ? (
                <Register />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
