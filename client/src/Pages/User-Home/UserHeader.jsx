import React from "react";
import { assets } from "../../assets/assets";
import { FaStar,FaCheck ,FaVideo} from "react-icons/fa";
import { MdLocalDrink } from "react-icons/md";

const UserHeader = () => {

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full bg-white py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

        {/* LEFT CONTENT */}
        <div className="md:w-1/2 space-y-6">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Hot or Cold, We{" "}
            <span className="text-yellow-500">Deliver It Freshly</span> from the
            Shop to Your House
          </h1>

          <p className="text-gray-500 max-w-lg">
            We are the best food delivery partner for your shops and restaurants,
            deliver safely and on time with hot & fresh meals.
          </p>

          {/* BUTTONS */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo("food-display")}
              className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition cursor-pointer"
            >
              Foods Menu
            </button>

            <button
              onClick={() => scrollTo("juice-display")}
              className="flex items-center gap-2 text-yellow-600 font-semibold border-1 border-yellow-600 px-3 py-1 rounded-full hover:bg-yellow-100 transition cursor-pointer"
            >
              <span className="bg-yellow-100 p-2 rounded-full"><MdLocalDrink /></span>
              Juice Menu
            </button>
          </div>

          {/* FEATURES */}
          <div className="flex flex-wrap gap-4 pt-4 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <FaCheck className="text-green-500"/> Free Delivery
            </span>
            <span className="flex items-center gap-2">
              <FaCheck className="text-green-500"/> Fast Delivery
            </span>
            <span className="flex items-center gap-2">
             <FaCheck className="text-green-500"/> Best Quality Food
            </span>
            <span className="flex items-center gap-2">
              <FaCheck className="text-green-500"/> 24/7 Service
            </span>
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="md:w-1/2 relative mt-10 md:mt-0 flex justify-center">

          {/* big image */}
          <img
            src={assets.burger}
            alt="food"
            className="w-[300px] md:w-[380px] rounded-full shadow-xl"
          />

          {/* floating image 1 */}
          <img
            src={assets.JuiceH}
            alt="food"
            className="w-[220px] md:w-[250px] absolute top-0 right-2  rounded-2xl shadow-lg animate-bounce"
          />

          {/* floating image 2 */}
          <img
            src={assets.pizzaHome}
            alt="food"
            className="w-[100px] md:w-[130px] absolute bottom-0 left-10 rounded-full shadow-lg animate-pulse"
          />

          {/* rating card */}
          <div className="absolute top-10 left-0 bg-white shadow-lg rounded-xl px-4 py-2 text-sm">
            <FaStar className="text-yellow-500"/> 4.8 (10k+ reviews)
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserHeader;