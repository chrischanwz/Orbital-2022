import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import InventoryList from "./InventoryList";
import { Checkbox } from "@mui/material";
import { nanoid } from "nanoid";
import "./input.css";

function Inventory() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({title: "", date: "" });
  const {title, date } = item;
  const [label, setLabel] = useState([]);
  const [remove, setRemove] = useState({ deleteTitle: "" });
  const { deleteTitle } = remove;


  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data } = await supabase.from("tasks").select();
    setItems(data);
    console.log("data", data);
  }

  async function createItem() {
    if (title.length <= 0) {
      alert("Please enter a item name!");
    } else {
      await supabase.from("tasks").insert([{ title, date }]).single();
      setItem({ title: "", date: ""});
      fetchItems();
    }
  }

  async function handleDelete(deleteId) {
    const { data2 } = await supabase
      .from("tasks")
      .delete()
      .match({ id: deleteId });
    fetchItems();
  }

  async function handlesortName() {
    const { data3 } = await supabase
    data3.sort((a, b) => (a.title - b.title));
    setItems(data3)
  }

  return (
    <div className="App">
      <input
        placeholder="Enter item here"
        value={title}
        onChange={(event) => setItem({ ...item, title: event.target.value })}
      />

      <input
        type="date"
        placeholder="YYYY/MM/DD"
        required = "required"
        value={date}
        onChange={(event) => setItem({ ...item, date: event.target.value })}
      />
      <button className="button1"  onClick={createItem}> Create Item </button>

      <InventoryList items={items} handleDelete={handleDelete} handlesortName={handlesortName}/>
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
