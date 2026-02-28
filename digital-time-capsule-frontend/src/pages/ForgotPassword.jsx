import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Reset link sent to your email!");
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
          Forgot Password?
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-pink-500"
          >
            Send Reset Link
          </button>
        </form>
      </motion.div>
    </div>
  );
}


// import { sendResetPasswordEmail } from "../services/authService";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     try {
//       await sendResetPasswordEmail(email);
//       setMessage("Password reset link sent to your email.");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow-md w-96"
//       >
//         <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

//         <input
//           type="email"
//           placeholder="Enter your email"
//           className="w-full border p-2 mb-3"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         {message && <p className="text-green-600">{message}</p>}
//         {error && <p className="text-red-600">{error}</p>}

//         <button className="w-full bg-purple-600 text-white p-2 mt-3">
//           Send Reset Link
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;













// // FRONTEND
// // FILE: src/pages/ForgotPassword.jsx

// import { useState } from "react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import { forgotPassword } from "../services/authService";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // await sendResetPasswordEmail(email);
//       await forgotPassword(email);
//       toast.success("Reset link sent to your email!");
//     } catch (error) {
//       toast.error(error.message || "Failed to send reset link");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold text-center mb-6">
//           Forgot Password?
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-pink-500"
//           >
//             {loading ? "Sending..." : "Send Reset Link"}
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }










// // FRONTEND
// // FILE: src/pages/ForgotPassword.jsx

// import { useState } from "react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// // import { sendResetPasswordEmail } from "@/services/authService";
// import { forgotPassword } from "@/services/authService";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // if (!email) {
//     //   toast.error("Email is required");
//     //   return;
//     // }
//     try {
//     await forgotPassword(email);
//     toast.success("Reset link sent to your email");
//   } catch (err) {
//     toast.error(err.message);
//   }


  
//     try {
//       setLoading(true);
//       await sendResetPasswordEmail(email);
//       toast.success("Password reset link sent to your email");
//     } catch (error) {
//       toast.error(error.message || "Failed to send reset link");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold text-center mb-6">
//           Forgot Password?
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-4 rounded-xl font-semibold text-white ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-indigo-500 to-pink-500"
//             }`}
//           >
//             {loading ? "Sending..." : "Send Reset Link"}
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }










































