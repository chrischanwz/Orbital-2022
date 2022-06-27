import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { supabase } from "../client";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";

export default function InventoryList(props) {
  return (
    <div>
      <table style={{ margin: "0 auto", width: "100%" }}>
        <thead>
          <tr>
            <th>Item Num </th>
            <th>Item Name</th>
            <th>Expiry Date</th>
          </tr>
        </thead>

        <tbody>
          {props.items.map((item, index) => (
            <tr>
              <td> {index + 1} </td>
              <td> {item.title}</td>
              <td> {item.date} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
