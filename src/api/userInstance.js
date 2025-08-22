import axios from 'axios';

const userInstance = axios.create({
  baseURL: import.meta.env.VITE_USER_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

export default userInstance;
