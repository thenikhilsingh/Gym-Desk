import React, { useContext, useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { storeTokenInLS } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        payload,
      );
      if (response.status === 201) {
        storeTokenInLS(response.data.token);
        navigate("/");
        setPayload({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#7F88A2] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl overflow-hidden rounded-[36px] bg-white p-3 shadow-[0_30px_80px_rgba(0,0,0,0.15)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left */}
          <div className="hidden lg:block h-full">
            <img
              src="/authPageImg.avif"
              alt="signup"
              className="w-full h-full object-cover rounded-[30px]"
            />
          </div>

          {/* Right */}
          <div className="flex flex-col justify-center px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-6 w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition"
            >
              <ArrowLeft size={18} strokeWidth={2.2} />
            </button>

            <h1 className="text-5xl font-semibold tracking-tight text-black">
              Create an Account
            </h1>

            <p className="mt-2 text-[15px] text-gray-500">
              Already have an account?
              <span
                onClick={() => navigate("/")}
                className="ml-1 font-semibold text-black cursor-pointer hover:underline"
              >
                Log In
              </span>
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>

                  <input
                    type="text"
                    placeholder="John"
                    className="mt-2 h-12 w-full rounded-full border border-gray-200 px-5 text-sm placeholder:text-gray-400 outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                    name="firstName"
                    value={payload.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Last Name</label>

                  <input
                    type="text"
                    placeholder="Doe"
                    className="mt-2 h-12 w-full rounded-full border border-gray-200 px-5 text-sm placeholder:text-gray-400 outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                    name="lastName"
                    value={payload.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium">Email Address</label>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="mt-2 h-12 w-full rounded-full border border-gray-200 px-5 text-sm placeholder:text-gray-400 outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                  name="email"
                  value={payload.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium">Password</label>

                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
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
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 h-12 w-full rounded-full bg-black text-sm font-medium text-white transition hover:bg-neutral-800 active:scale-[0.99]"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
