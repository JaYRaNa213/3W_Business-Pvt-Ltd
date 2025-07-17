// === src/pages/Home.jsx ===
import React, { useState } from 'react';
import Leaderboard from '../components/Leaderboard';
import ClaimButton from '../components/ClaimButton';
import UserSelector from '../components/UserSelector';
import '../styles/Home.css';

export default function Home() {
  const [selectedUser, setSelectedUser] = useState('');
  const [lastClaim, setLastClaim] = useState(null);

  return (
    <div className="home-container">
      <h1 className="home-title">3W Point Claiming System</h1>
      <div className="card">
        <UserSelector selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <ClaimButton selectedUser={selectedUser} setLastClaim={setLastClaim} />
        {lastClaim && <p className="claim-message">{lastClaim}</p>}
        <Leaderboard />
      </div>
    </div>
  );
}
