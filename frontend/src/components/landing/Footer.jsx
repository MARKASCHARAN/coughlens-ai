import { Logo } from "./Shared";
import { Linkedin, Github, Youtube, Twitter } from "lucide-react"; 

// Using a custom X icon since Lucide's Twitter is the bird usually, and we want "X" styling if possible, 
// but for safety and standard library usage, we can stick to Lucide icons or just text for "X".
// The design has simple circular buttons.

const SocialIcon = ({ children }) => (
    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer border border-white/5 hover:border-transparent">
        {children}
    </div>
);

export const Footer = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden font-sans selection:bg-[#FF4F18]/30 min-h-[90vh] flex flex-col justify-between">
      {/* Grid Lines Background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center w-full h-full max-w-[1400px] mx-auto">
          <div className="w-px h-full bg-white/5 absolute left-0 hidden lg:block"></div>
          <div className="w-px h-full bg-white/5 absolute left-[33%] hidden lg:block"></div>
          <div className="w-px h-full bg-white/5 absolute left-[66%] hidden lg:block"></div>
          <div className="w-px h-full bg-white/5 absolute right-0 hidden lg:block"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-3 flex-grow w-full">
        {/* Left Column */}
        <div className="p-8 lg:p-16 border-r border-white/5 flex flex-col justify-between">
           <div>
              <div className="mb-12">
                   {/* Logo Placeholder if needed, or just text sections */}
                   <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-8 block">Quick Links</span>
              </div>
              
              <ul className="space-y-4">
                  {['Platform', 'Brand Analytics', 'Website Insights', 'Improvement Actions', 'Product-level Tracking'].map((item) => (
                      <li key={item}><a href="#" className="text-base text-gray-400 hover:text-white transition-colors font-medium tracking-wide">{item}</a></li>
                  ))}
              </ul>
              
              {/* Socials */}
              <div className="flex gap-4 mt-12">
                  <SocialIcon><Linkedin size={18} /></SocialIcon>
                  <SocialIcon>
                      {/* Custom X logo shape or just text "X" if simplified. Using SVG for X logo for accuracy */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                  </SocialIcon>
              </div>
           </div>
           
           {/* <div className="mt-20 lg:mt-0 hidden lg:block">
              <span className="text-xs font-mono text-white/40 hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
           </div> */}
        </div>

        {/* Middle Column */}
        <div className="p-8 lg:p-16 border-r border-white/5 flex flex-col justify-between">
            <div>
                 <div className="h-[20px] mb-12 hidden lg:block"></div> {/* Spacer to align with Quick Links header if needed */}
                 <ul className="space-y-4">
                    {['Enterprise', 'Blog', 'Pricing', 'Careers'].map((item) => (
                        <li key={item}><a href="#" className="text-base text-gray-400 hover:text-white transition-colors font-medium tracking-wide">{item}</a></li>
                    ))}
                </ul>
            </div>

            {/* Bottom Glow Effect (Centered relative to the whole footer visually, but technically in layout) */}
            {/* The orb seems to be centered at the bottom of the screen. I will place it absolutely in the container. */}
        </div>
        
        {/* Right Column (CTA) */}
        <div className="p-8 lg:p-16 flex flex-col">
            <h2 className="text-4xl lg:text-5xl font-normal tracking-tight leading-[1.1] mb-8">
                Get your visibility<br />snapshot.
            </h2>
            <p className="text-white/70 text-lg mb-12 max-w-sm leading-relaxed font-light">
                See how your brand shows up in AI, then get actionable insights to improve.
            </p>
            
            <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-[#FF4F18] text-white rounded-xl font-medium text-base hover:bg-[#ff6a3d] transition-colors shadow-lg shadow-orange-900/20">
                    Get a demo
                </button>
                <button className="px-6 py-3 bg-white text-black rounded-xl font-medium text-base hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
                    Explore our product further
                </button>
            </div>
            
             <div className="mt-auto pt-20 lg:hidden">
                 <div className="flex justify-between text-xs font-mono text-white/40">
                     <span>Privacy Policy</span>
                     <span>Terms & Conditions</span>
                 </div>
                 <div className="mt-4 text-xs font-mono text-white/40 text-center">
                    © 2025 CoughLens. All Rights Reserved.
                 </div>
             </div>
        </div>
      </div>

       {/* Bottom Legal & Copyright - Desktop absolute positioning for "Meridian" style layout */}
       <div className="absolute bottom-6 left-8 hidden lg:block z-20">
           <a href="#" className="text-xs font-mono text-white/40 hover:text-white uppercase tracking-wider">Privacy Policy</a>
       </div>
       
       <div className="absolute bottom-6 w-full text-center hidden lg:block z-20 pointer-events-none">
           <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">© 2025 CoughLens. All Rights Reserved.</span>
       </div>

       <div className="absolute bottom-6 right-8 hidden lg:block z-20">
            <a href="#" className="text-xs font-mono text-white/40 hover:text-white uppercase tracking-wider">Terms & Conditions</a>
       </div>

      {/* Moving Dotted Lines Animation */}
      <div className="absolute bottom-[100px] left-0 w-full overflow-hidden z-0 opacity-30">
        <div className="flex w-[200%] animate-marquee">
             <div className="w-full border-t border-dashed border-white/40"></div>
             <div className="w-full border-t border-dashed border-white/40"></div>
        </div>
      </div>

      {/* The Glowing Orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] pointer-events-none z-0">
          {/* Main Gradient Sphere */}
          <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-full h-[400px] rounded-[100%] bg-gradient-to-t from-[#FF4F18] via-[#FF4F18]/40 to-transparent blur-[80px] opacity-40"></div>
      </div>
    </footer>
  );
};
