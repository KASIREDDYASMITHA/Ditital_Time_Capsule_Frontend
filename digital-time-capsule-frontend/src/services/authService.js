import axiosInstance from "./axiosInstance";



export const registerUser = async (data) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axiosInstance.post("/auth/login", data)

  return response.data;
};



// FRONTEND
// FILE: src/services/authService.js

// import axiosInstance from "./axiosInstance";
// import { createClient } from "@supabase/supabase-js";

// /* ===============================
//    EXISTING CODE (UNCHANGED)
// =============================== */
// export const registerUser = async (data) => {
//   const response = await axiosInstance.post("/auth/register", data);
//   return response.data;
// };

// export const loginUser = async (data) => {
//   const response = await axiosInstance.post("/auth/login", data);
//   return response.data;
// };

// /* ===============================
//    ✅ NEW CODE (ADD BELOW)
// =============================== */

// const supabase = createClient(
//   import.meta.env.VITE_API_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

// // Send reset link
// export const sendResetPasswordEmail = async (email) => {
//   const { error } = await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: "http://localhost:5173/reset-password",
//   });

//   if (error) throw error;
// };

// // Update password after redirect
// export const resetPassword = async (newPassword) => {
//   const { error } = await supabase.auth.updateUser({
//     password: newPassword,
//   });

//   if (error) throw error;
// };

// import { createClient } from "@supabase/supabase-js";

// /* ===============================
//    SUPABASE CLIENT
// ================================= */

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// if (!supabaseUrl) throw new Error("VITE_SUPABASE_URL missing");
// if (!supabaseAnonKey) throw new Error("VITE_SUPABASE_ANON_KEY missing");

// export const supabase = createClient(
//   supabaseUrl,
//   supabaseAnonKey
// );

// /* ===============================
//    FORGOT PASSWORD (SEND EMAIL)
// ================================= */

// export const forgotPassword = async (email) => {
//   const { error } = await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: "http://localhost:5173/reset-password",
//   });

//   if (error) throw error;

//   return { message: "Password reset email sent" };
// };

// /* ===============================
//    RESET PASSWORD (UPDATE)
// ================================= */

// export const resetPassword = async (newPassword) => {
//   const { error } = await supabase.auth.updateUser({
//     password: newPassword,
//   });

//   if (error) throw error;

//   return { message: "Password updated successfully" };
// };


// FRONTEND
// FILE: src/services/authService.js

// import axiosInstance from "./axiosInstance";
// import { createClient } from "@supabase/supabase-js";

// /* ===============================
//    SUPABASE CLIENT (PASSWORD RESET)
// ================================ */
// const supabaseUrl = import.meta.env.VITE_API_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// /* ===============================
//    AUTH API CALLS (EXISTING)
// ================================ */

// // ✅ REGISTER USER (already used)
// export const registerUser = async (data) => {
//   const response = await axiosInstance.post("/auth/register", data);
//   return response.data;
// };

// // ✅ LOGIN USER (❗ THIS WAS MISSING — REQUIRED)
// export const loginUser = async (data) => {
//   const response = await axiosInstance.post("/auth/login", data);
//   return response.data;
// };
// export async function loginUser(email, password) {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) throw error;
//   return data;
// }

// /* ===============================
//    FORGOT / RESET PASSWORD (SUPABASE)
// ================================ */

// // Send reset password email
// export const sendResetPasswordEmail = async (email) => {
//   const { error } = await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: "http://localhost:5173/reset-password",
//   });

//   if (error) {
//     throw error;
//   }
// };

// // Update password after redirect
// export const updatePassword = async (newPassword) => {
//   const { error } = await supabase.auth.updateUser({
//     password: newPassword,
//   });

//   if (error) {
//     throw error;
//   }
// };

// // FRONTEND FILE
// // src/services/authService.js

// // import { createClient } from "@supabase/supabase-js";

// /* =========================
//    SUPABASE CLIENT
// ========================= */
// // const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// // const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error("Supabase URL or Anon Key missing");
// }

// // export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// /* =========================
//    PASSWORD RESET
// ========================= */
// export const forgotPassword = async (email) => {
//   const { error } = await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: "http://localhost:5173/reset-password",
//   });

//   if (error) throw error;
// };

// /* =========================
//    SUPABASE REGISTER
// ========================= */
// export const supabaseRegister = async ({ email, password }) => {
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//   });

//   if (error) {
//     throw error;
//   }

//   return data;
// };

// // FRONTEND — authService.js



// // ✅ LOGIN (THIS FIXES YOUR ERROR)
// export async function loginUser(email, password) {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) throw error;
//   return data;
// }










// import axiosInstance from "./axiosInstance";
// import { createClient } from "@supabase/supabase-js";

// /* ===============================
//    SUPABASE CLIENT
// ================================ */
// const supabaseUrl = import.meta.env.VITE_API_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error("Supabase URL or Anon Key missing");
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// /* ===============================
//    BACKEND AUTH (EXISTING)
// ================================ */

// // ✅ Register via YOUR backend
// export const registerUser = async (data) => {
//   const response = await axiosInstance.post("/auth/register", data);
//   return response.data;
// };

// // ✅ Login via YOUR backend
// export const loginUser = async (data) => {
//   const response = await axiosInstance.post("/auth/login", data);
//   return response.data;
// };

// /* ===============================
//    SUPABASE AUTH (PASSWORD RESET)
// ================================ */

// // ✅ Supabase signup (used in Register.jsx)
// export const supabaseRegister = async ({ email, password }) => {
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//   });

//   if (error) throw error;
//   return data;
// };

// // ✅ Send reset password email
// export const forgotPassword = async (email) => {
//   const { error } = await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: "http://localhost:5173/reset-password",
//   });

//   if (error) throw error;
// };

// // ✅ Alias (prevents import errors)
// export const sendResetPasswordEmail = forgotPassword;

// // ✅ Update password after redirect
// export const updatePassword = async (newPassword) => {
//   const { error } = await supabase.auth.updateUser({
//     password: newPassword,
//   });

//   if (error) throw error;
// };