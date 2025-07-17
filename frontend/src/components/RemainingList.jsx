// src/components/RemainingList.jsx
import React from "react";
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import MaskIcon from "@mui/icons-material/Masks";

const RemainingList = ({ users }) => {
  return (
    <Box mt={5}>
      <Paper elevation={3}>
        <List dense>
          {users.map((user, index) => (
            <ListItem key={user._id || index}>
              <ListItemAvatar>
                <Avatar src={user.avatar || ""}>
                  {!user.avatar && <MaskIcon fontSize="small" />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.name || "Mystery Billionaire"}
                secondary={`Rank #${index + 4} — ${
                  typeof user?.totalPoints === "number"
                    ? user.totalPoints.toLocaleString()
                    : "0"
                } pts`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default RemainingList;
