import { useNavigate } from "react-router-dom";
import { Mic, X, ChevronRight, Activity, Users, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function VoiceCommandCenter() {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1); // Go back to previous page
    };

    return (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center z-50 p-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 relative shadow-2xl overflow-hidden"
            >
                <button 
                    onClick={handleClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                    <X className="w-6 h-6 text-slate-400" />
                </button>

                <div className="flex flex-col items-center justify-center pt-8 pb-4 text-center">
                    
                    {/* Pulsating Abstract Mic Visualization */}
                    <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
                         <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping" />
                         <div className="absolute inset-4 bg-blue-500 rounded-full opacity-20 animate-pulse" />
                         <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <Mic className="w-10 h-10 text-white" />
                         </div>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Listening...</h2>
                    <p className="text-slate-500 mb-8">Try saying a command</p>

                    {/* Suggestions */}
                    <div className="w-full space-y-3">
                        <CommandSuggestion 
                            icon={<Activity className="w-4 h-4 text-blue-600" />} 
                            text="Start new cough test"
                            action={() => navigate("/test/cough")}
                        />
                        <CommandSuggestion 
                            icon={<Users className="w-4 h-4 text-orange-600" />} 
                            text="Show high risk patients" 
                            action={() => navigate("/dashboard/patients")}
                        />
                         <CommandSuggestion 
                            icon={<FileText className="w-4 h-4 text-green-600" />} 
                            text="Show my latest reports"
                             action={() => navigate("/dashboard/reports")}
                        />
                    </div>
                </div>
                
                {/* Waveform Animation Mock */}
                <div className="flex items-center justify-center gap-1 h-8 mt-6 opacity-30">
                    {[...Array(12)].map((_, i) => (
                        <div 
                            key={i} 
                            className="w-1 bg-slate-900 rounded-full animate-[pulse_1s_infinite]"
                            style={{ 
                                height: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.1}s` 
                            }} 
                        />
                    ))}
                </div>

            </motion.div>
        </div>
    );
}

function CommandSuggestion({ icon, text, action }) {
    return (
        <button 
            onClick={action}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-blue-50 hover:border-blue-100 transition-colors group"
        >
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                    {icon}
                </div>
                <span className="font-medium text-slate-700 group-hover:text-blue-700 transition-colors">{text}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
        </button>
    )
}
