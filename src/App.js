import "./App.css";
import { useState, useEffect, React } from "react";
import { supabase } from "./client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Container,
  Grid,
  makeStyles,
  IconButton,
  Typography,
  AppBar,
  Box,
  Toolbar,
  Menu,
  Tooltip,
  MenuItem,
  Button,
  Avatar,
} from "@mui/material";

import NavBar from "./components/NavBar";
import NavButtons from "./components/NavBar";
import Home from "./components/Home";
import Inventory from "./components/Inventory";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";

import { AuthProvider } from "./contexts/Auth";
import { useAuth } from "./contexts/Auth";

import { PrivateRoute } from "./components/PrivateRoute";

import { ClassNames } from "@emotion/react";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const [tasks, setTasks] = useState([]);
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    // Ends user session
    await signOut();

    // Redirects the user to Login page
  }

  const pages = ["Home", "Inventory"];
  const settings = ["Profile", "Account", "Logout"];

  const [anchorElNav, setAnchorElNav] = useState();
  const [anchorElUser, setAnchorElUser] = useState();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              AXPYREE
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {/*}
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">hi</Typography>
                </MenuItem>
              */}

                <MenuItem>
                  <Button href="/home"> Home</Button>
                </MenuItem>
                <MenuItem>
                  <Button href="/inventory"> Inventory</Button>
                </MenuItem>
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              AXPYREE
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/*}
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
            
              ))}
              */}

              <Button
                href="/home"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {" "}
                Home
              </Button>
              <Button
                href="/inventory"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {" "}
                Inventory
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="D Kane" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Button
                  sx={{ my: 2, color: "black", display: "block" }}
                  onClick={handleSignOut}
                >
                  {" "}
                  Sign Out
                </Button>
                {/*
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>

                
                ))}
                */}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container>
        <Router>
          <AuthProvider>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route element={<Dashboard />} exact path="/" />
                <Route element={<Home />} path="/home" />
                <Route element={<Inventory />} path="/inventory" />
              </Route>

              {/*<Route path="/home" element={<Home />}></Route>
              <Route path="/inventory" element={<Inventory />}></Route>
              */}

              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </AuthProvider>
        </Router>
      </Container>
    </div>
  );
}

export default App;
