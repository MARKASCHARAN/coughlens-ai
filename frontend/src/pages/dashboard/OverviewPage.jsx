import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Activity, 
    Users, 
    FileText, 
    AlertTriangle, 
    UserPlus, 
    TrendingUp, 
    Microscope, 
    BarChart3,
    Clock,
    Shield,
    Database,
    Zap,
    Play,
    ChevronRight,
    Search,
    Bell
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useUser } from "../../context/UserContext";
import { reportsService } from "../../services/reports";
import { analyticsService } from "../../services/analytics";

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 20 }
    }
};

const hoverScale = { scale: 1.02, transition: { duration: 0.2 } };
const tapScale = { scale: 0.98 };

export default function OverviewPage() {
    const { user } = useUser();
    const role = user?.role || "INDIVIDUAL"; 
    
    // State for dashboard data
    const [stats, setStats] = useState(null);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                if (role === "CLINICIAN" || role === "ASHA_WORKER") {
                    const data = await analyticsService.getDashboard();
                    setStats(data);
                } else if (role === "INDIVIDUAL") {
                    const data = await analyticsService.getMyAnalytics();
                    setStats(data);
                    setReports(data.reports || []);
                }
            } catch (error) {
                console.error("Dashboard data load failed", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [role, user]);

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 md:space-y-10 pb-20 md:pb-0"
        >
            {/* Header Section */}
            <motion.header variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200/50">
                <div>
                     <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                        Dashboard
                        <span className="text-blue-600 bg-blue-100/50 px-2 rounded-lg ml-1 text-3xl md:text-4xl align-middle">.</span>
                     </h1>
                     <p className="text-slate-500 font-medium mt-3 text-lg">
                        Overview & Real-time Analytics
                     </p>
                </div>
                <div className="flex items-center gap-4">
                     <span className="hidden md:inline-flex px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-extrabold shadow-sm uppercase tracking-widest">
                        {role.replace("_", " ")} VIEW
                     </span>
                     <div className="text-right hidden md:block">
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TODAY</div>
                         <div className="text-sm font-bold text-slate-900">
                            {new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
                         </div>
                     </div>
                     <button className="md:hidden p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-blue-600">
                        <Bell className="w-5 h-5" />
                     </button>
                </div>
            </motion.header>

            {role === "INDIVIDUAL" && <IndividualDashboard reports={reports} user={user} stats={stats} />}
            {role === "ASHA_WORKER" && <AshaDashboard stats={stats} />}
            {role === "CLINICIAN" && <ClinicianDashboard stats={stats} />}

        </motion.div>
    )
}

