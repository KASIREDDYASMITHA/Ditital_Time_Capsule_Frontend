// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL}/api`,
//   withCredentials: true,
// });



// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default axiosInstance;
// console.log("API URL:", import.meta.env.VITE_API_URL);


// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL}/api`,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Attach token automatically
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // Optional: response error logging (helps debugging)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API ERROR:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// console.log("API URL:", import.meta.env.VITE_API_URL);

// export default axiosInstance;


















// src/services/axiosInstance.js

// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000", // ✅ YOUR BACKEND
  
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: false, // ✅ MUST be false
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error(
//       "API ERROR:",
//       error.response?.data || error.message
//     );
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;














// FRONTEND
// File: src/services/axiosInstance.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://digital-time-capsule-backend-ymlv.onrender.com/",
  withCredentials: false,
});

// ✅ REQUEST INTERCEPTOR (ADD TOKEN AUTOMATICALLY)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 👈 must match your login storage key

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE ERROR LOGGER
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API ERROR:",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default axiosInstance;