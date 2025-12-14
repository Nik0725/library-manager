import axios from 'axios';

/*
  API configuration
  Uses deployed Render backend
*/
const api = axios.create({
  baseURL: 'https://library-manager-api-g7zt.onrender.com/api',
});

// Attach token if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

