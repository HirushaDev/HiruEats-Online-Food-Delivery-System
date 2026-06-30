import { useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { AppConstants } from "../../Util/constants";

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
   const BACKEND_URL = AppConstants.BACKEND_API_BASE_URL;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // If backend returns validation errors
        if (response.status === 400 && data.errors) {
          const errorMessages = Object.values(data.errors).join(" ");
          throw new Error(errorMessages);
        }
        throw new Error(data.message || "Something went wrong");
      }

      // Success toast
      toast.success("Message sent successfully! We'll get back to you soon.");

      // Clear form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      // Error toast
      toast.error(`${error.message || "Failed to send message"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      
    
      {/* HERO HEADER */}
      <div
        className="relative w-full h-[50vh] text-white py-20 px-6 bg-cover bg-center border-1 border-amber-800"
        style={{ backgroundImage: `url(${assets.contact})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold">Contact us</h1>
          <p className="mt-3 text-white/90 max-w-xl">
            Let’s talk about your food order or delivery experience. Send us a
            message and we will respond within a few hours.
          </p>
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT FORM */}
        <div className="lg:col-span-2 bg-gray-200 p-6 rounded-2xl shadow-md -mt-30 relative z-10">
          <h2 className="text-xl font-bold mb-6">Send us a message</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full name"
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              name="message"
              rows="6"
              placeholder="Message"
              className="w-full mt-4 border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="bg-gray-300 p-6 rounded-2xl shadow-md h-fit">
          <div className="flex items-center gap-2 mb-4">
            <FaEnvelope className="text-orange-500" />
            <span className="text-sm text-gray-600">
              dilshanhirusha093@gmail.com
            </span>
          </div>

          <div className="space-y-3 mt-4">
            <a
              href="#"
              className="flex items-center gap-3 text-gray-700 hover:text-orange-500"
            >
              <FaTwitter /> Twitter
            </a>
            <a
              href="#"
              className="flex items-center gap-3 text-gray-700 hover:text-orange-500"
            >
              <FaFacebook /> Facebook
            </a>
            <a
              href="#"
              className="flex items-center gap-3 text-gray-700 hover:text-orange-500"
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              href="#"
              className="flex items-center gap-3 text-gray-700 hover:text-orange-500"
            >
              <FaInstagram /> Instagram
            </a>
          </div>

          <div className="mt-6 bg-orange-200 p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              Already using HiruEats? You can also chat with our support team
              for instant help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;