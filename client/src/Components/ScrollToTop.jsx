import { useState, useEffect, useRef } from "react";
import { IoIosArrowUp } from "react-icons/io";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef(null);

    // Track scroll position and progress
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Show button after scrolling down 300px
            setIsVisible(scrollY > 300);

            // Calculate scroll progress (0 to 1)
            const maxScroll = documentHeight - windowHeight;
            const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Circle circumference for progress ring
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - scrollProgress);

    return (
        <>
            <button
                ref={buttonRef}
                onClick={scrollToTop}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
                    fixed bottom-8 right-8 z-50
                    flex items-center justify-center
                    w-16 h-16 rounded-full
                    bg-white/10 backdrop-blur-xl
                    border border-white/20
                    shadow-2xl shadow-black/20
                    transition-all duration-500 ease-out
                    hover:scale-110 hover:bg-white/20
                    focus:outline-none focus:ring-4 focus:ring-black/50
                    ${isVisible
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-8 pointer-events-none"
                    }
                `}
                style={{
                    boxShadow: isHovered
                        ? "0 20px 60px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 107, 53, 0.1)"
                        : "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
                aria-label="Scroll to top"
            >
                {/* Animated ring background */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div
                        className={`
                            absolute inset-0 rounded-full
                            bg-gradient-to-br from-orange-500 to-amber-500
                            transition-opacity duration-700
                            ${isHovered ? "opacity-100" : "opacity-30"}
                        `}
                        style={{
                            filter: "blur(2px)",
                            transform: "scale(1.1)",
                        }}
                    />
                </div>

                {/* Progress ring (SVG) */}
                <svg
                    className="absolute inset-0 w-full h-full -rotate-90"
                    viewBox="0 0 64 64"
                >
                    <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="2.5"
                    />
                    <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        fill="none"
                        stroke="url(#progressGradient)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-[stroke-dashoffset] duration-200 ease-out"
                    />
                    <defs>
                        <linearGradient
                            id="progressGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Inner glow */}
                <div
                    className={`
                        absolute inset-1 rounded-full
                        bg-black/40 backdrop-blur-sm
                        transition-all duration-500
                        ${isHovered ? "bg-black/30" : ""}
                    `}
                />

                {/* Arrow icon with animation */}
                <div
                    className={`
                        relative z-10
                        transition-all duration-400 ease-out
                        ${isHovered ? "-translate-y-1.5" : "translate-y-0"}
                    `}
                >
                    <IoIosArrowUp
                        size={28}
                        className={`
                            text-white
                            transition-all duration-400
                            ${isHovered ? "scale-110" : "scale-100"}
                        `}
                        style={{
                            filter: isHovered
                                ? "drop-shadow(0 0 12px rgba(255, 107, 53, 0.6))"
                                : "none",
                        }}
                    />
                </div>

                {/* Floating animation dots */}
                <div
                    className={`
                        absolute -top-1 -right-1 w-2 h-2 rounded-full
                        bg-orange-400
                        transition-all duration-500
                        ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                    `}
                />
                <div
                    className={`
                        absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full
                        bg-amber-400
                        transition-all duration-500 delay-100
                        ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                    `}
                />

                {/* Pulsing ring on hover */}
                {isHovered && (
                    <div
                        className="absolute inset-0 rounded-full animate-ping-slow"
                        style={{
                            border: "2px solid rgba(251, 146, 60, 0.3)",
                            animation: "ping-slow 1.5s ease-out infinite",
                        }}
                    />
                )}
            </button>

            {/* Tailwind custom animation */}
            <style>{`
                @keyframes ping-slow {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1.4);
                        opacity: 0;
                    }
                }
                .animate-ping-slow {
                    animation: ping-slow 1.5s ease-out infinite;
                }
            `}</style>
        </>
    );
};

export default ScrollToTop;