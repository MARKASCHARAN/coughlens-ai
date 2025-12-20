import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// --- Menu List Item (Left Side) ---
// --- Menu List Item (Left Side) ---
const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
};

export const MenuListItem = ({ 
    icon: Icon, 
    title, 
    desc, 
    href = "#", 
    color = "orange", 
    active, 
    // Destructure these to prevent them from being passed to the DOM
    image, 
    visualTitle, 
    visualLabel, 
    ...props 
}) => {
    // Dynamic color maps for "boxed" look
    const bgHover = {
        orange: "hover:bg-orange-50/80 hover:border-orange-100",
        blue: "hover:bg-blue-50/80 hover:border-blue-100",
        purple: "hover:bg-purple-50/80 hover:border-purple-100",
        green: "hover:bg-green-50/80 hover:border-green-100",
        black: "hover:bg-gray-50/80 hover:border-gray-200",
    }[color] || "hover:bg-orange-50/80 hover:border-orange-100";

    const textHover = {
        orange: "group-hover:text-orange-700",
        blue: "group-hover:text-blue-700",
        purple: "group-hover:text-purple-700",
        green: "group-hover:text-green-700",
        black: "group-hover:text-black",
    }[color] || "group-hover:text-orange-700";

    const iconColor = {
        orange: "text-orange-500/80 group-hover:text-orange-600",
        blue: "text-blue-500/80 group-hover:text-blue-600",
        purple: "text-purple-500/80 group-hover:text-purple-600",
        green: "text-green-500/80 group-hover:text-green-600",
        black: "text-gray-600 group-hover:text-black",
    }[color] || "text-orange-500/80 group-hover:text-orange-600";
    
    // Background for the icon box (Premium Gradient)
    const iconBg = {
        orange: "bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/30 text-white",
        blue: "bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/30 text-white",
        purple: "bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg shadow-purple-500/30 text-white",
        green: "bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/30 text-white",
        black: "bg-black shadow-lg shadow-gray-500/20 text-white",
    }[color] || "bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/30 text-white";

    return (
        <motion.a 
            href={href}
            variants={itemVariants}
            {...props}
            className={`group flex items-center p-4 rounded-xl border border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-gray-100/50 hover:bg-white hover:border-gray-100 relative overflow-hidden bg-transparent ${active ? 'bg-white shadow-md border-gray-100' : ''}`}
        >
            <div className={`mr-4 p-3 rounded-xl ${iconBg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <Icon size={20} strokeWidth={2.5} />
            </div>
            
            <div className="relative z-10 flex-1">
                <h4 className={`text-[16px] font-bold text-gray-800 ${textHover} transition-colors duration-200 mb-0.5`}>
                    {title}
                </h4>
                <p className="text-[13px] text-gray-500 font-medium leading-tight group-hover:text-gray-600 transition-colors duration-200">
                    {desc}
                </p>
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0 text-gray-400">
               <ArrowRight size={16} />
            </div>
        </motion.a>
    );
};

// --- Visual Card (Legacy/Alternative) ---
export const VisualCard = ({ icon: Icon, title, desc, className, color = "blue" }) => {
    
    // Minimalistic "Clay" gradients based on color prop
    const gradients = {
        blue: "from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100",
        purple: "from-purple-50 to-fuchsia-50 hover:from-purple-100 hover:to-fuchsia-100",
        green: "from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100",
        orange: "from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100",
        rose: "from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100"
    };

    const iconColors = {
        blue: "text-blue-600 bg-blue-100",
        purple: "text-purple-600 bg-purple-100",
        green: "text-emerald-600 bg-emerald-100",
        orange: "text-orange-600 bg-orange-100",
        rose: "text-rose-600 bg-rose-100"
    };

    return (
        <motion.a 
            href="#"
            whileHover={{ y: -2 }}
            className={`group flex items-start p-4 rounded-xl transition-all duration-300 bg-gradient-to-br ${gradients[color] || gradients.blue} border border-transparent hover:border-black/5 ${className}`}
        >
            <div className={`p-2 rounded-lg mr-4 backdrop-blur-sm ${iconColors[color] || iconColors.blue}`}>
                {Icon && <Icon size={20} />}
            </div>
            <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-black mb-1 flex items-center gap-1">
                    {title}
                </h4>
                <p className="text-xs text-gray-500 font-medium leading-relaxed group-hover:text-gray-600">
                    {desc}
                </p>
            </div>
        </motion.a>
    );
};

export const LargeFeatureCard = ({ title, activeLabel, image }) => (
    <div className="relative w-full h-full bg-white flex flex-col">
        {/* Image Area */}
        <div className="flex-1 relative overflow-hidden bg-gray-100">
             <div className="absolute inset-x-8 inset-y-8 bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100/50">
                {/* Mock UI / Image */}
                <img 
                    src={image || "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=2574&auto=format&fit=crop"} 
                    alt="Feature Preview" 
                    className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 hover:scale-105"
                />
             </div>
             
             {/* Decorative Elements */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 blur-[60px] rounded-full pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 blur-[60px] rounded-full pointer-events-none" />
        </div>

        {/* Text Area */}
        <div className="h-[90px] px-8 py-5 flex items-center justify-between bg-white border-t border-gray-100/50 relative z-10">
            <div>
                 <span className="inline-block px-2 py-0.5 mb-1 text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 rounded-full border border-orange-100">
                    {activeLabel || "New"}
                </span>
                <h3 className="text-lg font-bold text-gray-900 leading-none">
                    {title || "AI Diagnosis Model"}
                </h3>
            </div>
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all bg-white shadow-sm hover:shadow-md cursor-pointer">
                <ArrowRight size={16} />
            </div>
        </div>
    </div>
);
