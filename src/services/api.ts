import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.upbit.com/v1',
  timeout: 1000,
  headers: { Accept: 'application/json' },
});

export default api;
