import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Get all users
export const getUsers = () => API.get('/users');

// Get leaderboard
export const getLeaderboard = () => API.get('/users/leaderboard');

// Claim points for a user
export const claimPoints = (userId) => API.post(`/users/${userId}/claim`);

// Get claim history
export const getHistory = () => API.get('/users/history');

// Create new user
export const createUser = (name) => API.post('/users', { name });

export default API;
