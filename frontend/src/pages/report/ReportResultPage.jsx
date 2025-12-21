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
import { motion } from "framer-motion";

export default function ReportResultPage() {
    const { id } = useParams();

    // Mock Result Data
    const result = {
        id: id || "REP-2024-001",
        patientName: "Ramesh Kumar",
        date: "Dec 20, 2024",
        diagnosis: "Pneumonia",
        probability: "High",
        confidence: 92,
        severity: "Critical",
        advice: [
            "Immediate consultation with a specialist is recommended.",
            "Monitor oxygen saturation levels regularly.",
            "Isolate the patient to prevent potential spread if infectious."
        ]
    };

    const isHighRisk = result.severity === "Critical" || result.severity === "High";

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header / Nav */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
                <Link to="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back to Dashboard</span>
                </Link>
                <div className="font-mono text-sm text-slate-400">ID: {result.id}</div>
            </div>

            <div className="max-w-4xl mx-auto p-6 space-y-8 mt-4">
                
                {/* Main Result Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 text-center overflow-hidden relative"
                >
                    {/* Background Gradient */}
                    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${isHighRisk ? 'from-red-500 to-orange-500' : 'from-green-500 to-emerald-500'}`} />
                    
                    <div className="mb-8">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${isHighRisk ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            {isHighRisk ? <AlertTriangle className="w-12 h-12" /> : <CheckCircle2 className="w-12 h-12" />}
                        </div>
                        <h2 className="text-slate-500 font-medium mb-2 uppercase tracking-wide text-sm">Analysis Result</h2>
                        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isHighRisk ? 'text-slate-900' : 'text-slate-900'}`}>
                            {result.diagnosis} Detected
                        </h1>
                         <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold ${isHighRisk ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            <Activity className="w-4 h-4" />
                            {result.confidence}% Confidence
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 py-8 border-t border-slate-100">
                         <div>
                            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Severity</div>
                            <div className={`text-xl font-bold ${isHighRisk ? 'text-red-600' : 'text-green-600'}`}>{result.severity}</div>
                         </div>
                         <div>
                            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Risk Level</div>
                            <div className="text-xl font-bold text-slate-700">{result.probability}</div>
                         </div>
                         <div>
                            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Processing Time</div>
                            <div className="text-xl font-bold text-slate-700">1.2s</div>
                         </div>
                    </div>
                </motion.div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Visualizer Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden"
                    >
                         <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-blue-400" />
                            Audio Spectrogram
                         </h3>
                         {/* Mock Spectrogram */}
                         <div className="h-40 flex items-end gap-1 opacity-80">
                            {[...Array(40)].map((_, i) => (
                                <div 
                                    key={i} 
                                    className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm"
                                    style={{ height: `${20 + Math.random() * 80}%` }} 
                                />
                            ))}
                         </div>
                         <div className="mt-4 flex justify-between text-xs text-slate-500 font-mono">
                            <span>0:00</span>
                            <span>0:05</span>
                         </div>
                    </motion.div>

                    {/* Advice Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm"
                    >
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-900">
                            <Info className="w-5 h-5 text-blue-600" />
                            Clinical Advice
                         </h3>
                         <ul className="space-y-4">
                            {result.advice.map((item, i) => (
                                <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                         </ul>
                    </motion.div>
                </div>

                {/* Action Bar */}
                <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.3 }}
                     className="flex flex-col md:flex-row gap-4 justify-center pt-8"
                >
                    <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                        <Download className="w-5 h-5" />
                        Download Report PDF
                    </button>
                     <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-500/20">
                        <Share2 className="w-5 h-5" />
                        Share on WhatsApp
                    </button>
                </motion.div>

            </div>
        </div>
    );
}
