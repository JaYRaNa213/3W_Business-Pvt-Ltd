// === src/components/ClaimButton.jsx ===
import React from 'react';
import { claimPoints } from '../services/api';
import '../styles/ClaimButton.css';

const ClaimButton = ({ selectedUser, setLastClaim }) => {
  const handleClaim = async () => {
    if (!selectedUser) return alert('Please select a user first!');
    const data = await claimPoints(selectedUser);
    setLastClaim(`You claimed ${data.points} points!`);
  };

  return (
    <button className="claim-btn" onClick={handleClaim}>
      Claim Points
    </button>
  );
};

export default ClaimButton;
