import { 
    Globe, 
    Bell, 
    Mic, 
    User, 
    Shield, 
    LogOut 
} from "lucide-react";
import { Link } from "react-router-dom";

import { useUser } from "../../context/UserContext";

export default function SettingsPage() {
    const { user } = useUser();
    return (
        <div className="space-y-8 max-w-4xl">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 mt-1">Manage your preferences and profile</p>
            </header>

            <div className="space-y-6">
                
                {/* Language & Voice */}
                <section className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-4 md:p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
                         <Globe className="w-5 h-5 text-blue-600" />
                         <h3 className="font-bold text-slate-900">Language & Region</h3>
                    </div>
                    <div className="p-4 md:p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-slate-900 text-sm md:text-base">App Language</h4>
                                <p className="text-xs md:text-sm text-slate-500">Select your preferred language</p>
                            </div>
                            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 md:px-4 md:py-2 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm md:text-base">
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Telugu</option>
                            </select>
                        </div>
                         <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-slate-900 text-sm md:text-base">Voice Assistant</h4>
                                <p className="text-xs md:text-sm text-slate-500">Enable voice commands and navigation</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Profile */}
                <section className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-4 md:p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
                         <User className="w-5 h-5 text-blue-600" />
                         <h3 className="font-bold text-slate-900">
                            {user?.role === "CLINICIAN" ? "Provider Profile" : "Personal Profile"}
                         </h3>
                    </div>
                    <div className="p-4 md:p-6 space-y-6">
                        <div className="flex items-center gap-4 md:gap-6">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden shrink-0">
                                {user?.profile?.name ? (
                                    <img 
                                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.profile.name}`} 
                                        alt="Avatar" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User className="w-8 h-8" />
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="font-bold text-base md:text-lg text-slate-900 truncate">
                                    {user?.profile?.name || "User"}
                                </h4>
                                <p className="text-sm md:text-base text-slate-500 truncate">
                                    {user?.role === "CLINICIAN" ? `Clinician` : user?.email || "No Email"}
                                </p>
                                <p className="text-[10px] md:text-xs text-slate-400 mt-1 uppercase tracking-wide font-bold">
                                    {user?.role}
                                </p>
                            </div>
                            <button className="px-3 py-1.5 md:px-4 md:py-2 border border-slate-200 rounded-lg text-xs md:text-sm font-medium hover:bg-slate-50 transition-colors">
                                Edit
                            </button>
                        </div>
                    </div>
                </section>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                     <button className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
                        <div className="flex items-center gap-3">
                             <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
                                <Bell className="w-5 h-5" />
                             </div>
                             <span className="font-medium text-slate-900">Notifications</span>
                        </div>
                        <span className="text-slate-400 group-hover:text-blue-600 transition-colors">On</span>
                     </button>
                      <button className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
                        <div className="flex items-center gap-3">
                             <div className="p-2 rounded-lg bg-green-50 text-green-600">
                                <Shield className="w-5 h-5" />
                             </div>
                             <span className="font-medium text-slate-900">Security & Privacy</span>
                        </div>
                     </button>
                 </div>

                 <button className="w-full p-4 rounded-2xl bg-red-50 text-red-600 font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors mb-8">
                    <LogOut className="w-5 h-5" />
                    <span>Log Out</span>
                 </button>

            </div>
        </div>
    );
}
