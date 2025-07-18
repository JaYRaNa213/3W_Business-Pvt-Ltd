import React from "react";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import "./TopThreeCards.css"; // For confetti animation

const TopThreeCards = ({ users, currentUserId }) => {
  const positions = [
    { rank: "🥈", offsetY: 20, color: "#c0c0c0" }, // Silver
    { rank: "🥇", offsetY: 40, color: "#ffd700" }, // Gold
    { rank: "🥉", offsetY: 20, color: "#cd7f32" }, // Bronze
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", sm: "row" },
        justifyContent: "center",
        alignItems: "flex-end",
        gap: { xs: 1, sm: 3 },
        mt: { xs: 2, sm: 6 },
        mb: { xs: 2, sm: 4 },
        px: { xs: 0.5, sm: 2 },
        overflowX: "auto",
      }}
    >
      {users.map((user, index) => {
        if (!user) return null;

        const isSelected = user._id === currentUserId;
        const isTop1 = index === 1;

        return (
          <Box
            key={user._id || index}
            className={isTop1 ? "confetti-wrapper" : ""}
            sx={{
              transform: `translateY(-${positions[index]?.offsetY ?? 0}px)`,
              textAlign: "center",
              transition: "transform 0.3s ease-in-out",
              minWidth: { xs: 100, sm: 140 },
              flexShrink: 0,
              "&:hover": {
                transform: `translateY(-${positions[index].offsetY + 10}px)`,
              },
            }}
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: isTop1 ? 8 : 4,
                background: isTop1
                  ? "linear-gradient(135deg, #ffeb3b, #fff176)"
                  : isSelected
                  ? "#e3f2fd"
                  : "#f9f9f9",
                border: isSelected ? "2px solid #1976d2" : "none",
                position: "relative",
                px: 1,
                py: 2,
                "&:hover": {
                  boxShadow: 10,
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent sx={{ px: 1 }}>
                <EmojiEventsIcon
                  sx={{
                    position: "absolute",
                    top: -18,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 30,
                    color: positions[index]?.color ?? "#ccc",
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
                      fontSize: 26,
                    }}
                  />
                )}
                <Typography variant="subtitle1" mt={isTop1 ? 2.5 : 1} noWrap>
                  {positions[index].rank} {user.name}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
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
