import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, sets, reps) {
  return { name, sets, reps };
}

const rows = [
  createData("OHP", 4, "6-10"),
  createData("Bench Press", 4, "6-10"),
  createData("Incline Press", 4, "6-10"),
  createData("Lateral Raise", 4, "6-10"),
  createData("Triceps Extension", 4, "6-10"),
];

export default function WorkoutTemplate() {
  return (
    <TableContainer component={Paper} sx={{ mt: "1rem", mb: "1rem" }}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Exercises</StyledTableCell>
            <StyledTableCell align="right"># of sets</StyledTableCell>
            <StyledTableCell align="right">
              # of reps or seconds
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.sets}</StyledTableCell>
              <StyledTableCell align="right">{row.reps}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
