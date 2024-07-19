import axios from 'axios';

const token = localStorage.getItem('accessToken');

const instance = axios.create({
  baseURL: 'https://devspot-zqnb.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

export default instance;