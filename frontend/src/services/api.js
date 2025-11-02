import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const defaultUserId = '6904ae0bafab273f3e9da185';

export default api;