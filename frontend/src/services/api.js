const API_BASE = "http://localhost:5000/api";

export const getUsers = async () => {
  const res = await fetch(`${API_BASE}/users`);
  return res.json();
};

export const claimPoints = async (userId) => {
  const res = await fetch(`${API_BASE}/claim`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  return res.json();
};

export const getLeaderboard = async () => {
  const res = await fetch(`${API_BASE}/leaderboard`);
  return res.json();
};
