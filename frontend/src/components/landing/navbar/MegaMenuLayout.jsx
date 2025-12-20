import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MenuListItem, LargeFeatureCard } from "./VisualCard";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

export const MegaMenuLayout = ({ title, items, defaultImage, defaultTitle = "Platform Feature" }) => {
    // Default to the first item or a provided default
    const [activeItem, setActiveItem] = useState(items[0] || null);

    // Reset to first item when the menu (title) changes (e.g. switching between Product/Solutions)
    useEffect(() => {
        if (items && items.length > 0) {
            setActiveItem(items[0]);
        }
    }, [title, items]);

    return (
        <div className="flex w-full h-[450px]">
             {/* Left Column: Navigation List */}
             <div className="w-[340px] p-6 flex flex-col justify-center border-r border-gray-100 bg-white z-10">
                {title && (
                    <motion.h4 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`text-xs font-bold uppercase tracking-wider mb-6 text-gray-400 pl-3`}
                    >
                        {title}
                    </motion.h4>
                )}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-2"
                >
                    {items.map((item, index) => (
                        <MenuListItem 
                            key={index}
                            {...item}
                            active={activeItem?.title === item.title}
                            onMouseEnter={() => setActiveItem(item)}
                        />
                    ))}
                </motion.div>
             </div>

             {/* Right Column: Hero Visual - Dynamic Update */}
             <div className={`flex-1 p-3 bg-gray-50/50`}>
                <motion.div 
                    key={activeItem?.title} // Key change triggers animation
                    initial={{ opacity: 0, scale: 0.98, filter: "blur(2px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full rounded-2xl overflow-hidden relative group"
                >
                    <LargeFeatureCard 
                        title={activeItem?.visualTitle || activeItem?.title}
                        activeLabel={activeItem?.visualLabel || "Feature"}
                        image={activeItem?.image || defaultImage}
                    />
                </motion.div>
             </div>
        </div>
    );
};
