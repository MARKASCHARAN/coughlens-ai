import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Users, Activity } from "lucide-react";

export default function OverviewPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500">Welcome back, Dr. Salthi</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    title="Total Patients" 
                    value="1,284" 
                    trend="+12%" 
                    icon={<Users className="w-5 h-5 text-blue-600" />}
                    trendUp={true}
                />
                <StatCard 
                    title="Tests Conducted" 
                    value="843" 
                    trend="+5%" 
                    icon={<Activity className="w-5 h-5 text-cyan-600" />}
                    trendUp={true}
                />
                <StatCard 
                    title="Pending Reviews" 
                    value="12" 
                    trend="-2" 
                    icon={<Calendar className="w-5 h-5 text-orange-600" />}
                    trendUp={false} // actually good in this case but let's stick to UI pattern
                />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6 h-96">
                <div className="glass-panel p-6 rounded-[2rem] border border-white/50 bg-white/60">
                    <h3 className="font-bold text-slate-900 mb-6">Recent Activity</h3>
                    <div className="flex items-center justify-center h-full text-slate-400">
                        Chart Area
                    </div>
                </div>
                 <div className="glass-panel p-6 rounded-[2rem] border border-white/50 bg-white/60">
                    <h3 className="font-bold text-slate-900 mb-6">Patient Distribution</h3>
                    <div className="flex items-center justify-center h-full text-slate-400">
                        Map Area
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value, trend, icon, trendUp }) {
    return (
        <motion.div 
            whileHover={{ y: -4 }}
            className="p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    {icon}
                </div>
                <span className={cn("text-xs font-bold px-2 py-1 rounded-full", trendUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                    {trend}
                </span>
            </div>
             <div className="space-y-1">
                <h3 className="text-sm font-medium text-slate-500">{title}</h3>
                <h4 className="text-3xl font-bold text-slate-900">{value}</h4>
             </div>
        </motion.div>
    )
}

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
