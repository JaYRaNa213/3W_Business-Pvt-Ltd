// src/App.jsx
import { useEffect, useState } from "react";
import { getLeaderboard, claimPoints } from "./services/api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import UserSelector from "./components/UserSelector";
import Leaderboard from "./components/Leaderboard";
import ClaimHistoryPage from "./pages/ClaimHistoryPage";

function HomePage({ leaderboard, selectedUserId, setSelectedUserId, handleClaim }) {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
                🏆
               3 W Pvt. Ltd. Task 1 
      </Typography>

      <UserSelector
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />

      <Leaderboard
        data={leaderboard}
        currentUserId={selectedUserId}
        onClaim={handleClaim}
      />
    </Container>
  );
}

function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchLeaderboard = async () => {
    const res = await getLeaderboard();
    const sorted = res.data.sort((a, b) => b.totalPoints - a.totalPoints);
    setLeaderboard(sorted);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleClaim = async (userId) => {
    const res = await claimPoints(userId);
    await fetchLeaderboard();
    return res;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              leaderboard={leaderboard}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              handleClaim={handleClaim}
            />
          }
        />
        <Route path="/history/:userId" element={<ClaimHistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
