import React from "react";
import { motion } from "framer-motion";
import { Button } from "./Shared";

const Cloud = ({ className, delay = 0 }) => (
  <motion.div 
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: "120vw", opacity: [0, 1, 1, 0] }}
    transition={{ duration: 40, repeat: Infinity, ease: "linear", delay }}
    className={`absolute pointer-events-none fill-white/40 blur-3xl ${className}`}
  >
     <div className="w-[400px] h-[200px] bg-gradient-to-r from-blue-100/40 to-white/40 rounded-[100%]"></div>
  </motion.div>
);

export const CTASection = ({ sectionRef }) => {
  const [focusedField, setFocusedField] = React.useState(null);

  return (
      <section ref={sectionRef} className="relative py-20 lg:py-32 bg-white text-black overflow-hidden selection:bg-[#FF4F18]/20 min-h-screen flex items-center">
         {/* Moving Clouds Background */}
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
             <Cloud className="top-[10%]" delay={0} />
             <Cloud className="top-[40%] scale-75 opacity-50" delay={15} />
             <Cloud className="top-[70%]" delay={5} />
             
             {/* Gradient Blobs */}
             <div className="absolute top-[-50%] right-[-10%] w-[70vw] h-[70vw] bg-gradient-to-b from-blue-50 to-transparent rounded-full blur-[100px] animate-pulse duration-10000"></div>
             <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-t from-orange-50 to-transparent rounded-full blur-[80px]"></div>
         </div>

         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center relative z-10 w-full">
            <div>
               <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 text-xs font-mono mb-8 text-gray-500 uppercase tracking-wider shadow-sm"
               >
                  <span className="w-2 h-2 rounded-full bg-[#FF4F18] animate-pulse"></span>
                  Get in touch
               </motion.div>
               
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="text-5xl sm:text-7xl md:text-[8rem] font-bold tracking-tighter leading-[0.9] mb-8 lg:mb-12"
               >
                 Have a question? <br/>
                 <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-black/30 block"
                 >
                    Let's Chat.
                 </motion.span>
               </motion.h2>

               <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-gray-500 max-w-md mb-10 leading-relaxed"
               >
                  Ready to deploy respiratory screening at scale? Our team is ready to help you set up your first pilot.
               </motion.p>
            </div>

            <div className="relative pt-10 lg:pt-0 pb-10 lg:pb-0 perspective-[1000px]">
               <motion.div 
                 initial={{ rotateX: 10, rotateY: -10, opacity: 0 }}
                 whileInView={{ rotateX: 0, rotateY: 0, opacity: 1 }}
                 transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                 viewport={{ margin: "-50px" }}
                 whileHover={{ scale: 1.01, transition: { duration: 0.4 } }}
                 className="bg-white/80 backdrop-blur-xl rounded-xl border border-white/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden max-w-md mx-auto relative group"
               >
                  {/* MacOS Title Bar */}
                  <div className="h-10 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200/60 flex items-center px-4 gap-2">
                     <div className="flex gap-1.5 group-hover:gap-2 transition-all duration-300">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-inner" />
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-inner" />
                        <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-inner" />
                     </div>
                     <div className="absolute left-0 right-0 text-center pointer-events-none">
                        <span className="text-[10px] font-semibold text-gray-500/80 drop-shadow-sm flex items-center justify-center gap-1">
                            <span className="opacity-50">🔒</span> contact_form.tsx — edited
                        </span>
                     </div>
                  </div>
                  
                  <div className="p-8 space-y-6 relative">
                     {/* Input Group: Name */}
                     <motion.div 
                       className="space-y-1.5"
                       animate={{ scale: focusedField === 'name' ? 1.02 : 1 }}
                       transition={{ duration: 0.2 }}
                     >
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Name</label>
                        <input 
                           type="text"
                           placeholder="Enter your name"
                           className="w-full bg-white/50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300"
                           onFocus={() => setFocusedField('name')}
                           onBlur={() => setFocusedField(null)}
                        />
                     </motion.div>

                     {/* Input Group: Email/Number */}
                     <motion.div 
                       className="space-y-1.5"
                       animate={{ scale: focusedField === 'contact' ? 1.02 : 1 }}
                       transition={{ duration: 0.2 }}
                     >
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email or Phone</label>
                         <input 
                           type="text"
                           placeholder="name@company.com"
                           className="w-full bg-white/50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300"
                           onFocus={() => setFocusedField('contact')}
                           onBlur={() => setFocusedField(null)}
                        />
                     </motion.div>

                     {/* Message Area */}
                     <motion.div 
                       className="space-y-1.5"
                       animate={{ scale: focusedField === 'message' ? 1.02 : 1 }}
                       transition={{ duration: 0.2 }}
                     >
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Message</label>
                        <textarea 
                           rows={3}
                           placeholder="How can we help?"
                           className="w-full bg-white/50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300 resize-none"
                           onFocus={() => setFocusedField('message')}
                           onBlur={() => setFocusedField(null)}
                        />
                     </motion.div>

                     <motion.button 
                       className="w-full bg-gradient-to-r from-gray-900 to-black text-white font-medium py-3.5 rounded-xl shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.2)] transition-all flex items-center justify-center gap-2 group/btn"
                       whileHover={{ scale: 1.02 }}
                       whileTap={{ scale: 0.98 }}
                     >
                        <span>Send Message</span>
                         <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                         </svg>
                     </motion.button>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>
  );
};
