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
                    bg-neutral-900/80 backdrop-blur-xl
                    border border-orange-500/25
                    shadow-2xl shadow-red-500/10
                    transition-all duration-500 ease-out
                    hover:scale-110 hover:border-orange-500/50 hover:shadow-red-500/30
                    focus:outline-none focus:ring-4 focus:ring-red-500/40
                    ${
                        isVisible
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-8 pointer-events-none"
                    }
                `}
                style={{
                    boxShadow: isHovered
                        ? "0 20px 60px rgba(239, 68, 68, 0.4), 0 0 80px rgba(249, 115, 22, 0.15)"
                        : "0 8px 32px rgba(0, 0, 0, 0.4)",
                }}
                aria-label="Scroll to top"
            >
                {/* Animated ring background - Food Delivery Red-Orange glow */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div
                        className={`
                            absolute inset-0 rounded-full
                            bg-gradient-to-br from-red-500 to-orange-500
                            transition-opacity duration-700
                            ${isHovered ? "opacity-100" : "opacity-40"}
                        `}
                        style={{
                            filter: "blur(3px)",
                            transform: "scale(1.15)",
                        }}
                    />
                </div>

                {/* Progress ring (SVG) - Matched to food brand colors */}
                <svg
                    className="absolute inset-0 w-full h-full -rotate-90"
                    viewBox="0 0 64 64"
                >
                    <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="2.5"
                    />
                    <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        fill="none"
                        stroke="url(#progressGradient)"
                        strokeWidth="3"
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
                            <stop offset="0%" stopColor="#ef4444" /> {/* Red */}
                            <stop offset="100%" stopColor="#f97316" /> {/* Orange */}
                        </linearGradient>
                    </defs>
                </svg>

                {/* Inner glow - deep dark base for contrast */}
                <div
                    className={`
                        absolute inset-1 rounded-full
                        bg-black/60 backdrop-blur-sm
                        transition-all duration-500
                        ${isHovered ? "bg-black/40" : ""}
                    `}
                />

                {/* Arrow icon with lifted animation */}
                <div
                    className={`
                        relative z-10
                        transition-all duration-400 ease-out
                        ${isHovered ? "-translate-y-1.5 scale-105" : "translate-y-0 scale-100"}
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
                                ? "drop-shadow(0 0 16px rgba(239, 68, 68, 0.7)) drop-shadow(0 0 30px rgba(249, 115, 22, 0.3))"
                                : "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                        }}
                    />
                </div>

                {/* Sparkle dots - warm food accents */}
                <div
                    className={`
                        absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full
                        bg-red-400
                        transition-all duration-500
                        ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                    `}
                />
                <div
                    className={`
                        absolute -bottom-1 -left-1 w-2 h-2 rounded-full
                        bg-orange-400
                        transition-all duration-500 delay-100
                        ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                    `}
                />

                {/* Pulsing delivery ring on hover */}
                {isHovered && (
                    <div
                        className="absolute inset-0 rounded-full animate-ping-slow"
                        style={{
                            border: "2px solid rgba(239, 68, 68, 0.4)",
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
                        transform: scale(1.45);
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