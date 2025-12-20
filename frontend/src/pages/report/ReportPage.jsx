import { useParams } from "react-router-dom";

export default function ReportPage() {
    const { id } = useParams();
    
    return (
        <div className="min-h-screen bg-muted/10 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Analysis Report</h1>
                        <p className="text-muted-foreground">ID: {id || 'PENDING-123'}</p>
                    </div>
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                        Completed
                    </div>
                </header>
                
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Diagnosis</h3>
                        <div className="text-4xl font-extrabold text-foreground mb-2">Healthy</div>
                        <p className="text-sm text-green-600 font-medium">98% Confidence</p>
                    </div>
                    
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                         <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Biomarkers Detected</h3>
                         <div className="space-y-4">
                             <div className="space-y-1">
                                 <div className="flex justify-between text-sm"><span>Wheeze</span> <span>2%</span></div>
                                 <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-red-500 w-[2%]"></div></div>
                             </div>
                             <div className="space-y-1">
                                 <div className="flex justify-between text-sm"><span>Crackle</span> <span>5%</span></div>
                                 <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-orange-500 w-[5%]"></div></div>
                             </div>
                         </div>
                    </div>
                </div>
                
                 <div className="bg-card p-6 rounded-xl border border-border shadow-sm h-64 flex items-center justify-center text-muted-foreground">
                    Spectrogram Visualization Placeholder
                </div>
            </div>
        </div>
    )
}
