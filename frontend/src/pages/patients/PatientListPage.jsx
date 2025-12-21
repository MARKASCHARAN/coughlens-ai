import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Filter, Mic, ChevronRight, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

// Mock Data
const MOCK_PATIENTS = [
    { id: 101, name: "Ramesh Kumar", age: 65, gender: "Male", village: "Sector 4", lastTest: "2h ago", status: "High Risk", riskScore: 85 },
    { id: 102, name: "Sunita Devi", age: 42, gender: "Female", village: "Sector 2", lastTest: "1d ago", status: "Normal", riskScore: 12 },
    { id: 103, name: "Amit Singh", age: 28, gender: "Male", village: "Sector 5", lastTest: "3d ago", status: "Normal", riskScore: 5 },
    { id: 104, name: "Priya Sharma", age: 55, gender: "Female", village: "Sector 1", lastTest: "5d ago", status: "Moderate", riskScore: 45 },
    { id: 105, name: "Rahul Verma", age: 34, gender: "Male", village: "Sector 4", lastTest: "1w ago", status: "Normal", riskScore: 8 },
];

export default function PatientListPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPatients = MOCK_PATIENTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.village.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Patients</h1>
                    <p className="text-slate-500 mt-1">Manage and track patient records</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                        <Mic className="w-5 h-5" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/20">
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
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
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
                                <tr key={patient.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                                                {patient.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900">{patient.name}</div>
                                                <div className="text-xs text-slate-500 md:hidden">{patient.age} yrs • {patient.gender}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-sm text-slate-600">
                                        <div className="font-medium">#{patient.id}</div>
                                        <div className="text-xs text-slate-400">{patient.age} yrs • {patient.gender}</div>
                                    </td>
                                    <td className="p-6 text-sm text-slate-600">{patient.village}</td>
                                    <td className="p-6">
                                        <span className={cn(
                                            "inline-flex px-2.5 py-1 rounded-full text-xs font-semibold",
                                            patient.status === "High Risk" && "bg-red-100 text-red-700",
                                            patient.status === "Moderate" && "bg-orange-100 text-orange-700",
                                            patient.status === "Normal" && "bg-green-100 text-green-700"
                                        )}>
                                            {patient.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-sm text-slate-500">{patient.lastTest}</td>
                                    <td className="p-6 text-right">
                                        <Link to={`/dashboard/patients/${patient.id}`} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
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
        </div>
    );
}
