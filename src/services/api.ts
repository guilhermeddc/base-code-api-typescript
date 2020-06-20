import axios from 'axios';

/**
 * Serivce for managing accounts
 * @returns Axios instances
 */

const api = {
  puppy: axios.create({
    baseURL: process.env.API_PUPPY_URL,
  }),
  giphy: axios.create({
    baseURL: process.env.API_GIPHY_URL,
  }),
};

export default api;
