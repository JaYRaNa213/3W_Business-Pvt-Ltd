import { useState } from 'react';
import { claimPoints } from '../services/api';
import { Button, MenuItem, Select } from '@mui/material';

const ClaimPoints = ({ users, onClaimSuccess }) => {
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleClaim = async () => {
    if (!selectedUserId) return;

    try {
      const res = await claimPoints(selectedUserId);
      alert(`User claimed ${res.data.randomPoints} points!`);
      onClaimSuccess(); // refresh leaderboard
    } catch (err) {
      console.error("Error claiming points:", err);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        displayEmpty
        sx={{ mr: 2, minWidth: 200 }}
      >
        <MenuItem value="">Select User</MenuItem>
        {users.map(user => (
          <MenuItem key={user._id} value={user._id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" onClick={handleClaim}>
        Claim Points
      </Button>
    </div>
  );
};

export default ClaimPoints;
