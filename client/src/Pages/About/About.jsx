import React, { useEffect, useRef, useState } from "react";
import {
  FaBolt,
  FaLeaf,
  FaMapMarkedAlt,
  FaHeadset,
  FaTags,
  FaMotorcycle,
} from "react-icons/fa";
import { assets } from "../../assets/assets";

// ─── Custom hook for scroll‑reveal (used everywhere) ──────────────
function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// ─── Generic reveal wrapper ──────────────────────────────────────────
function Reveal({ as: Tag = "div", className = "", delay = 0, children }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}

// ─── Branch line (grows from trunk) ─────────────────────────────────
function BranchLine({ direction = "left", visible }) {
  // direction: 'left' or 'right'
  const base =
    "absolute top-1/2 h-0.5 pointer-events-none z-0 transition-transform duration-1000 ease-out";
  const sideClass =
    direction === "left"
      ? "left-0 right-1/2"
      : "left-1/2 right-0";
  const gradient =
    direction === "left"
      ? "bg-gradient-to-r from-transparent to-orange-400/30"
      : "bg-gradient-to-l from-transparent to-orange-400/30";
  const origin = direction === "left" ? "right center" : "left center";

  return (
    <div
      className={`${base} ${sideClass} ${gradient} ${
        visible ? "scale-x-100" : "scale-x-0"
      }`}
      style={{ transformOrigin: origin }}
    />
  );
}

