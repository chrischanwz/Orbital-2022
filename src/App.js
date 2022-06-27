import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./client";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Inventory from "./components/Inventory";

function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <div style={{ 
      backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpau3KHqSUlp-mcsyuA9ZiphuAPfQ9X0t8pw&usqp=CAU")` 
    }}>
    <Container maxWidth="xs">
      <Router>
        <Grid item justify="center">
          <NavBar />
        </Grid>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/inventory" element={<Inventory />}></Route>
        </Routes>
      </Router>
    </Container>
    </div>
  );
}

export default App;