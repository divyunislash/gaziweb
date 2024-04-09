import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  headers: {
    "Access-Control-Allow-Credentials": true,
  },
});

export { axiosInstance };
