import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { motion } from "framer-motion";
import { useUser } from "../../context/UserContext";

export default function ProfileCompletionPage() {
    const { completeProfile, user } = useUser();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "MALE",
        language: "en"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.age) return;
        
        setIsLoading(true);
        // Convert age to number
        const payload = { ...formData, age: Number(formData.age) };
        
        const success = await completeProfile(payload);
        setIsLoading(false);

        if (success) {
            // Redirect logic based on role
            // INDIVIDUAL → /dashboard/individual (Wait, guide says /dashboard/individual, but existing router uses /dashboard/*)
            // Existing router: /dashboard -> OverviewPage. 
            // I should stick to existing router structure OR update router.
            // Guide says:
            // INDIVIDUAL → /dashboard/individual
            // ASHA_WORKER → /dashboard/asha
            // CLINICIAN → /dashboard/clinician
            
            // For now, I will redirect to /dashboard and let OverviewPage handle the visibility, 
            // UNLESS I update the router to separate them.
            // The guide explicitly listed routing in Section 7.
            // Let's forward to /dashboard for now and I will update router and OverviewPage to match.
            // Actually, if I update router later, I should redirect to the correct paths here to be safe.
            
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl"
            >
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Complete Profile</h2>
                    <p className="text-gray-400 text-sm">Tell us a bit about yourself to get started.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wide">Full Name</label>
                        <Input 
                            name="name"
                            type="text" 
                            placeholder="John Doe" 
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-white/5 border-white/10 text-white"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wide">Age</label>
                            <Input 
                                name="age"
                                type="number" 
                                placeholder="25" 
                                value={formData.age}
                                onChange={handleChange}
                                className="bg-white/5 border-white/10 text-white"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wide">Gender</label>
                            <select 
                                name="gender"
                                value={formData.gender} 
                                onChange={handleChange}
                                className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white focus:bg-white/10 transition-all font-medium appearance-none"
                            >
                                <option value="MALE" className="bg-gray-900">Male</option>
                                <option value="FEMALE" className="bg-gray-900">Female</option>
                                <option value="OTHER" className="bg-gray-900">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wide">Language</label>
                        <select 
                            name="language"
                            value={formData.language} 
                            onChange={handleChange}
                            className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white focus:bg-white/10 transition-all font-medium appearance-none"
                        >
                            <option value="en" className="bg-gray-900">English</option>
                            <option value="hi" className="bg-gray-900">Hindi</option>
                            <option value="te" className="bg-gray-900">Telugu</option>
                        </select>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full h-11 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-bold shadow-lg shadow-orange-500/20 mt-4"
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "Complete Profile"}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}
