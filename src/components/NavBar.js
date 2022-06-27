import { Link } from "react-router-dom";
import { Button, Grid, Typography, Container } from "@mui/material";
import "../App.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  let navigate = useNavigate();
  return (
    <Container>
      <Grid item align="center">
        <h1>AXPYREE</h1>
      </Grid>
      <Grid container justifyContent="center" spacing={5}>
        <Grid item>
          <Button
            variant="contained"
            disableElevation
            onClick={() => {
              navigate("/");
            }}
          >
            {" "}
            Home page
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            disableElevation
            onClick={() => {
              navigate("/inventory");
            }}
          >
            {" "}
            Inventory page
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NavBar;
