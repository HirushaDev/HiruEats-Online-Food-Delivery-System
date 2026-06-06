import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaApple, FaReact } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AppConstants } from "../Util/constants";
const Login = () => {
   const [isAccountCreated, setIsAccountCreated] =useState(false);
   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
   const [error, setError] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
   };

   const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const endpoint = isAccountCreated
        ? `${AppConstants.BACKEND_API_BASE_URL}/register`
        : `${AppConstants.BACKEND_API_BASE_URL}/login`;

      const payload = isAccountCreated
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        : {
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(responseData?.message || responseData?.error || "Request failed");
      }

      if (isAccountCreated) {
        setIsAccountCreated(false);
      }

      setFormData({ name: "", email: "", password: "" });
    } catch (submitError) {
      setError(submitError.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
   };
  return (
    <div
      className="relative min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${assets.backgroundLogin})`,
      }}
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

      {/* Login Card */}
    <div className="relative z-10 w-full max-w-md min-h-75 bg-white/0 backdrop-blur-md p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-3xl border border-orange-500">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
            {isAccountCreated ? "Account Created! Please Login" : "Welcome Back! Please Login"}
        </h2>
        <div className="flex justify-center mb-6">
  <img
    src={assets.logo}
    alt="Logo"
    className="w-10 h-10 rounded-full border border-orange-500 shadow-lg"
  />
</div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {error && (
              <p className="text-red-400 text-sm text-center -mt-1">
                {error}
              </p>
            )}
            {
                isAccountCreated && (
                      <div className="mb-2">
                <label className="block text-white mb-2 relative left-4 font-medium">
              Full Name
            </label>
                <div className="relative left-6 w-[85%] mx-auto">
                  <FaUser className="absolute left-87 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter Full Name"
                    className="w-full block h-12 pr-4 py-4 rounded-lg border border-gray-300 text-white placeholder:text-gray-500 placeholder:text-sm placeholder:italic focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
        
          </div> 
          
                )
                
            }
             
          {/* Email */}
          <div className="mb-2">
            <label className="block text-white mb-2 relative left-4 font-medium">
              Email Id
            </label>
            <div className="relative left-6 w-[85%] mx-auto">
              <FaEnvelope className="absolute left-87 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter Email"
                className="w-full block h-12 px-5 pl-10 py-4 rounded-lg border border-gray-300 text-gray-800 placeholder:text-gray-500 placeholder:text-sm placeholder:italic focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-white mb-2 relative left-4">
              Password
            </label>
            <div className="relative left-6 w-[85%] mx-auto">
              <FaLock className="absolute left-87 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter Password"
                className="w-full block h-12 pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-gray-800 placeholder:text-gray-500 placeholder:text-sm placeholder:italic focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
           <div className="flex justify-end mb-2">
                <Link to="/reset-password" className="text-white  hover:underline relative right-6 text-sm">
                  Forgot Password?
                </Link>
           </div>
             <button type="submit"  className="w-[40%] mx-auto block h-10 mt-2 mb-4 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer text-center relative left-30 disabled:cursor-not-allowed disabled:opacity-70">
               {isSubmitting ? "Please wait..." : isAccountCreated ? "Create Account" : "Login"}
            </button>
            
            <div className="flex items-center justify-center gap-4 mt-2">
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                aria-label="Continue with Google"
              >
                <FcGoogle className="text-red-500" />
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                aria-label="Continue with Apple"
              >
                <FaApple className="text-white" />
              </button>
            
            </div>
        </form>
           <div className="text-center mt-30">
            <br/>
  <p className="text-white">
    {isAccountCreated ? (
      <>
        Already have an account?{" "}
       <span onClick={() => setIsAccountCreated(false)} className="underline cursor-pointer text-orange-600">
          Login here
        </span>
      </>
    ) : (
      <>
        Don't have an account?{" "}
        <span onClick={() => setIsAccountCreated(true)} className="underline cursor-pointer text-orange-600">
          Sign up here
        </span>
      </>
    )}
  </p>
</div>
      </div>
    </div>
  );
};

export default Login;