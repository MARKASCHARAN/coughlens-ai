import { MicButton } from "../../components/voice/MicButton";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Logo } from "../../components/ui/Logo";

export default function TestPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col relative overflow-hidden">
             {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-100/40 rounded-full blur-[100px] pointer-events-none" />
            
             <header className="p-6 relative z-10 flex justify-between items-center">
                 <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors p-2 rounded-full hover:bg-white/50">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Exit Test
                </Link>
                <Logo iconOnly />
            </header>

             <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
                 <div className="text-center space-y-4 max-w-lg w-full mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Respiratory Analysis</h1>
                    <p className="text-lg text-slate-500">Hold the phone 10cm from the patient's mouth in a quiet room.</p>
                </div>
                
                <div className="relative">
                    {/* Visualizer Container */}
                    <div className="w-64 h-64 flex items-center justify-center">
                        <MicButton className="scale-150" />
                    </div>
                </div>
                
                <div className="mt-12 p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/50 shadow-sm max-w-sm text-center">
                    <p className="text-sm font-medium text-slate-600">
                        <span className="text-cyan-600 mx-1">●</span>
                        AI Engine Ready
                    </p>
                </div>
             </div>
        </div>
    )
}
