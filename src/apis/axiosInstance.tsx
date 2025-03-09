import axios from 'axios';

const baseAxios = axios.create({
  headers: {
    accept: 'application/json',
  },
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

export default baseAxios;