// ----------------------------------------------------------------------
// 👤 INDIVIDUAL USER DASHBOARD (MILLION DOLLAR UI)
// ----------------------------------------------------------------------
function IndividualDashboard({ reports = [], user, stats }) {
    const lastReport = reports && reports.length > 0 ? reports[0] : null;
    const isLastHealthy = lastReport?.prediction?.toLowerCase() === "healthy";

    return (
        <div className="space-y-8 md:space-y-12">
            
            {/* Hero Welcome Card */}
            <motion.div 
                variants={itemVariants}
                whileHover={hoverScale}
                className="relative overflow-hidden rounded-[2.5rem] bg-[#0F172A] p-8 md:p-14 text-white shadow-2xl shadow-blue-900/30 group"
            >
                {/* Dynamic Background Animation */}
                <div className="absolute top-0 right-0 p-12 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                     <Activity className="w-64 h-64 text-blue-400" />
                </div>
                <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000" />
                
                <div className="relative z-10 max-w-3xl">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-3 mb-6"
                    >
                         <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                            Welcome Back
                         </span>
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
                        Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-100 to-white">{user?.profile?.name || user?.email?.split('@')[0] || "User"}</span>
                    </h2>
                    <p className="text-blue-200/80 text-lg md:text-xl font-medium mb-10 leading-relaxed max-w-xl">
                        Your respiratory health is being monitored. Tap below to start a verified AI cough assessment.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/test/cough" className="px-8 py-5 rounded-2xl bg-white text-[#0F172A] font-bold shadow-xl shadow-white/5 hover:bg-blue-50 transition-all text-sm uppercase tracking-wide flex items-center justify-center gap-3 active:scale-95 transform">
                             <div className="p-1 rounded-full bg-orange-500 text-white">
                                <Zap className="w-4 h-4 fill-current" />
                             </div>
                             Start Diagnostic
                        </Link>
                         <button className="px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all text-sm uppercase tracking-wide backdrop-blur-md flex items-center justify-center gap-3 active:scale-95 transform">
                             <Play className="w-5 h-5 fill-current" />
                             Watch Tutorial
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Premium Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
                 {/* Total Tests Card */}
                 <motion.div 
                    whileHover={hoverScale}
                    className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group"
                 >
                     <div className="relative z-10">
                         <div className="flex justify-between items-start mb-6">
                             <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                 <Activity className="w-7 h-7" />
                             </div>
                             <span className="px-3 py-1 rounded-lg bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border border-slate-100">
                                Lifetime
                             </span>
                         </div>
                         <div className="text-5xl font-black text-slate-900 mb-2 tracking-tight">{stats?.total_tests || 0}</div>
                         <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">Total Assessments</h3>
                     </div>
                     <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-tl from-blue-50 to-transparent rounded-tl-full opacity-50" />
                 </motion.div>

                  {/* Last Assessment Card */}
                 <motion.div 
                    whileHover={hoverScale}
                    className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group"
                 >
                     <div className="flex justify-between items-start mb-6">
                         <div className={cn("p-4 rounded-2xl transition-all duration-300", 
                            lastReport 
                                ? (isLastHealthy ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white" : "bg-red-50 text-red-600 group-hover:bg-red-500 group-hover:text-white")
                                : "bg-slate-50 text-slate-600"
                         )}>
                             <Microscope className="w-7 h-7" />
                         </div>
                         {lastReport && (
                            <span className={cn("px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                                isLastHealthy ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                            )}>
                                {new Date(lastReport.created_at || Date.now()).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                            </span>
                         )}
                     </div>
                     <div className={cn("text-4xl font-black mb-2 tracking-tight truncate", 
                        lastReport 
                            ? (isLastHealthy ? "text-emerald-900" : "text-red-900")
                            : "text-slate-900" 
                     )}>
                        {lastReport?.prediction || "No Data"}
                     </div>
                     <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">Last Result</h3>
                 </motion.div>

                  {/* Secure Storage Card */}
                 <motion.div 
                    whileHover={hoverScale}
                    className="bg-gradient-to-br from-[#6366F1] to-[#4F46E5] p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-500/30 text-white relative overflow-hidden group"
                 >
                     <div className="absolute -right-8 -bottom-8 opacity-20 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                         <Shield className="w-48 h-48" />
                     </div>
                     <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="flex justify-between items-start">
                            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/10">
                                <Database className="w-7 h-7 text-white" />
                            </div>
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                        </div>
                        <div className="mt-8">
                            <div className="text-4xl font-black mb-2 tracking-tight">Secure</div>
                            <h3 className="text-indigo-200 font-bold text-sm uppercase tracking-wider">End-to-End Encrypted</h3>
                        </div>
                     </div>
                 </motion.div>
            </motion.div>

            {/* Recent History Section */}
            <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Diagnostic History</h3>
                    <Link to="/dashboard/reports" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                        View All <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {reports.length > 0 ? reports.slice(0, 3).map((rpt, i) => {
                        const isRptHealthy = rpt.prediction?.toLowerCase() === "healthy";
                        return (
                            <motion.div 
                                variants={itemVariants}
                                whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 1)" }}
                                whileTap={tapScale}
                                key={rpt._id || i} 
                                className="group relative bg-white p-5 md:p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className={cn("w-16 h-16 rounded-[1.2rem] flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 duration-300", 
                                            isRptHealthy ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                                        )}>
                                            {isRptHealthy ? <Activity className="w-8 h-8" /> : <Microscope className="w-8 h-8" />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className={cn("text-xl md:text-2xl font-black tracking-tight",
                                                     isRptHealthy ? "text-slate-900" : "text-red-600"
                                                )}>
                                                    {rpt.prediction}
                                                </h4>
                                                {rpt.confidence > 0.8 && (
                                                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider border border-slate-200">
                                                        {(rpt.confidence * 100).toFixed(0)}% Conf.
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(rpt.created_at || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                                                    <Shield className="w-3 h-3" /> Verified
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-3 pl-[5.5rem] md:pl-0">
                                         <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (confirm("Share this report via WhatsApp?")) {
                                                    reportsService.shareReportWhatsApp(rpt._id || rpt.id, user.phone || "919000000000");
                                                }
                                            }}
                                            className="w-12 h-12 rounded-2xl bg-slate-50 hover:bg-green-50 text-slate-400 hover:text-green-600 border border-slate-200 hover:border-green-200 flex items-center justify-center transition-all"
                                        >
                                            <Zap className="w-5 h-5 fill-current" />
                                        </button>
                                        <Link 
                                            to={`/reports/${rpt._id || rpt.id}`}
                                            className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm shadow-lg shadow-slate-900/10 hover:bg-blue-600 hover:shadow-blue-600/30 transition-all flex items-center gap-2"
                                        >
                                            View Report <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    }) : (
                        <div className="text-center py-20 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200/60">
                             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                 <FileText className="w-8 h-8 text-slate-300" />
                             </div>
                             <h3 className="text-slate-900 font-bold text-xl mb-2">No reports yet</h3>
                             <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">Your diagnostics history will appear here once you take your first test.</p>
                             <Link to="/test/cough" className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg hover:bg-blue-700 transition-all">
                                Start First Test
                             </Link>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

// ----------------------------------------------------------------------
// 🧑‍⚕️ ASHA WORKER DASHBOARD
// ----------------------------------------------------------------------
function AshaDashboard({ stats }) {
    return (
        <motion.div 
            variants={containerVariants}
            className="space-y-8"
        >
             {/* Hero Section */}
            <motion.div 
                variants={itemVariants}
                className="relative overflow-hidden rounded-[2.5rem] bg-emerald-900 p-10 text-white shadow-2xl shadow-emerald-900/20"
            >
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                     <Users className="w-64 h-64 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20" />
                
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                        Community Health
                    </h2>
                    <p className="text-emerald-100 text-lg md:text-xl font-medium mb-10 leading-relaxed opacity-90 max-w-lg">
                        Manage your patients and conduct screenings effectively.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                        <Link to="/dashboard/patients" className="px-8 py-4 rounded-2xl bg-white text-emerald-900 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm uppercase tracking-wide flex items-center gap-2">
                             <UserPlus className="w-4 h-4 text-emerald-600" />
                             Create Patient
                        </Link>
                         <Link to="/test/cough" className="px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all text-sm uppercase tracking-wide backdrop-blur-md flex items-center gap-2">
                             <Microscope className="w-4 h-4" />
                             Record Cough
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Survey Analytics */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white group">
                     <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit mb-6">
                         <Users className="w-8 h-8" />
                     </div>
                     <h3 className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Total Patients</h3>
                     <div className="text-4xl font-black text-slate-900">{stats?.total_patients || 0}</div>
                 </motion.div>

                 <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white group">
                     <div className="p-3 bg-red-50 text-red-600 rounded-2xl w-fit mb-6">
                         <AlertTriangle className="w-8 h-8" />
                     </div>
                     <h3 className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">High Risk Cases</h3>
                     <div className="text-4xl font-black text-slate-900">{stats?.active_cases || 0}</div>
                 </motion.div>

                  <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white group">
                     <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit mb-6">
                         <Activity className="w-8 h-8" />
                     </div>
                     <h3 className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Tests Today</h3>
                     <div className="text-4xl font-black text-slate-900">{stats?.tests_today || 0}</div>
                 </motion.div>
            </div>
        </motion.div>
    )
}

// ----------------------------------------------------------------------
// 🏥 CLINICIAN DASHBOARD
// ----------------------------------------------------------------------
function ClinicianDashboard({ stats }) {
    return (
         <motion.div 
            variants={containerVariants}
            className="space-y-8"
        >
             {/* Hero Section */}
            <motion.div 
                variants={itemVariants}
                className="relative overflow-hidden rounded-[2.5rem] bg-indigo-900 p-10 text-white shadow-2xl shadow-indigo-900/20"
            >
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                     <BarChart3 className="w-64 h-64 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-blue-600/20" />
                
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                        Clinical Overview
                    </h2>
                    <p className="text-indigo-100 text-lg md:text-xl font-medium mb-10 leading-relaxed opacity-90 max-w-lg">
                        Monitor global health trends and high-risk patient cohorts.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                        <Link to="/dashboard/analytics" className="px-8 py-4 rounded-2xl bg-white text-indigo-900 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm uppercase tracking-wide flex items-center gap-2">
                             <BarChart3 className="w-4 h-4 text-indigo-600" />
                             View Analytics
                        </Link>
                         <Link to="/dashboard/patients" className="px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all text-sm uppercase tracking-wide backdrop-blur-md flex items-center gap-2">
                             <Users className="w-4 h-4" />
                             Patients
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white group">
                     <h3 className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-3">Total Screenings</h3>
                     <div className="text-4xl font-black text-slate-900 mb-1">{stats?.total_assessments || 0}</div>
                     <span className="text-green-500 text-xs font-bold">Total Assessments</span>
                 </motion.div>

                 <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white group">
                     <h3 className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-3">Respiratory Issues</h3>
                     <div className="text-4xl font-black text-slate-900 mb-1">{stats?.positive_cases || 0}</div>
                     <span className="text-red-500 text-xs font-bold">Positive Cases</span>
                 </motion.div>

                  <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white group">
                     <h3 className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-3">Avg Confidence</h3>
                     <div className="text-4xl font-black text-slate-900 mb-1">{stats?.avg_confidence || 0}%</div>
                     <span className="text-slate-400 text-xs font-bold">Model Accuracy</span>
                 </motion.div>

                  <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white group">
                     <h3 className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-3">Active Regions</h3>
                     <div className="text-4xl font-black text-slate-900 mb-1">{stats?.regions || 0}</div>
                     <span className="text-blue-500 text-xs font-bold">Zones Monitored</span>
                 </motion.div>
            </div>
        </motion.div>
    )
}
