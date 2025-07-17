import { useEffect, useState } from 'react';
import { getLeaderboard, getUsers } from './services/api.js';
import Leaderboard from './components/Leaderboard';
import ClaimPoints from './components/ClaimPoints';
import Container from '@mui/material/Container';

function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const leaderboardRes = await getLeaderboard();
      const usersRes = await getUsers();
      setLeaderboard(leaderboardRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <ClaimPoints users={users} onClaimSuccess={fetchData} />
      <Leaderboard data={leaderboard} />
    </Container>
  );
}

export default App;
