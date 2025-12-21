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
    Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

// MOCK ROLE FOR DEVELOPMENT
// OPTIONS: "INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"
const USER_ROLE = "ASHA_WORKER"; 

export default function OverviewPage() {
    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 mt-1">
                        {USER_ROLE === "INDIVIDUAL" && "Welcome back, Priya"}
                        {USER_ROLE === "ASHA_WORKER" && "Welcome back, ASHA Worker Lakshmi"}
                        {USER_ROLE === "CLINICIAN" && "Welcome back, Dr. Salthi"}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                     <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                        {USER_ROLE.replace("_", " ")} VIEW
                     </span>
                </div>
            </header>

            {USER_ROLE === "INDIVIDUAL" && <IndividualDashboard />}
            {USER_ROLE === "ASHA_WORKER" && <AshaDashboard />}
            {USER_ROLE === "CLINICIAN" && <ClinicianDashboard />}

        </div>
    )
}

// ----------------------------------------------------------------------
// 👤 INDIVIDUAL USER DASHBOARD
// ----------------------------------------------------------------------
function IndividualDashboard() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    title="Last Test Result" 
                    value="Healthy" 
                    icon={<Activity className="w-5 h-5 text-green-600" />}
                    color="bg-green-50 text-green-700"
                />
                <StatCard 
                    title="Risk Status" 
                    value="Low Risk" 
                    icon={<Shield className="w-5 h-5 text-blue-600" />}
                    color="bg-blue-50 text-blue-700"
                />
                 <StatCard 
                    title="Next Check-up" 
                    value="15 Days" 
                    icon={<Clock className="w-5 h-5 text-purple-600" />}
                    color="bg-purple-50 text-purple-700"
                />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <DashboardPanel title="Recent Reports">
                     <div className="space-y-4">
                        {[1,2,3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">Cough Analysis Report</h4>
                                        <p className="text-xs text-slate-500">Dec {10 + i}, 2024</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                    Normal
                                </span>
                            </div>
                        ))}
                     </div>
                </DashboardPanel>
                 <DashboardPanel title="Quick Actions">
                    <div className="grid gap-4">
                        <Link to="/test/cough" className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Start New Test</h3>
                                    <p className="text-blue-100 text-sm">Check your cough health now</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </DashboardPanel>
            </div>
        </>
    )
}

// ----------------------------------------------------------------------
// 🧑‍⚕️ ASHA WORKER DASHBOARD
// ----------------------------------------------------------------------
function AshaDashboard() {
    return (
        <>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Patients" 
                    value="124" 
                    icon={<Users className="w-5 h-5 text-blue-600" />}
                    color="bg-blue-50 text-blue-700"
                />
                 <StatCard 
                    title="Tests Today" 
                    value="8" 
                    icon={<Activity className="w-5 h-5 text-indigo-600" />}
                    color="bg-indigo-50 text-indigo-700"
                />
                 <StatCard 
                    title="High Risk Alerts" 
                    value="3" 
                    icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
                    color="bg-red-50 text-red-700"
                />
                <motion.div 
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-[2rem] bg-slate-900 text-white shadow-xl cursor-pointer flex flex-col justify-center items-center gap-3 text-center"
                >
                    <UserPlus className="w-8 h-8 opacity-80" />
                    <span className="font-bold">Add New Patient</span>
                </motion.div>
            </div>

             <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <DashboardPanel title="Today's Schedule / Activity">
                        <div className="space-y-3">
                             {/* Mock List */}
                             {[1,2,3,4].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs">
                                            P{i}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">Patient #{100+i}</div>
                                            <div className="text-xs text-slate-500">Village Sector 4 • Checked 2h ago</div>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">View</span>
                                </div>
                             ))}
                        </div>
                    </DashboardPanel>
                </div>
                 <div className="lg:col-span-1">
                    <DashboardPanel title="High Risk Cases">
                        <div className="space-y-3">
                            <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="w-4 h-4 text-red-600" />
                                    <span className="text-sm font-bold text-red-700">Immediate Attention</span>
                                </div>
                                <p className="text-xs text-red-600 mb-2">Ramesh Kumar (65M) shows signs of severe respiratory distress.</p>
                                <button className="w-full py-1.5 bg-white border border-red-200 text-red-700 text-xs font-bold rounded-lg hover:bg-red-600 hover:text-white transition-colors">
                                    Contact Hospital
                                </button>
                            </div>
                        </div>
                    </DashboardPanel>
                </div>
             </div>
        </>
    )
}

// ----------------------------------------------------------------------
// 🏥 CLINICIAN DASHBOARD
// ----------------------------------------------------------------------
function ClinicianDashboard() {
     return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Tests" 
                    value="8,432" 
                    icon={<Microscope className="w-5 h-5 text-cyan-600" />}
                    color="bg-cyan-50 text-cyan-700"
                />
                 <StatCard 
                    title="Avg Risk Score" 
                    value="24%" 
                    icon={<BarChart3 className="w-5 h-5 text-indigo-600" />}
                    color="bg-indigo-50 text-indigo-700"
                />
                 <StatCard 
                    title="Active Patients" 
                    value="1,204" 
                    icon={<Users className="w-5 h-5 text-blue-600" />}
                    color="bg-blue-50 text-blue-700"
                />
                 <StatCard 
                    title="Growth" 
                    value="+12%" 
                    icon={<TrendingUp className="w-5 h-5 text-green-600" />}
                    color="bg-green-50 text-green-700"
                />
            </div>

            <div className="grid lg:grid-cols-2 gap-6 h-96">
                <DashboardPanel title="Regional Risk Heatmap">
                    <div className="flex items-center justify-center h-64 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
                        Map Visualization Placeholder
                    </div>
                </DashboardPanel>
                 <DashboardPanel title="Recent Critical Reports">
                     <div className="space-y-4">
                        {[1,2,3].map((i) => (
                             <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                        <AlertTriangle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">High Probability: pneumonia</h4>
                                        <p className="text-xs text-slate-500">Patient #492 • 10 mins ago</p>
                                    </div>
                                </div>
                                <button className="text-sm font-semibold text-blue-600 hover:underline">Review</button>
                             </div>
                        ))}
                     </div>
                </DashboardPanel>
            </div>
        </>
    )
}

// ----------------------------------------------------------------------
// SHARED COMPONENTS
// ----------------------------------------------------------------------

function StatCard({ title, value, icon, color }) {
    return (
        <motion.div 
            whileHover={{ y: -4 }}
            className="p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-xl border border-transparent", color.replace('text-', 'bg-').replace('700', '50'))}>
                    {icon} {/* Simplified for now to just render icon */}
                </div>
            </div>
             <div className="space-y-1">
                <h3 className="text-sm font-medium text-slate-500">{title}</h3>
                <h4 className="text-3xl font-bold text-slate-900">{value}</h4>
             </div>
        </motion.div>
    )
}

function DashboardPanel({ title, children }) {
    return (
        <div className="glass-panel p-6 rounded-[2rem] border border-white/50 bg-white/60 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">{title}</h3>
            {children}
        </div>
    )
}
