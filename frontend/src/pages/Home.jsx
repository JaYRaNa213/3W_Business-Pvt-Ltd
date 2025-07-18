// src/pages/Home.jsx
import { useEffect, useState } from "react";
import {
  getLeaderboard,
  getAllUsers,
  getUserHistory,
  claimPoints,
} from "../services/api";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import UserSelector from "../components/UserSelector";
import Leaderboard from "../components/Leaderboard";

const Home = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchLeaderboard = async () => {
    const res = await getLeaderboard();
    const sorted = res.data.sort((a, b) => b.totalPoints - a.totalPoints);
    setLeaderboard(sorted);
  };

  const fetchUsers = async () => {
    await getAllUsers();
  };

  const fetchHistory = async () => {
    if (!selectedUserId) return;
    await getUserHistory(selectedUserId);
  };

  const handleClaim = async () => {
    const res = await claimPoints(selectedUserId);
    await fetchUsers();
    await fetchLeaderboard();
    await fetchHistory();
    return res?.data?.points || 0;
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "",
        py: 2,
        px: 0,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#f5f5f5",        
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
        
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#1565c0",
              textShadow: "1px 1px 2px #90caf9",
            }}
          >
            🏆 3 W Business Pvt. Ltd. (Task 1)
          </Typography>

          <UserSelector
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            fetchUsers={fetchUsers}
          />

          <Leaderboard
            data={leaderboard}
            currentUserId={selectedUserId}
            fetchUsers={fetchUsers}
            fetchLeaderboard={fetchLeaderboard}
            fetchHistory={fetchHistory}
            onClaim={handleClaim}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
