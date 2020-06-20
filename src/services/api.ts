import axios from 'axios';

const account = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_API
      : process.env.HML_API,

  headers: {
    'Content-Type': 'application/json',
  },
});

export default account;
