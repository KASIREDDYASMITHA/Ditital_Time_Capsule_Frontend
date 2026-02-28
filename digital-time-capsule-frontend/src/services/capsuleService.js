

// import axiosInstance from "./axiosInstance";

// // Create Capsule (supports FormData)
// export const createCapsule = async (data) => {
//   const response = await axiosInstance.post("/capsules", data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };

// // Get User Capsules
// export const getUserCapsules = async () => {
//   const response = await axiosInstance.get("/capsules");
//   return response.data;
// };

// // Delete Capsule
// export const deleteCapsule = async (id) => {
//   const response = await axiosInstance.delete(`/capsules/${id}`);
//   return response.data;
// };

// console.log("Axios Instance:", axiosInstance);

















// FRONTEND
// File: src/services/capsuleService.js

import axiosInstance from "./axiosInstance";

// ============================
// CREATE CAPSULE
// ============================
export const createCapsule = async (formData) => {
  const response = await axiosInstance.post(
    "/api/capsules", // ✅ FIXED PATH
    formData
  );
  return response.data;
};

// ============================
// GET USER CAPSULES
// ============================
export const getUserCapsules = async () => {
  const response = await axiosInstance.get(
    "/api/capsules" // ✅ FIXED PATH
  );
  return response.data;
};

// ============================
// GET SINGLE CAPSULE
// ============================
export const getSingleCapsule = async (id) => {
  const response = await axiosInstance.get(
    `/api/capsules/${id}` // ✅ FIXED PATH
  );
  return response.data;
};


// ============================
// UPDATE CAPSULE
// ============================
export const updateCapsule = async (id, data) => {
  const response = await axiosInstance.put(
    `/api/capsules/${id}`, // ✅ FIXED PATH
    data
  );
  return response.data;
};

// ============================
// DELETE CAPSULE
// ============================
export const deleteCapsule = async (id) => {
  const response = await axiosInstance.delete(
    `/api/capsules/${id}` // ✅ FIXED PATH
  );
  return response.data;
};