import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import "./TopThreeCards.css"; // for confetti

const TopThreeCards = ({ users, currentUserId }) => {
  const positions = [
    { rank: "🥈", offsetY: 20, color: "#c0c0c0" }, // Silver
    { rank: "🥇", offsetY: 40, color: "#ffd700" }, // Gold
    { rank: "🥉", offsetY: 20, color: "#cd7f32" }, // Bronze
  ];

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-end" gap={3} mb={4}>
      {users.map((user, index) => {
        const isSelected = user._id === currentUserId;
        const isTop1 = index === 1;

        return (
          <Box
            key={user._id}
            className={isTop1 ? "confetti-wrapper" : ""}
            sx={{
              transform: `translateY(-${positions[index].offsetY}px)`,
              textAlign: "center",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: `translateY(-${positions[index].offsetY + 10}px)`,
              },
            }}
          >
            <Card
              sx={{
                minWidth: 180,
                borderRadius: 4,
                transition: "0.3s",
                boxShadow: isTop1 ? 8 : 4,
                background: isTop1
                  ? "linear-gradient(135deg, #ffeb3b, #fff176)"
                  : isSelected
                  ? "#e3f2fd"
                  : "#f9f9f9",
                border: isSelected ? "2px solid #1976d2" : "none",
                position: "relative",
                "&:hover": {
                  boxShadow: 10,
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <EmojiEventsIcon
                  sx={{
                    position: "absolute",
                    top: -20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 36,
                    color: positions[index].color,
                  }}
                />
                {isTop1 && (
                  <StarIcon
                    className="sparkle"
                    sx={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      color: "#ff4081",
                      fontSize: 30,
                    }}
                  />
                )}
                <Typography variant="h6" mt={isTop1 ? 3 : 1}>
                  {positions[index].rank} {user.name}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {user.totalPoints} pts
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );
      })}
    </Box>
  );
};

export default TopThreeCards;
