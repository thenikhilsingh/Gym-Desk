import React, { useContext, useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { storeTokenInLS, isLoggedIn, user } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        payload,
      );

      if ((response.status = 200)) {
        storeTokenInLS(response.data.token);
        if (response.data.isAdmin) {
          navigate("/admin");
          toast.success(response?.data?.message || "LogIn Successfull!");
        } else {
          navigate("/app");
          toast.success(response?.data?.message || "LogIn Successfull!");
        }
        setPayload({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
      if (error.response?.data?.errors) {
        const validationErrors = {};
        error.response.data.errors.forEach((err) => {
          validationErrors[err.path] = err.msg;
        });
        setErrors(validationErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn && user.is_admin) {
    return <Navigate to="/admin" />;
  }

  if (isLoggedIn && !user.is_admin) {
    return <Navigate to="/app" />;
  }
  return (
    <div className="min-h-screen bg-[#7F88A2] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl overflow-hidden rounded-[36px] bg-white p-3 shadow-[0_30px_80px_rgba(0,0,0,0.15)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left */}
          <div className="hidden lg:block h-full">
            <img
              src="/authPageImg.avif"
              alt="login"
              className="w-full h-full object-cover rounded-[30px]"
            />
          </div>

          {/* Right */}
          <div className="flex flex-col justify-center px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
            {/* Back */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100"
            >
              <ArrowLeft size={18} strokeWidth={2.2} />
            </button>

            {/* Heading */}
            <h1 className="text-5xl font-semibold tracking-tight text-black">
              Welcome Back
            </h1>

            <p className="mt-2 text-[15px] text-gray-500">
              Don't have an account?
              <span
                onClick={() => navigate("/signup")}
                className="ml-1 cursor-pointer font-semibold text-black hover:underline"
              >
                Sign Up
              </span>
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              {/* Email */}
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mt-2 h-12 w-full rounded-full border border-gray-200 px-5 text-sm placeholder:text-gray-400 outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                  name="email"
                  value={payload.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Password</label>

                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-black"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-full border border-gray-200 px-5 pr-12 text-sm placeholder:text-gray-400 outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                    name="password"
                    value={payload.password}
                    onChange={handleChange}
                  />

                  {showPassword ? (
                    <EyeOff
                      size={18}
                      className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  ) : (
                    <Eye
                      size={18}
                      className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  )}
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 h-12 w-full rounded-full bg-black text-sm font-medium text-white transition hover:bg-neutral-800 active:scale-[0.99]"
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
