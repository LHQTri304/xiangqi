import axios from "axios";

let api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh logic here if needed
      console.warn("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  },
);

export default api;
