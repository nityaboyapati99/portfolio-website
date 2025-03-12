
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Achievements from "@/components/sections/Achievements";
import Interests from "@/components/sections/Interests";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

const Index = () => {
  useEffect(() => {
    // PERSONAL DETAILS: Update the page title with Nitya Boyapati's name
    document.title = "Portfolio | Nitya Boyapati";
    
    // Add intersection observer for animation
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(".fade-in-view");
    fadeElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    // Updated background color to a soft gradient with pastel purple tones
    <div className="min-h-screen bg-gradient-to-b from-pastel-purple/20 to-pastel-blue/10 text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Achievements />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
