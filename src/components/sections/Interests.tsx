
import React, { useEffect, useRef } from "react";
import InterestCard from "../ui/InterestCard";
import { Camera, Code, Film, Music, Book, Plane } from "lucide-react";

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

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="interests"
      ref={sectionRef}
      className="relative py-24 bg-white"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <div 
              key={index} 
              className="fade-in-view"
              style={{ transitionDelay: `${100 * index}ms` }}
            >
              <InterestCard
                icon={interest.icon}
                title={interest.title}
                description={interest.description}
                color={interest.color}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;
