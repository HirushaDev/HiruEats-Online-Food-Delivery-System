import React, { useRef, useEffect } from 'react';
import { assets } from '../assets/assets';

// Sample data for the showcase items
const showcaseItems = [
  {
    id: 1,
    name: "Spicy Chicken Burger",
    description: "Grilled chicken with spicy mayo, lettuce, and cheese.",
    price: 8.99,
    originalPrice: 12.99,
            discount: "31% OFF",
            image: assets.burger,
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Truffle Margherita Pizza",
    description: "Wood-fired crust, truffle oil, fresh mozzarella, basil.",
    price: 14.99,
    originalPrice: 19.99,
    discount: "25% OFF",
    image: assets.pizza,
    badge: "Chef's Choice"
  },
  {
    id: 3,
    name: "Rainbow Sushi Roll",
    description: "Fresh salmon, tuna, avocado, cucumber, and sesame.",
    price: 16.99,
    originalPrice: 22.99,
    discount: "26% OFF",
    image: assets.Rainbow_Sushi_Roll,
    badge: "New"
  },
  {
    id: 4,
    name: "Creamy Alfredo Pasta",
    description: "Fettuccine tossed in creamy parmesan sauce with grilled chicken.",
    price: 11.99,
    originalPrice: 15.99,
    discount: "25% OFF",
    image: assets.Creamy_Alfredo_Pasta,
    badge: "Popular"
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a gooey molten center.",
    price: 5.99,
    originalPrice: 8.99,
    discount: "33% OFF",
    image: assets.Chocolate_Lava_Cake,
    badge: "Sweet Deal"
  },
  {
    id: 6,
    name: "Mango Tango Smoothie",
    description: "Blended mango, banana, yogurt, and a hint of honey.",
    price: 4.99,
    originalPrice: 7.49,
    discount: "33% OFF",
    image: assets.Mango_Tango_Smoothie,
    badge: "Refreshing"
  }
];

const ShowcaseSection = () => {
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);

  // Smooth horizontal scroll animation on wheel
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Intersection Observer for fade-in animations when section comes into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.unobserve(section);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-16 px-4 md:px-8 bg-gray-100 from-orange-50 via-amber-50 to-orange-300 opacity-0 translate-y-8 transition-all duration-700 ease-out section-visible:opacity-100 section-visible:translate-y-0"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-3">
             Limited Time Offers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Daily <span className="text-orange-500">Specials</span>
          </h2>
          <p className="text-gray-500 mt-2">Scroll to explore mouthwatering deals — swipe right for more!</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-gray-400 text-sm">
          <span>Scroll →</span>
          <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center animate-bounce-x">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-90">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 pb-8 scroll-smooth hide-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {showcaseItems.map((item, index) => (
          <div 
            key={item.id} 
            className="flex-shrink-0 w-80 md:w-96 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden h-56">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
              />
              {/* Discount Badge */}
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                {item.discount}
              </div>
              {/* Special Badge */}
              {item.badge && (
                <div className="absolute top-3 right-3 bg-amber-400 text-gray-800 px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                  {item.badge}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{item.name}</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
              
              {/* Price Row */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-orange-600">${item.price}</span>
                <span className="text-gray-400 line-through text-sm">${item.originalPrice}</span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                  Save ${(item.originalPrice - item.price).toFixed(2)}
                </span>
              </div>

              {/* Order Button */}
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group">
                Order Now
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {showcaseItems.map((_, idx) => (
          <span 
            key={idx} 
            className="w-2 h-2 rounded-full bg-gray-800 transition-all duration-300"
          />
        ))}
      </div>

      {/* Add custom animations via style tag or CSS module - these are minimal TailCSS extensions */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .animate-bounce-x {
          animation: bounceX 1.5s infinite;
        }
        
        @keyframes bounceX {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(6px);
          }
        }
        
        .section-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
};

export default ShowcaseSection;