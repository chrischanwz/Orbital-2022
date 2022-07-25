import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, React } from "react";

import { useAuth } from "../contexts/Auth";

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
import MenuIcon from "@mui/icons-material/Menu";

export function Dashboard() {
  const { user, signOut } = useAuth();

  const navigate = useNavigate();

  async function handleSignOut() {
    // Ends user session
    await signOut();

    // Redirects the user to Login page
    navigate("/login");
  }

  return (
    <div>
      <p>Welcome to Axpyree!</p>
    </div>
  );
}
