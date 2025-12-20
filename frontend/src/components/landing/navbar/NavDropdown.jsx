import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuVariants = {
    hidden: { 
        opacity: 0, 
        y: -10,
        filter: "blur(5px)",
        scale: 0.98,
        transition: { duration: 0.2 }
    },
    visible: { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        scale: 1,
        transition: { 
            type: "spring", 
            stiffness: 450, 
            damping: 30,
            mass: 1
        }
    },
    exit: { 
        opacity: 0, 
        y: -5, 
        filter: "blur(5px)",
        transition: { duration: 0.15 }
    }
};

export const NavDropdown = ({ active, children, width = "w-[600px]" }) => {
    return (
        <AnimatePresence>
            {active && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 perspective-[2000px] z-50">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        className={`origin-top-center bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1),0_10px_30px_-5px_rgba(0,0,0,0.04)] ring-1 ring-black/5 p-2 overflow-hidden ${width}`}
                    >
                         {/* Content Container */}
                         <div className="relative z-10">
                            {children}
                         </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
