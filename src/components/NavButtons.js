import { Button, Grid, Typography, Container } from "@mui/material";
import "../App.css";
import { useNavigate } from "react-router-dom";

const NavButtons = () => {
  let navigate = useNavigate();
  return (
    <>
      <Button
        style={{ padding: "5px 30px" }}
        variant="contained"
        disableElevation
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        Home page
      </Button>

      <Button
        style={{ padding: "5px 10px" }}
        variant="contained"
        disableElevation
        onClick={() => {
          navigate("/inventory");
        }}
      >
        {" "}
        Inventory page
      </Button>
    </>
  );
};

export default NavButtons;
