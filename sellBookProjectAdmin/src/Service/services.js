import axios from "axios";
import { AUTH_TOKEN } from "../utils/constants";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// http.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     function (error) {
//         return Promise.reject(error);
//     },
// );

export default http;
