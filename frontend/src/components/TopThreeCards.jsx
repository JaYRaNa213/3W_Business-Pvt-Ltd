// TopThreeCards.jsx
import React from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { motion } from "framer-motion";
import { EmojiEvents } from "@mui/icons-material";

const rankColors = ["#FFD700", "#C0C0C0", "#CD7F32"]; // gold, silver, bronze

const TopThreeCards = ({ users }) => {
  return (
    <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap" mt={2}>
      {users.map((user, index) => (
        <motion.div
          key={user._id || index} // ✅ fallback key
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <Card
            sx={{
              width: 200,
              background: rankColors[index],
              color: "black",
              textAlign: "center",
              borderRadius: 4,
              boxShadow: 6,
              position: "relative",
            }}
          >
            <CardContent>
              {index === 0 && (
                <EmojiEvents
                  fontSize="large"
                  sx={{
                    color: "#FFD700",
                    position: "absolute",
                    top: -20,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
              )}
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  margin: "20px auto 10px",
                  fontSize: 24,
                  bgcolor: "#fff",
                  color: "#000",
                }}
              >
                {user?.name?.[0] || "?"} {/* ✅ Fallback for name */}
              </Avatar>
              <Typography variant="h6">{user?.name || "Unknown"}</Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                {(user?.totalPoints ?? 0).toLocaleString()} pts {/* ✅ Safe points */}
              </Typography>
              <Typography variant="body2">#{index + 1} Rank</Typography>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </Box>
  );
};

export default TopThreeCards;
