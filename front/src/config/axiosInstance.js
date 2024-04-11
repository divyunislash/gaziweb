import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": process.env.REACT_APP_HOST,
    "Access-Control-Allow-Credentials": true,
  },
});

export { axiosInstance };
