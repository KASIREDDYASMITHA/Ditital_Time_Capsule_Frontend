// FRONTEND
// FILE: src/pages/ResetPassword.jsx

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { resetPassword } from "@/services/authService";

// export default function ResetPassword() {
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleReset = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await resetPassword(password);
//       toast.success("Password reset successful!");
//       navigate("/login");
//     } catch (error) {
//       toast.error(error.message || "Password reset failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 px-4">
//       <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center mb-6">
//           Reset Password
//         </h2>

//         <form onSubmit={handleReset} className="space-y-5">
//           <input
//             type="password"
//             placeholder="New Password"
//             className="w-full p-4 border border-gray-300 rounded-xl"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-pink-500"
//           >
//             {loading ? "Updating..." : "Update Password"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }/


// import { useState } from "react";
// import { resetPassword } from "../services/authService";

// function ResetPassword() {
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     if (password !== confirm) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       await resetPassword(password);
//       setMessage("Password reset successful. You can login now.");
//     } catch (err) {
//       setError(err.message || "Failed to reset password");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "100px auto" }}>
//       <h2>Reset Password</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="New password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <br /><br />

//         <input
//           type="password"
//           placeholder="Confirm password"
//           value={confirm}
//           onChange={(e) => setConfirm(e.target.value)}
//           required
//         />

//         <br /><br />

//         <button type="submit">Reset Password</button>
//       </form>

//       {message && <p style={{ color: "green" }}>{message}</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// }

// export default ResetPassword;

// FRONTEND
// FILE: src/pages/ResetPassword.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { updatePassword } from "@/services/authService";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await updatePassword(password);
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            placeholder="New password"
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-semibold text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-pink-500"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}