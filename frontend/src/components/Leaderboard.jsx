// === src/components/Leaderboard.jsx ===
import React, { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../services/api';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchLeaderboard().then(data => setUsers(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div className="leaderboard">
      <h2>🏆 Leaderboard</h2>
      <ul>
        {users.map((user, i) => (
          <li key={i}>
            <span>#{user.rank} {user.name}</span>
            <span>{user.totalPoints} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
