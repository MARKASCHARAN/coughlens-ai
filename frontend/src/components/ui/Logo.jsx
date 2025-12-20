import { cn } from "../../lib/utils";

export function Logo({ className, iconOnly = false, theme = "light" }) {
  const isDark = theme === "dark";
  
  return (
    <div className={cn("flex items-center gap-2.5 font-bold font-display", isDark ? "text-white" : "text-slate-900", className)}>
      <div className="relative flex items-center justify-center w-8 h-8">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
           <defs>
             <linearGradient id="logo-main" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#FF4F18" /> {/* Orange Main */}
               <stop offset="100%" stopColor="#FF8F50" /> {/* Ligher Orange */}
             </linearGradient>
           </defs>
           
           {/* Abstract 'C' / Lens Aperture Shape */}
           <path 
             fill="url(#logo-main)" 
             d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16H22C22 19.3137 19.3137 22 16 22C12.6863 22 10 19.3137 10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16H30C30 8.268 23.732 2 16 2Z"
           />
           {/* Accent Dot */}
           <circle cx="26" cy="16" r="2.5" className={cn(isDark ? "fill-white" : "fill-blue-500")} />
        </svg>
      </div>
      
      {!iconOnly && (
        <span className="text-xl tracking-tight">
          Cough<span className={cn(isDark ? "text-[#FF4F18]" : "text-blue-600")}>Lens</span>
        </span>
      )}
    </div>
  );
}
