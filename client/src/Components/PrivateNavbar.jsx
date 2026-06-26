import { useState, useRef, useEffect, useContext } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaConciergeBell,
  FaPhone,
  FaBars,
  FaTimes,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaSearch,
  FaUser,
  FaCompass,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaCog,
  FaEnvelope,
} from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const PrivateNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const { isEmailVerified } = useContext(AppContext);
  const { cartCount } = useContext(AppContext);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/user-home", icon: FaHome },
    { name: "Explore", path: "/explore", icon: FaCompass },
    { name: "Services", path: "/services", icon: FaConciergeBell },
    { name: "Contact", path: "/contact", icon: FaPhone },
  ];

  return (
    <>
      {/* TOP BAR */}
      <div className="hidden md:block bg-linear-to-r from-gray-900 to-black border-b border-orange-500/20 py-3">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center text-sm">
            <div className="text-gray-400">
              Welcome to{" "}
              <span className="text-orange-500 font-bold">HiruEats</span> - Fast
              & Fresh Food Delivery
            </div>

            <div className="flex items-center gap-6">
              <a className="text-gray-400 hover:text-orange-500 text-lg">
                <FaFacebookF />
              </a>
              <a className="text-gray-400 hover:text-orange-500 text-lg">
                <FaInstagram />
              </a>
              <a className="text-gray-400 hover:text-orange-500 text-lg">
                <FaTwitter />
              </a>
              <a className="text-gray-400 hover:text-orange-500 text-lg">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="sticky top-0 left-0 w-full z-9999 bg-linear-to-r from-black via-gray-900 to-black shadow-xl border-b border-orange-500/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="bg-orange-500 p-2 rounded-xl">
                <span className="text-white text-xl"></span>
              </div>
              <div>
                <h1 className="text-2xl font-black text-orange-500"></h1>
                <p className="text-xs text-orange-300">Fast Delivery</p>
              </div>
            </div>

            {/* MENU LINKS */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link, index) => {
                const Icon = link.icon;

                return (
                  <NavLink
                    key={index}
                    to={link.path}
                    className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition"
                  >
                    <Icon />
                    {link.name}
                  </NavLink>
                );
              })}
            </div>

            {/* RIGHT SIDE - SEARCH, PROFILE, CART */}
            <div className="flex items-center gap-4">
              {/* SEARCH ICON */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-300 hover:text-orange-400 transition duration-300 p-2 hover:bg-orange-500/10 rounded-lg group"
              >
                <FaSearch className="text-lg group-hover:scale-125 transition-transform" />
              </button>

              {/* CART ICON */}
              <button
                onClick={() => navigate("/cart")}
                className="relative text-gray-300 hover:text-orange-400 transition duration-300 p-2 hover:bg-orange-500/10 rounded-lg group"
              >
                <FaShoppingCart className="text-lg group-hover:scale-125 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              {/* PROFILE ICON + DROPDOWN */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  className="text-gray-300 hover:text-orange-400 transition duration-300 p-2 hover:bg-orange-500/10 rounded-lg group"
                >
                  <FaUser className="text-lg group-hover:scale-125 transition-transform" />
                </button>

                {/* Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-gray-900 border border-orange-500/30 rounded-xl shadow-2xl shadow-black/60 overflow-hidden z-50">
                    {isEmailVerified ? (
                      <div className="flex items-center gap-3 px-4 py-3 text-sm text-green-400">
                        <FaCheckCircle className="text-green-400" />
                        Verified
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          navigate("/verify-email");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-orange-500/10 hover:text-orange-400 transition"
                      >
                        <FaEnvelope className="text-orange-400" />
                        Verify Email
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* MOBILE MENU BUTTON */}
              <button
                className="md:hidden text-gray-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="text-2xl" />
                ) : (
                  <FaBars className="text-2xl" />
                )}
              </button>
            </div>

            {/* SEARCH BAR - VISIBLE WHEN OPEN */}
            {isSearchOpen && (
              <div className="absolute top-20 left-0 right-0 bg-gray-900 border-b border-orange-500/30 px-6 py-4 animate-slideDown">
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-center gap-3 bg-gray-800 border border-orange-500/30 rounded-lg px-4 py-2">
                    <FaSearch className="text-orange-400" />
                    <input
                      type="text"
                      placeholder="Search food, restaurants..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent text-gray-300 placeholder-gray-500 outline-none"
                      autoFocus
                    />
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="text-gray-500 hover:text-gray-300 transition"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  {searchQuery && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition">
                        <p className="text-orange-400 font-semibold">
                          🍕 Pizza
                        </p>
                        <p className="text-gray-400 text-sm">Found 45 items</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition">
                        <p className="text-orange-400 font-semibold">
                          🍔 Burger
                        </p>
                        <p className="text-gray-400 text-sm">Found 32 items</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link, index) => {
                const Icon = link.icon;

                return (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center gap-3 text-gray-300 hover:text-orange-400"
                  >
                    <Icon />
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default PrivateNavbar;
