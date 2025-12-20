import React from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export const Logo = ({ theme = 'dark' }) => (
  <div className="flex items-center gap-3.5 select-none cursor-pointer group">
    <img 
      src="/ChatGPT Image Dec 19, 2025, 03_38_34 PM.png" 
      alt="CoughLens AI" 
      className="h-33 md:h-50 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
    />
  </div>  
);


export const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const baseStyles = "px-6 py-2.5 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95";
  const variants = {
    primary: "bg-[#FF4F18] text-white hover:bg-[#ff6434] shadow-lg shadow-orange-500/20",
    secondary: "bg-white text-black hover:bg-gray-100",
    outline: "border border-white/20 text-white hover:bg-white/10",
    dark: "bg-black text-white hover:bg-black/80",
    shiny: "bg-gradient-to-r from-gray-900 to-black text-white border border-gray-800 hover:border-gray-600 shadow-xl shadow-black/10 hover:shadow-primary/20 bg-[length:200%_auto] hover:bg-right transition-all duration-500",
    glass: "bg-white/50 backdrop-blur-md border border-white/40 text-gray-800 hover:bg-white/80 hover:border-white/60 shadow-sm"
  };
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const FadeIn = ({ children, delay = 0, direction = "up" }) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};
