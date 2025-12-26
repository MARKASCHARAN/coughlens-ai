import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronRight, Calendar, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { useUser } from "../../context/UserContext";
import { reportsService } from "../../services/reports";

// Mock Data as fallback
const MOCK_REPORTS = [
    { id: "REP-001", patient: "Ramesh Kumar", date: "Today, 10:30 AM", result: "Pneumonia", status: "Critical", confidence: 92, patientPhone: "9999999999" },
    { id: "REP-002", patient: "Sunita Devi", date: "Yesterday, 4:15 PM", result: "Normal", status: "Normal", confidence: 98, patientPhone: "8888888888" },
    { id: "REP-003", patient: "Amit Singh", date: "Dec 18, 2024", result: "Respiratory Infection", status: "Moderate", confidence: 76, patientPhone: "7777777777" },
    { id: "REP-004", patient: "Priya Sharma", date: "Dec 15, 2024", result: "Normal", status: "Normal", confidence: 95, patientPhone: "5555555555" },
    { id: "REP-005", patient: "Rahul Verma", date: "Dec 12, 2024", result: "Bronchitis", status: "High", confidence: 88, patientPhone: "9999999999" },
];

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
                // In a real app, API would handle filtering.
                // Here we fetch all or specific depending on API capabilities implementation
                // For now, using logic on mock data + simulated API response to demonstrate role-based view
                
                let data = [];
                if (role === "INDIVIDUAL" && user?.phone) {
                   // Try to get real reports
                   try {
                       // const real = await reportsService.getPatientReports(user.phone);
                       // if (real && real.length > 0) data = real;
                   } catch (e) {
                       console.warn("Real fetch failed, using mock");
                   }
                   
                   // Fallback to mock filtering for demo
                   if (data.length === 0) {
                        // Assuming current user phone matches mock data for demo purposes, 
                        // or just show a subset if phone isn't provided in mock
                        data = MOCK_REPORTS.filter(r => r.patientPhone === user.phone || r.patient === "Demo User"); 
                        // Fallback: If no match, show empty or specific mock for "555-555-5555" (Demo)
                        if (data.length === 0 && user.phone === "555-555-5555") {
                             data = MOCK_REPORTS.slice(3, 4); 
                        }
                   }
                } else {
                    // Clinician / Asha see all
                    data = MOCK_REPORTS;
                }
                setReports(data);
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

            {/* Search Bar - Hidden for individual if they only have few reports? Maybe keep it. */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder={role === "INDIVIDUAL" ? "Search your reports..." : "Search by patient, ID, or result..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
                {role !== "INDIVIDUAL" && (
                    <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-medium whitespace-nowrap">
                        <Filter className="w-5 h-5" />
                        <span>Filter Date</span>
                    </button>
                )}
            </div>

            {/* Reports List */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="p-6 font-semibold text-slate-500 text-sm">Report ID</th>
                                {role !== "INDIVIDUAL" && <th className="p-6 font-semibold text-slate-500 text-sm">Patient</th>}
                                <th className="p-6 font-semibold text-slate-500 text-sm">Date</th>
                                <th className="p-6 font-semibold text-slate-500 text-sm">Diagnosis</th>
                                <th className="p-6 font-semibold text-slate-500 text-sm">Status</th>
                                <th className="p-6 font-semibold text-slate-500 text-sm"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="p-12 text-center text-slate-400">Loading reports...</td>
                                </tr>
                            ) : filteredReports.length > 0 ? (
                                filteredReports.map((report) => (
                                    <tr key={report.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                         <td className="p-6 text-sm font-mono text-slate-500">
                                            {report.id}
                                        </td>
                                        {role !== "INDIVIDUAL" && (
                                            <td className="p-6 font-semibold text-slate-900">
                                                {report.patient}
                                            </td>
                                        )}
                                        <td className="p-6 text-sm text-slate-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {report.date}
                                            </div>
                                        </td>
                                        <td className="p-6 text-sm font-medium text-slate-700">
                                            {report.result}
                                        </td>
                                        <td className="p-6">
                                            <span className={cn(
                                                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                                                report.status === "Critical" || report.status === "High" ? "bg-red-100 text-red-700" : 
                                                report.status === "Moderate" ? "bg-orange-100 text-orange-700" :
                                                "bg-green-100 text-green-700"
                                            )}>
                                                {report.status === "Critical" || report.status === "High" ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <Link to={`/reports/${report.id}`} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                                                <ChevronRight className="w-5 h-5" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-12 text-center text-slate-400">
                                        No reports found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
