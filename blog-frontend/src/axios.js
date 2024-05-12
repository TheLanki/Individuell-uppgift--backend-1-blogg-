import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001', // Adjust the base URL according to your backend server
  timeout: 5000, // Adjust the timeout if needed
});

export default instance;
