import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const WhatsAppButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // 🔥 REPLACE THIS WITH YOUR ACTUAL NUMBER (with country code, no '+')
    const phoneNumber = "0706508048";
    const message = "Hi! I have a question about Hirueats food delivery.";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-8 left-8 z-40 flex flex-col items-start">
            {/* Chat Preview Popup (appears on hover) */}
            <div
                className={`
                    mb-3 bg-white/10 backdrop-blur-xl border border-black
                    rounded-2xl p-4 shadow-2xl shadow-green-500/10
                    transition-all duration-300 origin-bottom-left
                    max-w-[220px] 
                    ${isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}
                `}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xl shadow-lg shadow-green-500/30">
                        <FaWhatsapp />
                    </div>
                    <div>
                        <p className="text-black font-semibold text-sm leading-tight">
                            Chat with us!
                        </p>
                        <p className="text-gray-800 text-xs">Usually replies in mins</p>
                    </div>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs">Online</span>
                </div>
            </div>

            {/* Main WhatsApp Button */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
                    relative group flex items-center justify-center
                    w-16 h-16 rounded-full
                    bg-gradient-to-br from-green-400 to-emerald-600
                    shadow-2xl shadow-green-500/30
                    border border-white/20
                    transition-all duration-500 ease-out
                    hover:scale-110 hover:shadow-green-500/50
                    focus:outline-none focus:ring-4 focus:ring-green-400/40
                `}
                style={{
                    boxShadow: isHovered
                        ? "0 20px 60px rgba(34, 197, 94, 0.4), 0 0 80px rgba(34, 197, 94, 0.1)"
                        : "0 8px 32px rgba(0, 0, 0, 0.4)",
                }}
            >
                {/* Glow background */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 opacity-60"
                        style={{ filter: "blur(4px)", transform: "scale(1.2)" }}
                    />
                </div>

                {/* Inner dark glass layer */}
                <div className="absolute inset-1 rounded-full bg-black/20 backdrop-blur-sm" />

                {/* WhatsApp Icon */}
                <div className="relative z-10">
                    <FaWhatsapp
                        size={32}
                        className="text-white transition-all duration-400 group-hover:scale-110"
                        style={{
                            filter: isHovered
                                ? "drop-shadow(0 0 16px rgba(34, 197, 94, 0.6))"
                                : "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                        }}
                    />
                </div>

                {/* Notification Badge */}
                <div className="absolute -top-1 -right-1 z-20 w-5 h-5 rounded-full bg-red-500 border-2 border-white/90 flex items-center justify-center animate-pulse">
                    <span className="text-[10px] font-bold text-white"></span>
                </div>

                {/* Pulsing ring on hover */}
                {isHovered && (
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            border: "2px solid rgba(34, 197, 94, 0.3)",
                            animation: "ping-slow-wa 1.5s ease-out infinite",
                        }}
                    />
                )}
            </a>

            {/* Custom Animation */}
            <style>{`
                @keyframes ping-slow-wa {
                    0% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(1.45); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default WhatsAppButton;