import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { supabase } from "../client";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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

export default function InventoryList(props) {
  return (
    <div>
      <Table justify="center">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              Item Num
              <br />
            </StyledTableCell>
            <StyledTableCell>
              Item Name
              <ArrowDropUpIcon onClick={() => props.ascendingName()} />
              <ArrowDropDownIcon onClick={() => props.descendingName()} />
            </StyledTableCell>
            <StyledTableCell>
              Expiry Date
              <ArrowDropUpIcon
                style={{}}
                onClick={() => props.ascendingDate()}
              />
              <ArrowDropDownIcon onClick={() => props.descendingDate()} />
            </StyledTableCell>
            <StyledTableCell>Delete</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.items.map((item, index) => (
            <StyledTableRow key={item.title}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell> {item.title}</StyledTableCell>
              <StyledTableCell> {item.date} </StyledTableCell>
              <StyledTableCell>
                <DeleteIcon onClick={() => props.handleDelete(item.id)} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
