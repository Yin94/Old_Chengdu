import axios from 'axios';
const httpClient = axios.create({
  // baseURL: 'https://laochengdu-restaurant.herokuapp.com/api/',
  baseURL: 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 1000
});
export default httpClient;
