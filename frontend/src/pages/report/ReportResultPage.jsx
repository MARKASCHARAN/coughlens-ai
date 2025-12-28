import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
    Download, 
    Share2, 
    ChevronLeft, 
    AlertTriangle, 
    CheckCircle2, 
    ShieldAlert, 
    Activity,
    Info
} from "lucide-react";

import { useUser } from "../../context/UserContext";
import { reportsService } from "../../services/reports";

export default function ReportResultPage() {
    const { id } = useParams();
    const { user } = useUser();

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Report Data
    useEffect(() => {
        const fetchReport = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const data = await reportsService.getReportById(id);
                setResult(data);
            } catch (err) {
                console.error("Failed to fetch report", err);
                setError("Failed to load report");
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
            </div>
        );
    }

    if (error || !result) {
         return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 flex-col gap-4">
                <p className="text-slate-500">{error || "Report not found"}</p>
                 <Link to="/dashboard" className="text-blue-600 font-bold hover:underline">Return to Dashboard</Link>
            </div>
        );
    }
    
    // Derived state for UI
    const predictionNormalized = result.prediction?.toLowerCase() || "";
    const isHealthy = predictionNormalized === "healthy";
    const isHighRisk = !isHealthy; 

    return (
        <div className="min-h-screen bg-slate-50/30 pb-20 font-sans">
            {/* Header / Nav */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-20 px-8 py-4 flex items-center justify-between shadow-sm">
                <Link to="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group">
                    <div className="p-2 rounded-full bg-slate-100 group-hover:bg-slate-200 transition-colors">
                         <ChevronLeft className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">Back to Dashboard</span>
                </Link>
                <div className="flex items-center gap-4">
                     <div className="text-right hidden md:block">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Report ID</div>
                        <div className="font-mono text-sm font-medium text-slate-600">{result.id}</div>
                     </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-6 space-y-8 mt-6">
                
                {/* Patient Info Header */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 pb-6 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-1">Diagnostic Report</h1>
                            <p className="text-slate-500 text-sm">Generated on {result.createdAt ? new Date(result.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                             <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Organization</div>
                             <div className="font-semibold text-slate-700 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-blue-600" />
                                CoughLens AI Diagnostics
                             </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        <div>
                             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Patient Details</h3>
                             <div className="space-y-3">
                                <div className="flex justify-between border-b border-slate-50 pb-2">
                                    <span className="text-slate-500 text-sm">Name</span>
                                    <span className="font-medium text-slate-900">{user?.name || "N/A"}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 pb-2">
                                    <span className="text-slate-500 text-sm">Email</span>
                                    <span className="font-medium text-slate-900">{user?.email || "N/A"}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 pb-2">
                                    <span className="text-slate-500 text-sm">Patient ID</span>
                                    <span className="font-mono text-sm font-medium text-slate-900">{user?._id?.substring(0,8) || "Unknown"}</span>
                                </div>
                             </div>
                        </div>
                        <div>
                             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Clinical Context</h3>
                             <div className="space-y-3">
                                <div className="flex justify-between border-b border-slate-50 pb-2">
                                    <span className="text-slate-500 text-sm">Symptom Reported</span>
                                    <span className="font-medium text-slate-900">Chronic Cough</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 pb-2">
                                    <span className="text-slate-500 text-sm">Analysis Type</span>
                                    <span className="font-medium text-slate-900">Audio Spectral Analysis</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 pb-2">
                                    <span className="text-slate-500 text-sm">Model Version</span>
                                    <span className="font-mono text-sm font-medium text-slate-900">v2.1.0-beta</span>
                                </div>
                             </div>
                        </div>
                     </div>
                </div>

                {/* Main Result */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                     <div className="p-6 md:p-8 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isHighRisk ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                {isHighRisk ? <ShieldAlert className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Primary Finding</h2>
                                <div className={`text-3xl font-bold ${isHighRisk ? 'text-slate-900' : 'text-slate-900'}`}>{result.prediction}</div>
                            </div>
                        </div>
                     </div>

                     <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                         <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Severity</div>
                            <div className={`text-xl font-bold ${isHighRisk ? 'text-red-600' : 'text-emerald-600'}`}>{result.severity || "N/A"}</div>
                            <p className="text-xs text-slate-400 mt-1">Based on audio intensity frequency</p>
                         </div>
                         <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Risk Level</div>
                            <div className="text-xl font-bold text-slate-700">{result.probability || "Low"}</div>
                            <p className="text-xs text-slate-400 mt-1">Assessment of potential health risk</p>
                         </div>
                         <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Status</div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isHighRisk ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                {isHighRisk ? "Action Required" : "Normal Limits"}
                            </span>
                         </div>
                     </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-900">
                        <Info className="w-5 h-5 text-blue-600" />
                        Clinical Recommendations
                     </h3>
                     <ul className="space-y-4">
                        {(result.advice || ["Consult a healthcare provider for further assessment.", "Monitor symptoms closely."]).map((item, i) => (
                            <li key={i} className="flex gap-4 text-slate-600 leading-relaxed border-b border-slate-50 last:border-0 pb-4 last:pb-0">
                                <span className="font-bold text-blue-600 text-sm mt-0.5">{i + 1}.</span>
                                <span className="text-sm md:text-base">{item}</span>
                            </li>
                        ))}
                     </ul>
                </div>

                {/* Disclaimer */}
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-100 flex gap-3 text-amber-800 text-xs md:text-sm">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                    <p>
                        <strong>Disclaimer:</strong> This report is generated by an AI model and is for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                    </p>
                </div>

                {/* Action Bar */}
                <div className="flex flex-col md:flex-row gap-4 justify-end pt-4">
                    <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm text-sm">
                        <Download className="w-4 h-4" />
                        Download Report PDF
                    </button>
                     <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-md text-sm">
                        <Share2 className="w-4 h-4" />
                        Share Results
                    </button>
                </div>

            </div>
        </div>
    );
}
