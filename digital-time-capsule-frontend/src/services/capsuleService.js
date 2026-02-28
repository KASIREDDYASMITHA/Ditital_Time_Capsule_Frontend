import axiosInstance from "./axiosInstance";

// ============================
// CREATE CAPSULE
// ============================
export const createCapsule = async (formData) => {
  const response = await axiosInstance.post("/api/capsules", formData);
  return response.data;
};

// ============================
// GET USER CAPSULES
// ============================
export const getUserCapsules = async () => {
  const response = await axiosInstance.get("/api/capsules");
  return response.data;
};

// ============================
// GET SINGLE CAPSULE
// ============================
export const getSingleCapsule = async (id) => {
  const response = await axiosInstance.get(`/api/capsules/${id}`);
  return response.data;
};

// ============================
// UPDATE CAPSULE
// ============================
export const updateCapsule = async (id, data) => {
  const response = await axiosInstance.put(`/api/capsules/${id}`, data);
  return response.data;
};

// ============================
// DELETE CAPSULE
// ============================
export const deleteCapsule = async (id) => {
  const response = await axiosInstance.delete(`/api/capsules/${id}`);
  return response.data;
};
