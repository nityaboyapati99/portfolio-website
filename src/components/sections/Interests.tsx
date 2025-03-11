
import React, { useEffect, useRef, useState } from "react";
import InterestCard from "../ui/InterestCard";
import { Camera, Code, Film, Music, Book, Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

// PERSONAL DETAILS: Update these interests with Nitya Boyapati's specific interests and descriptions
const interests = [
  {
    icon: Code,
    title: "Programming",
    description: "Exploring new technologies and building applications.",
    color: "blue" as const,
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Capturing moments and finding beauty in the ordinary.",
    color: "pink" as const,
  },
  {
    icon: Music,
    title: "Music",
    description: "Playing instruments and discovering new genres.",
    color: "purple" as const,
  },
  {
    icon: Book,
    title: "Reading",
    description: "Expanding knowledge through books and articles.",
    color: "green" as const,
  },
  {
    icon: Plane,
    title: "Travel",
    description: "Exploring new cultures and experiencing different ways of life.",
    color: "yellow" as const,
  },
  {
    icon: Film,
    title: "Cinema",
    description: "Appreciating storytelling through film and visual arts.",
    color: "peach" as const,
  },
];

const Interests = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % interests.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex - 1 + interests.length) % interests.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleCardClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-rotate interests
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll(".fade-in-view");
      elements.forEach((el) => observer.observe(el));
    }

    // Auto-rotate interests every 5 seconds
    const interval = setInterval(() => {
      nextCard();
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="interests"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-pastel-purple/15 via-pastel-blue/20 to-pastel-pink/15"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-pastel-blue/20 blur-3xl" />
        <div className="absolute top-1/2 right-10 w-80 h-80 rounded-full bg-pastel-pink/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-pastel-purple/15 blur-3xl" />
        <div className="absolute top-10 right-1/4 w-72 h-72 rounded-full bg-pastel-yellow/15 blur-3xl" />
      </div>

      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title fade-in-view">Interests & Passions</h2>
          {/* PERSONAL DETAILS: Update this subtitle with Nitya Boyapati's personal touch */}
          <p className="section-subtitle mx-auto fade-in-view">
            Discover what drives my curiosity and fuels my creativity beyond work.
          </p>
        </div>

        <div className="max-w-4xl mx-auto fade-in-view">
          {/* 3D Card Stack */}
          <div className="relative h-[450px] w-full perspective-1000 my-8">
            <div className="absolute inset-0 flex items-center justify-center">
              {interests.map((interest, index) => {
                // Calculate the distance from active index (considering circular array)
                const distance = (index - activeIndex + interests.length) % interests.length;
                // Limit visible cards to 5
                const isVisible = distance <= 4;
                
                return (
                  <div
                    key={index}
                    onClick={() => handleCardClick(index)}
                    className={cn(
                      "absolute w-full max-w-lg transition-all duration-500 ease-out cursor-pointer",
                      isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
                      distance === 0 && "z-50 translate-y-0 translate-x-0 scale-100 rotate-0",
                      distance === 1 && "z-40 translate-y-4 translate-x-8 scale-95 rotate-3 opacity-90",
                      distance === 2 && "z-30 translate-y-8 translate-x-16 scale-90 rotate-6 opacity-80",
                      distance === 3 && "z-20 translate-y-12 translate-x-24 scale-85 rotate-9 opacity-70",
                      distance === 4 && "z-10 translate-y-16 translate-x-32 scale-80 rotate-12 opacity-60",
                    )}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `translateZ(${-distance * 10}px)`,
                    }}
                  >
                    <div className={cn(
                      "relative w-full transform transition-all duration-500 shadow-lg",
                      distance === 0 && "shadow-xl"
                    )}>
                      <InterestCard
                        icon={interest.icon}
                        title={interest.title}
                        description={interest.description}
                        color={interest.color}
                        className="h-full"
                      />
                      
                      {distance === 0 && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-xs font-medium">
                          {activeIndex + 1}/{interests.length}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center gap-4 mt-10">
            <Button
              onClick={prevCard}
              variant="outline"
              className="px-6 py-2 rounded-full bg-white shadow hover:shadow-md transition-all"
              aria-label="Previous interest"
              disabled={isAnimating}
            >
              Previous
            </Button>
            
            <div className="flex gap-2 items-center mx-4">
              {interests.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    index === activeIndex 
                      ? "bg-pastel-purple/70 scale-125" 
                      : "bg-pastel-purple/30 hover:bg-pastel-purple/50"
                  )}
                  aria-label={`Go to interest ${index + 1}`}
                />
              ))}
            </div>
            
            <Button
              onClick={nextCard}
              className="px-6 py-2 rounded-full bg-pastel-purple/20 hover:bg-pastel-purple/30 shadow hover:shadow-md transition-all"
              aria-label="Next interest"
              disabled={isAnimating}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interests;
