import { Mic, Square, Loader2 } from "lucide-react";
import { useVoice } from "../../context/VoiceContext";
import { cn } from "../../lib/utils";

export function MicButton({ className }) {
    const { status, level, startRecording, stopRecording } = useVoice();

    // Map level (0-255) to a scale factor for ring animation (1 to 1.5)
    const scale = 1 + (level / 255) * 0.5;

    return (
        <div className={cn("relative flex items-center justify-center", className)}>
            {/* Visualizer Ring */}
            {status === "listening" && (
                <div 
                    className="absolute inset-0 bg-primary/20 rounded-full transition-transform duration-75"
                    style={{ transform: `scale(${scale})` }}
                />
            )}
            
            {/* Main Button */}
            <button
                onClick={status === "listening" ? stopRecording : startRecording}
                disabled={status === "processing"}
                className={cn(
                    "relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-colors shadow-lg",
                    status === "listening" ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90",
                    status === "processing" && "bg-muted text-muted-foreground cursor-not-allowed"
                )}
            >
                {status === "processing" ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                ) : status === "listening" ? (
                    <Square className="w-8 h-8 fill-current text-destructive-foreground" />
                ) : (
                    <Mic className="w-8 h-8 text-primary-foreground" />
                )}
            </button>
            
             {/* Status Text */}
             <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm font-medium whitespace-nowrap">
                 {status === "idle" && "Tap to Record"}
                 {status === "listening" && "Listening..."}
                 {status === "processing" && "Processing..."}
                 {status === "error" && <span className="text-destructive">Error</span>}
             </div>
        </div>
    );
}
