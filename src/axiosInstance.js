import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend API URL
});

// Add a request interceptor to include the token
instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
