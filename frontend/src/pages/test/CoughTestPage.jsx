import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
    Mic, 
    Square, 
    RotateCcw, 
    Upload, 
    ChevronLeft, 
    Activity, 
    CheckCircle2,
    Play,
    Pause,
    BarChart3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVoice } from "../../context/VoiceContext";
import { useUser } from "../../context/UserContext";

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
};

const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

export default function CoughTestPage() {
    const navigate = useNavigate();
    const { startRecording, stopRecording, status, level, setMode, analyzeCough, recordedBlob, lastRecordingId, setRecordedBlob } = useVoice();
    const { user } = useUser();
    
    // UI steps: 1: Info, 2: Recording, 3: Review, 4: Uploading
    const [step, setStep] = useState(1); 
    const [recordingTime, setRecordingTime] = useState(0);

    const location = useLocation();
    const patientId = location.state?.patientId;

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setRecordedBlob(file);
            setRecordingTime(0); 
            setStep(3); 
        }
    };

    // Initial Setup
    useEffect(() => {
        setMode("COUGH_TEST");
        
        // Validation for ASHA/CLINICIAN
        if (user?.role !== "INDIVIDUAL" && !patientId) {
            alert("Please select a patient from the dashboard before starting a test.");
            navigate("/dashboard");
        }

        return () => setMode("COMMAND");
    }, [setMode, user, patientId, navigate]);

    // Timer Logic
    useEffect(() => {
        let interval;
        if (status === "listening") {
            interval = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [status]);

    const handleStartRecording = () => {
        setStep(2);
        setRecordingTime(0);
        startRecording(patientId); 
    };

    const handleStopRecording = () => {
        stopRecording();
        setStep(3);
    };

    const handleUpload = async () => {
        setStep(4);
        const result = await analyzeCough();
        if (result) {
            navigate(`/reports/${result.report_id || lastRecordingId}`); 
        } else {
            alert("Analysis failed. Please try again.");
            setStep(3);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden">
             {/* Dynamic Background */}
             <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                    animate={{ 
                        scale: step === 2 ? 1.2 : 1,
                        opacity: step === 2 ? 0.6 : 0.3
                    }}
                    transition={{ duration: 2 }}
                    className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-blue-200/40 rounded-full blur-[100px]" 
                />
                <motion.div 
                    animate={{ 
                        scale: step === 4 ? 1.2 : 1,
                        opacity: step === 4 ? 0.6 : 0.3
                    }}
                    transition={{ duration: 2 }}
                    className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] bg-purple-200/40 rounded-full blur-[100px]" 
                />
             </div>

             {/* Nav */}
             <div className="absolute top-8 left-8 z-50">
                 <Link to="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-slate-200/50">
                    <ChevronLeft className="w-5 h-5" />
                    <span className="font-medium">Cancel Test</span>
                </Link>
             </div>

             <div className="w-full max-w-2xl px-6 relative z-10">
                <AnimatePresence mode="wait">
                    {/* STEP 1: INSTRUCTIONS */}
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            layoutId="card-container"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-900/10 border border-white/50 text-center"
                        >
                            <motion.div variants={contentVariants}>
                                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white mx-auto mb-8 shadow-lg shadow-blue-500/30">
                                    <Mic className="w-10 h-10" />
                                </div>
                                <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Cough Analysis</h1>
                                <p className="text-slate-500 mb-10 text-lg leading-relaxed max-w-lg mx-auto">
                                    Our AI needs a clear recording of your cough sound. Please ensure you are in a quiet environment.
                                </p>
                                
                                <div className="flex flex-col gap-5 items-center max-w-sm mx-auto w-full">
                                    <button 
                                        onClick={handleStartRecording}
                                        className="w-full relative group overflow-hidden px-8 py-5 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-xl shadow-slate-900/20 transition-all hover:scale-[1.02] hover:shadow-2xl"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="relative flex items-center justify-center gap-3">
                                            <div className="p-1 rounded-full bg-white/20">
                                                <Mic className="w-5 h-5" />
                                            </div>
                                            Start Recording
                                        </div>
                                    </button>
                                    
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="h-[1px] bg-slate-200 flex-1" />
                                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Or</span>
                                        <div className="h-[1px] bg-slate-200 flex-1" />
                                    </div>

                                    <label className="w-full cursor-pointer px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center gap-3 transition-all">
                                        <Upload className="w-5 h-5 text-slate-400" />
                                        <span>Upload File</span>
                                        <input 
                                            type="file" 
                                            accept="audio/*" 
                                            className="hidden" 
                                            onChange={handleFileUpload}
                                        />
                                    </label>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* STEP 2: RECORDING */}
                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            layoutId="card-container"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="bg-slate-900 rounded-[2.5rem] p-8 md:p-14 shadow-2xl shadow-blue-900/20 border border-slate-800 text-center relative overflow-hidden w-full"
                        >
                             {/* Background Pulse based on Level */}
                             <motion.div 
                                animate={{ opacity: 0.1 + (level / 255) * 0.4 }}
                                className="absolute inset-0 bg-gradient-to-b from-red-500/20 to-purple-500/10 pointer-events-none"
                             />

                             <motion.div variants={contentVariants} className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold tracking-widest uppercase mb-8 animate-pulse border border-red-500/20">
                                     <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                     Recording
                                </div>
                                <div className="text-6xl md:text-7xl font-mono font-bold text-white mb-12 tracking-wider flex justify-center tabular-nums">
                                    {formatTime(recordingTime)}
                                </div>
                                
                                {/* Dynamic Wave Visualizer */}
                                <div className="h-24 md:h-32 flex items-center justify-center gap-1 md:gap-1.5 mb-14 w-full max-w-md mx-auto px-4">
                                    {[...Array(24)].map((_, i) => (
                                        <motion.div 
                                            key={i} 
                                            className="w-1.5 md:w-2 bg-gradient-to-t from-red-500 to-orange-400 rounded-full"
                                            animate={{ 
                                                height: Math.max(8, (level / 255) * 120 * (Math.sin(i * 0.5) + 1.5) * Math.random()) 
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        />
                                    ))}
                                </div>

                                <button 
                                    onClick={handleStopRecording}
                                    className="w-full md:w-auto px-10 py-5 rounded-2xl bg-white text-slate-900 font-bold text-lg hover:bg-slate-100 shadow-xl shadow-white/10 flex items-center justify-center gap-3 mx-auto transition-all hover:scale-105"
                                >
                                    <Square className="w-5 h-5 fill-slate-900" />
                                    <span>Stop Recording</span>
                                </button>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* STEP 3: REVIEW */}
                    {step === 3 && (
                        <motion.div 
                            key="step3"
                            layoutId="card-container"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-900/10 border border-white/50 text-center"
                        >
                            <motion.div variants={contentVariants}>
                                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-6 shadow-inner">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h1 className="text-3xl font-bold text-slate-900 mb-2">Recording Ready</h1>
                                <p className="text-slate-500 mb-8 font-mono bg-slate-100 px-3 py-1 rounded-lg inline-block text-sm">
                                    Duration: {formatTime(recordingTime)}
                                </p>
                                
                                {recordedBlob && (
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-8 max-w-sm mx-auto">
                                         <audio controls src={URL.createObjectURL(recordedBlob)} className="w-full accent-blue-600" />
                                    </div>
                                )}

                                <div className="flex flex-col gap-4 max-w-xs mx-auto">
                                    <button 
                                        onClick={handleUpload}
                                        className="w-full group px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                                    >
                                        <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                        <span>Analyze Now</span>
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setStep(1); 
                                        }} 
                                        className="w-full px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 flex items-center justify-center gap-3 transition-all"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                        <span>Re-record</span>
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* STEP 4: ANALYSIS (RADAR SCAN) */}
                    {step === 4 && (
                        <motion.div 
                            key="step4"
                            layoutId="card-container"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="bg-slate-900 rounded-[2.5rem] p-12 shadow-2xl shadow-blue-900/20 border border-slate-800 text-center w-full max-w-md relative overflow-hidden"
                        >
                            {/* Scanning Grid Background */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,100,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,100,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
                            
                            {/* Radar Scan Effect */}
                            <div className="relative w-48 h-48 mx-auto mb-10 rounded-full border border-emerald-500/30 overflow-hidden">
                                <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-pulse" />
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-1/2 left-1/2 -ml-[50%] -mt-[50%] w-full h-[50%] bg-gradient-to-r from-transparent via-emerald-500/20 to-emerald-500/50 origin-bottom right-0 [clip-path:polygon(50%_100%,100%_0,100%_100%)]"
                                    style={{ transformOrigin: "50% 100%" }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                     <Activity className="w-16 h-16 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Analyzing Audio</h2>
                            <div className="flex flex-col gap-2">
                                <p className="text-slate-400 text-sm font-mono">Uploading to IPFS...</p>
                                <div className="h-1 w-32 bg-slate-800 rounded-full mx-auto overflow-hidden">
                                     <motion.div 
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        className="h-full bg-emerald-500 w-full"
                                     />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>
        </div>
    );
}
