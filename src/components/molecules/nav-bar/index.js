import React, { useState } from "react";
import { Box, Button, makeStyles } from "@material-ui/core";

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
    color: "blue",
    fontSize: "20px",
  },
  icon: {
    color: "white",
  },
  signOut: {
    bottom: 0,
    display: "flex",
    justifyContent: "flex-end",
  },
}));

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const classes = useStyles();

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className={menuOpen && "container"}>
      <div className={!menuOpen ? "header-nav-container" : "header-nav-open"}>
        <div className="navbar-container">
          {menuOpen ? (
            <>
              <div className="container-menu">
                <div className="menu-container">
                  <IconButton
                    className={classes.close}
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                  <List className={classes.list}>
                    <ListItem onClick={() => setMenuOpen(false)}>
                      <ListItemText>
                        <Link to="/" className={classes.link}>
                          Home
                        </Link>
                      </ListItemText>
                    </ListItem>

                    <Divider />

                    <ListItem onClick={() => setMenuOpen(false)}>
                      <ListItemText>
                        <Link to="/profile" className={classes.link}>
                          Profile
                        </Link>
                      </ListItemText>
                    </ListItem>
                  </List>
                </div>
                <Box className={classes.signOut}>
                  <Button onClick={() => signOut(auth)} size="small">
                    Logout
                  </Button>
                  <LogoutOutlinedIcon />
                </Box>
              </div>
            </>
          ) : null}
        </div>
        {!menuOpen && (
          <div className="menu-icon-container" onClick={toggleMenu}>
            <ListOutlinedIcon />
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;