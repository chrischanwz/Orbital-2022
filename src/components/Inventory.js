import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import InventoryList from "./InventoryList";
import { Checkbox } from "@mui/material";
import "./Inventory.css";

import { useAuth } from "../contexts/Auth";

function Inventory() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({ title: "", date: "", email: "" });
  const { title, date } = item;
  const [label, setLabel] = useState([]);
  const [remove, setRemove] = useState({ deleteTitle: "" });
  const { deleteTitle } = remove;

  const { user } = useAuth();
  const userEmail = user.email;

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data } = await supabase
      .from("items")
      .select()
      .match({ userEmail: userEmail });
    setItems(data);
    console.log("fetchItems Ran, data:", data);
  }

  async function createItem() {
    if (title.length <= 0) {
      alert("Please enter a item name!");
    } else {
      await supabase
        .from("items")
        .insert([{ title, date, userEmail }])
        .single();
      setItem({ title: "", date: "" });
      fetchItems();
      console.log(userEmail);
    }
  }

  async function handleDelete(deleteId) {
    await supabase
      .from("items")
      .delete()
      .match({ userEmail: userEmail })
      .match({ id: deleteId });
    fetchItems();
  }

  async function ascendingName() {
    const { data } = await supabase
      .from("items")
      .select()
      .match({ userEmail: userEmail })
      .order("title", { ascending: true });
    setItems(data);
  }
  async function descendingName() {
    const { data } = await supabase
      .from("items")
      .select()
      .match({ userEmail: userEmail })
      .order("title", { ascending: false });
    setItems(data);
  }
  async function ascendingDate() {
    const { data } = await supabase
      .from("items")
      .select()
      .match({ userEmail: userEmail })
      .order("date", { ascending: true });
    setItems(data);
  }
  async function descendingDate() {
    const { data } = await supabase
      .from("items")
      .select()
      .match({ userEmail: userEmail })
      .order("date", { ascending: false });
    setItems(data);
  }

  return (
    <div className="App">
      <div className="input">
        <input
          placeholder="Enter item name here"
          value={title}
          onChange={(event) => setItem({ ...item, title: event.target.value })}
        />

        <input
          type="date"
          placeholder="YYYY/MM/DD"
          required="required"
          value={date}
          onChange={(event) => setItem({ ...item, date: event.target.value })}
        />
        <button className="button1" onClick={createItem}>
          {" "}
          Create Item{" "}
        </button>
      </div>

      <InventoryList
        items={items}
        handleDelete={handleDelete}
        ascendingName={ascendingName}
        descendingName={descendingName}
        ascendingDate={ascendingDate}
        descendingDate={descendingDate}
      />
    </div>
  );
}

export default Inventory;

{
  /*
      {tasks.map((task) => (
        <div key={task.id}>
          <h3> {task.title}</h3>
        </div>
      ))}
      */
}
