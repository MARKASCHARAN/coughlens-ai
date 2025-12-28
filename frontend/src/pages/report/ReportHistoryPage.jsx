import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronRight, Calendar, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { useUser } from "../../context/UserContext";
import { reportsService } from "../../services/reports";

export default function ReportHistoryPage() {
    const { user } = useUser();
    const role = user?.role || "INDIVIDUAL";
    const [searchQuery, setSearchQuery] = useState("");

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
             setLoading(true);
             try {
                if (role === "INDIVIDUAL") {
                    // Use analytics endpoint which likely returns recent reports
                    // Fallback to empty if not present, as we don't have direct patient_id
                    // and 'Final Master Guide' doesn't specify an 'all reports' endpoint for individual explicitly outside of this.
                     // But OverviewPage uses this pattern.
                   try {
                       const { analyticsService } = await import("../../services/analytics");
                       const data = await analyticsService.getMyAnalytics();
                       setReports(data.reports || []);
                   } catch (e) {
                       console.warn("Fetch failed", e);
                       setReports([]);
                   }
                } else {
                    // For ASHA/CLINICIAN, reports are viewed per patient.
                    // There is no "All Reports" global endpoint in the master guide.
                    setReports([]);
                }
             } catch (err) {
                 console.error("Error fetching reports", err);
             } finally {
                 setLoading(false);
             }
        };

        fetchReports();
    }, [role, user]);

    const filteredReports = reports.filter(r => 
        (r.patient?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || 
        (r.result?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (r.id?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
             <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Report History</h1>
                    <p className="text-slate-500 mt-1">
                        {role === "INDIVIDUAL" ? "Your past analysis reports" : "Archive of all past analysis reports"}
                    </p>
                </div>
            </header>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search your reports..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
            </div>

            {role !== "INDIVIDUAL" && (
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-blue-900">Select a Patient</h3>
                        <p className="text-blue-700 text-sm mt-1">To view reports, please go to the Patients page and select a specific patient profile.</p>
                        <Link to="/dashboard/patients" className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors">
                            View Patients
                        </Link>
                    </div>
                </div>
            )}

            {/* Reports List - Only for INDIVIDUAL */}
            {role === "INDIVIDUAL" && (
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="hidden md:table w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="p-6 font-semibold text-slate-500 text-sm">Report ID</th>
                                    <th className="p-6 font-semibold text-slate-500 text-sm">Date</th>
                                    <th className="p-6 font-semibold text-slate-500 text-sm">Diagnosis</th>
                                    <th className="p-6 font-semibold text-slate-500 text-sm">Confidence</th>
                                    <th className="p-6 font-semibold text-slate-500 text-sm"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="p-12 text-center text-slate-400">Loading reports...</td>
                                    </tr>
                                ) : filteredReports.length > 0 ? (
                                    filteredReports.map((report, i) => {
                                        const isHealthy = report.prediction?.toLowerCase() === "healthy";
                                        return (
                                            <tr key={report._id || i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                                <td className="p-6 text-sm font-mono text-slate-500">
                                                    {(report._id || report.id || "N/A").substring(0, 8)}...
                                                </td>
                                                <td className="p-6 text-sm text-slate-500">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(report.created_at || Date.now()).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className={cn("p-6 text-sm font-bold", isHealthy ? "text-slate-700" : "text-red-700")}>
                                                    {report.prediction}
                                                </td>
                                                <td className="p-6">
                                                    <span className={cn(
                                                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                                                        !isHealthy ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                                                    )}>
                                                        {(report.confidence * 100).toFixed(0)}%
                                                    </span>
                                                </td>
                                                <td className="p-6 text-right">
                                                    <Link to={`/reports/${report._id || report.id}`} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                                                        <ChevronRight className="w-5 h-5" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-12 text-center text-slate-400">
                                            No reports found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        
                        {/* Mobile Card View */}
                        <div className="md:hidden p-4 space-y-4">
                             {loading ? (
                                <div className="text-center text-slate-400 py-8">Loading...</div>
                             ) : filteredReports.length > 0 ? (
                                filteredReports.map((report, i) => {
                                    const isHealthy = report.prediction?.toLowerCase() === "healthy";
                                    return (
                                        <Link 
                                            to={`/reports/${report._id || report.id}`}
                                            key={report._id || i} 
                                            className="block bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm active:scale-95 transition-transform"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wide">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(report.created_at || Date.now()).toLocaleDateString()}
                                                </div>
                                                <span className={cn(
                                                    "px-2 py-1 rounded-lg text-xs font-bold",
                                                    !isHealthy ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                                                )}>
                                                    {(report.confidence * 100).toFixed(0)}%
                                                </span>
                                            </div>
                                            <h3 className={cn("text-lg font-bold mb-1", isHealthy ? "text-slate-900" : "text-red-700")}>
                                                {report.prediction}
                                            </h3>
                                            <p className="text-xs font-mono text-slate-400">
                                                ID: {(report._id || report.id || "N/A").substring(0, 12)}...
                                            </p>
                                        </Link>
                                    )
                                })
                             ) : (
                                <div className="text-center text-slate-400 py-8">No reports found.</div>
                             )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
