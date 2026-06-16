import React, { useState, useRef, useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { AppConstants } from "../Util/constants";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { setIsEmailVerified } = useContext(AppContext);
  const [step, setStep] = useState(1); // 1=send OTP, 2=enter OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const otpRefs = useRef([]);

  // ── Step 1: Send Verification OTP ────────────────────────────────────────────
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${AppConstants.BACKEND_API_BASE_URL}/send-otp`,
        null,
        { withCredentials: true }
      );
      toast.success(response.data?.message || "Verification OTP sent to your email");
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

  // ── Step 2: Verify OTP ───────────────────────────────────────────────────────
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      toast.error("Please enter the full 6-digit OTP");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${AppConstants.BACKEND_API_BASE_URL}/verify-otp`,
        { otp: otpString },
        { withCredentials: true }
      );
      toast.success(response.data?.message || "Email verified successfully!");
      setIsEmailVerified(true);
      setOtp(["", "", "", "", "", ""]);
      setStep(1);
      navigate("/user-home");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to verify OTP";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Resend OTP ────────────────────────────────────────────────────────────────
  const handleResendOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${AppConstants.BACKEND_API_BASE_URL}/send-otp`,
        null,
        { withCredentials: true }
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

  // ── OTP digit input handler ───────────────────────────────────────────────────
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
    1: "Verify Your Email",
    2: "Enter Verification OTP",
  };

  const stepDescriptions = {
    1: "Click the button below and we'll send a 6-digit OTP to your registered email to verify your account.",
    2: "We've sent a 6-digit OTP to your email. Enter it below to verify your account.",
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
          to="/user-home"
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

          {/* Step 1: Send OTP */}
          {step === 1 && (
            <>
              <div className="flex justify-center mb-4">
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-full p-6">
                  <FaEnvelope className="text-orange-400 text-4xl" />
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
        </form>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <p className="text-white">
            <Link
              to="/user-home"
              className="underline cursor-pointer text-orange-600"
            >
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
