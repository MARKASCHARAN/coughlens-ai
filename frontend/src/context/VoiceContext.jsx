import { createContext, useContext, useState, useEffect, useRef } from "react";

const VoiceContext = createContext(null);

export function VoiceProvider({ children }) {
    const [status, setStatus] = useState("idle"); // 'idle'|'listening'|'processing'|'error'
    const [level, setLevel] = useState(0);
    const [lastRecordingId, setLastRecordingId] = useState(null);
    const [transcript, setTranscript] = useState("");
    
    const mediaRecorderRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const animationFrameRef = useRef(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            // Setup Audio Context for level analysis
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            analyser.fftSize = 256;
            
            audioContextRef.current = audioContext;
            analyserRef.current = analyser;
            
            // Setup Media Recorder
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            const chunks = [];

            mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
            mediaRecorder.onstop = () => {
                 const blob = new Blob(chunks, { type: "audio/webm" });
                 // Simulate upload/processing
                 setStatus("processing");
                 // Mock processing delay
                 setTimeout(() => {
                     setLastRecordingId(`rec-${Date.now()}`);
                     setStatus("idle"); // or 'completed'
                     setTranscript("Cough detected with 98% confidence.");
                 }, 3000);
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
        if (mediaRecorderRef.current && status === "listening") {
            mediaRecorderRef.current.stop();
            // Cleanup audio context
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
             // Stop all tracks
             mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
             setLevel(0);
        }
    };

    const analyzeLevel = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Simple average for volume level
        const sum = dataArray.reduce((src, a) => src + a, 0);
        const average = sum / dataArray.length;
        setLevel(average); // 0-255

        if (status === "listening") {
            animationFrameRef.current = requestAnimationFrame(analyzeLevel);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
             if (mediaRecorderRef.current && status === "listening") {
                 stopRecording();
             }
        };
    }, []);

    return (
        <VoiceContext.Provider value={{ status, level, lastRecordingId, transcript, startRecording, stopRecording }}>
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
