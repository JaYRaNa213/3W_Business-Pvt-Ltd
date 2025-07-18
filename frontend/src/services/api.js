
// ✅ api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api/users',
});

export const getAllUsers = () => API.get('/');
export const getLeaderboard = () => API.get('/leaderboard');
export const claimPoints = (userId) => API.post(`/${userId}/claim`);
export const getUserHistory = (userId) => API.get(`/history/${userId}`);
export const createUser = (name) => API.post('/', { name });

export default API;
