


import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/* =========================
   VALIDATION SCHEMA
========================= */
const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Register() {
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
//   const onSubmit = async (data) => {
//   try {
//     await supabaseRegister(data);
//     toast.success("Registered successfully! Check your email.");
//     navigate("/login");
//   } catch (error) {
//     toast.error(error.message);
//   }
// };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
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
          Create Account 🚀
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Start preserving your memories for the future.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

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

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm -mt-3">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-semibold text-white transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90"
            }`}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-semibold">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}