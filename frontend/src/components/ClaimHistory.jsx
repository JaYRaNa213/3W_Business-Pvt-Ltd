import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { getHistory } from "../services/api";
import dayjs from "dayjs";

const ClaimHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getHistory();
        setHistory(res.data);
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Box mt={5}>
      <Typography variant="h6" gutterBottom>
        🕓 Claim History
      </Typography>
      <Paper elevation={3}>
        {loading ? (
          <Box p={3} textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Points Claimed</TableCell>
                <TableCell>Date & Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No claims yet
                  </TableCell>
                </TableRow>
              ) : (
                history.map((entry, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{entry.user?.name || "Unknown"}</TableCell>
                    <TableCell>{entry.points}</TableCell>
                    <TableCell>
                      {dayjs(entry.createdAt).format("MMM D, YYYY h:mm A")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
};

export default ClaimHistory;
