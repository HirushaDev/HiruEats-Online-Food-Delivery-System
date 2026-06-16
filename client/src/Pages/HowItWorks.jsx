import { useEffect, useRef, useState, Fragment } from "react";
import { motion, useMotionValue, useTransform, useInView, animate } from "framer-motion";
import { FiSearch, FiZap, FiSmile } from "react-icons/fi";
import { MdFastfood } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { BsEmojiHeartEyesFill } from "react-icons/bs";
import { assets } from "../assets/assets";

// ── Utility: split text into individual letter spans ──────────────────────────
function SplitText({ text, className = "", delay = 0 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// ── Parallax wrapper using mouse position ─────────────────────────────────────
function ParallaxLayer({ children, depth = 10, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useTransform(mouseX, [-1, 1], [-depth, depth]);
  const y = useTransform(mouseY, [-1, 1], [-depth, depth]);

  useEffect(() => {
    const handle = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(nx);
      mouseY.set(ny);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return ctrl.stop;
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

// ── Step card data ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    step: "01",
    label: "Select Food",
    desc: "Browse hundreds of local restaurants and handpick exactly what you're craving — any cuisine, any time.",
    Icon: MdFastfood,
    color: "#FF6B35",
    glow: "rgba(255,107,53,0.25)",
    badge: { value: 500, suffix: "+", text: "Restaurants" },
    bg: "from-orange-50 to-white",
  },
  {
    step: "02",
    label: "Fast Delivery",
    desc: "Our riders are dispatched the moment you confirm — real‑time GPS tracking so you always know where your food is.",
    Icon: TbTruckDelivery,
    color: "#FF6B35",
    glow: "rgba(255,107,53,0.25)",
    badge: { value: 30, suffix: " min", text: "Avg. delivery" },
    bg: "from-orange-50 to-white",
  },
  {
    step: "03",
    label: "Enjoy Meal",
    desc: "Sit back, relax, and savour your favourite food fresh at your door — no stress, no hassle, pure joy.",
    Icon: BsEmojiHeartEyesFill,
    color: "#FF6B35",
    glow: "rgba(255,107,53,0.25)",
    badge: { value: 98, suffix: "%", text: "Happy customers" },
    bg: "from-orange-50 to-white",
  },
];

// ── Individual Step Card ───────────────────────────────────────────────────────
function StepCard({ step, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hovered, setHovered] = useState(false);
  const { Icon, color, glow, badge, bg } = step;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.92, filter: "blur(12px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : {}
      }
      transition={{
        duration: 0.7,
        delay: index * 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col cursor-pointer"
    >
      {/* card */}
      <motion.div
        animate={{
          boxShadow: hovered
            ? `0 24px 60px ${glow}, 0 4px 16px rgba(0,0,0,0.06)`
            : `0 4px 24px rgba(0,0,0,0.05)`,
          y: hovered ? -8 : 0,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`relative overflow-hidden rounded-3xl bg-transparent ${bg} border border-orange-400 p-8 h-full`}
      >
        {/* step number — big background watermark */}
        <motion.span
          className="absolute top-4 right-6 font-black select-none pointer-events-none"
          style={{ fontSize: "6rem", lineHeight: 1, color, opacity: 0.06 }}
          animate={{ rotate: hovered ? 8 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {step.step}
        </motion.span>

        {/* icon blob */}
        <ParallaxLayer depth={6} className="inline-block mb-6">
          <motion.div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: `${color}18` }}
            animate={{
              scale: hovered ? 1.12 : 1,
              rotate: hovered ? -6 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <Icon size={32} color={color} />
          </motion.div>
        </ParallaxLayer>

        {/* step pill */}
        <motion.div
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
          style={{ background: `${color}15`, color }}
        >
          Step {step.step.replace("0", "")}
        </motion.div>

        {/* title — split text */}
        <h3 className="text-2xl font-extrabold text-white mb-3 leading-tight">
          <SplitText text={step.label} delay={index * 0.15 + 0.2} />
        </h3>

        {/* description */}
        <motion.p
          className="text-gray-400 text-sm leading-relaxed mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.18 + 0.5, duration: 0.6 }}
        >
          {step.desc}
        </motion.p>

        {/* stat badge */}
        <motion.div
          className="flex items-center gap-3 mt-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.18 + 0.65, duration: 0.5 }}
        >
          <div
            className="flex flex-col items-start rounded-2xl px-4 py-3"
            style={{ background: `${color}12` }}
          >
            <span
              className="text-xl font-extrabold"
              style={{ color }}
            >
              <Counter to={badge.value} suffix={badge.suffix} />
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {badge.text}
            </span>
          </div>
        </motion.div>

        {/* hover reveal bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 rounded-b-3xl"
          style={{ background: color }}
          initial={{ width: "0%" }}
          animate={{ width: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Floating decoration blobs ──────────────────────────────────────────────────
function FloatingBlob({ style, color, size = 200, delay = 0 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none select-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(40px)",
        ...style,
      }}
      animate={{ y: [0, -24, 0], scale: [1, 1.08, 1] }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// ── Connector arrow between steps ─────────────────────────────────────────────
function Connector({ index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className="hidden lg:flex items-center justify-center flex-shrink-0 w-12 self-center"
    >
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.4, duration: 0.5 }}
        className="flex items-center gap-1"
        style={{ transformOrigin: "left" }}
      >
        <div className="h-px w-8 bg-gradient-to-r from-gray-200 to-gray-400" />
        <div
          className="w-0 h-0"
          style={{
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
            borderLeft: "8px solid #9CA3AF",
          }}
        />
      </motion.div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function HowItWorks() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gray-900 overflow-hidden py-24 px-4"
    >
       {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-10"
    style={{
      backgroundImage: "url('" + assets.HowToWorks + "')",
    }}
  />
      {/* ── background blobs ── */}
      <FloatingBlob
        color="rgba(255,107,53,0.12)"
        size={400}
        style={{ top: -80, left: -100 }}
        delay={0}
      />
      <FloatingBlob
        color="rgba(59,130,246,0.10)"
        size={350}
        style={{ bottom: 60, right: -80 }}
        delay={2}
      />
      <FloatingBlob
        color="rgba(16,185,129,0.09)"
        size={300}
        style={{ top: "40%", left: "50%", transform: "translate(-50%,-50%)" }}
        delay={4}
      />

      {/* ── subtle grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.35,
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* ── header ── */}
        <div className="text-center mb-20">
          {/* eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-500 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          >
            <FiZap size={12} />
            <span>Simple as 1-2-3</span>
          </motion.div>

          {/* main heading — split text */}
          <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-5 leading-tight perspective-1000">
            <SplitText text="How It" delay={0.1} />
            <span> </span>
            <SplitText
              text="Works"
              delay={0.3}
              className=" text-orange-500"
              style={{
                backgroundImage: "linear-gradient(135deg, #FF6B35, #F59E0B)",
              }}
            />
          </h2>

          {/* sub heading */}
          <motion.p
            className="max-w-xl mx-auto text-gray-400 text-lg"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={
              inView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : {}
            }
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            From craving to doorstep in minutes — HiruEats makes it effortlessly delicious.
          </motion.p>

          {/* decorative line */}
          <motion.div
            className="mx-auto mt-6 h-1 rounded-full"
            style={{
              background: "linear-gradient(90deg,#FF6B35,#3B82F6,#10B981)",
            }}
            initial={{ width: 0 }}
            animate={inView ? { width: 80 } : {}}
            transition={{ delay: 0.75, duration: 0.7, ease: "easeOut" }}
          />
        </div>

        {/* ── step cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 lg:gap-0 items-stretch">
          {STEPS.map((step, i) => (
            <Fragment key={step.step}>
              <StepCard step={step} index={i} />
              {i < STEPS.length - 1 && <Connector key={`conn-${i}`} index={i} />}
            </Fragment>
          ))}
        </div>

        {/* ── bottom CTA ── */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <motion.button
            className="group relative overflow-hidden inline-flex items-center gap-3 bg-orange-400 text-white font-bold text-sm px-8 py-4 rounded-2xl"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* shimmer sweep */}
            <motion.span
              className="absolute inset-0 -skew-x-12"
              style={{
                background:
                  "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.15) 50%,transparent 100%)",
                translateX: "-200%",
              }}
              animate={{ translateX: ["−200%", "200%"] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            />
            <MdFastfood size={18} className="text-orange-400" />
            Order Now — It's Fast
          </motion.button>

          <p className="mt-4 text-xs text-gray-400">
            Free delivery on your first order · No minimum spend
          </p>
        </motion.div>
      </div>
    </section>
  );
}
