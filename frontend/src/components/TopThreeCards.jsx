import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  useTheme,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import "./TopThreeCards.css"; // for confetti

const TopThreeCards = ({ users, currentUserId }) => {
  const theme = useTheme();
  const positions = [
    { rank: "🥈", offsetY: 20, color: "#c0c0c0" }, // Silver
    { rank: "🥇", offsetY: 40, color: "#ffd700" }, // Gold
    { rank: "🥉", offsetY: 20, color: "#cd7f32" }, // Bronze
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: { xs: 1, sm: 3 },
        mt: { xs: 5, sm: 8 },
        mb: { xs: 3, sm: 4 },
        px: { xs: 1, sm: 3 },
        overflowX: "auto",
        minHeight: 200,
        pt: 4, // extra top padding for floating icons
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
              minWidth: { xs: 105, sm: 140 },
              flexShrink: 0,
              "&:hover": {
                transform: `translateY(-${positions[index].offsetY + 10}px) scale(1.03)`,
              },
            }}
          >
            <Card
              sx={{
                borderRadius: 5,
                boxShadow: isTop1 ? 8 : 4,
                background: isTop1
                  ? "linear-gradient(135deg, #fff176, #ffe082)"
                  : isSelected
                  ? "#e3f2fd"
                  : "#f5f5f5",
                border: isSelected ? "2px solid #1976d2" : "none",
                position: "relative",
                px: 1,
                py: 3,
                overflow: "visible",
                transition: "box-shadow 0.3s, transform 0.3s",
              }}
            >
              <CardContent sx={{ px:0, pb: "1px !important" }}>
                <EmojiEventsIcon
                  sx={{
                    position: "absolute",
                    top: -24,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 36,
                    color: positions[index]?.color ?? "#ccc",
                    zIndex: 2,
                  }}
                />
                {isTop1 && (
                  <StarIcon
                    className="sparkle"
                    sx={{
                      position: "absolute",
                      top: -16,
                      right: -12,
                      color: "#ff4081",
                      fontSize: 26,
                      zIndex: 1,
                    }}
                  />
                )}
                <Typography
                  variant="subtitle1"
                  mt={3}
                  fontWeight={600}
                  noWrap
                  sx={{ color: "#333" }}
                >
                  {positions[index].rank} {user.name}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ color: "#555" }}
                >
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
