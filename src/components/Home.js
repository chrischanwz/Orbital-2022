import { useNavigate } from "react-router-dom";
import "../App.css";
import {Container, Grid} from "@mui/material";
import { Today } from "@material-ui/icons";

function Home() {
  const today = new Date();
  return (
    <Container>
      <Grid item align="left">
        <p>{today.toDateString()}</p>
      </Grid>
    </Container>
  );
}

export default Home;