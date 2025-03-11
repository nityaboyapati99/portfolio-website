
import React, { useEffect, useRef, useState } from "react";
import InterestCard from "../ui/InterestCard";
import { Camera, Code, Film, Music, Book, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const nextCard = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % interests.length);
  };

  const prevCard = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + interests.length) % interests.length);
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

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
      className="relative py-24 bg-gradient-to-b from-white via-pastel-blue/5 to-pastel-purple/10"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-pastel-blue/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-pastel-purple/10 blur-3xl" />
      </div>

      <div className="section-container">
        <div className="text-center mb-20">
          <h2 className="section-title fade-in-view">Interests & Passions</h2>
          <p className="section-subtitle mx-auto fade-in-view">
            Discover what drives my curiosity and fuels my creativity beyond work.
          </p>
        </div>

        <div className="max-w-4xl mx-auto fade-in-view">
          <div className="relative h-[420px] w-full">
            {interests.map((interest, index) => {
              // Calculate position in stack
              const position = (index - activeIndex + interests.length) % interests.length;
              return (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={cn(
                    "absolute w-full transition-all duration-500 ease-in-out",
                    position === 0 && "z-30 top-0 scale-100 opacity-100 shadow-lg", 
                    position === 1 && "z-20 top-10 scale-[0.95] opacity-80 left-4 rotate-2",
                    position === 2 && "z-10 top-16 scale-[0.9] opacity-60 left-8 rotate-4",
                    position === 3 && "z-0 top-20 scale-[0.85] opacity-40 left-10 rotate-6",
                    position > 3 && "opacity-0"
                  )}
                >
                  <InterestCard
                    icon={interest.icon}
                    title={interest.title}
                    description={interest.description}
                    color={interest.color}
                    className="cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-6 mt-16">
            <button 
              onClick={prevCard}
              className="px-5 py-2 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow transition-all border border-pastel-purple/20"
              aria-label="Previous interest"
            >
              Previous
            </button>
            <button 
              onClick={nextCard}
              className="px-5 py-2 rounded-full bg-pastel-purple/20 hover:bg-pastel-purple/30 shadow-sm hover:shadow transition-all"
              aria-label="Next interest"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interests;
