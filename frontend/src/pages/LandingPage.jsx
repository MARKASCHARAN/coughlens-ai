import React, { useState, useRef, useEffect } from "react";
import { useInView, useScroll, useSpring } from "framer-motion";

// Import Components
import { Navbar } from "../components/landing/Navbar.jsx";
import { HeroSection } from "../components/landing/HeroSection";
import { VoiceSection } from "../components/landing/VoiceSection";
import { StorageSection } from "../components/landing/StorageSection";
import { ResourcesSection } from "../components/landing/ResourcesSection";

import { CTASection } from "../components/landing/CTASection";
import { Footer } from "../components/landing/Footer";

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Section Refs
  const sections = {
    hero: useRef(null),
    blue: useRef(null),
    yellow: useRef(null),
    orange: useRef(null),
    resources: useRef(null),

    discover: useRef(null),
  };

  const isHeroInView = useInView(sections.hero, { margin: "-45% 0px -45% 0px" });
  const isBlueInView = useInView(sections.blue, { margin: "-45% 0px -45% 0px" });
  const isYellowInView = useInView(sections.yellow, { margin: "-45% 0px -45% 0px" });
  const isOrangeInView = useInView(sections.orange, { margin: "-45% 0px -45% 0px" });
  const isResourcesInView = useInView(sections.resources, { margin: "-45% 0px -45% 0px" });

  const isDiscoverInView = useInView(sections.discover, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isHeroInView) setCurrentTheme('light');
    else if (isBlueInView) setCurrentTheme('blue');
    else if (isYellowInView) setCurrentTheme('yellow');
    else if (isOrangeInView) setCurrentTheme('orange');
    else if (isResourcesInView) setCurrentTheme('light');

    else if (isDiscoverInView) setCurrentTheme('dark');
  }, [isHeroInView, isBlueInView, isYellowInView, isOrangeInView, isResourcesInView, isDiscoverInView]);

  return (
    <div className="font-sans antialiased selection:bg-[#FF4F18] selection:text-white overflow-x-hidden">
      
      {/* Background Layer - Global Grids */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute inset-0 transition-opacity duration-1000 ${currentTheme === 'dark' ? 'opacity-20' : 'opacity-0'} rayon-grid`} />
        <div className={`absolute inset-0 transition-colors duration-1000 ${
          currentTheme === 'dark' ? 'bg-[#05050A]' : 
          currentTheme === 'blue' ? 'bg-[#3000F0]' : 
          currentTheme === 'yellow' ? 'bg-[#FDE047]' : 
          currentTheme === 'orange' ? 'bg-[#FF4F18]' : 
          'bg-white'
        }`} />
      </div>

      <Navbar 
        currentTheme={currentTheme} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />

      <HeroSection 
        sectionRef={sections.hero} 
        scrollYProgress={scrollYProgress} 
      />

      <VoiceSection sectionRef={sections.blue} />

      <StorageSection sectionRef={sections.yellow} />

      <ResourcesSection sectionRef={sections.resources} />



      <CTASection sectionRef={sections.discover} />

      <Footer />

      {/* Static CSS for grid patterns */}
      <style dangerouslySetInnerHTML={{ __html: `
        .rayon-grid {
          background-image: 
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: translate(-50%, 0) scale(1); }
          50% { opacity: 0.2; transform: translate(-50%, -20px) scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .theme-dark { background-color: #05050A; }
        .theme-blue { background-color: #3000F0; }
        .theme-yellow { background-color: #FDE047; }
        .theme-orange { background-color: #FF4F18; }
      `}} />
    </div>
  );
}