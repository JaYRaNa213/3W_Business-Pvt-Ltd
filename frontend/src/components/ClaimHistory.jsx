// src/components/ClaimHistory.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import { getUserHistory } from "../services/api";

const ClaimHistory = ({ userId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  const fetchHistory = async () => {
    try {
      const res = await getUserHistory(userId);
      setHistory(res.data || []);
    } catch (error) {
      console.error("Error fetching claim history:", error);
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Claim History
      </Typography>
      {history.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No claims yet.
        </Typography>
      ) : (
        <List>
          {history.map((entry, idx) => (
            <React.Fragment key={idx}>
              <ListItem>
                <ListItemText
                  primary={`+${entry.points} pts`}
                  secondary={new Date(entry.createdAt).toLocaleString()}
                />
              </ListItem>
              {idx !== history.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ClaimHistory;
