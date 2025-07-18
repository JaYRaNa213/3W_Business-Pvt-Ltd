import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import { getUserHistory } from "../services/api";

const ClaimHistory = ({ userId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getUserHistory(userId);
        setHistory(res.data || []);
      } catch (error) {
        console.error("Error fetching claim history:", error);
        setHistory([]);
      }
    };

    if (userId) fetchHistory();
  }, [userId]);

  return (
    <Box mt={4}>
      {history.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No claims yet.
        </Typography>
      ) : (
        <List>
          {history.map((entry, idx) => (
            <React.Fragment key={entry._id || idx}>
              <ListItem
                secondaryAction={
                  <Typography variant="body2" color="text.secondary">
                    {entry.claimedAt
                      ? new Date(entry.claimedAt).toLocaleString()
                      : "Unknown Date"}
                  </Typography>
                }
              >
                <ListItemText
                  primary={`+${entry.points} pts`}
                  primaryTypographyProps={{ fontWeight: "bold" }}
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
