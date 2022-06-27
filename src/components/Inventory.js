import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import InventoryList from "./InventoryList";
import { Checkbox } from "@mui/material";

function Inventory() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({ title: "", date: "" });
  const { title, date } = item;
  const [label, setLabel] = useState([]);

  const [remove, setRemove] = useState({ deleteTitle: "" });
  const { deleteTitle } = remove;

  /*const [deleteTitle, setDeleteTitle] = useState([]);*/

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
      setItem({ title: "", date: "" });
      fetchItems();
    }
  }

  async function deleteItem() {
    /*const { data2 } = await supabase
      .from("tasks")
      .select("title")
      .eq({ title: deleteTitle });
      */
    const { data2 } = await supabase
      .from("tasks")
      .delete()
      .match({ title: deleteTitle });

    setRemove({ deleteTitle: "" });
    fetchItems();
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
        value={date}
        onChange={(event) => setItem({ ...item, date: event.target.value })}
      />

      <button onClick={createItem}> Create Item </button>

      <input
        placeholder="Delete item"
        value={deleteTitle}
        onChange={(e) => setRemove({ ...remove, deleteTitle: e.target.value })}
      />
      <button onClick={deleteItem}> Delete Item </button>

      <InventoryList items={items} />

      {items.map((item) => (
        <div>
          <h3>
            {" "}
            {item.title} {item.date}
          </h3>
        </div>
      ))}
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
