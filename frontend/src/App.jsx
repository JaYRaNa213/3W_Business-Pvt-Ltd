import { useEffect, useState } from "react";
import { getLeaderboard, claimPoints } from "./services/api";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import UserSelector from "./components/UserSelector";
import Leaderboard from "./components/Leaderboard";
import ClaimHistory from "./components/ClaimHistory";

function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");

  const fetchLeaderboard = async () => {
    try {
      const res = await getLeaderboard();
      const sorted = res.data.sort((a, b) => b.totalPoints - a.totalPoints);
      setLeaderboard(sorted);
    } catch (error) {
      console.error("Error loading leaderboard:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleClaim = async (userId) => {
    try {
      await claimPoints(userId);
      fetchLeaderboard(); // Refresh after claiming
    } catch (err) {
      console.error("Claim failed", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        🏆 Leaderboard System
      </Typography>

      <UserSelector
        users={leaderboard}
        selectedUserId={currentUserId}
        onSelect={setCurrentUserId}
        onClaim={handleClaim}
      />

      <Leaderboard
        data={leaderboard}
        currentUserId={currentUserId}
        onClaim={handleClaim}
      />

      <ClaimHistory />
    </Container>
  );
}

export default App;
