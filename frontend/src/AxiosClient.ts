import axios  from "axios";



let baseURL = "https://xiangqi-backend-e4f524a5a2ad.herokuapp.com";
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:8080";
}
  

let api = axios.create({
  baseURL: baseURL, 
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
