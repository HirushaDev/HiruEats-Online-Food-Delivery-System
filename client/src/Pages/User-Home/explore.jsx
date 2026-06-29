import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { assets } from "../../assets/assets";

const categories = [
  { name: "Pizza", img: assets.pizza },
  { name: "Burger", img: assets.burger },
  { name: "Kootu", img: assets.kootu },
  { name: "Rice", img: assets.rice },
  { name: "Patis", img: assets.patis },
  { name: "Noodles", img: assets.noodles },
  { name: "Cakes", img: assets.Chocolate_Lava_Cake },
  { name: "Drinks", img: assets.Mango_Tango_Smoothie },
  { name: "Ice Cream", img: assets.noodles },
  { name: "Dessert", img: assets.noodles }
];

const Explore = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    //  total width / visible items (5)
    const scrollAmount = container.offsetWidth;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full px-6 py-6 bg-black">

      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-50">Explore Menu</h2>
          <p className="text-gray-400 text-sm mt-1 text-shadow-black">
            Discover delicious categories and find your favorite meals easily.
          </p>
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Scroll Area */}
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto scroll-smooth no-scrollbar py-3"
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[20%] text-center"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-orange-400 shadow-md hover:scale-105 transition">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="mt-2 text-sm font-medium text-gray-50">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;