import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Mic, Activity, BrainCircuit, Database, 
  Send, CheckCircle2, AlertCircle, Stethoscope
} from "lucide-react";

export const StorageSection = ({ sectionRef }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 8);
    }, 1800); 
    return () => clearInterval(interval);
  }, []);

  return (
      // Optimized: Reduced py-24 to py-12 md:py-24, removed min-h-screen for mobile to reduce scroll
      <section ref={sectionRef} className="relative min-h-[auto] lg:min-h-screen py-12 lg:py-24 bg-[#0B1120] overflow-hidden flex items-center font-sans">
         {/* Exact Dot Background */}
         <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
         
         {/* Optimized: Reduced gap-20 to gap-10 */}
         <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
             
             {/* LEFT COLUMN: The Vertical Workflow */}
             <div className="relative flex flex-col items-center w-full max-w-[500px] mx-auto order-2 lg:order-1">
                 
                 {/* Step 1: User / Audio */}
                 <Node 
                    title="Audio Collection" 
                    subtitle="High-fidelity capture & suppression"
                    icon={Mic}
                    isActive={activeStep === 0}
                 />

                 <AnimatedConnector isActive={activeStep > 0} />

                 {/* Step 2: Extraction */}
                 <Node 
                    title="Feature Extraction" 
                    subtitle="Mel-spectrogram conversion"
                    icon={Activity}
                    isActive={activeStep === 1}
                 />

                 <AnimatedConnector isActive={activeStep > 1} />

                 {/* Step 3: ML Analysis */}
                 <Node 
                    title="ML Diagnosis Engine" 
                    subtitle="CNN/RNN Pattern Recognition"
                    icon={BrainCircuit}
                    isActive={activeStep === 2}
                 />

                 <AnimatedConnector isActive={activeStep > 2} />
                 
                 {/* BRANCHING SECTION */}
                 <div className="grid grid-cols-2 gap-3 md:gap-4 w-full relative">
                     {/* Branch Svg Connector */}
                     <svg className="absolute -top-4 md:-top-8 left-1/2 -translate-x-1/2 w-full h-4 md:h-8 pointer-events-none overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 32">
                        <path 
                           d="M 250 0 L 250 5 Q 250 10 125 10 L 125 16" 
                           className="hidden md:none" /* Desktop Path */
                           fill="none" 
                           stroke="#334155" 
                           strokeWidth="2" 
                           strokeDasharray="6 6"
                        />
                        {/* Mobile Optimized Branch Path (Simulated via similar structure with reduced height logic if strictly needed, but reusing SVG with viewBox adjustments usually easier. For now, we rely on responsive heights in parent) */}
                         <path 
                           d="M 250 0 L 250 10 Q 250 20 125 20 L 125 32" 
                           className="md:block hidden"
                           fill="none" 
                           stroke="#334155" 
                           strokeWidth="2" 
                           strokeDasharray="6 6"
                        />
                         <path 
                           d="M 250 0 L 250 10 Q 250 20 375 20 L 375 32" 
                           className="md:block hidden"
                           fill="none" 
                           stroke="#334155" 
                           strokeWidth="2" 
                           strokeDasharray="6 6"
                        />

                         {/* Simplified Mobile Branch Paths */}
                         <path d="M 250 0 L 250 16 L 125 16 L 125 32" vectorEffect="non-scaling-stroke" className="md:hidden block" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                         <path d="M 250 0 L 250 16 L 375 16 L 375 32" vectorEffect="non-scaling-stroke" className="md:hidden block" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

                        {/* Animated Overlay for Branch */}
                        {activeStep > 2 && (
                           <>
                              {/* Left Flow Desktop */}
                              <motion.path 
                                 d="M 250 0 L 250 10 Q 250 20 125 20 L 125 32" 
                                 className="hidden md:block"
                                 fill="none" 
                                 stroke="#22c55e" 
                                 strokeWidth="2" 
                                 strokeDasharray="6 6"
                                 initial={{ pathLength: 0 }}
                                 animate={{ pathLength: 1 }}
                                 transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                              />
                               {/* Right Flow Desktop */}
                              <motion.path 
                                 d="M 250 0 L 250 10 Q 250 20 375 20 L 375 32" 
                                 className="hidden md:block"
                                 fill="none" 
                                 stroke="#f97316" 
                                 strokeWidth="2" 
                                 strokeDasharray="6 6"
                                 initial={{ pathLength: 0 }}
                                 animate={{ pathLength: 1 }}
                                 transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                              />
                           </>
                        )}
                     </svg>
                     
                     {/* Left Branch: Healthy */}
                     <Node 
                        title="Healthy" 
                        subtitle="No anomalies"
                        icon={CheckCircle2}
                        isActive={activeStep === 3}
                        color="green"
                     />

                     {/* Right Branch: Detected */}
                     <Node 
                        title="Risk Detected" 
                        subtitle="Pneumonia / Asthma"
                        icon={AlertCircle}
                        isActive={activeStep === 3}
                        color="orange"
                     />
                 </div>
                 
                 {/* Merge Connector */}
                 <div className="relative w-full h-4 md:h-8">
                     <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-visible" preserveAspectRatio="none">
                        {/* Left Merge */}
                        <path d="M 125 0 L 125 15 Q 125 25 250 25 L 250 32" className="hidden md:block" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
                        {/* Right Merge */}
                        <path d="M 375 0 L 375 15 Q 375 25 250 25 L 250 32" className="hidden md:block" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
                     </svg>
                 </div>

                 {/* Step 4: IPFS */}
                 <Node 
                    title="Tamper-proof Storage" 
                    subtitle="IPFS Decentralized Record"
                    icon={Database}
                    isActive={activeStep === 4}
                 />

                 <AnimatedConnector isActive={activeStep > 4} />

                 {/* Step 5: Report Delivery */}
                 <Node 
                    title="Report Delivery" 
                    subtitle="WhatsApp & Email Dispatch"
                    icon={Send}
                    isActive={activeStep === 5}
                 />
                
                <AnimatedConnector isActive={activeStep > 5} />

                {/* Step 6: Triage */}
                <Node 
                    title="Medical Triage" 
                    subtitle="Actionable Next Steps"
                    icon={Stethoscope}
                    isActive={activeStep === 6}
                 />

            </div>

            {/* RIGHT COLUMN: Heading / Details - Order 1 on mobile to show context first */}
            <div className="flex flex-col justify-center h-full pl-0 lg:pl-10 order-1 lg:order-2 text-center lg:text-left mb-8 lg:mb-0">
               <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-[11px] font-mono mb-4 md:mb-6 w-fit mx-auto lg:mx-0 tracking-wider"
               >
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  LIVE PROCESSING
               </motion.div>

               <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-[1.1]">
                  Intelligent <br/>
                  <span className="text-blue-500">Diagnostic Core</span>
               </h2>
               
               <p className="text-slate-400 leading-relaxed text-sm md:text-base mb-8 md:mb-10 max-w-md mx-auto lg:mx-0 font-medium">
                  CoughLens captures, analyzes, and diagnoses respiratory patterns in real-time. Our pipeline ensures every cough is processed with 99.8% ML accuracy.
               </p>

               <div className="grid gap-4 md:gap-6 text-left max-w-sm mx-auto lg:mx-0 w-full">
                  <StatusItem title="Capture" desc="High-fidelity audio processing" active={activeStep <= 2} color="blue" />
                  <StatusItem title="Analysis" desc="Dual-path branching logic" active={activeStep === 3} color="orange" />
                  <StatusItem title="Delivery" desc="IPFS hashing & report gen" active={activeStep >= 4} color="green" />
               </div>
            </div>

         </div>
      </section>
  );
};

