import React, { useState } from "react";
import { FaLock, FaQuestionCircle, FaSignInAlt, FaEnvelope } from "react-icons/fa";
import { assets } from "../../assets/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppConstants } from "../../Util/constants";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const BACKEND_URL = AppConstants.BACKEND_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${BACKEND_URL}/admin/login`, {
        email,
        password,
      }, { withCredentials: true });

      // Store token in localStorage
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminEmail", data.email);

      toast.success("Login successful!");
      navigate("/admin");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Login failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${assets.Login_Background})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-sm bg-white shadow-xl rounded-md overflow-hidden">

        {/* Header */}
        <div className="bg-gray-100 border-b p-3 text-center font-semibold text-gray-700">
          Admin Panel Login
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-6 space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="flex items-center border rounded mt-1">
              <span className="px-3 text-gray-500">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="w-full py-2 px-2 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="flex items-center border rounded mt-1">
              <span className="px-3 text-gray-500">
                <FaLock />
              </span>
              <input
                type="password"
                className="w-full py-2 px-2 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Buttons Row */}
          <div className="flex items-center justify-between pt-2">

            {/* Forgot password */}
            <button
              type="button"
              className="flex items-center gap-1 text-xs text-red-500 hover:underline"
            >
              <FaQuestionCircle />
              Forgot password?
            </button>

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSignInAlt />
              {loading ? "Logging in..." : "Log in"}
            </button>

          </div>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 border-t p-2">
          Hiru<span className="text-[#FF6B35]">Eats</span> Admin Panel v1.0 | Designed by HirushaDev
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;