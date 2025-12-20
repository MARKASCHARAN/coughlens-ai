import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ArrowRight, Smartphone, Activity, Database, Globe, Mic, Users, Stethoscope, Languages, Sparkles } from "lucide-react";
import { Logo, Button } from "../Shared";

// Overlay Variants
const overlayVariants = {
    closed: { opacity: 0, pointerEvents: "none" },
    open: { opacity: 1, pointerEvents: "auto" }
};

// Menu Variants (Slide Up/Down)
const menuVariants = {
    closed: { 
        y: "-100%",
        opacity: 0,
        transition: { type: "spring", stiffness: 300, damping: 35 }
    },
    open: { 
        y: "0%",
        opacity: 1,
        transition: { 
            type: "tween", 
            ease: [0.32, 0.72, 0, 1], 
            duration: 0.8,
            staggerChildren: 0.1, 
            delayChildren: 0.2 
        }
    }
};

const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
};

export const MobileMenu = ({ isOpen, onClose }) => {
    const [expanded, setExpanded] = useState(null);

    const toggleExpand = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex flex-col">
                    {/* Backdrop */}
                    <motion.div 
                        variants={overlayVariants}
                        initial="closed" 
                        animate="open" 
                        exit="closed"
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Full Screen Menu Container */}
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="relative flex-1 bg-white/95 backdrop-blur-3xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100/50">
                            <Logo theme="light" />
                            <button 
                                onClick={onClose} 
                                className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-800 transition-colors shadow-sm"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-2">
                             
                             {/* Menu Items */}
                             <motion.div variants={itemVariants}>
                                <MobileMenuItem 
                                    title="Product" 
                                    id="product" 
                                    expanded={expanded} 
                                    onToggle={toggleExpand}
                                >
                                    <MobileSubLink icon={Activity} title="AI Diagnostics" desc="Cough-based respiratory risk analysis" />
                                    <MobileSubLink icon={Database} title="Patient Reports" desc="IPFS-backed medical records" />
                                    <MobileSubLink icon={Languages} title="Multilingual Voice" desc="Telugu, Hindi & English" />
                                    <MobileSubLink icon={Smartphone} title="Offline Screening" desc="Edge-ready for rural deployment" />
                                </MobileMenuItem>
                             </motion.div>

                             <motion.div variants={itemVariants}>
                                <MobileMenuItem 
                                    title="Solutions" 
                                    id="solutions" 
                                    expanded={expanded} 
                                    onToggle={toggleExpand}
                                >
                                    <MobileSubLink icon={Stethoscope} title="For Clinicians" desc="Hospital-grade screening" />
                                    <MobileSubLink icon={Users} title="For ASHA Workers" desc="Voice-only field diagnostics" />
                                    <MobileSubLink icon={Globe} title="Public Health Programs" desc="Population-level surveillance" />
                                    <MobileSubLink icon={Mic} title="Research Institutions" desc="Vocal biomarker datasets" />
                                </MobileMenuItem>
                             </motion.div>

                             <motion.div variants={itemVariants} className="pt-2">
                                <a href="#" className="flex items-center justify-between py-4 text-2xl font-bold text-gray-900 border-b border-gray-100">
                                    AI Engine
                                    <ArrowRight size={20} className="text-gray-300 -rotate-45" />
                                </a>
                             </motion.div>

                             <motion.div variants={itemVariants}>
                                <a href="#" className="flex items-center justify-between py-4 text-2xl font-bold text-gray-900 border-b border-gray-100">
                                    Research
                                    <ArrowRight size={20} className="text-gray-300 -rotate-45" />
                                </a>
                             </motion.div>

                             <motion.div variants={itemVariants}>
                                <a href="/about" className="flex items-center justify-between py-4 text-2xl font-bold text-gray-900 border-b border-gray-100">
                                    About
                                    <ArrowRight size={20} className="text-gray-300 -rotate-45" />
                                </a>
                             </motion.div>

                        </div>

                        {/* Footer / CTA Area */}
                        <div className="p-6 bg-gray-50/80 border-t border-gray-100 backdrop-blur-md">
                            <div className="flex flex-col gap-3 mb-8">
                                <a href="/auth/login" className="w-full">
                                    <Button 
                                        variant="secondary"
                                        className="w-full h-12 text-[15px] border border-gray-200 hover:border-gray-300 rounded-xl"
                                    >
                                        Log in
                                    </Button>
                                </a>
                                <Button 
                                    variant="shiny"
                                    className="w-full h-12 text-[15px] uppercase tracking-wide rounded-xl shadow-xl shadow-orange-500/20"
                                >
                                    Get Demo
                                    <Sparkles size={16} className="ml-2" />
                                </Button>
                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// --- Sub Components ---

const MobileMenuItem = ({ title, id, expanded, onToggle, children }) => {
    const isExpanded = expanded === id;

    return (
        <div className="border-b border-gray-100">
            <button 
                onClick={() => onToggle(id)}
                className="flex items-center justify-between w-full py-5 text-left group"
            >
                <span className={`text-4xl font-bold tracking-tight transition-colors duration-300 ${isExpanded ? 'text-orange-500' : 'text-gray-900 group-hover:text-gray-600'}`}>
                    {title}
                </span>
                <span className={`p-2 rounded-full transition-all duration-300 ${isExpanded ? 'bg-orange-50 text-orange-600 rotate-180' : 'bg-transparent text-gray-400 group-hover:bg-gray-50'}`}>
                    <ChevronDown size={24} />
                </span>
            </button>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 space-y-2">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MobileSubLink = ({ icon: Icon, title, desc }) => (
    <a href="#" className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group">
        <div className="h-10 w-10 min-w-[2.5rem] rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-black group-hover:border-black shadow-sm transition-colors mr-4">
            {Icon && <Icon size={20} />}
        </div>
        <div>
            <h5 className="text-[15px] font-bold text-gray-900">{title}</h5>
            {desc && <p className="text-[12px] text-gray-500">{desc}</p>}
        </div>
    </a>
);
