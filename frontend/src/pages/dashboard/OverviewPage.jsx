import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    Play
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useUser } from "../../context/UserContext";
// import { reportsService } from "../../services/reports";
import { analyticsService } from "../../services/analytics";

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
                if (role === "CLINICIAN") {
                    const data = await analyticsService.getDashboard();
                    setStats(data);
                } else if (role === "INDIVIDUAL") {
                    // Mock data for demo
                    setReports([
                         { id: 1, date: "2024-12-20", prediction: "Healthy", confidence: 0.98, ipfs_cid: "QmX...", audio_url: "#" },
                         { id: 2, date: "2024-12-05", prediction: "Potential Asthma", confidence: 0.72, ipfs_cid: "QmY...", audio_url: "#" }
                    ]);
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
        <div className="space-y-8">
            <header className="flex justify-between items-end pb-4 border-b border-slate-200/50">
                <div>
                     <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        Dashboard
                        <span className="text-blue-600">.</span>
                     </h1>
                     <p className="text-slate-500 font-medium mt-2">
                        Overview & Real-time Analytics
                     </p>
                </div>
                <div className="hidden md:flex items-center gap-3">
                     <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold shadow-sm uppercase tracking-wider">
                        {role.replace("_", " ")} VIEW
                     </span>
                     <div className="text-right">
                         <div className="text-xs font-bold text-slate-400">CURRENT DATE</div>
                         <div className="text-sm font-bold text-slate-900">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
                         </div>
                     </div>
                </div>
            </header>

            {role === "INDIVIDUAL" && <IndividualDashboard reports={reports} user={user} />}
            {role === "ASHA_WORKER" && <AshaDashboard />}
            {role === "CLINICIAN" && <ClinicianDashboard stats={stats} />}

        </div>
    )
}

