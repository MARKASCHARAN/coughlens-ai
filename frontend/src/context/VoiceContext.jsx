import { createContext, useContext, useState, useEffect, useRef } from "react";
import { audioService } from "../services/audio";
import { mlService } from "../services/ml";
import { voiceService, VoiceIntents } from "../services/voice";

const VoiceContext = createContext(null);

export function VoiceProvider({ children }) {
    const [status, setStatus] = useState("idle"); // 'idle'|'listening'|'processing'|'error'
    const [level, setLevel] = useState(0);
    const [lastRecordingId, setLastRecordingId] = useState(null);
    const [transcript, setTranscript] = useState("");
    const [lastAction, setLastAction] = useState(null); // Action from backend
    const [recordedBlob, setRecordedBlob] = useState(null); // For review
    
    // Mode: 'COMMAND' (default) or 'COUGH_TEST'
    const [mode, setMode] = useState("COMMAND"); 
    const [currentPatientId, setCurrentPatientId] = useState(null);

    const mediaRecorderRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const animationFrameRef = useRef(null);
    
    // Speech Recognition for Commands
    const recognitionRef = useRef(null);

    useEffect(() => {
        // Init Speech Recognition if available
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.lang = 'en-US';
            recognitionRef.current.interimResults = false;
            recognitionRef.current.maxAlternatives = 1;

            recognitionRef.current.onresult = (event) => {
                const text = event.results[0][0].transcript;
                setTranscript(text);
                handleCommandIntent(text);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                if (mode === 'COMMAND') setStatus("idle");
            };
        }
    }, [mode]);

    const handleCommandIntent = async (text) => {
        setStatus("processing");
        // Simple heuristic for intent mapping
        let intent = VoiceIntents.HELP; 
        const lower = text.toLowerCase();
        
        if (lower.includes("cough") || lower.includes("test") || lower.includes("start")) intent = VoiceIntents.START_COUGH_TEST;
        else if (lower.includes("report")) intent = VoiceIntents.GENERATE_REPORT;
        else if (lower.includes("help")) intent = VoiceIntents.HELP;
        else if (lower.includes("stop")) intent = VoiceIntents.STOP;
        else if (lower.includes("asthma")) intent = VoiceIntents.WHAT_IS_ASTHMA;

        try {
            const response = await voiceService.sendIntent(intent);
            if (response.data) {
                speak(response.data.speak);
                if (response.data.action) {
                    setLastAction(response.data.action);
                    if (response.data.action === "RECORD_COUGH") {
                        setMode("COUGH_TEST");
                    }
                }
            }
        } catch (err) {
            console.error("Intent failed", err);
        } finally {
            setStatus("idle");
        }
    };

    const speak = (text) => {
        if (!text) return;
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    const startRecording = async (patientId = null) => {
        setCurrentPatientId(patientId || null);
        setRecordedBlob(null);

        if (mode === 'COMMAND' && recognitionRef.current) {
            try {
                recognitionRef.current.start();
                setStatus("listening");
            } catch(e) {
                console.warn("Recognition start failed", e);
            }
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            analyser.fftSize = 256;
            
            audioContextRef.current = audioContext;
            analyserRef.current = analyser;
            
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            const chunks = [];

            mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
            mediaRecorder.onstop = async () => {
                 const blob = new Blob(chunks, { type: "audio/webm" });
                 
                 if (mode === 'COUGH_TEST') {
                     setRecordedBlob(blob);
                     setStatus("idle");
                     // Do NOT auto upload. Wait for analyzeCough call.
                 } else {
                     // Command mode fallback if recognition failed but we recorded audio? 
                     // For now, ignore audio in command mode if we rely on STT.
                     setStatus("idle");
                 }
            };

            mediaRecorder.start();
            setStatus("listening");
            analyzeLevel();

        } catch (err) {
            console.error("Error accessing microphone:", err);
            setStatus("error");
        }
    };

    const stopRecording = () => {
        if (mode === 'COMMAND' && recognitionRef.current) {
            recognitionRef.current.stop();
            setStatus("idle");
            return;
        }

        if (mediaRecorderRef.current && status === "listening") {
            mediaRecorderRef.current.stop();
            if (audioContextRef.current) audioContextRef.current.close();
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
             mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
             setLevel(0);
        }
    };

    const analyzeCough = async () => {
        if (!recordedBlob) {
            console.error("No recording found");
            return null;
        }
        setStatus("processing");
        try {
            const uploadRes = await audioService.uploadAudio(recordedBlob);
            if (uploadRes.path) {
                const inferRes = await mlService.inferCough(currentPatientId, uploadRes.path);
                setLastRecordingId(inferRes.report_id);
                setLastAction("SHOW_RESULT");
                setStatus("idle");
                setMode("COMMAND"); 
                return inferRes;
            }
        } catch (err) {
            console.error("Analysis failed", err);
            setStatus("error");
            return null;
        }
    };

    const analyzeLevel = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        const sum = dataArray.reduce((src, a) => src + a, 0);
        const average = sum / dataArray.length;
        setLevel(average);
        if (status === "listening") {
            animationFrameRef.current = requestAnimationFrame(analyzeLevel);
        }
    };

    useEffect(() => {
        return () => {
             if (mediaRecorderRef.current && status === "listening") {
                 stopRecording();
             }
        };
    }, []);

    return (
        <VoiceContext.Provider value={{ 
            status, 
            level, 
            lastRecordingId, 
            transcript, 
            startRecording, 
            stopRecording,
            mode,
            setMode,
            lastAction,
            recordedBlob,
            analyzeCough
        }}>
            {children}
        </VoiceContext.Provider>
    );
}

export const useVoice = () => {
    const context = useContext(VoiceContext);
    if (!context) {
        throw new Error("useVoice must be used within a VoiceProvider");
    }
    return context;
};
