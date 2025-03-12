import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const nameRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0", "translate-y-8");
        }
      });
    }, observerOptions);

    if (nameRef.current) observer.observe(nameRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    if (scrollRef.current) observer.observe(scrollRef.current);

    return () => {
      if (nameRef.current) observer.unobserve(nameRef.current);
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (subtitleRef.current) observer.unobserve(subtitleRef.current);
      if (scrollRef.current) observer.unobserve(scrollRef.current);
    };
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply z-10"></div>
        <img 
          src="/placeholder.svg" 
          alt="Background" 
          className="w-full h-full object-cover"
          title="Replace with a wide landscape photo that represents you"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pastel-blue/20 via-transparent to-transparent z-20" />
        <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-pastel-pink/30 blur-3xl z-20 opacity-50" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-pastel-purple/20 blur-3xl z-20 opacity-50" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-pastel-yellow/20 blur-3xl z-20 opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-30">
        <span
          ref={nameRef}
          className="inline-block font-medium text-sm md:text-base uppercase tracking-widest px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm mb-8 opacity-0 translate-y-8 transition-all duration-700 delay-100 text-white"
        >
          Welcome to my Portfolio
        </span>
        
        <h1
          ref={titleRef}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold opacity-0 translate-y-8 transition-all duration-700 delay-300 text-white drop-shadow-md"
        >
          Nitya Boyapati
        </h1>
        
        <p
          ref={subtitleRef}
          className="mt-6 text-xl md:text-2xl text-white/90 max-w-2xl mx-auto opacity-0 translate-y-8 transition-all duration-700 delay-500 drop-shadow-md"
        >
          Showcasing my journey, achievements, and passion in a clean, minimalist design.
        </p>
        
        <div
          ref={scrollRef}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 translate-y-8 transition-all duration-700 delay-700"
        >
          <button
            onClick={handleScrollDown}
            className="flex flex-col items-center text-sm text-white hover:text-white/80 transition-colors"
            aria-label="Scroll down"
          >
            <span className="mb-2">Scroll Down</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