// ----------------------------------------------------------------------
// 👤 INDIVIDUAL USER DASHBOARD (FUTURISTIC)
// ----------------------------------------------------------------------
function IndividualDashboard({ reports, user }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            {/* Hero Welcome */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 md:p-12 text-white shadow-2xl shadow-blue-900/20">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                     <Activity className="w-64 h-64 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
                
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Hello, {user?.phone || "User"}
                    </h2>
                    <p className="text-blue-100 text-lg md:text-xl font-medium mb-8 leading-relaxed opacity-90">
                        Your respiratory health is stable. Tap the microphone to start a new assessment or ask about your history.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                        <Link to="/test/cough" className="px-8 py-4 rounded-2xl bg-white text-blue-900 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm uppercase tracking-wide flex items-center gap-2">
                             <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
                             Start Diagnostic
                        </Link>
                         <button className="px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all text-sm uppercase tracking-wide backdrop-blur-md">
                             Voice Assistant
                        </button>
                    </div>
                </div>
            </div>

            {/* Futuristic Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Health Score Ring */}
                 <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white flex items-center justify-between relative overflow-hidden group">
                     <div>
                         <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider mb-1">Health Score</h3>
                         <div className="text-4xl font-extrabold text-slate-900">92<span className="text-lg text-slate-400">/100</span></div>
                         <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-bold">
                             <TrendingUp className="w-3 h-3" /> Still Improving
                         </div>
                     </div>
                     <div className="relative w-24 h-24 flex items-center justify-center">
                         <svg className="w-full h-full transform -rotate-90">
                             <circle cx="48" cy="48" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                             <circle cx="48" cy="48" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="226" strokeDashoffset="40" className="text-green-500" />
                         </svg>
                         <Activity className="w-8 h-8 text-green-500 absolute" />
                     </div>
                 </motion.div>

                  {/* Last Assessment */}
                 <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white group">
                     <div className="flex justify-between items-start mb-4">
                         <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                             <Microscope className="w-6 h-6" />
                         </div>
                         <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">3 DAYS AGO</span>
                     </div>
                     <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider mb-1">Last Result</h3>
                     <div className="text-2xl font-bold text-slate-900">Healthy Lungs</div>
                     <p className="text-slate-400 text-sm mt-1">No anomalies detected in MFCC.</p>
                 </motion.div>

                  {/* Secure Storage */}
                 <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-[2rem] shadow-xl shadow-indigo-500/20 text-white relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none transform translate-x-4 -translate-y-4">
                         <Database className="w-32 h-32" />
                     </div>
                     <div className="relative z-10">
                        <div className="flex justify-between items-center mb-6">
                            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <span className="px-3 py-1 rounded-full bg-green-400/20 text-green-300 border border-green-400/30 text-xs font-bold flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                SECURE
                            </span>
                        </div>
                        <h3 className="font-bold text-white/80 text-sm uppercase tracking-wider mb-1">Data Storage</h3>
                        <div className="text-2xl font-bold">IPFS Network</div>
                        <p className="text-white/70 text-sm mt-1">Decentralized & Immutable Records</p>
                     </div>
                 </motion.div>
            </div>

            {/* Recent History */}
            <DashboardPanel title="Recent Diagnostics History">
                <div className="space-y-4">
                    {reports.length > 0 ? reports.map((rpt, i) => (
                        <div key={rpt._id || i} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
                            <div className="flex items-center gap-5">
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner", 
                                    rpt.prediction === "Healthy" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                )}>
                                    <Activity className="w-7 h-7" />
                                </div>
                                <div>
                                    <h4 className="font-exhibit font-bold text-lg text-slate-900 flex items-center gap-3">
                                        {rpt.prediction}
                                        {rpt.confidence > 0.8 && rpt.prediction !== "Healthy" && (
                                            <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-[10px] font-extrabold uppercase tracking-wide">High Confidence</span>
                                        )}
                                    </h4>
                                    <div className="flex items-center gap-3 mt-1 text-xs font-bold text-slate-400 uppercase tracking-wide">
                                        <span>{rpt.date}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                                        <span className="flex items-center gap-1 text-indigo-500">
                                            <Database className="w-3 h-3" /> IPFS: {rpt.ipfs_cid.substring(0,6)}...
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mt-4 md:mt-0 pl-16 md:pl-0">
                                <button className="p-3 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm">
                                    <Play className="w-5 h-5 fill-current" />
                                </button>
                                <button className="px-5 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-lg shadow-slate-900/10 hover:bg-blue-600 hover:shadow-blue-600/20 transition-all">
                                    View Report
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-12 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                             <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                 <FileText className="w-6 h-6 text-slate-400" />
                             </div>
                             <h3 className="text-slate-900 font-bold mb-1">No reports analysis found</h3>
                             <p className="text-slate-500 text-sm">Your diagnostic history will appear here.</p>
                        </div>
                    )}
                </div>
            </DashboardPanel>
        </motion.div>
    )
}

// ----------------------------------------------------------------------
// 🧑‍⚕️ ASHA WORKER DASHBOARD (PLACEHOLDER FOR NOW)
// ----------------------------------------------------------------------
function AshaDashboard() {
    return (
        <div className="p-12 text-center text-slate-500">
            Asha Dashboard - Coming Soon
        </div>
    )
}

// ----------------------------------------------------------------------
// 🏥 CLINICIAN DASHBOARD (PLACEHOLDER FOR NOW)
// ----------------------------------------------------------------------
function ClinicianDashboard({ stats }) {
    return (
         <div className="p-12 text-center text-slate-500">
            Clinician Dashboard - Coming Soon
        </div>
    )
}

// ----------------------------------------------------------------------
// SHARED COMPONENTS
// ----------------------------------------------------------------------

function DashboardPanel({ title, children }) {
    return (
        <div className="glass-panel p-6 md:p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
            <h3 className="font-extrabold text-xl text-slate-900 mb-8 tracking-tight">{title}</h3>
            {children}
        </div>
    )
}
