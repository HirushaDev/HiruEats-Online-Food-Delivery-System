import React, { useState, useRef } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import { AppConstants } from "../../Util/constants";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=email, 2=OTP, 3=new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const otpRefs = useRef([]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ── Step 1: Send OTP ────────────────────────────────────────────────────────
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${AppConstants.BACKEND_API_BASE_URL}/send-reset-otp`,
        null,
        { params: { email: email.trim() } }
      );
      toast.success(response.data?.message || "OTP sent to your email");
      setStep(2);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to send OTP";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Step 2: Verify OTP (client-side length check, real verify on step 3) ──
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter the full 6-digit OTP");
      return;
    }
    setStep(3);
  };

  // ── Step 3: Reset Password ───────────────────────────────────────────────────
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      toast.error("Please enter the full 6-digit OTP");
      return;
    }
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${AppConstants.BACKEND_API_BASE_URL}/reset-password`,
        { email: email.trim(), otp: otpString, newPassword }
      );
      toast.success(response.data?.message || "Password reset successfully!");
      setEmail("");
      setOtp(["", "", "", "", "", ""]);
      setNewPassword("");
      setConfirmPassword("");
      setStep(1);
      navigate("/login");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to reset password";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Resend OTP (reuse step 1 handler with toast feedback) ────────────────────
  const handleResendOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${AppConstants.BACKEND_API_BASE_URL}/send-reset-otp`,
        null,
        { params: { email: email.trim() } }
      );
      toast.success(response.data?.message || "OTP resent to your email");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to resend OTP";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // OTP digit input handler
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const stepTitles = {
    1: "Reset Your Password",
    2: "Enter OTP",
    3: "Create New Password",
  };

  const stepDescriptions = {
    1: "Enter your registered email address and we'll send you an OTP to reset your password.",
    2: `We've sent a 6-digit OTP to ${email}. Enter it below to continue.`,
    3: "Enter your new password below. Make sure it's at least 6 characters.",
  };

  return (
    <div
      className="relative min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.Login_Background})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Logo */}
      <div className="absolute top-5 left-8 flex items-center z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-bold text-2xl"
        >
          <img
            src={assets.logo}
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-2xl">
            Hiru<span className="text-orange-500 text-3xl">Eats</span>
          </span>
        </Link>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md min-h-75 bg-white/0 backdrop-blur-md p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-3xl border border-orange-500">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
          {stepTitles[step]}
        </h2>
        <div className="flex justify-center mb-6">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-10 h-10 rounded-full border border-orange-500 shadow-lg"
          />
        </div>

        <form className="flex flex-col gap-4">
          {/* Subtitle */}
          <p className="text-gray-300 text-center text-sm leading-relaxed mb-4">
            {stepDescriptions[step]}
          </p>

          {/* Step 1: Email */}
          {step === 1 && (
            <>
              <div className="mb-2">
                <label className="block text-white mb-2 relative left-4 font-medium">
                  Email Id
                </label>
                <div className="relative left-6 w-[85%] mx-auto">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full block h-12 px-5 pl-10 py-4 rounded-lg border border-gray-300 text-white placeholder:text-gray-500 placeholder:text-sm placeholder:italic focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSendOtp}
                disabled={isSubmitting}
                className="w-[40%] mx-auto block h-10 mt-4 mb-4 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer text-center disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send OTP"}
              </button>
            </>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <>
              <div className="mb-2">
                <label className="block text-white mb-3 text-center font-medium">
                  6-Digit OTP
                </label>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-11 h-12 text-center text-lg font-bold rounded-lg border border-gray-300 text-white bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                onClick={handleVerifyOtp}
                disabled={isSubmitting}
                className="w-[40%] mx-auto block h-10 mt-4 mb-4 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer text-center disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </button>
              <p className="text-center text-gray-400 text-sm">
                Didn't receive OTP?{" "}
                <span
                  onClick={handleResendOtp}
                  className="text-orange-500 underline cursor-pointer"
                >
                  Resend
                </span>
              </p>
            </>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <>
              <div className="mb-2">
                <label className="block text-white mb-2 relative left-4 font-medium">
                  New Password
                </label>
                <div className="relative left-6 w-[85%] mx-auto">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full block h-12 px-5 pl-10 py-4 rounded-lg border border-gray-300 text-white placeholder:text-gray-500 placeholder:text-sm placeholder:italic focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-white mb-2 relative left-4 font-medium">
                  Confirm Password
                </label>
                <div className="relative left-6 w-[85%] mx-auto">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full block h-12 px-5 pl-10 py-4 rounded-lg border border-gray-300 text-white placeholder:text-gray-500 placeholder:text-sm placeholder:italic focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                onClick={handleResetPassword}
                disabled={isSubmitting}
                className="w-[40%] mx-auto block h-10 mt-4 mb-4 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer text-center disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}
        </form>

        {/* Back to Login */}
        <div className="text-center mt-8">
          <p className="text-white">
            Remember your password?{" "}
            <Link
              to="/login"
              className="underline cursor-pointer text-orange-600"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;