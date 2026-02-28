import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://digital-time-capsule-backend-ymlv.onrender.com/",
  withCredentials: false,
});

// ✅ REQUEST INTERCEPTOR (ADD TOKEN AUTOMATICALLY)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE ERROR LOGGER
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default axiosInstance;
