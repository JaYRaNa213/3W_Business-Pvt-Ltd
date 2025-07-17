// src/components/HistoryTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const HistoryTable = ({ history }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        🕒 Claim History
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Claimed At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((entry) => (
              <TableRow key={entry._id}>
                <TableCell>{entry.user?.name || "Unknown"}</TableCell>
                <TableCell>{entry.points}</TableCell>
                <TableCell>
                  {new Date(entry.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HistoryTable;
