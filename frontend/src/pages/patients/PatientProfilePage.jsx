import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
    User, 
    Phone, 
    MapPin, 
    Calendar, 
    Activity, 
    FileText, 
    Share2, 
    ChevronLeft,
    Clock,
    AlertTriangle
} from "lucide-react";
import { useUser } from "../../context/UserContext";

// Mock Data
const MOCK_PATIENT_DETAILS = {
    id: "101",
    name: "Ramesh Kumar",
    age: 65,
    gender: "Male",
    phone: "+91 98765 43210",
    address: "House 24, Sector 4, Village Name",
    riskLevel: "High Risk",
    history: [
        { id: 1, date: "Dec 18, 2024", result: "High Probability of Pneumonia", status: "Critical", confidence: 92 },
        { id: 2, date: "Nov 22, 2024", result: "Mild Respiratory Infection", status: "Moderate", confidence: 78 },
        { id: 3, date: "Oct 10, 2024", result: "Normal", status: "Normal", confidence: 98 },
    ]
};

export default function PatientProfilePage() {
    const { user } = useUser();
    const role = user?.role || "INDIVIDUAL";
    const navigate = useNavigate();

    // Redirect INDIVIDUAL users
    useEffect(() => {
        if (role === "INDIVIDUAL") {
            navigate("/dashboard");
        }
    }, [role, navigate]);

    const { id } = useParams();
    // In real app, fetch patient by ID. Using mock for now.
    const patient = MOCK_PATIENT_DETAILS; 
    
    // If redirecting, don't render content
    if (role === "INDIVIDUAL") return null;

    return (
        <div className="space-y-8">
            {/* Back Navigation */}
            <Link to="/dashboard/patients" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Patients</span>
            </Link>

            {/* Header / Patient Card */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between gap-8">
                <div className="flex gap-6">
                    <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <User className="w-10 h-10" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-slate-900">{patient.name}</h1>
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                                {patient.riskLevel}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-slate-500 text-sm">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{patient.age} years • {patient.gender}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>{patient.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{patient.address}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>Registered: Aug 12, 2024</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 min-w-[200px]">
                    <Link to="/test/cough" className="btn-primary flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-lg shadow-blue-600/20">
                        <Activity className="w-5 h-5" />
                        <span>Start Cough Test</span>
                    </Link>
                    <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share Profile</span>
                    </button>
                </div>
            </div>

            {/* Test History */}
            <h2 className="text-2xl font-bold text-slate-900">Test History</h2>
            <div className="grid gap-4">
                {patient.history.map((test) => (
                    <div key={test.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 group hover:border-blue-100 transition-colors">
                         <div className="flex items-center gap-6 flex-1">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                test.status === 'Critical' ? 'bg-red-100 text-red-600' :
                                test.status === 'Moderate' ? 'bg-orange-100 text-orange-600' :
                                'bg-green-100 text-green-600'
                            }`}>
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">{test.result}</h3>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {test.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Activity className="w-4 h-4" />
                                        {test.confidence}% Confidence
                                    </span>
                                </div>
                            </div>
                         </div>
                         <div className="flex items-center gap-3 w-full md:w-auto">
                            <Link to={`/reports/${test.id}`} className="flex-1 md:flex-none px-6 py-2 rounded-xl bg-slate-50 text-slate-900 font-medium hover:bg-slate-100 transition-colors text-center border border-slate-200">
                                View Report
                            </Link>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
