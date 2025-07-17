import { useEffect, useState } from 'react';
import { getLeaderboard } from './services/api.js';
import Leaderboard from './components/Leaderboard';
import Container from '@mui/material/Container';

function App() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLeaderboard();
        setLeaderboard(res.data);
      } catch (error) {
        console.error("Error loading leaderboard:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Leaderboard data={leaderboard} />
    </Container>
  );
}

export default App;
