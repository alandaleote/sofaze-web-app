import React, { useState } from "react";
import { Box, Button, ListItemAvatar, makeStyles } from "@material-ui/core";

import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
//import AddCircleIcon from "@mui/icons-material/AddCircle";
import CottageIcon from "@mui/icons-material/Cottage";

import { Link } from "react-router-dom";

import "./navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config";

const useStyles = makeStyles((theme) => ({
  close: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 1,
  },
  link: {
    textDecoration: "none",
    color: "#1a69aa",
    fontSize: "20px",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  icon: {
    color: "white",
  },
  signOut: {
    bottom: 0,
    display: "flex",
    justifyContent: "flex-end",
    color: "#ff5864",
  },
}));

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const classes = useStyles();

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className={menuOpen ? "container-nav-wrapper" : "container-wrapper"}>
      <div className={!menuOpen ? "header-nav-container" : "header-nav-open"}>
        <div className="navbar-container">
          {menuOpen ? (
            <div className="container-menu">
              <div className="menu-container">
                <div className={classes.close}>
                  <IconButton onClick={() => setMenuOpen(!menuOpen)}>
                    <CloseOutlinedIcon
                      sx={{ fontSize: 32, color: "#ff5864" }}
                    />
                  </IconButton>
                </div>

                <List className={classes.list}>
                  <ListItem
                    className={classes.listItem}
                    onClick={() => setMenuOpen(false)}
                  >
                    <ListItemAvatar>
                      <CottageIcon
                        sx={{ fontSize: 32, color: "rgb(63, 136, 197)" }}
                      />
                    </ListItemAvatar>
                    <ListItemText>
                      <Link to="/" className={classes.link}>
                        <span style={{ color: "#0c497a" }}>Home</span>
                      </Link>
                    </ListItemText>
                  </ListItem>

                  <Divider />

                  <ListItem
                    className={classes.listItem}
                    onClick={() => setMenuOpen(false)}
                  >
                    <ListItemAvatar>
                      <CheckCircleOutlineOutlinedIcon
                        sx={{ fontSize: 32, color: "#F5BE2E" }}
                      />
                    </ListItemAvatar>
                    <ListItemText>
                      <Link to="/lista-de-tarefas" className={classes.link}>
                        <span style={{ color: "#0c497a" }}>
                          Lista de tarefas
                        </span>
                      </Link>
                    </ListItemText>
                  </ListItem>
                  <Divider />
                  <ListItem
                    className={classes.listItem}
                    onClick={() => setMenuOpen(false)}
                  >
                    <ListItemAvatar>
                      <AttachMoneyOutlinedIcon
                        sx={{ fontSize: 32, color: "#21a179" }}
                      />
                    </ListItemAvatar>
                    <ListItemText>
                      <Link to="/controle-de-contas" className={classes.link}>
                        <span style={{ color: "#0c497a" }}>
                          Controle de contas
                        </span>
                      </Link>
                    </ListItemText>
                  </ListItem>

                  <ListItem
                    className={classes.listItem}
                    onClick={() => setMenuOpen(false)}
                  >
                    <ListItemAvatar>
                      <SettingsOutlinedIcon sx={{ fontSize: 32 }} />
                    </ListItemAvatar>
                    <ListItemText>
                      <Link to="/configuracoes" className={classes.link}>
                        <span style={{ color: "#0c497a" }}>Configurações</span>
                      </Link>
                    </ListItemText>
                  </ListItem>
                </List>
              </div>
              <Box className={classes.signOut}>
                <Button onClick={() => signOut(auth)} size="small">
                  <span style={{ color: "#0c497a" }}>Logout</span>
                </Button>
                <LogoutOutlinedIcon />
              </Box>
            </div>
          ) : null}
        </div>
        {!menuOpen && (
          <div className="menu-icon-container">
            <IconButton onClick={toggleMenu}>
              <ListOutlinedIcon sx={{ fontSize: 32 }} />
            </IconButton>

            <IconButton>
              <Link to="/lista-de-tarefas">
                <CheckCircleOutlineOutlinedIcon
                  sx={{ fontSize: 32, color: "#F5BE2E" }}
                />
              </Link>
            </IconButton>

            {/* <IconButton>
              <Link to="/configuracoes">
                <AddCircleIcon sx={{ fontSize: 50 }} />
              </Link>
            </IconButton> */}

            <IconButton>
              <Link to="/contas">
                <AttachMoneyOutlinedIcon
                  sx={{ fontSize: 32, color: "#21a179" }}
                />
              </Link>
            </IconButton>

            <IconButton>
              <Link to="/configuracoes">
                <SettingsOutlinedIcon sx={{ fontSize: 32 }} />
              </Link>
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;
