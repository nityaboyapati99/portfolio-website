
import React, { useEffect, useRef } from "react";
import AchievementCard from "../ui/AchievementCard";

const achievements = [
  {
    title: "Achievement One",
    description: "Description of your first major achievement and its impact.",
    year: "2023",
    category: "Work",
    color: "blue" as const,
  },
  {
    title: "Achievement Two",
    description: "Details about another significant accomplishment in your journey.",
    year: "2022",
    category: "Education",
    color: "pink" as const,
  },
  {
    title: "Achievement Three",
    description: "Information about a personal or professional milestone.",
    year: "2021",
    category: "Personal",
    color: "purple" as const,
  },
  {
    title: "Achievement Four",
    description: "Description of an award, recognition, or important project completion.",
    year: "2020",
    category: "Award",
    color: "green" as const,
  },
  {
    title: "Achievement Five",
    description: "Details about a certification, skill mastery, or other accomplishment.",
    year: "2019",
    category: "Certification",
    color: "yellow" as const,
  },
  {
    title: "Achievement Six",
    description: "Information about community contribution, volunteer work, or other achievement.",
    year: "2018",
    category: "Community",
    color: "peach" as const,
  },
];

const Achievements = () => {
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
      id="achievements"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-white to-pastel-gray/30"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-pastel-yellow/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-pastel-pink/10 blur-3xl" />
      </div>

      <div className="section-container">
        <div className="text-center mb-20">
          <h2 className="section-title fade-in-view">Achievements</h2>
          <p className="section-subtitle mx-auto fade-in-view">
            A collection of milestones and accomplishments throughout my journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className="fade-in-view"
              style={{ transitionDelay: `${100 * index}ms` }}
            >
              <AchievementCard
                title={achievement.title}
                description={achievement.description}
                year={achievement.year}
                category={achievement.category}
                color={achievement.color}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
