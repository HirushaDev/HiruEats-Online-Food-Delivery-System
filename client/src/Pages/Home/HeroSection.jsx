import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger)

const HEADLINE_WORDS = ['Fast', 'Delivery.', 'Fresh', 'Food.', 'Anytime.']

const FLOATING_FOODS = [
  { src: '/food-burger.png', className: 'top-[18%] left-[6%] w-28 sm:w-40', depth: 30 },
  { src: '/food-pizza.png', className: 'top-[12%] right-[8%] w-32 sm:w-44', depth: 50 },
  { src: '/food-salad.png', className: 'bottom-[22%] left-[10%] w-24 sm:w-36', depth: 40 },
  { src: '/food-drink.png', className: 'bottom-[15%] right-[12%] w-20 sm:w-32', depth: 60 },
]

export default function HeroSection() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const eyebrowRef = useRef(null)
  const wordsRef = useRef([])
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const floatersRef = useRef([])

  // Page-load entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(
        wordsRef.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.08 },
        '-=0.2'
      )
      .fromTo(subtitleRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      )
      .fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2')

    // Floating food entrance
    gsap.fromTo(
      floatersRef.current,
      { opacity: 0, scale: 0.8, rotate: -8 },
      { opacity: 1, scale: 1, rotate: 0, duration: 1, stagger: 0.15, delay: 0.4, ease: 'power3.out' }
    )

    // Scroll indicator bounce
    gsap.to(scrollIndicatorRef.current.querySelector('.scroll-dot'), {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: 'sine.inOut',
    })
  }, [])

  // Mouse parallax for floating food images
  useEffect(() => {
    const section = sectionRef.current
    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 2
      const y = (e.clientY / innerHeight - 0.5) * 2

      floatersRef.current.forEach((el, i) => {
        if (!el) return
        const depth = FLOATING_FOODS[i].depth
        gsap.to(el, {
          x: x * depth,
          y: y * depth,
          duration: 1.2,
          ease: 'power2.out',
        })
      })
    }
    section.addEventListener('mousemove', handleMove)
    return () => section.removeEventListener('mousemove', handleMove)
  }, [])

  // GSAP scroll-driven hero exit
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // 1. Hero content fades out smoothly
    tl.to(
      [eyebrowRef.current, ...wordsRef.current, subtitleRef.current, ctaRef.current, scrollIndicatorRef.current],
      { opacity: 0, y: -80, ease: 'none' },
      0
    )
      // 2. Background video scales slightly
      .to(videoRef.current, { scale: 1.15, ease: 'none' }, 0)
      // 4. Images float and rotate subtly while exiting
      .to(floatersRef.current, { opacity: 0, y: -60, rotate: 12, stagger: 0.05, ease: 'none' }, 0)

    return () => tl.scrollTrigger?.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#f0e1e1]"
    >
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.15),transparent_60%)]" />

      {/* Floating food images with mouse parallax */}
      {FLOATING_FOODS.map((food, i) => (
        <div
          key={food.src}
          ref={(el) => (floatersRef.current[i] = el)}
          className={`absolute ${food.className} pointer-events-none hidden sm:block`}
        >
          <img
            src={food.src}
            alt=""
            loading="lazy"
            className="w-full h-auto drop-shadow-2xl"
          />
        </div>
      ))}

      {/* Hero content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 sm:px-8">
        <p
          ref={eyebrowRef}
          className="text-orange-500 text-xs sm:text-sm tracking-[0.35em] uppercase mb-6 font-medium"
        >
          Order in seconds
        </p>

        <h1 className="font-bold text-[#F5F4F2] leading-[1.05] mb-6 max-w-5xl">
          <span className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 text-4xl sm:text-6xl lg:text-7xl">
            {HEADLINE_WORDS.map((word, i) => (
              <span
                key={word}
                ref={(el) => (wordsRef.current[i] = el)}
                className={
                  word === 'Food.' || word === 'Anytime.'
                    ? 'bg-gradient-to-br from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent'
                    : ''
                }
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-[#A8A8AC] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          From your favorite local spots to citywide cravings, HiruEats gets
          it to your door, hot and on time, every time.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
         <Link
  to="/login"
  className="px-8 py-4 rounded-full bg-orange-500 text-white font-semibold text-base sm:text-lg shadow-[0_0_60px_rgba(249,115,22,0.25)] hover:shadow-[0_0_120px_rgba(249,115,22,0.35)] hover:scale-[1.03] transition-all duration-300 min-h-[44px] w-full sm:w-auto"
>
  Order Now
</Link>
          <a
            href="#showcase"
            className="px-8 py-4 rounded-full border border-white/20 text-[#F5F4F2] font-medium text-base sm:text-lg hover:border-orange-500 hover:text-orange-500 transition-colors duration-300 min-h-[44px] w-full sm:w-auto text-center"
          >
            Explore Menu
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#F5F4F2]/50"
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-orange-500 to-transparent relative">
          <span className="scroll-dot absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-orange-500" />
        </div>
      </div>
    </section>
  )
}