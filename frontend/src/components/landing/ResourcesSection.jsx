import React from "react";
import { motion } from "framer-motion";
import { Mic, Activity, FileText, Globe, ArrowUpRight, BarChart3, ShieldCheck, Play, ScanLine, LayoutDashboard, Lock, Server } from "lucide-react";
import { Button } from "./Shared";

export const ResourcesSection = ({ sectionRef }) => {
  return (
      <section ref={sectionRef} className="relative py-12 md:py-32 bg-white overflow-hidden font-sans">
         <div className="max-w-[1400px] mx-auto px-4 md:px-6">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-24 gap-8">
               <div className="max-w-4xl">
                  <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="text-black font-bold uppercase tracking-[0.2em] mb-8 text-xs flex items-center gap-3 font-mono"
                  >
                     <span className="w-2 h-2 rounded-full bg-black"></span>
                     Full Project Overview
                  </motion.div>
                  <motion.h2 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.1 }}
                     className="text-4xl md:text-5xl lg:text-[5.5rem] font-bold text-[#0F172A] tracking-[-0.03em] leading-[0.95]"
                  >
                     Visibility, insights, actions. <br className="hidden lg:block"/>
                     <span className="text-gray-400">One automated platform.</span>
                  </motion.h2>
               </div>
               <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="mb-4"
               >
                  {/* Button removed as per request */}
               </motion.div>
            </div>

            {/* Meridian-Style Grid - 2x2 Layout */}
            <div className="relative">
               {/* Vertical Dotted Line (Center) */}
               <div className="absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-slate-200 hidden md:block -translate-x-1/2 z-0"></div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
               
               {/* CARD 1: BRAND ANALYTICS (ML Diagnosis) */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 // Added 'group' and specific hover effect
                 className="bg-[#F8FAFC] rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-12 relative overflow-hidden min-h-[360px] md:min-h-[550px] flex flex-col group border border-slate-100 hover:shadow-2xl transition-all duration-500"
               >
                  <div className="flex items-center gap-4 mb-4 md:mb-8">
                     <div className="w-8 h-8 md:w-8 md:h-8 border border-slate-200 rounded flex items-center justify-center text-slate-500">
                        <ScanLine className="w-4 h-4 md:w-4 md:h-4" />
                     </div>
                     <h3 className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#0F172A]">ML DIAGNOSIS ENGINE</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 h-full z-10 relative">
                     <div className="flex flex-col justify-between">
                         <p className="text-base md:text-xl text-slate-700 leading-relaxed font-medium tracking-tight">
                           Track how AI analyzes cough patterns, extracting MFCC features to detect anomalies with high precision.
                        </p>
                        
                        
                        {/* Date Axis Replica */}
                        <div className="mt-6 md:mt-12 flex justify-between text-[10px] text-slate-400 font-mono uppercase border-t border-slate-200 pt-3 md:pt-5 w-full relative">
                           {/* Add extra ticks to match the dense tick marks in screenshot */}
                           <div className="absolute top-0 left-0 right-0 flex justify-between w-full">
                              {[...Array(13)].map((_, i) => (
                                 <span key={i} className={`block w-px ${i % 4 === 0 ? 'h-3 bg-slate-300' : 'h-1.5 bg-slate-200'}`}></span>
                              ))}
                           </div>
                           <span className="font-semibold text-slate-900 mt-2">JAN 01</span>
                           <span className="font-semibold text-slate-900 mt-2">MAR 31</span>
                        </div>
                     </div>

                        {/* Graph Section */}
                     <div className="relative h-full min-h-[220px] flex items-end translate-y-4">
                        <div className="absolute top-0 right-0 z-10 text-right bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50">
                           <div className="flex items-baseline gap-2 mb-1">
                              <span className="text-xl font-bold text-slate-400">Q1</span>
                              <span className="text-5xl font-bold text-slate-900 tracking-tighter">+54%</span>
                           </div>
                           <div className="mt-2 inline-flex items-center gap-1.5 bg-[#FF4F18] px-3 py-1 rounded-full">
                              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Accuracy Boost</span>
                           </div>
                        </div>
                        
                        {/* SVG Graph Area */}
                        <svg className="w-[120%] -ml-[10%] h-[90%] overflow-visible" preserveAspectRatio="none">
                           <defs>
                              <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="0%" stopColor="#FF4F18" stopOpacity="0.25"/>
                                 <stop offset="100%" stopColor="#FF4F18" stopOpacity="0"/>
                              </linearGradient>
                           </defs>
                           <path 
                              d="M0 200 L 40 140 L 140 120 L 250 20"
                              fill="url(#graphGradient)"
                              stroke="none"
                              className="w-full"
                           />
                           <motion.path 
                              d="M0 200 L 40 140 L 140 120 L 250 20" 
                              fill="none" 
                              stroke="#FF4F18" 
                              strokeWidth="4"
                              strokeLinecap="round"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                           />
                           
                           {/* Dotted Connection to Tag */}
                           <motion.line 
                             x1="250" y1="20" x2="300" y2="10" 
                             stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" 
                             initial={{ opacity: 0 }}
                             whileInView={{ opacity: 1 }}
                             transition={{ delay: 1 }}
                           />
                           
                           {/* Point on Graph */}
                           <motion.rect 
                             x="244" y="14" width="12" height="12" fill="#0F172A" 
                             initial={{ scale: 0 }}
                             whileInView={{ scale: 1 }}
                             transition={{ delay: 1.5, type: "spring" }}
                           />
                        </svg>
                     </div>
                  </div>
               </motion.div>


               {/* CARD 2: SYMPTOM TRACKING (Voice Command) */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="bg-gradient-to-br from-[#FFAB85] via-[#FF8045] to-[#FF4F18] rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-12 relative overflow-hidden min-h-[380px] md:min-h-[550px] text-white flex flex-col group hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500"
               >
                  <div className="flex items-center gap-4 mb-4 md:mb-8 relative z-10">
                     <div className="w-8 h-8 border border-white/30 rounded flex items-center justify-center text-white/90">
                        <Mic className="w-4 h-4" />
                     </div>
                     <h3 className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/90">VOICE COMMAND CENTER</h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 h-full relative z-10">
                     <div className="max-w-sm pt-2">
                        <p className="text-base md:text-xl text-white/95 leading-relaxed font-medium tracking-tight">
                           Know which patients are showing symptoms. Start tests, ask for reports, or get explanations—just by speaking.
                        </p>
                     </div>

                     {/* Floating Product Cards Cluster - 3D Perspective */}
                     <div className="relative w-full h-[250px] md:h-[400px] lg:h-auto perspective-[1200px] flex items-center justify-center lg:justify-end translate-x-4 md:translate-x-8">
                        
                        {/* Partial Top Card (Right) */}
                        <motion.div 
                           className="absolute -right-24 top-0 w-[260px] bg-[#1E110F] rounded-2xl p-4 shadow-2xl opacity-60 scale-90"
                           initial={{ x: 40, opacity: 0 }}
                           whileInView={{ x: 0, opacity: 0.6 }}
                           transition={{ delay: 0.2 }}
                        >
                             <div className="h-32 bg-slate-800 rounded-lg mb-3 overflow-hidden">
                                <img src="public/download.jpeg" className="w-full h-full object-cover" alt="Hub"/>
                             </div>
                             <div className="space-y-2">
                                 <h4 className="text-sm font-medium text-white/90 truncate">Smart Voice Hub</h4>
                                 <div className="flex justify-between items-center">
                                    <span className="text-xs text-white font-bold">Risk: Low</span>
                                    <span className="text-[8px] text-[#EA580C] font-bold">PID 882</span>
                                 </div>
                                 <div className="flex items-center gap-1">
                                    <span className="text-[10px] text-gray-400">98%</span>
                                    <svg className="w-2.5 h-2.5 text-[#EA580C] fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                 </div>
                             </div>
                        </motion.div>

                        {/* Partial Bottom Card (Right) */}
                        <motion.div 
                           className="absolute -right-24 bottom-10 w-[260px] bg-[#1E110F] rounded-2xl p-4 shadow-2xl opacity-60 scale-90"
                           initial={{ x: 40, opacity: 0 }}
                           whileInView={{ x: 0, opacity: 0.6 }}
                           transition={{ delay: 0.3 }}
                        >
                             <div className="h-32 bg-slate-800 rounded-lg mb-3 overflow-hidden">
                                <img src="public/download.jpeg" className="w-full h-full object-cover" alt="Headphones"/>
                             </div>
                             <div className="space-y-2">
                                 <h4 className="text-sm font-medium text-white/90 truncate">Studio ANC Headphones</h4>
                                 <div className="flex justify-between items-center">
                                    <span className="text-xs text-white font-bold">Risk: Mod</span>
                                    <span className="text-[8px] text-[#EA580C] font-bold">PID 884</span>
                                 </div>
                                 <div className="flex items-center gap-1">
                                    <span className="text-[10px] text-gray-400">92%</span>
                                    <svg className="w-2.5 h-2.5 text-[#EA580C] fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                 </div>
                             </div>
                        </motion.div>

                        {/* MAIN CARD */}
                        <motion.div 
                           className="relative w-[300px] bg-[#1E110F] rounded-2xl p-4 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.5)] border border-white/5 z-20"
                           initial={{ rotateY: -12, rotateX: 6, y: 20 }}
                           whileHover={{ rotateY: -5, rotateX: 3, y: 0, scale: 1.02 }}
                           transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                           {/* Badge Top Right (Score) */}
                           <div className="absolute top-7 right-7 z-20 bg-[#16A34A] text-white text-[12px] font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
                              56 <ArrowUpRight className="w-3 h-3" />
                           </div>

                           {/* Internal Image */}
                           <div className="relative h-48 bg-slate-800 rounded-lg mb-4 overflow-hidden group-hover:shadow-inner">
                              <img 
                                 src="public/photo-1564325724739-bae0bd08762c.avif" 
                                 className="w-full h-full object-cover opacity-90"
                                 alt="Monitor"
                              />
                              
                              {/* Badge Bottom Left (Top Performer) */}
                              <div className="absolute bottom-3 left-3">
                                 <div className="bg-slate-200/90 text-[#1E110F] px-2 py-1 rounded text-[10px] font-bold tracking-wide">
                                    Main
                                 </div>
                              </div>
                           </div>
                           
                           {/* Internal Text */}
                           <div className="space-y-3 px-1">
                              <h4 className="text-lg font-medium text-white tracking-tight">Cough Analysis</h4>
                              
                              <div className="flex justify-between items-baseline">
                                 <span className="text-lg font-bold text-white">High Risk</span>
                                 <span className="text-[10px] font-bold text-[#EA580C] uppercase tracking-wider">PID 882221</span>
                              </div>
                              
                              <div className="flex items-center gap-1.5">
                                 <span className="text-sm text-gray-400 font-medium"></span>
                                 <svg className="w-3.5 h-3.5 text-[#EA580C] fill-current" viewBox="0 0 24 24">
                                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                 </svg>
                                 <svg className="w-3.5 h-3.5 text-[#EA580C] fill-current" viewBox="0 0 24 24">
                                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                 </svg>
                                 <svg className="w-3.5 h-3.5 text-[#EA580C] fill-current" viewBox="0 0 24 24">
                                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                 </svg>
                                 <svg className="w-3.5 h-3.5 text-[#EA580C] fill-current" viewBox="0 0 24 24">
                                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                 </svg>
                                 <svg className="w-3.5 h-3.5 text-[#EA580C] fill-current" viewBox="0 0 24 24">
                                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                 </svg>
                              </div>
                           </div>
                        </motion.div>
                     </div>
                  </div>

                  {/* Decorative Background Lines */}
                   <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-screen">
                     <svg className="w-full h-full">
                        <path d="M-100 400 Q 200 200 500 400 T 1100 300" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="8 8"/>
                        <path d="M-100 500 Q 200 600 500 500 T 1100 600" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="8 8"/>
                     </svg>
                  </div>
               </motion.div>


               {/* CARD 3: HEALTH INSIGHTS */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="bg-gradient-to-br from-[#FFEFE6] via-[#FFD6C1] to-[#FF4F18] rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-12 relative overflow-hidden min-h-[380px] md:min-h-[550px] flex flex-col group hover:shadow-xl transition-all duration-500 lg:col-span-1"
               >
                  <div className="flex items-center gap-4 mb-4 md:mb-6 relative z-10">
                     <div className="w-8 h-8 flex items-center justify-center text-[#0F172A]">
                        <LayoutDashboard className="w-5 h-5" />
                     </div>
                     <h3 className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#0F172A]">HEALTH INSIGHTS</h3>
                  </div>

                  <p className="text-base md:text-xl text-slate-800 mb-6 md:mb-8 leading-relaxed font-medium tracking-tight max-w-sm relative z-10">
                     Improve how AI diagnoses and recommends treatments with a clear, prioritized roadmap.
                  </p>

                  <div className="relative flex-1 w-full mt-4 perspective-[1000px]">
                     
                     {/* Floating White Widget (Right Back) */}
                     <motion.div 
                        className="absolute right-0 top-0 bg-white rounded-xl shadow-lg border border-slate-100 p-6 w-[280px] z-10"
                        initial={{ x: 20, y: -20, rotate: 2 }}
                        whileInView={{ x: 0, y: 0, rotate: 2 }}
                        transition={{ duration: 0.8 }}
                     >
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                           <div className="flex items-center gap-2">
                              {/* Orange Arrow Icon */}
                              <svg className="w-4 h-4 text-[#FF4F18]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4v10c0 1.1.9 2 2 2h14M15 11l5-5-5-5" /></svg>
                              <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-widest">By Type</span>
                           </div>
                           <span className="text-lg text-slate-800 font-bold">+</span>
                        </div>
                        
                        <div className="space-y-5">
                           <div>
                              <p className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-1">DATA GAPS:</p>
                              <p className="text-xs text-slate-500 font-medium">22 incomplete profiles</p>
                              <div className="mt-3 h-px bg-slate-100 w-full"></div>
                           </div>
                           <div>
                              <p className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-1">OUTREACH:</p>
                              <p className="text-xs text-slate-500 font-medium">14 scheduled follow-ups</p>
                              <div className="mt-3 h-px bg-slate-100 w-full"></div>
                           </div>
                           <div>
                              <p className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-1">TRIAGE:</p>
                              <p className="text-xs text-slate-500 font-medium">32 high-priority cases</p>
                           </div>
                        </div>
                     </motion.div>

                     {/* Floating Dark Card (Left Front) */}
                     <motion.div 
                        className="absolute left-0 bottom-8 bg-[#0F172A] rounded-2xl shadow-2xl p-6 w-[320px] z-20 border border-slate-700/50"
                        initial={{ x: -20, y: 20 }}
                        whileInView={{ x: 0, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                     >
                        <div className="flex items-center gap-3 mb-6 text-[#94A3B8]">
                           <div className="w-5 h-5 rounded border border-[#FF4F18] flex items-center justify-center text-[#FF4F18]">
                              <Activity className="w-3 h-3" />
                           </div>
                           <span className="text-xs font-medium">Analysis Results</span>
                           <span className="text-xs ml-auto">...</span>
                        </div>

                        <div className="bg-[#1E293B] rounded-xl p-4 mb-4 border border-slate-700/50">
                           <div className="flex justify-between items-start mb-1">
                              <h4 className="text-lg font-medium text-white">Medical Reports</h4>
                              <span className="text-[10px] text-slate-500">09.07.24</span>
                           </div>
                           <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2 text-slate-400 text-xs">
                                 <ArrowUpRight className="w-3 h-3 rotate-45" />
                                 <span>Diagnosis: Respiratory Infection</span>
                              </div>
                              <span className="bg-[#10B981] text-[#064E3B] text-[10px] font-bold px-2 py-1 rounded">Analysis Complete</span>
                           </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                           <div className="flex -space-x-2">
                              <div className="w-8 h-8 rounded-full border-2 border-[#0F172A] bg-slate-600"></div>
                              <div className="w-8 h-8 rounded-full border-2 border-[#0F172A] bg-slate-500"></div>
                              <div className="w-8 h-8 rounded-full border-2 border-[#0F172A] bg-slate-400"></div>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-sm text-white font-medium">Total Insights</span>
                              <span className="bg-[#064E3B] text-[#10B981] px-1.5 py-0.5 rounded text-xs font-bold border border-[#059669]/30">09 ↑</span>
                           </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-[#FF4F18]">
                           <span>Insight Types</span>
                           <span>+</span>
                        </div>
                     </motion.div>

                  </div>
               </motion.div>


               {/* CARD 4: EPIDEMIC TRACKING */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.3 }}
                 className="bg-[#F1F5F9] rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-12 relative overflow-hidden min-h-[380px] md:min-h-[550px] flex flex-col group border border-slate-200 hover:shadow-xl transition-all duration-500 lg:col-span-1"
               >
                  <div className="flex items-center gap-4 mb-4 md:mb-6 relative z-10">
                     <div className="w-8 h-8 flex items-center justify-center text-[#0F172A] border border-black rounded">
                        <BarChart3 className="w-4 h-4" />
                     </div>
                     <h3 className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#0F172A]">EPIDEMIC TRACKING</h3>
                  </div>

                  <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 h-full">
                     <div className="flex flex-col justify-between h-full">
                        <p className="text-base md:text-xl text-slate-800 mb-6 md:mb-8 leading-relaxed font-medium tracking-tight">
                           Track how viruses spread in real-time, identify hotspots, and deploy resources where they are needed most.
                        </p>
                        
                        {/* Bottom Buttons */}
                        <div className="flex gap-3 mt-auto">
                           <button className="bg-[#1E110F] text-white px-4 py-2 rounded-lg text-xs font-bold font-mono tracking-wide shadow-lg border border-[#3C241E] transition-transform active:scale-95">
                              Last Month
                           </button>
                           <button className="bg-[#FF8045] text-[#1E110F] px-4 py-2 rounded-lg text-xs font-bold font-mono tracking-wide shadow-lg border border-[#FF9F70] transition-transform active:scale-95">
                              Last 7 Days
                           </button>
                        </div>
                     </div>

                     {/* Floating DARK Table Replica - Aligned Right */}
                     <div className="flex items-center justify-end">
                        <motion.div 
                           className="bg-[#050505] rounded-xl overflow-hidden shadow-2xl border border-gray-800 w-full max-w-[340px]"
                           whileHover={{ y: -4 }}
                           transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                           <div className="grid grid-cols-3 gap-2 px-5 py-4 bg-[#0A0A0A] border-b border-gray-800 text-[11px] font-bold text-[#FF6A3D] tracking-wide">
                              <span>Region</span>
                              <span className="text-center">Cases</span>
                              <span className="text-right">Trend</span>
                           </div>
                           
                           {[
                              { name: "Andhara", count: 240, change: 56, up: true },                            
                              { name: "Gujarat", count: 125, change: 32, up: true },
                              { name: "Telangana", count: 68, change: 12, up: true },
                              { name: "Maharashtra", count: 452, change: 14, up: false },
                              { name: "Karnataka", count: 98, change: 14, up: false },
                           ].map((item, i) => (
                              <div key={i} className="grid grid-cols-3 gap-2 px-5 py-3.5 text-xs border-b border-gray-900 last:border-0 hover:bg-gray-900/40 transition-colors group/row cursor-pointer">
                                 <span className="font-medium text-gray-200 group-hover/row:text-white transition-colors">{item.name}</span>
                                 <span className="text-gray-400 font-mono text-center">{item.count}</span>
                                 <div className="text-right flex justify-end items-center gap-2">
                                    <span className={`px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold flex items-center gap-0.5 ${item.up ? 'bg-[#064E3B] text-[#34D399]' : 'bg-[#450A0A] text-[#F87171]'}`}>
                                       {item.change}{item.up ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowUpRight className="w-2.5 h-2.5 rotate-90" />} 
                                    </span>
                                 </div>
                              </div>
                           ))}
                        </motion.div>
                     </div>
                  </div>
                  
                  {/* Soft Gradient Overlay at Bottom Right */}
                  <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-tl from-gray-300 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none" />
               </motion.div>

            </div>
            </div>
         </div>
      </section>
  );
};
