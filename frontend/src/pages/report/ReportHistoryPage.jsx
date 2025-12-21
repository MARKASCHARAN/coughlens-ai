import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, FileText, ChevronRight, Calendar, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";

// Mock Data
const MOCK_REPORTS = [
    { id: "REP-001", patient: "Ramesh Kumar", date: "Today, 10:30 AM", result: "Pneumonia", status: "Critical", confidence: 92 },
    { id: "REP-002", patient: "Sunita Devi", date: "Yesterday, 4:15 PM", result: "Normal", status: "Normal", confidence: 98 },
    { id: "REP-003", patient: "Amit Singh", date: "Dec 18, 2024", result: "Respiratory Infection", status: "Moderate", confidence: 76 },
    { id: "REP-004", patient: "Priya Sharma", date: "Dec 15, 2024", result: "Normal", status: "Normal", confidence: 95 },
    { id: "REP-005", patient: "Rahul Verma", date: "Dec 12, 2024", result: "Bronchitis", status: "High", confidence: 88 },
];

export default function ReportHistoryPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredReports = MOCK_REPORTS.filter(r => 
        r.patient.toLowerCase().includes(searchQuery.toLowerCase()) || 
        r.result.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
             <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Report History</h1>
                    <p className="text-slate-500 mt-1">Archive of all past analysis reports</p>
                </div>
            </header>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search by patient, ID, or result..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-medium whitespace-nowrap">
                    <Filter className="w-5 h-5" />
                    <span>Filter Date</span>
                </button>
            </div>

            {/* Reports List */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="p-6 font-semibold text-slate-500 text-sm">Report ID</th>
                                <th className="p-6 font-semibold text-slate-500 text-sm">Patient</th>
                                <th className="p-6 font-semibold text-slate-500 text-sm">Date</th>
                                <th className="p-6 font-semibold text-slate-500 text-sm">Diagnosis</th>
                                <th className="p-6 font-semibold text-slate-500 text-sm">Status</th>
                                <th className="p-6 font-semibold text-slate-500 text-sm"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReports.map((report) => (
                                <tr key={report.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                     <td className="p-6 text-sm font-mono text-slate-500">
                                        {report.id}
                                    </td>
                                    <td className="p-6 font-semibold text-slate-900">
                                        {report.patient}
                                    </td>
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
                            ))}
                        </tbody>
                    </table>
                </div>
                 {filteredReports.length === 0 && (
                    <div className="p-12 text-center text-slate-400">
                        No reports found.
                    </div>
                )}
            </div>
        </div>
    );
}
