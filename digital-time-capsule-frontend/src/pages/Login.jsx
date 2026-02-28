
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { Eye, EyeOff } from "lucide-react";
// import toast from "react-hot-toast";
// import { useAuth } from "@/context/AuthContext";

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) return;

//     try {
//       setLoading(true);

//       const { data } = await axios.post(
//         "http://localhost:5000/api/users/login",
//         { email, password }
//       );

//       login(data); // use context instead of localStorage directly
//       toast.success("Login successful!");
//       navigate("/dashboard");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
// <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 px-4 sm:px-6 lg:px-8 py-8">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
//       >
//         <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
//           Welcome Back 👋
//         </h2>
//         <p className="text-center text-gray-500 mb-8">
//           Sign in to your time capsules
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="email"
//             placeholder="Email Address"
//             className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           <div className="text-right">
//             <Link
//               to="/forgot-password"
//               className="text-sm text-purple-600 hover:underline"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-4 rounded-xl font-semibold text-white transition duration-300 ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90"
//             }`}
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         <p className="text-center mt-6 text-gray-600">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-purple-600 font-semibold">
//             Sign up
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }























import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//import { loginUser } from "../services/authService";


/* =========================
   VALIDATION SCHEMA
========================= */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
 

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login(data);
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
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
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Sign in to your time capsules
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email")}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm -mt-3">
              {errors.password.message}
            </p>
          )}

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-purple-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-semibold text-white transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-600 font-semibold">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}