// ─── Main component ──────────────────────────────────────────────────
export default function About({
  heroImage = assets.HowToWorks,
  founder1Image = assets.owner,
  founder2Image = assets.IT,
  onTalkClick = () => {},
}) {
  // Visibility state for each founder row (to trigger branch lines)
  const [row1Visible, setRow1Visible] = useState(false);
  const [row2Visible, setRow2Visible] = useState(false);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRow1Visible(true);
          observer1.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRow2Visible(true);
          observer2.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (row1Ref.current) observer1.observe(row1Ref.current);
    if (row2Ref.current) observer2.observe(row2Ref.current);
    return () => {
      observer1.disconnect();
      observer2.disconnect();
    };
  }, []);

  const whyUs = [
    {
      icon: FaBolt,
      title: "Lightning Delivery",
      text: "Hot food, fast. Our riders average under 28 minutes from kitchen to doorstep.",
    },
    {
      icon: FaMapMarkedAlt,
      title: "Live Tracking",
      text: "Watch your order move in real time, from the stove to your street.",
    },
    {
      icon: FaTags,
      title: "Fair Pricing",
      text: "No hidden surge fees. What you see at checkout is what you pay.",
    },
    {
      icon: FaLeaf,
      title: "Local Partners",
      text: "We work with neighbourhood kitchens, not faceless chains, so quality stays high.",
    },
    {
      icon: FaHeadset,
      title: "Always-On Support",
      text: "A real human picks up when something goes wrong — day or night.",
    },
    {
      icon: FaMotorcycle,
      title: "Rider-First",
      text: "Fair pay and flexible hours for the people who get your food to you.",
    },
  ];

  return (
    <div className="w-full font-sans text-stone-900">
      {/* ============================== HERO ============================== */}
      <section
        className="relative h-[90vh] min-h-[560px] w-full flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(15,12,10,0.55) 0%, rgba(15,12,10,0.75) 100%), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Reveal className="relative z-10 flex flex-col items-center text-center px-6">
          <span className="uppercase tracking-[0.35em] text-xs sm:text-sm text-orange-300 font-semibold mb-4">
            HiruEats
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight">
            About Us
          </h1>
          <p className="mt-4 max-w-xl text-stone-200 text-base sm:text-lg">
            Bringing the island's best kitchens to your doorstep, one warm
            meal at a time.
          </p>
          <button
            onClick={onTalkClick}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold px-8 py-3 text-sm sm:text-base transition-all duration-300 shadow-lg shadow-orange-900/30"
          >
            Let's Talk
          </button>
        </Reveal>
      </section>

      {/* ============================== OUR STORY ============================== */}
      <section className="bg-stone-50 px-6 sm:px-12 lg:px-24 py-24">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <span className="text-orange-500 font-semibold uppercase tracking-widest text-xs">
              Our Story
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-8 text-stone-900">
              It started with a cold dinner.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-stone-600 text-lg leading-relaxed mb-5">
              HiruEats began in 2021, after our founders waited two hours for
              a delivery that arrived lukewarm and half-melted. They weren't
              angry at the restaurant — the food had been ready in fifteen
              minutes. The problem was everything in between: confused
              routing, overloaded riders, and apps built for the platform
              instead of the plate.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="text-stone-600 text-lg leading-relaxed mb-5">
              So we rebuilt delivery around one idea — food has a clock the
              moment it leaves the pan. Every decision since, from how we
              route riders to how we pack orders, has been judged against
              that clock. We partnered with kitchens who cared as much as we
              did, and trained riders to treat a delivery bag like it held
              something that mattered. Because it does.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <p className="text-stone-600 text-lg leading-relaxed">
              Today HiruEats connects thousands of homes with the kitchens
              they love, but the goal hasn't changed: get food to people
              while it still tastes like it just left the stove.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================== WHY US ============================== */}
      <section className="bg-stone-950 px-6 sm:px-12 lg:px-24 py-24">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="text-orange-400 font-semibold uppercase tracking-widest text-xs">
              Why Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 text-white">
              Built different, on purpose.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map(({ icon: Icon, title, text }, i) => (
              <Reveal
                key={title}
                delay={i * 90}
                className="group rounded-2xl bg-stone-900 border border-stone-800 hover:border-orange-500/60 p-8 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <Icon className="text-orange-400 text-xl" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== TEAM CULTURE ============================== */}
      <section className="bg-stone-50 px-6 sm:px-12 lg:px-24 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="text-orange-500 font-semibold uppercase tracking-widest text-xs">
              Our Team Culture
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-8 text-stone-900">
              We eat what we ship.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-stone-600 text-lg leading-relaxed">
              Every HiruEats team — engineering, support, operations — orders
              through our own app at least once a week, on the same routes
              our customers use. If a delivery runs late or an order shows up
              wrong, the people who built the system feel it firsthand. We
              hire for curiosity and kindness in equal measure, keep our
              standups short and our kitchens visits frequent, and treat
              every rider and restaurant partner as a teammate, not a vendor.
              It's a culture built on a simple rule: ship nothing you
              wouldn't want delivered to your own door.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================== MEET OUR FOUNDERS (tree‑branch) ============================== */}
      <section className="bg-stone-950 px-6 sm:px-12 lg:px-24 py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          {/* ── Trunk line ── */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none z-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(251,146,60,0.05) 0%, rgba(251,146,60,0.35) 20%, rgba(251,146,60,0.45) 50%, rgba(251,146,60,0.35) 80%, rgba(251,146,60,0.05) 100%)",
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-orange-400/40 blur-[2px] animate-pulse"
              style={{ animationDuration: "4s" }}
            />
          </div>

          <Reveal className="text-center mb-16 relative z-10">
            <span className="text-orange-400 font-semibold uppercase tracking-widest text-xs">
              Meet Our Founders
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 text-white">
              The people behind the plate.
            </h2>
          </Reveal>

          {/* Founder 1: image left, bio right — branch on the left */}
          <div
            ref={row1Ref}
            className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20 z-10"
          >
            <BranchLine direction="left" visible={row1Visible} />
            <Reveal className="order-1">
              <img
                src={founder1Image}
                alt="Founder portrait"
                className="w-full h-[420px] object-cover rounded-2xl shadow-2xl shadow-black/40"
              />
            </Reveal>
            <Reveal delay={150} className="order-2 text-left">
              <h3 className="text-2xl font-bold text-white mb-1">
                Hirusha Dilshan Alwis
              </h3>
              <p className="text-orange-400 text-sm font-semibold mb-4">
                Founder &amp; CEO
              </p>
              <p className="text-stone-400 leading-relaxed">
                A former restaurant operator who got tired of watching good
                food arrive cold. Hirusha leads HiruEats with a simple
                obsession: protect the fifteen minutes between the kitchen
                and the customer. She still does ride-alongs with delivery
                partners every month.
              </p>
            </Reveal>
          </div>

          {/* Founder 2: image right, bio left — branch on the right */}
          <div
            ref={row2Ref}
            className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10"
          >
            <BranchLine direction="right" visible={row2Visible} />
            <Reveal className="order-1 md:order-2">
              <img
                src={founder2Image}
                alt="Founder portrait"
                className="w-full h-[420px] object-cover rounded-2xl shadow-2xl shadow-black/40"
              />
            </Reveal>
            <Reveal delay={150} className="order-2 md:order-1 text-left">
              <h3 className="text-2xl font-bold text-white mb-1">
                Dilshan Fernando
              </h3>
              <p className="text-orange-400 text-sm font-semibold mb-4">
                Co-Founder &amp; CTO
              </p>
              <p className="text-stone-400 leading-relaxed">
                The engineer who built HiruEats' routing engine from scratch
                because nothing off-the-shelf respected how fast food
                actually cools. Dilshan believes the best technology is
                invisible — you should never think about the app, only about
                the meal arriving exactly when it should.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}