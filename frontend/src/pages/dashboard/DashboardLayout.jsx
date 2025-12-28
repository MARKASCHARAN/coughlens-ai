import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Activity, FileText, Settings, User, LogOut, ChartNoAxesCombined, BookOpen, Menu, X, ChevronRight, Zap, ChevronLeft, LayoutGrid, Users, Mail, HelpCircle, Mic, Brain } from "lucide-react";
import { cn } from "../../lib/utils";
import { MicButton } from "../../components/voice/MicButton";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout() {
  const location = useLocation();
  const { user, logout } = useUser();
  const role = user?.role || "INDIVIDUAL";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 🛡️ ROLE-BASED SIDEBAR CONFIGURATION
  const getNavItems = (currentRole) => {
      // 👩‍⚕️ ASHA WORKER
      if (currentRole === "ASHA_WORKER") {
          return [
            { to: "/dashboard", icon: <Home className="w-5 h-5" />, label: "Home" },
            { to: "/dashboard/patients", icon: <Users className="w-5 h-5" />, label: "Patients" },
            { to: "/test/cough", icon: <Mic className="w-5 h-5" />, label: "Cough Test" },
            { to: "/dashboard/reports", icon: <FileText className="w-5 h-5" />, label: "Reports" },
            { to: "/dashboard/learn", icon: <Brain className="w-5 h-5" />, label: "Awareness" },
            { to: "/dashboard/settings", icon: <Settings className="w-5 h-5" />, label: "Settings" },
          ];
      }
      // 🧑‍⚕️ CLINICIAN / DOCTOR
      if (currentRole === "CLINICIAN") {
          return [
            { to: "/dashboard", icon: <LayoutGrid className="w-5 h-5" />, label: "Dashboard" },
            { to: "/dashboard/analytics", icon: <ChartNoAxesCombined className="w-5 h-5" />, label: "Analytics" },
            { to: "/dashboard/patients", icon: <Users className="w-5 h-5" />, label: "Patients" },
            { to: "/dashboard/reports", icon: <FileText className="w-5 h-5" />, label: "Reports" },
            { to: "/dashboard/learn", icon: <BookOpen className="w-5 h-5" />, label: "Health Hub" }, // Assuming "Awareness" mapped to Health Hub
            { to: "/dashboard/settings", icon: <Settings className="w-5 h-5" />, label: "Settings" },
          ];
      }
      // 👤 INDIVIDUAL (Default)
      return [
        { to: "/dashboard", icon: <Home className="w-5 h-5" />, label: "Home" },
        { to: "/test/cough", icon: <Activity className="w-5 h-5" />, label: "Cough Test" },
        { to: "/dashboard/reports", icon: <FileText className="w-5 h-5" />, label: "Reports" },
        { to: "/dashboard/learn", icon: <BookOpen className="w-5 h-5" />, label: "Health Hub" },
        { to: "/dashboard/settings", icon: <Settings className="w-5 h-5" />, label: "Settings" },
      ];
  };

  const navItems = getNavItems(role);
  
  return (
    <div className="min-h-screen flex bg-[#DCE8F5] font-[Outfit,sans-serif] selection:bg-blue-100 selection:text-blue-900 overflow-hidden text-slate-800 transition-all duration-300">
      
      {/* 🏙️ Sidebar - Enhanced Design Hub Style */}
      <motion.aside 
        animate={{ width: isCollapsed ? 100 : 320 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col fixed h-[96vh] top-[2vh] left-4 z-50 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/50 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 overflow-hidden border border-white/60 backdrop-blur-xl"
      >
        
        {/* 1. Header & Logo (Centered, No text, Mid-size) */}
        <div className="p-8 pb-2 flex flex-col items-center justify-center transition-all duration-300 relative">
             {/* Subtle animated glow behind logo */}
             <div className="absolute inset-0 bg-blue-400/5 rounded-full blur-3xl" />
             <motion.img 
                layout
                src="/ChatGPT Image Dec 19, 2025, 03_38_34 PM.png" 
                alt="Logo" 
                className={cn("object-contain transition-all duration-300 relative z-10 drop-shadow-sm", isCollapsed ? "h-16 w-16" : "h-32 w-auto")}
             />
        </div>

        {/* 2. Top Profile Section */}
        {!isCollapsed ? (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-6 p-5 bg-white/70 backdrop-blur-md border border-white/60 rounded-[2rem] flex flex-col items-center text-center mb-4 shadow-[0_4px_20px_-5px_rgba(59,130,246,0.1)]"
            >
                <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-blue-100 to-white shadow-sm mb-3 relative group cursor-pointer">
                     <img 
                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.phone || "User"}`} 
                        alt="User" 
                        className="w-full h-full object-cover rounded-full bg-slate-100 transform group-hover:scale-105 transition-transform duration-300"
                     />
                     <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
                </div>
                <h3 className="font-bold text-base text-slate-900 tracking-tight">{user?.phone || "User"}</h3>
                <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest bg-blue-100/50 px-3 py-1 rounded-full mt-2 border border-blue-100">
                    {role.replace("_", " ")}
                </p>
            </motion.div>
        ) : (
            <motion.div className="mb-6 flex justify-center">
                 <div className="w-12 h-12 rounded-full bg-white shadow-md p-1 relative">
                     <img 
                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.phone || "User"}`} 
                        alt="User" 
                        className="w-full h-full object-cover rounded-full"
                     />
                </div>
            </motion.div>
        )}
        
        {/* 3. Navigation Area */}
        <div className="flex-1 px-6 space-y-2 overflow-y-auto no-scrollbar pb-6">
            {navItems.map((item) => (
                <DesignHubLink 
                    key={item.to}
                    to={item.to} 
                    icon={item.icon} 
                    label={item.label} 
                    collapsed={isCollapsed}
                    active={location.pathname === item.to || (item.to !== "/dashboard" && location.pathname.startsWith(item.to))} 
                />
            ))}

            {/* Spacers & Utility Links */}
            <div className="h-6" />

            <button 
                onClick={logout}
                className={cn(
                    "w-full flex items-center gap-4 px-5 py-4 mt-2 rounded-2xl transition-all duration-300 text-slate-400 hover:text-red-500 hover:bg-red-50/50 font-medium group",
                    isCollapsed && "justify-center px-0"
                )}
            >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="whitespace-nowrap transition-transform group-hover:translate-x-1">Logout</span>}
            </button>
        </div>

        {/* Collapse Toggle */}
        <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-12 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.08)] rounded-full flex items-center justify-center text-slate-300 hover:text-blue-500 transition-all z-50 md:flex hidden hover:scale-110 active:scale-95 border border-slate-50"
        >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

      </motion.aside>

      {/* Mobile Header - Compact & Centered */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-blue-100/50 h-16 flex items-center px-4 shadow-sm">
          {/* Centered Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
             <img src="/ChatGPT Image Dec 19, 2025, 03_38_34 PM.png" alt="CoughLens" className="h-12 w-auto object-contain drop-shadow-sm" /> 
          </div>
          
          {/* Menu Button (Right Aligned) */}
          <button onClick={() => setIsMobileMenuOpen(true)} className="ml-auto p-2 rounded-xl bg-blue-50 text-blue-600 shadow-sm active:scale-95 transition-transform border border-blue-100">
              <Menu className="w-5 h-5" />
          </button>
      </div>

     {/* Mobile Menu - Enhanced Compact Design */}
     <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <motion.div 
                    initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="absolute right-0 top-0 h-full w-[280px] bg-white p-5 shadow-2xl overflow-y-auto border-l border-slate-100 flex flex-col"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-8 px-2">
                         <span className="font-bold text-lg text-slate-900">Menu</span>
                         <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 active:scale-95 transition-all">
                             <X className="w-5 h-5" />
                         </button>
                    </div>

                    {/* Compact Profile */}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
                         <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow-sm shrink-0">
                             <img 
                                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.phone || "User"}`} 
                                alt="User" 
                                className="w-full h-full object-cover rounded-full"
                             />
                         </div>
                         <div className="min-w-0">
                             <p className="font-bold text-sm text-slate-900 truncate">{user?.phone || "User"}</p>
                             <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{role.replace("_", " ")}</p>
                         </div>
                    </div>

                    <nav className="space-y-1 flex-1">
                        {/* Main Nav Items */}
                        {navItems.map((item, index) => (
                             <MobileAnimLink key={item.to} index={index} to={item.to} icon={item.icon} label={item.label} location={location} close={() => setIsMobileMenuOpen(false)} />
                        ))}
                    </nav>

                    <div className="mt-6 pt-6 border-t border-slate-100">
                         <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 font-bold hover:bg-red-50 transition-colors text-sm">
                             <LogOut className="w-4 h-4" />
                             Logout
                         </button>
                    </div>

                </motion.div>
            </motion.div>
        )}
     </AnimatePresence>

      {/* Main Content Area */}
      <main className={cn(
          "flex-1 p-4 md:p-8 min-h-screen relative overflow-x-hidden transition-all duration-300",
          isCollapsed ? "md:ml-[120px]" : "md:ml-[350px]"
      )}>
        <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out pt-20 md:pt-4 pb-24">
             <Outlet />
        </div>
      </main>

      {/* Voice Button */}
       <div className="fixed bottom-8 right-8 z-50">
            <div className="relative group">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-[20px] opacity-20 group-hover:opacity-60 animate-pulse transition-opacity" />
                <MicButton className="relative shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-4 border-white" />
            </div>
       </div>

    </div>
  );
}

// 📱 Helper for Mobile Animations
function MobileAnimLink({ index, to, icon, label, location, close }) {
    const active = location.pathname === to || (to !== "/dashboard" && location.pathname.startsWith(to));
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + index * 0.03 }}
        >
            <Link 
            to={to} 
            onClick={close}
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all",
                active
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
            >
                {icon}
                {label}
            </Link>
        </motion.div>
    )
}

// 🎨 Design Hub Desktop Link Style
function DesignHubLink({ to, icon, label, active, collapsed }) {
    return (
        <Link to={to} className="relative group block mb-1">
            <div className={cn(
                "relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 overflow-hidden",
                active 
                    ? "bg-white text-blue-700 font-bold shadow-[0_2px_12px_rgba(59,130,246,0.08)] border border-blue-100" 
                    : "text-slate-500 hover:text-blue-600 hover:bg-white/80 font-medium",
                collapsed && "justify-center px-0 py-4"
            )}>
                 {/* Active Blue Strip Indicator (Subtle Gradient) */}
                 {active && (
                    <motion.div 
                        layoutId="activeStrip"
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 h-8 w-1.5 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-full"
                    />
                 )}
                 
                <span className={cn("relative z-10 transition-colors duration-200 flex-shrink-0")}>
                    {icon}
                </span>

                {!collapsed && (
                    <span className="whitespace-nowrap overflow-hidden text-[15px] tracking-wide">
                        {label}
                    </span>
                )}
            </div>
        </Link>
    )
}
