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
    await getAllUsers(); // fetch without storing since UserSelector will handle dropdown
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
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
    </Container>
  );
};

export default Home;
