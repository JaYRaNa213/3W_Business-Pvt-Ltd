// === src/services/api.js ===
const BASE_URL = 'http://localhost:5000/api';

export const fetchUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return await res.json();
};

export const claimPoints = async (userId) => {
  const res = await fetch(`${BASE_URL}/claim/${userId}`, {
    method: 'POST',
  });
  return await res.json();
};

export const fetchLeaderboard = async () => {
  const res = await fetch(`${BASE_URL}/leaderboard`);
  return await res.json();
};