const StatusItem = ({ title, desc, active, color }) => {
   const colors = {
      blue: "bg-blue-500",
      orange: "bg-orange-500",
      green: "bg-green-500"
   };

   return (
      <div className={`flex items-start gap-4 p-3 md:p-4 rounded-xl border transition-all duration-300 ${active ? "bg-white/5 border-white/10" : "border-transparent opacity-50"}`}>
         <div className={`mt-1 w-2 h-2 rounded-full ${active ? colors[color] : "bg-slate-700"}`} />
         <div>
            <h4 className={`text-sm font-bold ${active ? "text-white" : "text-slate-500"}`}>{title}</h4>
            <p className="text-xs text-slate-500">{desc}</p>
         </div>
      </div>
   )
}

// "Perfect" Boxed Node Component
const Node = ({ title, subtitle, icon: Icon, isActive, color = "blue", customClass = "w-full" }) => {
   const activeStyles = {
      blue: "border-blue-500/50 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.15)]",
      green: "border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.15)]",
      orange: "border-orange-500/50 bg-orange-500/5 shadow-[0_0_20px_rgba(249,115,22,0.15)]"
   };
   
   const iconColors = {
      blue: "text-blue-400",
      green: "text-emerald-400",
      orange: "text-orange-400"
   };

   return (
      <div 
         // Optimized: Reduced p-4 to p-3 md:p-4
         className={`
            relative p-3 md:p-4 rounded-xl border transition-all duration-500 z-20 flex items-center gap-3 md:gap-4
            ${isActive 
               ? activeStyles[color] 
               : "border-slate-800 bg-[#111827] shadow-sm"}
            ${customClass}
         `}
      >
         <div className={`p-2 rounded-lg bg-slate-900/50 border border-slate-800 ${isActive ? iconColors[color] : "text-slate-600"}`}>
            <Icon className="w-4 h-4 md:w-5 md:h-5" />
         </div>
         <div className="flex-1">
            <h4 className={`font-semibold text-xs md:text-sm tracking-tight ${isActive ? "text-white" : "text-slate-400"}`}>
               {title}
            </h4>
            <p className="text-[10px] md:text-[11px] text-slate-500 font-medium tracking-wide leading-tight">
               {subtitle}
            </p>
         </div>
         
         { isActive && <div className={`w-1.5 h-1.5 rounded-full ${color === 'blue' ? 'bg-blue-500' : color === 'green' ? 'bg-emerald-500' : 'bg-orange-500'} animate-pulse`} /> }
      </div>
   );
};

// Optimized: Reduced h-8 to h-4 md:h-8
const AnimatedConnector = ({ isActive }) => (
   <div className="relative h-4 md:h-8 w-full flex justify-center items-center overflow-visible">
      <svg className="h-full w-[2px] overflow-visible">
         {/* Background Dashed Line */}
         <line 
            x1="1" y1="0" x2="1" y2="100%" 
            stroke="#334155" 
            strokeWidth="2" 
            strokeDasharray="4 4"
         />
         
         {/* Active Moving Dash Animation */}
         {isActive && (
            <motion.line 
               x1="1" y1="0" x2="1" y2="100%" 
               stroke="#3b82f6" 
               strokeWidth="2" 
               strokeDasharray="4 4"
               initial={{ strokeDashoffset: 0 }}
               animate={{ strokeDashoffset: -8 }}
               transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            />
         )}
      </svg>
   </div>
);
