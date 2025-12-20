import React from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  Play, 
  Zap, 
  TrendingUp, 
  Mic, 
  ShieldCheck, 
  Stethoscope, 
  Globe, 
  Database,
  Wind
} from "lucide-react";

// --- Shared Components (Inlined for single-file mandate) ---

const FadeIn = ({ children, delay = 0, direction = "up" }) => {
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 active:scale-95 disabled:opacity-50";
  const variants = {
    primary: "bg-black text-white hover:bg-neutral-800",
    secondary: "bg-white text-black border border-neutral-200 hover:bg-neutral-50",
    orange: "bg-[#FF4F18] text-white hover:bg-[#e64615] shadow-lg shadow-orange-500/20",
  };
  
  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Sub-components ---

const TrustedLogos = () => (
  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 lg:gap-8 mt-12 opacity-70 transition-all duration-500">
    {['Primary Healthcare', 'Telemedicine', 'Community Centers', 'Remote Diagnostics', 'Home Screening'].map((logo, i) => (
      <span key={i} className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-neutral-500 border border-neutral-200 px-3 py-1.5 rounded-full select-none cursor-default hover:border-orange-500/50 hover:text-orange-600 transition-colors bg-white/50">
        {logo}
      </span>
    ))}
  </div>
);

const FloatingNode = ({ delay = 0, size = 4, color = "#FF4F18" }) => (
  <motion.div
    animate={{
      x: [0, Math.random() * 60 - 30, Math.random() * 60 - 30, 0],
      y: [0, Math.random() * 60 - 30, Math.random() * 60 - 30, 0],
      scale: [1, 1.4, 0.7, 1],
      opacity: [0.1, 0.5, 0.1]
    }}
    transition={{
      duration: 18 + Math.random() * 10,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    style={{ 
      width: size, 
      height: size, 
      backgroundColor: color,
      filter: `blur(${size/2}px)`
    }}
    className="absolute rounded-full z-10"
  />
);

const MeridianSphere = () => {
  return (
    <div className="relative w-full aspect-square max-w-[340px] md:max-w-[600px] lg:max-w-[800px] flex items-center justify-center pointer-events-none">
      
      {/* 1. Global Ambient Glow */}
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#FF4F18]/30 via-[#FF4F18]/5 to-transparent blur-[120px] rounded-full translate-y-1/4" 
      />

      {/* 2. Central Interactive Core */}
      <motion.div 
        animate={{ 
          y: [-20, 20, -20],
          rotateY: [0, 10, 0],
          rotateX: [0, -5, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[85%] h-[85%] rounded-full flex items-center justify-center z-10"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), transparent 50%), radial-gradient(circle at 70% 70%, #FF4F18 0%, transparent 60%)',
          boxShadow: 'inset -20px -20px 100px rgba(255, 79, 24, 0.2), 0 50px 120px -20px rgba(255, 79, 24, 0.3)',
          border: '1px solid rgba(255,255,255,0.4)'
        }}
      >
        {/* Sphere Surface Pattern */}
        <div className="absolute inset-0 rounded-full opacity-30 mix-blend-overlay overflow-hidden">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="w-full h-full" 
            style={{ 
              backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)',
              backgroundSize: '28px 28px',
              maskImage: 'radial-gradient(black 40%, transparent 95%)'
            }} 
          />
        </div>

        {/* Orbiting Particles */}
        <FloatingNode delay={0} size={10} color="#FF4F18" />
        <FloatingNode delay={3} size={6} color="#3B82F6" />
        <FloatingNode delay={7} size={8} color="#FF4F18" />

        {/* Rotating Internal Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[95%] h-[95%] border border-white/20 rounded-full border-dashed"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[80%] h-[80%] border border-white/10 rounded-full border-dotted"
        />

        {/* --- Non-Linear UI Widgets Scattered Randomly --- */}

        {/* Widget 1: Audio Processing (Shifted Position) */}
        <motion.div 
          animate={{ 
            x: [10, -15, 5, 10],
            y: [90, 90, 90, 80],
            rotate: [2, -1, 3, 2]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-30 bg-[#FF4F18] text-white px-5 py-3 rounded-full flex items-center gap-3 shadow-2xl shadow-[#FF4F18]/40 left-[25%]"
        >
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Mic size={12} fill="currentColor" />
          </div>
          <span className="text-xs font-bold tracking-tight">AI Listening...</span>
        </motion.div>

        {/* Widget 2: Analysis Card (Shifted Position) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            x: [-40, -60, -50, -40],
            y: [-80, -100, -90, -80],
          }}
          transition={{ 
            duration: 24, 
            repeat: Infinity, 
            times: [0, 0.1, 0.9, 1],
            delay: 1 
          }}
          className="absolute z-20 bg-white rounded-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] p-5 min-w-[260px] border border-gray-50 left-[5%] hidden md:block"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-[9px] font-black text-[#FF4F18] uppercase tracking-[0.2em]">Clinical Analysis</div>
            <ShieldCheck size={14} className="text-green-500" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-gray-400">Diagnosis</div>
              <div className="text-lg font-bold text-gray-900 leading-none mt-1">Normal Risk</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-gray-400">Confidence</div>
              <div className="text-lg font-bold text-orange-600 leading-none mt-1">94%</div>
            </div>
          </div>
        </motion.div>

        {/* Widget 3: Live Waveform (Shifted Position) */}
        <motion.div 
          animate={{ 
            x: [-30, 20, -15, -30],
            y: [-120, -80, -90, -100],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute z-20 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg flex items-center gap-3 border border-white"
        >
          <div className="flex items-end gap-1 h-4">
            {[0.4, 0.9, 0.5, 0.8, 0.3].map((h, i) => (
              <motion.div 
                key={i} 
                animate={{ height: ["20%", "100%", "40%"] }} 
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 bg-blue-400 rounded-full" 
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Live Waveform</span>
        </motion.div>

        {/* Widget 4: Data Badge (Shifted Position) */}
        <motion.div 
          animate={{ 
            x: [20, 50, 35, 20],
            y: [-120, -140, -130, -120],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg flex items-center gap-3 border border-gray-100 right-[10%] hidden md:flex"
        >
          <Activity size={16} className="text-blue-500" />
          <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">Biomarkers Active</span>
        </motion.div>

        {/* Widget 5: IPFS Tag (Shifted Position) */}
        <motion.div 
          animate={{ 
            x: [-60, -40, -50, -60],
            y: [160, 180, 170, 160],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute z-10 bg-black/90 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 left-[15%] hidden md:flex"
        >
          <Database size={14} className="text-orange-400" />
          <span className="text-[9px] font-black tracking-[0.2em] uppercase">IPFS Secured</span>
        </motion.div>

        {/* Widget 6: Extra Context Tag (Shifted Position) */}
        <motion.div 
          animate={{ 
            x: [10, -20, -5, 10],
            y: [60, 40, 50, 60],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute z-20 bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 right-[25%] hidden md:flex"
        >
          <Wind size={12} />
          <span className="text-[9px] font-bold uppercase tracking-widest">Breath Count: 18</span>
        </motion.div>

      </motion.div>

      {/* Orbiting Particle 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[115%] h-[115%] rounded-full z-0"
      >
        <div className="absolute top-0 left-1/2 w-2.5 h-2.5 bg-[#FF4F18]/50 rounded-full blur-[1px] shadow-lg shadow-orange-500/30" />
      </motion.div>
    </div>
  );
};

export const HeroSection = ({ sectionRef }) => {
  return (
    <section ref={sectionRef} className="relative min-h-screen lg:h-screen flex items-center overflow-hidden bg-[#F3F4F6] text-black pt-20 lg:pt-32 antialiased">
      {/* Global Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F3F4F6] via-[#F3F4F6]/80 to-transparent z-0 pointer-events-none" />

      <div className="container max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-0 items-center relative z-10">
        
        {/* Left Column: Content */}
        {/* Left Column: Content */}
        <div className="max-w-xl px-4 lg:pl-0 z-20 mt-15 lg:mt-60 order-2 lg:order-none pt-0 lg:pt-0 flex flex-col items-center text-center lg:items-start lg:text-left">
          <FadeIn>
            <h1 className="text-4xl md:text-[5.5rem] font-light tracking-[-0.05em] leading-[0.95] mb-6 text-[#05050A]">
              Voice-First <br />
              Respiratory <br />
              <span className="text-[#FF4F18]  ">Screening <br /> </span>
            <span className="text-[#FF4F18] font-bold "  >  Powered by AI.</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-normal max-w-lg">
              CoughLens AI uses acoustic biomarkers and a multilingual voice assistant
              to detect asthma and pneumonia risk, securely stored on IPFS.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-row items-center justify-center lg:justify-start gap-3 mb-10 w-full">
              <Button className="h-12 sm:h-14 px-6 sm:px-8 bg-black/90 hover:bg-[#05050A] text-white shadow-xl shadow-orange-500/20 rounded-xl text-sm sm:text-lg font-bold flex-1 sm:flex-none" variant="primary">
                Start Screening
              </Button>
              <Button className="h-12 sm:h-14 px-6 sm:px-8 bg-white hover:bg-gray-50 text-black border border-gray-200 rounded-xl text-sm sm:text-lg font-bold flex-1 sm:flex-none" variant="secondary">
                Know More
              </Button>   
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-6 lg:mt-0">
              Built for rural healthcare & clinics
            </p>
            <TrustedLogos />
          </FadeIn>
        </div>

        {/* Right Column: Visual */}
        <div className="relative lg:absolute order-1 lg:order-none lg:right-[-15%] lg:top-[-5%] w-full lg:w-[75%] h-[280px] lg:h-full flex items-center justify-center pointer-events-none z-0 mix-blend-multiply opacity-95">
          <MeridianSphere />
        </div>
      </div>
      
      {/* Bottom Interface Fade */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#FF4F18]/10 to-transparent pointer-events-none" />
    </section>
  );
};