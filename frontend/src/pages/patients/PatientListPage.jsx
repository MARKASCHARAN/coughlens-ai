import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Plus, Filter, Mic, ChevronRight, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { useUser } from "../../context/UserContext";
import { patientService } from "../../services/patients";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function PatientListPage() {
    const { user } = useUser();
    const role = user?.role || "INDIVIDUAL";
    const navigate = useNavigate();
    
    // Redirect INDIVIDUAL users
    useEffect(() => {
        if (role === "INDIVIDUAL") {
            navigate("/dashboard");
        }
    }, [role, navigate]);

    const [searchQuery, setSearchQuery] = useState("");
    const [patients, setPatients] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [newPatient, setNewPatient] = useState({ name: "", age: "", gender: "MALE" });

    // Fetch Patients
    useEffect(() => {
        if (role !== "INDIVIDUAL") {
            const fetchPatients = async () => {
                try {
                    const data = await patientService.getPatients();
                    if (Array.isArray(data)) {
                        setPatients(data);
                    }
                } catch (err) {
                    console.error("Failed to fetch patients", err);
                }
            };
            fetchPatients();
        }
    }, [role]);

    const filteredPatients = patients.filter(p => 
        (p.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || 
        (p.village?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (p._id?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );

    const handleCreatePatient = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await patientService.createPatient({ ...newPatient, age: Number(newPatient.age) });
            // Add to list immediately
            setPatients(prev => [res, ...prev]);
            setIsAddModalOpen(false);
            setNewPatient({ name: "", age: "", gender: "MALE" });
            alert("Patient created successfully!");
        } catch (err) {
            console.error("Failed to create patient", err);
            alert("Failed to create patient");
        } finally {
            setLoading(false);
        }
    };
    
    // If redirecting, don't render content
    if (role === "INDIVIDUAL") return null;

    return (
        <div className="space-y-8 relative">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Patients</h1>
                    <p className="text-slate-500 mt-1">Manage and track patient records</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                        <Mic className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/20"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Patient</span>
                    </button>
                </div>
            </header>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search by name, ID, or village..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-medium whitespace-nowrap">
                    <Filter className="w-5 h-5" />
                    <span>Filter</span>
                </button>
            </div>

            {/* Patient List */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="p-6 font-semibold text-slate-500 text-sm">Patient Name</th>
                                <th className="p-6 font-semibold text-slate-500 text-sm">ID / Details</th>
                                <th className="p-6 font-semibold text-slate-500 text-sm">Village</th>
                                <th className="p-6 font-semibold text-slate-500 text-sm">Status</th>
                                <th className="p-6 font-semibold text-slate-500 text-sm">Last Test</th>
                                <th className="p-6 font-semibold text-slate-500 text-sm"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((patient) => (
                                <tr key={patient._id || patient.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                                                {(patient.name || "U").charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900">{patient.name || "Unknown"}</div>
                                                <div className="text-xs text-slate-500 md:hidden">{patient.age} yrs • {patient.gender}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-sm text-slate-600">
                                        <div className="font-medium">#{(patient._id || "").substring(0,6)}</div>
                                        <div className="text-xs text-slate-400">{patient.age} yrs • {patient.gender}</div>
                                    </td>
                                    <td className="p-6 text-sm text-slate-600">{patient.village || "N/A"}</td>
                                    <td className="p-6">
                                        <span className={cn(
                                            "inline-flex px-2.5 py-1 rounded-full text-xs font-semibold",
                                            patient.status === "High Risk" && "bg-red-100 text-red-700",
                                            patient.status === "Moderate" && "bg-orange-100 text-orange-700",
                                            (!patient.status || patient.status === "Normal" || patient.status === "Pending") && "bg-green-100 text-green-700"
                                        )}>
                                            {patient.status || "Pending"}
                                        </span>
                                    </td>
                                    <td className="p-6 text-sm text-slate-500">{patient.lastTest || "None"}</td>
                                    <td className="p-6 text-right">
                                        <Link to={`/dashboard/patients/${patient._id}`} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                                            <ChevronRight className="w-5 h-5" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredPatients.length === 0 && (
                    <div className="p-12 text-center text-slate-400">
                        No patients found matching "{searchQuery}"
                    </div>
                )}
            </div>

            {/* ADD PATIENT MODAL */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setIsAddModalOpen(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                            className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl overflow-hidden relative"
                            onClick={e => e.stopPropagation()}
                        >
                             <button onClick={() => setIsAddModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                                 <X className="w-5 h-5" />
                             </button>

                             <h2 className="text-2xl font-bold text-slate-900 mb-1">Add New Patient</h2>
                             <p className="text-slate-500 text-sm mb-6">Enter patient details to register.</p>

                             <form onSubmit={handleCreatePatient} className="space-y-4">
                                 <div className="space-y-2">
                                     <label className="text-sm font-bold text-slate-700">Full Name</label>
                                     <Input 
                                        type="text" placeholder="e.g. Anil Gupta" 
                                        value={newPatient.name}
                                        onChange={e => setNewPatient({...newPatient, name: e.target.value})}
                                        className="h-12 rounded-xl bg-slate-50 border-slate-200"
                                        required
                                     />
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                     <div className="space-y-2">
                                         <label className="text-sm font-bold text-slate-700">Age</label>
                                         <Input 
                                            type="number" placeholder="45" 
                                            value={newPatient.age}
                                            onChange={e => setNewPatient({...newPatient, age: e.target.value})}
                                            className="h-12 rounded-xl bg-slate-50 border-slate-200"
                                            required
                                         />
                                     </div>
                                     <div className="space-y-2">
                                         <label className="text-sm font-bold text-slate-700">Gender</label>
                                         <select 
                                            value={newPatient.gender}
                                            onChange={e => setNewPatient({...newPatient, gender: e.target.value})}
                                            className="w-full h-12 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                         >
                                             <option value="MALE">Male</option>
                                             <option value="FEMALE">Female</option>
                                             <option value="OTHER">Other</option>
                                         </select>
                                     </div>
                                 </div>
                                 
                                 <Button 
                                     type="submit" 
                                     disabled={loading}
                                     className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-600/20 mt-4 active:scale-95 transition-transform"
                                 >
                                     {loading ? "Registering..." : "Create Patient Record"}
                                 </Button>
                             </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
