import React, { useState, useEffect } from "react";
import PublicNavbar from "./PublicNavbar";
import { Truck, Star, Clock, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import Footer from "../Components/Footer";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <PublicNavbar />

      {/* TOP BUTTONS */}
      <div className="absolute top-32 right-8 z-30 flex gap-4">
       

        <Link
          to="/login"
          className="w-32 h-12 flex items-center justify-center border-2 border-orange-500 text-orange-500 font-bold rounded-full hover:bg-orange-500 hover:text-white transition"
        >
          Join Now
        </Link>
      </div>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ transform: `scale(${1 + scrollY * 0.0005})` }}
          >
            <source src="video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide bg-gradient-to-r from-orange-300 via-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
            HiruEats
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-4 animate-fadeIn">
            Premium Food Delivered Fast & Fresh
          </p>

          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto animate-fadeIn delay-100">
            Craving something delicious? HiruEats delivers your favorite food
            fast, fresh, and hot right to your door. Experience premium food
            delivery with just one click.
          </p>

          {/* 3D CIRCLE CAROUSEL */}
          <div className="gallery">
            <div className="carousel">
              <div className="carousel-cell relative">
                <img src={assets.burger} alt="Burger" />{" "}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] px-2 py-[2px] rounded-full font-bold">
                  25% OFF
                </div>
              </div>
              <div className="carousel-cell relative">
                <img src={assets.pizza} alt="Pizza" />{" "}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] px-2 py-[2px] rounded-full font-bold">
                  30% OFF
                </div>
              </div>
              <div className="carousel-cell relative">
                <img src={assets.tea} alt="Tea" />{" "}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] px-2 py-[2px] rounded-full font-bold">
                  20% OFF
                </div>
              </div>
              <div className="carousel-cell relative">
                <img src={assets.pasta} alt="Pasta" />{" "}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] px-2 py-[2px] rounded-full font-bold">
                  15% OFF
                </div>
              </div>
              <div className="carousel-cell relative">
                <img src={assets.cake} alt="Cake" />{" "}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] px-2 py-[2px] rounded-full font-bold">
                  40% OFF
                </div>
              </div>
              <div className="carousel-cell relative">
                <img src={assets.chips} alt="Chips" />{" "}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] px-2 py-[2px] rounded-full font-bold">
                  10% OFF
                </div>
              </div>
              <div className="carousel-cell relative">
                <img src={assets.pizza1} alt="Pizza Special" />{" "}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] px-2 py-[2px] rounded-full font-bold">
                  35% OFF
                </div>
              </div>
            </div>
          </div>

          {/* FEATURES */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-orange-500/20 transition-all duration-300">
              <Truck className="text-orange-400" size={18} />
              <span>Fast Delivery</span>
            </div>

            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-orange-500/20 transition-all duration-300">
              <Star className="text-orange-400" size={18} />
              <span>Premium Quality</span>
            </div>

            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-orange-500/20 transition-all duration-300">
              <Clock className="text-orange-400" size={18} />
              <span>24/7 Service</span>
            </div>
          </div>

          {/* SCROLL ICON */}
          <div className="mt-10 animate-bounce cursor-pointer">
            <ChevronDown
              className="text-white/70 hover:text-orange-400 transition-colors"
              size={28}
            />
          </div>
        </div>
      </section>

      <br />
      <br />

      <section className="py-24 bg-white-gray-300 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-center">
            <span className="text-orange-500 font-bold uppercase tracking-widest block border-b-2 border-orange-500 inline-block pb-1">
              Testimonials
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-14 ml-10 text-gray-500">
              What Our Customers Say
            </h2>
          </div>
          <br />
          <br />

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:translate-x-20">
            {/* Left Card */}
            <div className="w-72 bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:scale-105 transition">
              <img
                src={assets.customer1}
                alt="Customer"
                className="w-24 h-24 rounded-full mx-auto border-4 border-orange-500 object-cover -mt-14"
              />

              <div className="mt-6">
                <p className="text-gray-500 text-sm leading-7">
                  "Amazing service! Food arrived hot and fresh. The delivery was
                  incredibly fast and the app was easy to use."
                </p>
                <div className="flex justify-center mt-4 text-yellow-400 text-lg">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                </div>

                <h3 className="mt-6 text-xl font-bold text-orange-400">
                  Nimal Perera
                </h3>

                <p className="text-gray-500 text-sm">Regular Customer</p>
              </div>
            </div>

            <div className="w-72 ml-8 bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:scale-105 transition">
              <img
                src={assets.customer2}
                alt="Customer"
                className="w-24 h-24 rounded-full mx-auto border-4 border-orange-500 object-cover -mt-14"
              />

              <div className="mt-6">
                <p className="text-gray-500 text-sm leading-7">
                  "HiruEats is my go-to for food delivery. The quality is always
                  top-notch and the delivery is lightning fast. Highly
                  recommend!"
                </p>
                <div className="flex justify-center mt-4 text-yellow-400 text-lg">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <h3 className="mt-6 text-xl font-bold text-orange-400">
                  Pradeep Lilantha
                </h3>

                <p className="text-gray-500 text-sm">Regular Customer</p>
              </div>
            </div>

            {/* Right Card */}
            <div className="w-72 ml-30 bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:scale-105 transition">
              <img
                src={assets.customer3}
                alt="Customer"
                className="w-24 h-24 rounded-full mx-auto border-4 border-orange-500 object-cover -mt-14"
              />

              <div className="mt-6">
                <p className="text-gray-500 text-sm leading-7">
                  "Excellent customer support and quick delivery. I highly
                  recommend HiruEats to anyone who loves good food."
                </p>
                <div className="flex justify-center mt-4 text-yellow-400 text-lg">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                </div>

                <h3 className="mt-6 text-xl font-bold text-orange-400">
                  Kaveesha Dewmini
                </h3>

                <p className="text-gray-500 text-sm">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />

      <hr className="border-t border-gray-300" />
      <br/>
      {/* Company Details */}
      <section className="py-24 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-orange-500 font-bold uppercase tracking-widest border-b-2 border-orange-500 inline-block pb-1">
            Our Team
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-50 mb-20 text-gray-600">
            Meet Our Leadership Team
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-10 mb-20">
           
            {/* Owner */}
            <div className="w-105 h-80 border border-orange-500 shadow-xl rounded-3xl p-8 hover:-translate-y-2 hover:shadow-orange-300 transition duration-300 bg-white">
              <img
                src={assets.owner}
                alt="Owner"
                className="w-32 h-32 rounded-full mx-auto border-4 border-orange-500 object-cover"
              />

              <h3 className="text-xl font-bold mt-5 text-gray-800">
                Hirusha Dilshan
              </h3>

              <p className="text-orange-500 font-semibold">Founder & Owner</p>

              <p className="text-gray-500 text-sm mt-3 leading-6">
                Leading HiruEats with a vision to provide fast, reliable, and
                high-quality food delivery services while ensuring customer
                satisfaction across every order.
              </p>

              <div className="flex justify-center gap-3 mt-5">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center hover:scale-110 transition"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center hover:scale-110 transition"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

            {/* Operations Manager */}
            <div className="w-80 h-90 border border-orange-500 shadow-xl rounded-3xl p-8 hover:-translate-y-2 hover:shadow-orange-300 transition duration-300 bg-white">
              <img
                src={assets.Operations}
                alt="Manager"
                className="w-32 h-32 rounded-full mx-auto border-2 border-orange-500 object-cover"
              />

              <h3 className="text-xl font-bold mt-5 text-gray-800">
                Nimal Perera
              </h3>

              <p className="text-orange-500 font-semibold">
                Operations Manager
              </p>

              <p className="text-gray-500 text-sm mt-3 leading-6">
                Oversees daily operations, coordinates restaurant partnerships,
                and ensures smooth order processing for an exceptional customer
                experience.
              </p>

              <div className="flex justify-center gap-3 mt-5">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center hover:scale-110 transition"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center hover:scale-110 transition"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

            {/* Delivery Manager */}
            <div className="w-80 h-90 border border-orange-500 shadow-xl rounded-3xl p-8 hover:-translate-y-2 hover:shadow-orange-300 transition duration-300 bg-white">
              <img
                src={assets.Delivery}
                alt="Delivery Manager"
                className="w-32 h-32 rounded-full mx-auto border-2 border-orange-500 object-cover"
              />

              <h3 className="text-xl font-bold mt-5 text-gray-800">
                Kavindu Silva
              </h3>

              <p className="text-orange-500 font-semibold">Delivery Manager</p>
              <p className="text-gray-500 text-sm mt-3 leading-6">
                Manages delivery teams and logistics, ensuring every order
                reaches customers quickly, safely, and on time.
              </p>

              <div className="flex justify-center gap-3 mt-5">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center hover:scale-110 transition"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center hover:scale-110 transition"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />

      <Footer />

      {/* STYLES */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .gallery {
          perspective: 1200px;
          margin: 40px auto 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .carousel {
          width: 320px;
          height: 320px;
          position: relative;
          transform-style: preserve-3d;
          animation: spin 20s linear infinite;
        }

        .carousel-cell {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 90px;
          height: 90px;
          margin: -45px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .carousel-cell img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid rgba(249, 115, 22, 0.6);
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
          transition: all 0.3s ease;
        }

        .carousel-cell:hover {
          transform: scale(1.15);
        }

        .carousel-cell:hover img {
          border-color: #f97316;
          box-shadow: 0 0 30px rgba(249, 115, 22, 0.8);
        }

        /* 7 ITEMS IN CIRCLE (360° / 7 = 51.4° per item) */
        .carousel-cell:nth-child(1) { transform: rotateY(0deg) translateZ(160px); }
        .carousel-cell:nth-child(2) { transform: rotateY(51.4deg) translateZ(160px); }
        .carousel-cell:nth-child(3) { transform: rotateY(102.8deg) translateZ(160px); }
        .carousel-cell:nth-child(4) { transform: rotateY(154.2deg) translateZ(160px); }
        .carousel-cell:nth-child(5) { transform: rotateY(205.6deg) translateZ(160px); }
        .carousel-cell:nth-child(6) { transform: rotateY(257deg) translateZ(160px); }
        .carousel-cell:nth-child(7) { transform: rotateY(308.4deg) translateZ(160px); }

        @keyframes spin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        .carousel:hover {
          animation-play-state: paused;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .carousel {
            width: 260px;
            height: 260px;
          }
          .carousel-cell {
            width: 75px;
            height: 75px;
            margin: -37.5px;
          }
          .carousel-cell:nth-child(1) { transform: rotateY(0deg) translateZ(130px); }
          .carousel-cell:nth-child(2) { transform: rotateY(51.4deg) translateZ(130px); }
          .carousel-cell:nth-child(3) { transform: rotateY(102.8deg) translateZ(130px); }
          .carousel-cell:nth-child(4) { transform: rotateY(154.2deg) translateZ(130px); }
          .carousel-cell:nth-child(5) { transform: rotateY(205.6deg) translateZ(130px); }
          .carousel-cell:nth-child(6) { transform: rotateY(257deg) translateZ(130px); }
          .carousel-cell:nth-child(7) { transform: rotateY(308.4deg) translateZ(130px); }
        }

        @media (max-width: 640px) {
          .carousel {
            width: 220px;
            height: 220px;
          }
          .carousel-cell {
            width: 60px;
            height: 60px;
            margin: -30px;
          }
          .carousel-cell:nth-child(1) { transform: rotateY(0deg) translateZ(110px); }
          .carousel-cell:nth-child(2) { transform: rotateY(51.4deg) translateZ(110px); }
          .carousel-cell:nth-child(3) { transform: rotateY(102.8deg) translateZ(110px); }
          .carousel-cell:nth-child(4) { transform: rotateY(154.2deg) translateZ(110px); }
          .carousel-cell:nth-child(5) { transform: rotateY(205.6deg) translateZ(110px); }
          .carousel-cell:nth-child(6) { transform: rotateY(257deg) translateZ(110px); }
          .carousel-cell:nth-child(7) { transform: rotateY(308.4deg) translateZ(110px); }
        }
      `}</style>
    </div>
  );
};

export default Home;
