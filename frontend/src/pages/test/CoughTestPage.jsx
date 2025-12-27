import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
    Mic, 
    Square, 
    RotateCcw, 
    Upload, 
    ChevronLeft, 
    Activity, 
    CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVoice } from "../../context/VoiceContext";
import { useUser } from "../../context/UserContext";

export default function CoughTestPage() {
    const navigate = useNavigate();
    const { startRecording, stopRecording, status, level, setMode, analyzeCough, recordedBlob, lastRecordingId } = useVoice();
    const { user } = useUser();
    
    // UI steps: 1: Info, 2: Recording, 3: Review, 4: Uploading
    const [step, setStep] = useState(1); 
    const [recordingTime, setRecordingTime] = useState(0);

    const location = useLocation();
    const patientId = location.state?.patientId;

    // Initial Setup
    useEffect(() => {
        setMode("COUGH_TEST");
        return () => setMode("COMMAND");
    }, [setMode]);

    // Timer Logic relying on status from Context
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
        // Pass patientId if available (for ASHA/Clinician), otherwise null (Individual)
        startRecording(patientId); 
    };

    const handleStopRecording = () => {
        stopRecording();
        setStep(3); // Move to review
    };

    const handleUpload = async () => {
        setStep(4);
        const result = await analyzeCough();
        if (result) {
            // Success
            navigate(`/reports/${result.report_id || lastRecordingId}`); // Navigate to report
        } else {
            // Error handling (stay on step 4 or go back)
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
        <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center">
             {/* Nav */}
             <div className="absolute top-8 left-8">
                 <Link to="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                    <ChevronLeft className="w-5 h-5" />
                    <span>Cancel Test</span>
                </Link>
             </div>

             <div className="w-full max-w-2xl">
                <AnimatePresence mode="wait">
                    {/* STEP 1: INSTRUCTIONS */}
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-[2rem] p-10 shadow-xl border border-slate-100 text-center"
                        >
                            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-6">
                                <Mic className="w-10 h-10" />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-4">Cough Analysis Test</h1>
                            <p className="text-slate-500 mb-8 max-w-md mx-auto">
                                Please record a clear cough sound. Hold the phone 6-10 inches away from your mouth. Ensure you are in a quiet environment.
                            </p>
                            
                            <div className="flex justify-center">
                                <button 
                                    onClick={handleStartRecording}
                                    className="btn-primary px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-600/30 flex items-center gap-3 transition-all hover:scale-105"
                                >
                                    <Mic className="w-6 h-6" />
                                    <span>Start Recording</span>
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: RECORDING */}
                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-[2rem] p-10 shadow-xl border border-slate-100 text-center relative overflow-hidden"
                        >
                            {/* Pulse Effect */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-50 rounded-full animate-ping opacity-75 pointer-events-none" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-50 rounded-full animate-pulse opacity-50 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="text-red-500 font-bold mb-2 animate-pulse flex items-center justify-center gap-2">
                                     <div className="w-3 h-3 rounded-full bg-red-500" />
                                     RECORDING
                                </div>
                                <div className="text-6xl font-mono font-bold text-slate-900 mb-8 tracking-wider">
                                    {formatTime(recordingTime)}
                                </div>
                                
                                {/* Visualizer Mock based on level */}
                                <div className="h-24 flex items-center justify-center gap-1 mb-10 w-full max-w-md mx-auto">
                                    {[...Array(20)].map((_, i) => (
                                        <div 
                                            key={i} 
                                            className="w-2 bg-slate-900 rounded-full transition-all duration-75"
                                            style={{ 
                                                height: `${Math.max(20, (level / 255) * 100 * (Math.random() + 0.5))}%`,
                                            }} 
                                        />
                                    ))}
                                </div>

                                <button 
                                    onClick={handleStopRecording}
                                    className="px-8 py-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 font-bold text-lg hover:bg-slate-50 shadow-sm flex items-center gap-3 mx-auto transition-all"
                                >
                                    <Square className="w-5 h-5 fill-slate-900" />
                                    <span>Stop Recording</span>
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: REVIEW */}
                    {step === 3 && (
                        <motion.div 
                            key="step3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-[2rem] p-10 shadow-xl border border-slate-100 text-center"
                        >
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">Recording Complete</h1>
                            <p className="text-slate-500 mb-8">Duration: {formatTime(recordingTime)}</p>
                            
                            {recordedBlob && (
                                <audio controls src={URL.createObjectURL(recordedBlob)} className="w-full mb-6" />
                            )}

                            <div className="flex flex-col gap-3 max-w-xs mx-auto">
                                <button 
                                    onClick={handleUpload}
                                    className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
                                >
                                    <Upload className="w-5 h-5" />
                                    <span>Upload & Analyze</span>
                                </button>
                                <button 
                                    onClick={() => {
                                        setStep(2); // Go back to recording step
                                        // Auto start? Maybe not to avoid confusion, just let them press start again or reset to step 1
                                        setStep(1);
                                    }} 
                                    className="px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 flex items-center justify-center gap-2 transition-all"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    <span>Re-record</span>
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: UPLOADING */}
                    {step === 4 && (
                        <motion.div 
                            key="step4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-[2rem] p-12 shadow-xl border border-slate-100 text-center w-full max-w-sm"
                        >
                            <div className="relative w-24 h-24 mx-auto mb-8">
                                <svg className="animate-spin w-full h-full text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Activity className="w-8 h-8 text-blue-600" />
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Analyzing Audio...</h2>
                            <p className="text-slate-500 text-sm">Uploading to IPFS & Running inference</p>
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>
        </div>
    );
}
