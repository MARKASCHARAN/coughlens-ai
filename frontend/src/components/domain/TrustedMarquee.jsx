import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

// Custom Logo Components for that "Unique" feel
const Logos = {
  Apex: () => (
    <svg className="h-8 w-auto text-white fill-current" viewBox="0 0 120 32" xmlns="http://www.w3.org/2000/svg">
       <path d="M16 2L2 26H30L16 2Z" fill="white"/>
       <text x="38" y="24" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="22" fill="white">APEX</text>
    </svg>
  ),
  Pulse: () => (
    <svg className="h-7 w-auto text-white fill-current" viewBox="0 0 120 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="16" r="8" fill="white"/>
        <text x="30" y="24" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="22" fill="white" letterSpacing="-1">pulse.ai</text>
    </svg>
  ),
  Vitals: () => (
    <svg className="h-8 w-auto text-white fill-current" viewBox="0 0 130 32" xmlns="http://www.w3.org/2000/svg">
         <rect x="0" y="8" width="8" height="16" rx="4" fill="white"/>
         <rect x="12" y="2" width="8" height="28" rx="4" fill="white"/>
         <rect x="24" y="8" width="8" height="16" rx="4" fill="white"/>
         <text x="42" y="24" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="22" fill="white">VITALS+</text>
    </svg>
  ),
  Echo: () => (
    <svg className="h-7 w-auto text-white fill-current" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 16C15 23.1797 9.1797 29 2 29V3C9.1797 3 15 8.8203 15 16Z" fill="white"/>
        <text x="24" y="23" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="20" fill="white">ECHO</text>
    </svg>
  ),
  Nura: () => (
    <svg className="h-6 w-auto text-white fill-current" viewBox="0 0 120 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L4 16L12 28L20 16L12 4Z" fill="white"/>
        <text x="30" y="22" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="22" fill="white" letterSpacing="1">NURA</text>
    </svg>
  ),
  BioScan: () => (
     <svg className="h-8 w-auto text-white fill-current" viewBox="0 0 140 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="16" r="6" stroke="white" strokeWidth="3" fill="none"/>
        <circle cx="26" cy="16" r="6" stroke="white" strokeWidth="3" fill="none"/>
        <text x="42" y="24" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="20" fill="white">BIOSCAN</text>
    </svg>
  )
};

const PARTNERS = [
  Logos.Apex,
  Logos.Pulse,
  Logos.Vitals,
  Logos.Echo,
  Logos.Nura,
  Logos.BioScan
];

export function TrustedMarquee() {
  return (
    <div className="w-full py-20 bg-[#020617] relative overflow-hidden border-y border-white/5">
      {/* Glow Effect at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[100px] bg-blue-500/20 blur-[80px]" />
      
      <div className="text-center mb-12 relative z-10">
        <h3 className="text-sm font-medium tracking-widest text-slate-400 uppercase">
            Trusted by modern healthcare teams
        </h3>
      </div>
      
      <div className="relative flex max-w-7xl mx-auto px-6">
        {/* Gradient Masks for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10" />

        <div className="flex animate-marquee gap-24 items-center min-w-full">
            {/* Loop 1 */}
            {PARTNERS.map((Logo, i) => (
                <div key={`p1-${i}`} className="opacity-50 hover:opacity-100 transition-opacity duration-300">
                    <Logo />
                </div>
            ))}
             {/* Loop 2 */}
            {PARTNERS.map((Logo, i) => (
                <div key={`p2-${i}`} className="opacity-50 hover:opacity-100 transition-opacity duration-300">
                    <Logo />
                </div>
            ))}
             {/* Loop 3 */}
             {PARTNERS.map((Logo, i) => (
                <div key={`p3-${i}`} className="opacity-50 hover:opacity-100 transition-opacity duration-300">
                    <Logo />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
