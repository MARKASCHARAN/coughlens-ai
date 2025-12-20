import React from "react";
import { ChevronDown } from "lucide-react";
import { NavDropdown } from "./NavDropdown";

export const NavLink = ({ title, activeTab, setActiveTab, id, children, width }) => {
    const isActive = activeTab === id;

    return (
        <div 
            className="flex flex-col justify-center h-full"
            onMouseEnter={() => setActiveTab(id)}
            onMouseLeave={() => setActiveTab(null)}
        >
            <button 
                className={`
                    relative z-10 flex items-center gap-1.5 px-4 py-2 text-[15px] font-medium rounded-full transition-all duration-300
                    ${isActive ? 'text-black bg-black/5' : 'text-gray-600 hover:text-black hover:bg-black/5'}
                `}
            >
                {title}
                <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-300 ${isActive ? 'rotate-180 text-black' : 'opacity-40'}`} 
                    strokeWidth={2.5} 
                />
            </button>
            <div className="absolute top-[60px] left-0 w-full flex justify-center pointer-events-none">
                 {/* This wrapper is tricky because NavLink is inside a flex row. 
                     We need the dropdown to be positioned relative to the BUTTON or the Bar? 
                     Usually relative to the specific link, but we want it centered or visually aligned.
                     The NavDropdown uses 'absolute left-1/2 -translate-x-1/2' relative to this container.
                     So we need 'relative' on this container.
                 */}
                 <div className="relative pointer-events-auto">
                    <NavDropdown active={isActive} width={width}>
                        {children}
                    </NavDropdown>
                 </div>
            </div>
        </div>
    );
};
