import "../App.css";
import { Container, Grid, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import "./Home.css";
import HomePopup from "./HomePopup";
import { useAuth } from "../contexts/Auth";

function Home() {
  const [items, setItems] = useState([]);
  const [numDays, setNumDays] = useState(7);
  const [newDays, setNewDays] = useState(0);

  const today = new Date();

  const [limit, setLimit] = useState(new Date(today));

  /*const limit = new Date(today);
  limit.setDate(limit.getDate() + numDays);*/

  const [buttonPopup, setButtonPopup] = useState(false);

  const { user } = useAuth();
  const userEmail = user.email;

  useEffect(() => {
    fetchItems();
  }, [numDays]);

  /*
  useEffect(() => {
    fetchLimit();
  }, []);

  function fetchLimit() {
    const temp = new Date();
    setNumDays(newDays);
    console.log("numDays:", numDays);
    console.log("newDays", newDays);
    temp.setDate(today.getDate() + numDays);
    console.log("temp", temp);
    setLimit(temp);
  }
  */

  async function addDays(days) {
    return setLimit(
      (oldLimit) => new Date(today.getTime() + days * 24 * 60 * 60 * 1000)
    );
  }

  async function fetchItems() {
    const { data } = await supabase
      .from("items")
      .select()
      .match({ userEmail: userEmail })
      .lt("date", limit.toISOString())
      .gt("date", today.toISOString())
      .order("date", { ascending: true });
    setItems(data);
    console.log("limit:", limit);
    console.log("today:", today);
    console.log("today.getDate();", today.getDate());
  }

  async function handleChangeLimit(value) {
    setNumDays(value);
    addDays(value);
    console.log(addDays(value));
  }
  return (
    <div>
      {/*
      <div className="date">
        {" "}
        <h3> Today's Date: </h3>
        <h3> {today.toDateString()}</h3>
      </div>
  */}

      <input
        onChange={(event) => handleChangeLimit(event.target.value)}
        value={numDays}
        placeholder="Change Limit here"
      />

      <div className="Expiring">
        {items.length === 0 ? (
          <h3>You have no items expiring in {numDays} days! </h3>
        ) : (
          <h3>
            {" "}
            You have {items.length} {items.length > 1 ? "items" : "item"}{" "}
            expiring in {numDays} days:
          </h3>
        )}
        {items.map((item) => (
          <div key={item.title}>
            <h4>
              {" "}
              {item.title} {item.date}
            </h4>
          </div>
        ))}
      </div>

      {/*
      <div>
        <button onClick={() => setButtonPopup(true)}>
          {" "}
          Edit expiry period{" "}
        </button>
      </div>

      

      <HomePopup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <p> Change expiry reminder period to: </p>
        <div>
          <input
            placeholder="No. of days"
            required="required"
            value={newDays}
            onChange={(event) => setNewDays(event.target.value)}
          ></input>
          <button
            className="button"
            onClick={() => {
              fetchItems();
            }}
          >
            {" "}
            Confirm{" "}
          </button>
        </div>
      </HomePopup>
          */}
    </div>
  );
}

export default Home;
