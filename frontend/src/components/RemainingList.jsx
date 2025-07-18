import React, { useState } from "react";
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
  Divider,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MaskIcon from "@mui/icons-material/Masks";
import trophyIcon from "../assets/gold_trophy.jpg";

const RemainingList = ({ users = [], currentUserId = "", onClaim }) => {
  const [showAll, setShowAll] = useState(false);
  const displayUsers = showAll ? users : users.slice(0, 7);

  return (
    <Box mt={2}>
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <Box px={2} py={1} borderBottom="1px solid #ddd">
          <Typography variant="h6" fontWeight="bold">
            🏅 Rankings 4  to 10
          </Typography>
        </Box>

        <List dense>
          {displayUsers.map((user, index) => {
            const isCurrent = user._id === currentUserId;

            return (
              <React.Fragment key={user._id || index}>
                <ListItem
                  sx={{
                    backgroundColor: isCurrent ? "#e3f2fd" : "transparent",
                    borderLeft: isCurrent ? "4px solid #1976d2" : "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                    py: 1.5,
                    px: 2,
                  }}
                  secondaryAction={
                    <Box display="flex" alignItems="center" gap={1}>
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
                          {(user?.totalPoints ?? 0).toLocaleString()} pts
                        </Typography>
                        <Avatar
                          src={trophyIcon}
                          alt="Trophy"
                          variant="square"
                          sx={{ width: 18, height: 18 }}
                        />
                      </Box>
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
                        <img
                          src={user.avatar}
                          alt="avatar"
                          width="100%"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <MaskIcon fontSize="small" />
                      )}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        fontWeight={isCurrent ? "bold" : "medium"}
                        color={isCurrent ? "#1976d2" : "text.primary"}
                      >
                        {user.name || "Mystery Player"}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: 12 }}
                      >
                        Rank #{index + 4}
                      </Typography>
                    }
                  />
                </ListItem>

                {index < displayUsers.length - 1 && <Divider component="li" />}
              </React.Fragment>
            );
          })}
        </List>

        {users.length > 7 && (
          <Box textAlign="center" py={1.5}>
            <Button
              variant="text"
              onClick={() => setShowAll(!showAll)}
              sx={{ textTransform: "none", fontWeight: "medium" }}
            >
              {showAll ? "Show Less" : "View More Users"}
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default RemainingList;
