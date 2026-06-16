import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPaperPlane,
  FaRegCopyright,
} from "react-icons/fa";


gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#080808] border-t border-white/10"
    >
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-400/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          
          {/* Brand */}
          <div className="footer-reveal">
            <h2 className="text-3xl font-bold text-white">
              Hiru<span className="text-orange-500">Eats</span>
            </h2>

            <p className="mt-5 text-gray-400 leading-relaxed">
              Delivering your favorite meals fast, fresh, and right to
              your doorstep.
            </p>

            <div className="flex gap-4 mt-6">
              {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-orange-500 hover:border-orange-500 hover:-translate-y-1 transition-all duration-300"
                  >
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-reveal">
            <h3 className="text-white text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {[
                "Home",
                "About",
                "Restaurants",
                "Offers",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-all duration-300 hover:translate-x-2 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-reveal">
            <h3 className="text-white text-lg font-semibold mb-5">
              Services
            </h3>

            <ul className="space-y-3">
              {[
                "Food Delivery",
                "Fast Delivery",
                "Online Payments",
                "Restaurant Partners",
                "Tracking Orders",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-all duration-300 hover:translate-x-2 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-reveal">
            <h3 className="text-white text-lg font-semibold mb-5">
              Stay Updated
            </h3>

            <p className="text-gray-400 mb-5">
              Subscribe for exclusive offers and latest updates.
            </p>

            <div className="flex items-center bg-white/5 border border-white/10 rounded-full overflow-hidden">
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent px-5 py-4 flex-1 text-white outline-none"
              />

              <button className="w-full  h-full bg-orange-500 hover:bg-orange-600 px-1 py-5 text-black transition-all">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-reveal mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            <FaRegCopyright /> 2026 HiruEats. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-gray-500 hover:text-orange-500 transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-gray-500 hover:text-orange-500 transition"
            >
              Terms of Service
            </a>

            <a
              href="#"
              className="text-gray-500 hover:text-orange-500 transition"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;