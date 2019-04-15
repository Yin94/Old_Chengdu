import axios from 'axios';
const httpClient = axios.create({
  baseURL: 'https://laochengdu-restaurant.herokuapp.com/api/',
  headers: { 'Content-Type': 'application/json' },
  timeout: 2000
});
export default httpClient;
