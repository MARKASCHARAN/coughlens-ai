import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    BarChart3, 
    TrendingUp, 
    Users, 
    MapPin, 
    Calendar,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { useUser } from "../../context/UserContext";

export default function AnalyticsPage() {
    const { user } = useUser();
    const role = user?.role || "INDIVIDUAL";
    const navigate = useNavigate();

    // Redirect INDIVIDUAL users
    useEffect(() => {
        if (role === "INDIVIDUAL") {
            navigate("/dashboard");
        }
    }, [role, navigate]);

    // If redirecting, don't render content
    if (role === "INDIVIDUAL") return null;

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
                <p className="text-slate-500 mt-1">Population health insights and trends</p>
            </header>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard 
                    label="Avg Risk Score" 
                    value="24%" 
                    trend="+2.4%" 
                    trendUp={false} // Risk going up is bad, but for UI consistent use red
                    color="text-indigo-600"
                />
                <MetricCard 
                    label="Total Screenings" 
                    value="1,284" 
                    trend="+12%" 
                    trendUp={true}
                    color="text-blue-600"
                />
                <MetricCard 
                    label="High Risk Cases" 
                    value="42" 
                    trend="-5%" 
                    trendUp={true} // Going down is good
                    color="text-red-600"
                    inverseTrend
                />
                <MetricCard 
                    label="Active Locations" 
                    value="8" 
                    trend="0%" 
                    trendUp={true} 
                    color="text-orange-600"
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Trend Chart */}
                <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-lg text-slate-900">Screening Trends</h3>
                            <p className="text-sm text-slate-500">Monthly tests conducted</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600">
                                <option>Last 6 Months</option>
                                <option>Last Year</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* CSS Bar Chart */}
                    <div className="h-64 flex items-end justify-between gap-4">
                        {[40, 65, 45, 80, 55, 90, 75, 85, 60, 95, 80, 100].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer">
                                <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className="w-full bg-blue-100 rounded-t-xl relative group-hover:bg-blue-600 transition-colors"
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {height * 12}
                                    </div>
                                </motion.div>
                                <div className="text-xs text-slate-400 text-center mt-2 font-medium">
                                    {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Risk Distribution */}
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                     <h3 className="font-bold text-lg text-slate-900 mb-6">Risk Distribution</h3>
                     
                     <div className="space-y-6">
                        <DistributionItem label="Normal / Healthy" count="850" percentage={66} color="bg-green-500" />
                        <DistributionItem label="Moderate Risk" count="392" percentage={30} color="bg-orange-500" />
                        <DistributionItem label="High Risk" count="42" percentage={4} color="bg-red-500" />
                     </div>

                     <div className="mt-8 pt-8 border-t border-slate-50">
                        <h4 className="font-bold text-sm text-slate-900 mb-4">Top Villages (Risk %)</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Sector 4</span>
                                <span className="font-bold text-red-600">12%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">North Village</span>
                                <span className="font-bold text-orange-600">8%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">East District</span>
                                <span className="font-bold text-slate-900">3%</span>
                            </div>
                        </div>
                     </div>
                </div>
            </div>

            {/* Recent Alerts Table (Simplified) */}
             <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-lg text-slate-900 mb-6">Recent High Risk Alerts</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-slate-500">
                            <tr>
                                <th className="pb-4 font-semibold">Patient</th>
                                <th className="pb-4 font-semibold">Village</th>
                                <th className="pb-4 font-semibold">Diagnosis</th>
                                <th className="pb-4 font-semibold">Detected</th>
                                <th className="pb-4 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[1,2,3].map((i) => (
                                <tr key={i}>
                                    <td className="py-4 font-medium text-slate-900">Patient #{100+i}</td>
                                    <td className="py-4 text-slate-500">Sector {i}</td>
                                    <td className="py-4 text-red-600 font-medium">Pneumonia Probability</td>
                                    <td className="py-4 text-slate-500">Dec {20-i}, 2024</td>
                                    <td className="py-4">
                                        <button className="text-blue-600 font-semibold hover:underline">Notify Hospital</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ label, value, trend, trendUp, color, inverseTrend }) {
    const isGood = inverseTrend ? !trendUp : trendUp;
    return (
        <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-medium text-slate-500">{label}</h4>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${isGood ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {isGood ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {trend}
                </div>
            </div>
            <div className={`text-3xl font-bold ${color}`}>{value}</div>
        </div>
    )
}

function DistributionItem({ label, count, percentage, color }) {
    return (
        <div>
            <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-700">{label}</span>
                <span className="text-slate-500">{count} ({percentage}%)</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full ${color}`} 
                />
            </div>
        </div>
    )
}
