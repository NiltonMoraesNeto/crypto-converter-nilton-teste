import axios from 'axios';

const apiKey = "CG-33c1iTSQHy7t4ooVNp1femT6";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
  headers: {
    accept: 'application/json',
    "x-cg-demo-api-key": apiKey
  },
});

export default api;