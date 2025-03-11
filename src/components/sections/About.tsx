import React, { useEffect, useRef } from "react";
import { Award, BookOpen, Code, Heart } from "lucide-react";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

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

  const aboutItems = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "Achievements",
      description: "Highlights of key accomplishments across my journey.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Skills",
      description: "Technical and professional abilities I've developed.",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Learning",
      description: "Educational background and continuous growth.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Interests",
      description: "Passions and hobbies that define me beyond work.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 bg-white"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-pastel-green/10 to-white" />
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-pastel-blue/10 blur-3xl" />
      </div>

      <div className="section-container">
        <div className="text-center mb-20">
          <h2 className="section-title fade-in-view">About Me</h2>
          <p className="section-subtitle mx-auto fade-in-view">
            A glimpse into who I am, what I do, and what drives me forward.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="col-span-full lg:col-span-1 fade-in-view">
            <div className="glass-card rounded-3xl p-8 h-full">
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-pastel-purple/20 mb-6">
                <div className="w-full h-full flex items-center justify-center text-3xl font-serif">
                  NB
                </div>
              </div>
              <h3 className="text-2xl font-serif font-medium mb-3">Nitya Boyapati</h3>
              <p className="text-muted-foreground mb-4">
                Your profession or title
              </p>
              <p className="text-sm leading-relaxed">
                A brief introduction about yourself. Share your background, motivation, and what makes you unique in your field. This is your opportunity to make a personal connection with visitors.
              </p>
            </div>
          </div>

          <div className="col-span-full lg:col-span-2 fade-in-view">
            <div className="glass-card rounded-3xl p-8 h-full">
              <h3 className="text-2xl font-serif font-medium mb-6">My Journey</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Describe your journey here - your background, key milestones, and what has shaped your professional and personal development over the years. Share insights about what drives you and the values that guide your work and life.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 mt-8">
                {aboutItems.map((item, index) => (
                  <div 
                    key={index}
                    className="flex gap-4 p-4 rounded-2xl transition-all hover:bg-secondary group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pastel-purple/20 flex items-center justify-center text-foreground group-hover:bg-pastel-purple/30 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
