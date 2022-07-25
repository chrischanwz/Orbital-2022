import "../App.css";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import "./Home.css";
import HomePopup from "./HomePopup";
import { useAuth } from "../contexts/Auth";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.common.white,
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.common.white,
  },
}));

function Home() {
  const [items, setItems] = useState([]);
  const [expiredItems, setExpiredItems] = useState([]);
  const [numDays, setNumDays] = useState(7);
  const [displayDays, setDisplayDays] = useState(7);

  const today = new Date();

  const [limit, setLimit] = useState(
    new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  );

  const [buttonPopup, setButtonPopup] = useState(false);

  const { user } = useAuth();
  const userEmail = user.email;

  useEffect(() => {
    fetchItems();
  }, [limit]);

  useEffect(() => {
    fetchExpiredItems();
  }, []);

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
      .lte("date", limit.toISOString())
      .gte("date", today.toISOString())
      .order("date", { ascending: true });
    setItems(data);
    console.log("limit:", limit);
    console.log("today:", today);
    console.log("today.getDate();", today.getDate());
  }

  async function fetchExpiredItems() {
    const { data } = await supabase
      .from("items")
      .select()
      .match({ userEmail: userEmail })
      .lt("date", today.toISOString())
      .order("date", { ascending: true });
    setExpiredItems(data);
    console.log("expired items:", expiredItems);
  }
  async function handleChangeLimit(value) {
    setNumDays(value);
  }

  async function closeAndChangeLimit() {
    setButtonPopup(false);
    changeLimit();
  }

  async function changeLimit() {
    addDays(numDays);
    setDisplayDays(numDays);
  }

  function displayDaysFunc(num) {
    if (num == 1) {
      return "day";
    }
    if (num == 0) {
      return "";
    } else {
      return "days";
    }
  }
  return (
    <>
      {/*
      <input
        onChange={(event) => handleChangeLimit(event.target.value)}
        value={numDays}
        placeholder="Change Limit here"
      />
      <button onClick={changeLimit}>
        Change reminder period
        <br />
        for your expiring items
      </button>
  */}

      <div className="Expiring">
        {items.length === 0 ? (
          <h3>
            You have no items expiring{" "}
            {displayDays == 0 ? "today" : `in ${displayDays}`}{" "}
            {displayDaysFunc(displayDays)}!{" "}
          </h3>
        ) : (
          <div>
            <h3>
              {" "}
              You have {items.length} {items.length > 1 ? "items" : "item"}{" "}
              expiring {displayDays == 0 ? "today" : `in ${displayDays}`}{" "}
              {displayDaysFunc(displayDays)}:
            </h3>

            <Table justify="center">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Item Num</StyledTableCell>
                  <StyledTableCell>Item Name</StyledTableCell>
                  <StyledTableCell>Expiry Date</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((item, index) => (
                  <StyledTableRow key={item.title}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell> {item.title}</StyledTableCell>
                    <StyledTableCell> {item.date} </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <div className="Expired">
        {expiredItems.length === 0 ? (
          <h3>Great! You do not have any expired items! </h3>
        ) : (
          <div>
            <h3>
              Oh no, you have {expiredItems.length}{" "}
              {expiredItems.length > 1 ? " expired items" : "expired item"}
            </h3>

            <Table justify="center">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Item Num</StyledTableCell>
                  <StyledTableCell>Item Name</StyledTableCell>
                  <StyledTableCell>Expiry Date</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {expiredItems.map((item, index) => (
                  <StyledTableRow key={item.title}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell> {item.title}</StyledTableCell>
                    <StyledTableCell> {item.date} </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <div className="changeButton">
        <button className="button2" onClick={() => setButtonPopup(true)}>
          {" "}
          Edit Expiry Reminder period{" "}
        </button>
      </div>
      <HomePopup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <p> Change expiry reminder period to: </p>
        <div>
          <input
            placeholder="No. of days"
            required="required"
            onChange={(event) => handleChangeLimit(event.target.value)}
            value={numDays}
          ></input>
          <button className="button" onClick={closeAndChangeLimit}>
            {" "}
            Confirm{" "}
          </button>
        </div>
      </HomePopup>
    </>
  );
}
export default Home;
