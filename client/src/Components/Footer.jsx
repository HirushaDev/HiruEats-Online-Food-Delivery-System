import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white pt-24 pb-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-600/10 blur-3xl rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/*  BRAND CENTER */}
        <div className="text-center mb-16">
          <h2 className="text-1xl font-extrabold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            HiruEats
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
            Premium food delivery experience bringing fresh, hot meals from top
            restaurants straight to your doorstep — fast, reliable, and
            delicious.
          </p>

          {/* Social */}
          <div className="flex justify-center gap-5 mt-6">
            <FaFacebook className="text-xl hover:text-orange-400 cursor-pointer transition" />
            <FaTwitter className="text-xl hover:text-orange-400 cursor-pointer transition" />
            <FaInstagram className="text-xl hover:text-orange-400 cursor-pointer transition" />
            <FaYoutube className="text-xl hover:text-orange-400 cursor-pointer transition" />
          </div>
        </div>

        {/*  GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">
              Quick Links
            </h3>
            <div className="space-y-2 text-gray-400">
              <Link to="/menu" className="hover:text-white block">
                Menu
              </Link>
              <Link to="/about" className="hover:text-white block">
                About
              </Link>
              <Link to="/offers" className="hover:text-white block">
                Offers
              </Link>
              <Link to="/contact" className="hover:text-white block">
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">
              Support
            </h3>
            <div className="space-y-2 text-gray-400">
              <Link to="/help" className="hover:text-white block">
                Help Center
              </Link>
              <Link to="/faq" className="hover:text-white block">
                FAQs
              </Link>
              <Link to="/terms" className="hover:text-white block">
                Terms
              </Link>
              <Link to="/privacy" className="hover:text-white block">
                Privacy
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">
              Contact
            </h3>

            <div className="space-y-4 text-gray-400 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2">
                <MapPin size={18} /> Colombo, Sri Lanka
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} /> +94 77 695 7704
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} /> info@hirueats.com
              </div>
            </div>
          </div>
        </div>

        {/*  NEWSLETTER CENTER */}

        <div className="mt-20 flex justify-end">
          <div className="w-full max-w-xl text-right">
            <h3 className="text-2xl font-bold mb-2">Join Our Newsletter</h3>

            <p className="text-gray-400 mb-6">
              Get updates, offers & delicious deals
            </p>

            <form className="flex flex-col sm:flex-row gap-3 justify-end">
              <input
                type="email"
                placeholder="      Enter your email"
                className="flex-1 px-10 py-6 rounded-full bg-white/10 border border-white/20 focus:border-orange-500 outline-none text-white"
              />

              <button className="w-40 h-13 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-bold flex items-center justify-center gap-2">
                Subscribe <Send size={18} />
              </button>
            </form>
          </div>
        </div>
        {/*  CLEAN SEPARATOR */}
        <div className="my-30 flex justify-center">
          <div className="w-40 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        </div>
        {/* BOTTOM */}
        <div className="mt-20 text-center text-gray-500 text-sm">
          © {currentYear} <span>HiruEats</span> — All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
