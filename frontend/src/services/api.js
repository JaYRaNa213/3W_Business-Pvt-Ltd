import axios from 'axios';

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });

const API = axios.create({ baseURL: 'http://localhost:5000/api/users' });


// Get all users
export const getUsers = () => API.get('/');

// Get leaderboard
export const getLeaderboard = () => API.get('/leaderboard');

// Claim points for a user
export const claimPoints = (userId) => API.post(`/${userId}/claim`);

// Get claim history
export const getHistory = () => API.get('/history');

// Create new user
export const createUser = (name) => API.post('/', { name });

export default API;
