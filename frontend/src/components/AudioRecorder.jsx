import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioRecorder({ onRecordingComplete, isUploading }) {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            
            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                setAudioBlob(blob);
                chunksRef.current = [];
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingTime(0);
            
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Could not access microphone. Please ensure permissions are granted.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
            if (timerRef.current) clearInterval(timerRef.current);
        }
    };

    const handleReset = () => {
        setAudioBlob(null);
        setRecordingTime(0);
    };

    const handleSubmit = () => {
        if (audioBlob) {
            onRecordingComplete(audioBlob);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full flex flex-col items-center justify-center p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
            <div className="mb-6 relative">
                 {/* Visualizer Placeholder / Animation */}
                 <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording ? 'bg-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'bg-white/5'}`}>
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-700'}`}>
                        {isRecording ? (
                            <span className="material-icons text-white text-4xl">mic</span>
                         ) : audioBlob ? (
                            <span className="material-icons text-white text-4xl">check</span>
                         ) : (
                            <span className="material-icons text-white text-4xl">mic_none</span>
                         )}
                    </div>
                 </div>
            </div>

            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-1">
                    {isRecording ? "Listening..." : audioBlob ? "Recording Complete" : "Tap to Record"}
                </h3>
                <p className="text-gray-400 font-mono text-lg">
                    {audioBlob ? "Ready to Analyze" : formatTime(recordingTime)}
                </p>
            </div>

            <div className="flex gap-4">
                {!isRecording && !audioBlob && (
                    <Button 
                        onClick={startRecording}
                        className="h-12 px-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow-lg shadow-orange-500/20 transition-all active:scale-95"
                    >
                        Start Recording
                    </Button>
                )}

                {isRecording && (
                    <Button 
                        onClick={stopRecording}
                        className="h-12 px-8 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-lg shadow-lg shadow-red-500/20 transition-all active:scale-95"
                    >
                        Stop
                    </Button>
                )}

                {audioBlob && (
                    <>
                        <Button 
                            onClick={handleReset}
                            variant="outline"
                            className="h-12 px-6 rounded-full border-white/10 text-white hover:bg-white/10"
                            disabled={isUploading}
                        >
                            Retry
                        </Button>
                        <Button 
                            onClick={handleSubmit}
                            className="h-12 px-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                            disabled={isUploading}
                        >
                            {isUploading ? "Uploading..." : "Analyze Cough"}
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
