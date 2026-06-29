import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { assets } from "../../assets/assets";

gsap.registerPlugin(ScrollTrigger);

const AppDownload = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".download-content", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".phone-mockup", {
        y: 120,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.to(".phone-mockup", {
        y: -15,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut",
      });

      gsap.to(".shape-1", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".shape-2", {
        rotate: -360,
        duration: 25,
        repeat: -1,
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 py-24 px-6"
    >
      {/* Background Shapes */}
      <div className="shape-1 absolute w-96 h-96 bg-gray-900/20 blur-3xl rounded-full -top-20 -left-20" />
      <div className="shape-2 absolute w-[500px] h-[500px] bg-orange-100/10 blur-3xl rounded-full bottom-0 right-0" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side */}
        <div className="download-content">
          <span className="text-orange-500 font-semibold tracking-widest uppercase">
            Mobile Experience
          </span>

          <h2 className="mt-4 text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            Download the
            <span className="text-orange-500"> HiruEats </span>
            App Today
          </h2>

          <p className="mt-6 text-gray-600 text-lg max-w-xl">
            Order your favorite meals, track deliveries in real time,
            discover exclusive offers, and enjoy a seamless food
            delivery experience anywhere, anytime.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">
            <button className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 transition-all px-6 py-4 rounded-2xl text-white font-semibold">
              <FaGooglePlay size={24} />
              Google Play
            </button>

            <button className="flex items-center gap-3 border border-black/20 hover:border-orange-500 transition-all px-6 py-4 rounded-2xl text-black font-semibold">
              <FaApple size={24} />
              App Store
            </button>
          </div>

          <div className="flex gap-8 mt-10">
            <div>
              <h3 className="text-3xl font-bold text-black">50K+</h3>
              <p className="text-gray-500">Downloads</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-black">4.9★</h3>
              <p className="text-gray-500">App Rating</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-black">500+</h3>
              <p className="text-gray-500">Restaurants</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative flex justify-center">
          <div className="absolute w-[380px] h-[380px] bg-orange-500/20 rounded-full blur-[120px]" />

          <img
            src={assets.appMockup}
            alt="HiruEats App"
            className="phone-mockup relative z-10 w-[280px] md:w-[340px] drop-shadow-[0_0_80px_rgba(249,115,22,0.35)] rounded-4xl"
          />
        </div>
      </div>
    </section>
  );
};

export default AppDownload;