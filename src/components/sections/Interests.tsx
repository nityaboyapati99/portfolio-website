import React, { useState } from "react";
import InterestCard from "../ui/InterestCard";
import { Camera, Code, Film, Music, Book, Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % interests.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + interests.length) % interests.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section id="interests" className="py-24 bg-gradient-to-br from-pastel-purple/20 via-white to-pastel-blue/20">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title fade-in-view">Interests & Passions</h2>
          <p className="section-subtitle mx-auto fade-in-view">
            Discover what drives my curiosity and fuels my creativity beyond work.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="relative h-[400px] overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm shadow-xl">
            <div 
              className="flex transition-transform duration-500 h-full"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {interests.map((interest, idx) => (
                <div
                  key={idx}
                  className="w-full h-full flex-shrink-0 flex items-center justify-center p-8"
                >
                  <div className="w-full max-w-xl mx-auto">
                    <InterestCard
                      icon={interest.icon}
                      title={interest.title}
                      description={interest.description}
                      color={interest.color}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-3">
              {interests.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    activeIndex === idx 
                      ? "w-4 bg-primary" 
                      : "bg-primary/30"
                  )}
                  aria-label={`Go to interest ${idx + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={prevCard}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 p-0 bg-white/80 hover:bg-white"
              disabled={isAnimating}
              aria-label="Previous interest"
            >
              ←
            </Button>
            <Button
              onClick={nextCard}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 p-0 bg-white/80 hover:bg-white"
              disabled={isAnimating}
              aria-label="Next interest"
            >
              →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interests;
