import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Logo } from "../../components/landing/Shared";

export default function AuthLayout() {
  const location = useLocation();
  const isLogin = location.pathname.includes("login");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden font-sans selection:bg-orange-500/30">
      
      {/* --- Rich Animated Background --- */}
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,79,24,0.15),transparent_70%)]" />
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      {/* --- Glass Container --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[480px] mx-4"
      >
        <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50">
           
           {/* Decorative Top Glow */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent blur-sm" />

           <div className="p-8 md:p-10">
               {/* Center Logo */}
               <div className="flex justify-center mb-8">
                   <Logo theme="light" />
               </div>

               <Outlet />
           </div>

           {/* Footer Area inside card */}
           <div className="px-8 py-4 bg-black/20 border-t border-white/5 text-center">
              <p className="text-xs text-gray-500">
                Protected by CoughLens Secure • HIPAA Compliant
              </p>
           </div>
        </div>

        {/* Bottom Nav Links */}
        <div className="mt-8 text-center space-x-6 text-sm text-gray-500">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms</Link>
            <Link to="#" className="hover:text-white transition-colors">Help</Link>
        </div>

      </motion.div>
    </div>
  );
}
