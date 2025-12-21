import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Activity, FileText, Settings, User, LogOut, ChartNoAxesCombined, BookOpen, Mic } from "lucide-react";
import { cn } from "../../lib/utils";
import { Logo } from "../../components/ui/Logo";

export default function DashboardLayout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200 p-6 fixed h-full z-20">
        <div className="mb-10 pl-2">
            <Logo />
        </div>
        
        <nav className="space-y-1 flex-1 overflow-y-auto">
          <NavLink to="/dashboard" icon={<Home className="w-5 h-5" />} label="Overview" active={location.pathname === "/dashboard"} />
          <NavLink to="/dashboard/patients" icon={<User className="w-5 h-5" />} label="Patients" active={location.pathname.startsWith("/dashboard/patients")} />
          <NavLink to="/dashboard/reports" icon={<FileText className="w-5 h-5" />} label="Reports" active={location.pathname.startsWith("/dashboard/reports")} />
          <NavLink to="/dashboard/analytics" icon={<ChartNoAxesCombined className="w-5 h-5" />} label="Analytics" active={location.pathname.startsWith("/dashboard/analytics")} />
          <NavLink to="/dashboard/learn" icon={<BookOpen className="w-5 h-5" />} label="Learn" active={location.pathname.startsWith("/dashboard/learn")} />
          <div className="my-4 h-px bg-slate-100 mx-2" />
          <Link to="/test/cough" className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-900/10 hover:scale-[1.02] transition-transform">
             <Activity className="w-5 h-5" />
             <span className="font-semibold">New Test</span>
          </Link>
        </nav>
        
        <div className="pt-4 border-t border-slate-100 space-y-1">
            <NavLink to="/dashboard/settings" icon={<Settings className="w-5 h-5" />} label="Settings" active={location.pathname === "/dashboard/settings"} />
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-red-600 transition-colors text-sm font-medium">
                <LogOut className="w-5 h-5" />
                <span>Log Out</span>
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-8 overflow-auto min-h-screen">
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
             <Outlet />
        </div>
      </main>

        {/* Floating Voice Button */}
        <Link to="/dashboard/voice" className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-50">
            <Mic className="w-6 h-6" />
        </Link>
    </div>
  );
}

function NavLink({ to, icon, label, active }) {
    return (
        <Link to={to} className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm",
            active 
                ? "bg-blue-50 text-blue-700 shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
        )}>
            {icon}
            <span>{label}</span>
        </Link>
    )
}
