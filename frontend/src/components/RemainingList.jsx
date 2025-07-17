import React from "react";
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import MaskIcon from "@mui/icons-material/Masks";
import trophyIcon from "../assets/gold_trophy.jpg"; // Make sure the path is correct

const RemainingList = ({ users, currentUserName = "Jay Prakash", onClaim }) => {
  return (
    <Box mt={5}>
      <Paper elevation={3}>
        <List dense>
          {users.map((user, index) => {
            const isCurrent = user.name === currentUserName;

            return (
              <ListItem
                key={user._id || index}
                sx={{
                  backgroundColor: isCurrent ? "#e3f2fd" : "inherit",
                  borderLeft: isCurrent ? "4px solid #1976d2" : "none",
                  alignItems: "center",
                }}
                secondaryAction={
                  <Box display="flex" alignItems="center" gap={1}>
                    {/* Points aligned right with trophy image */}
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          minWidth: "80px",
                          textAlign: "right",
                          fontWeight: "bold",
                          color: isCurrent ? "#1976d2" : "text.primary",
                        }}
                      >
                        {typeof user?.totalPoints === "number"
                          ? user.totalPoints.toLocaleString() + " pts"
                          : "0 pts"}
                      </Typography>
                      <Avatar
                        src={trophyIcon}
                        alt="Trophy"
                        variant="square"
                        sx={{ width: 18, height: 18 }}
                      />
                    </Box>

                    {/* Claim button only for current user */}
                    {isCurrent && (
                      <Button
                        onClick={() => onClaim(user._id)}
                        variant="contained"
                        size="small"
                      >
                        Claim
                      </Button>
                    )}
                  </Box>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    {user.avatar ? (
                      <img src={user.avatar} alt="avatar" />
                    ) : (
                      <MaskIcon fontSize="small" />
                    )}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={user.name || "Mystery Billionaire"}
                  secondary={`Rank #${index + 4}`}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
};

export default RemainingList;
