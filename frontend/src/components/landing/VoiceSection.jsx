import React from "react";
import { motion } from "framer-motion";
import { Mic, ArrowRight } from "lucide-react";
import { FadeIn, Button } from "./Shared";

export const VoiceSection = ({ sectionRef }) => {
  return (
      // Optimized: Reduced py-32 to py-12 md:py-32, removed min-h-screen for mobile to reduce scroll
      <section ref={sectionRef} className="relative min-h-[auto] lg:min-h-screen py-12 md:py-32 flex items-center bg-[#3000F0] overflow-hidden">
        {/* Ambient Background Mesh */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-[20%] left-[10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-blue-600/30 rounded-full blur-[80px] md:blur-[120px]" />
           <div className="absolute bottom-[20%] right-[10%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-purple-600/20 rounded-full blur-[60px] md:blur-[100px]" />
        </div>

        {/* Optimized: Reduced gap-20 to gap-10 */}
        <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10">
           <div className="relative">
              <FadeIn direction="left">
                <div className="flex items-center gap-4 text-white/80 mb-6 md:mb-8">
                   <div className="relative">
                     <div className="absolute inset-0 bg-white/20 rounded-2xl animate-ping opacity-20" />
                     <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center relative z-10">
                       <Mic className="text-white w-4 h-4 md:w-6 md:h-6" />
                     </div>
                   </div>
                   <span className="text-sm md:text-lg font-bold uppercase tracking-[0.2em] text-white/60">Natural Command Center</span>
                </div>
                
                {/* Optimized: Reduced text sizes */}
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-6 md:mb-10 leading-[0.9]">
                   <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60">The Doctor</span> <br/>
                   <span className="text-white/40">that</span> <span className="text-white underline decoration-white/30 underline-offset-[8px] md:underline-offset-[12px] decoration-2">listens.</span>
                </h2>
                
                <p className="text-white/70 text-lg md:text-2xl max-w-lg mb-8 md:mb-12 font-medium leading-relaxed">
                   "Start screening for Patient #902", "Translate to Telugu", "Export PDF". 
                   Total hands-free control for on-field ASHA workers.
                </p>
                
                {/* Optimized: Button size */}
                <Button className="group relative h-12 md:h-16 pl-6 pr-8 md:pl-8 md:pr-10 text-base md:text-lg bg-white/5 text-white border border-white/20 hover:bg-white hover:text-blue-700 hover:border-white transition-all duration-300 backdrop-blur-md flex items-center gap-3 overflow-hidden rounded-full">
                     <span className="relative z-10 font-medium">Explore Voice Engine</span>
                     <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Button>
              </FadeIn>
           </div>
           
           {/* Optimized: Reduced height h-[700px] to h-[350px] md:h-[700px] */}
           <div className="relative h-[350px] md:h-[700px] w-full bg-gradient-to-b from-black/40 to-black/20 rounded-[2rem] md:rounded-[3.5rem] border border-white/10 backdrop-blur-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6 md:p-12 ring-1 ring-white/10">
              
              {/* Dynamic Wave Visualizer */}
              {/* Optimized: Reduced h-48 to h-24 */}
              <div className="flex items-end gap-1 md:gap-2 h-24 md:h-48 mb-8 md:mb-20 relative">
                 {/* Glow effect behind waves */}
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-16 md:h-32 bg-[#FF4F18]/20 blur-[40px] md:blur-[60px] rounded-full" />
                 
                 {[...Array(24)].map((_, i) => (
                    <motion.div 
                       key={i}
                       className="w-1.5 md:w-3 bg-[#FF4F18] rounded-full"
                       style={{ filter: "drop-shadow(0 0 8px #FF4F18)" }}
                       animate={{ 
                         height: ["20%", Math.random() * 100 + "%", "20%"],
                         opacity: [0.4, 1, 0.4]
                       }}
                       transition={{ 
                          duration: 0.6, 
                          repeat: Infinity, 
                          delay: i * 0.05,
                          ease: "easeInOut" 
                       }}
                    />
                 ))}
              </div>
              
              <motion.div 
                 initial={{ scale: 0.9, opacity: 0, y: 20 }}
                 whileInView={{ scale: 1, opacity: 1, y: 0 }}
                 // Optimized: Reduced p-10 to p-5 md:p-10
                 className="bg-white/5 backdrop-blur-xl p-5 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 max-w-lg w-full relative overflow-hidden group"
              >
                 {/* Scanning Light Effect */}
                 <motion.div 
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent z-20"
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 />
                 
                 <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />

                 <div className="text-white/40 text-[10px] md:text-xs font-mono uppercase mb-4 md:mb-6 flex justify-between tracking-wider">
                    <div className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse" />
                       <span>Transcribing Live...</span>
                    </div>
                    <span>Conf: 99.2%</span>
                 </div>
                 
                 {/* Optimized: Reduced content spacing/size */}
                 <p className="text-lg md:text-3xl font-bold text-white leading-tight mb-4 md:mb-8 relative z-10">
                    "<span className="text-white/50">Identify respiratory markers in the</span> <span className="bg-white/10 px-2 py-0.5 rounded-lg text-white">last 10 second</span> <span className="text-white/50">audio clip.</span>"
                 </p>

                 {/* Tech Footer */}
                 <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-white/5 text-[10px] uppercase tracking-widest text-white/30 font-mono">
                    <div>Latency: 24ms</div>
                    <div>Model: Clinical-v2</div>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>
  );
};
