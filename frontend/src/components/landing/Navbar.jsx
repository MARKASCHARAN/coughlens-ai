import React, { useState, useEffect } from "react";
import { Mic, Activity, Database, Smartphone, Languages, Users, Stethoscope, Globe, Menu, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Logo, Button } from "./Shared";
import { NavLink } from "./navbar/NavLink";
import { VisualCard, LargeFeatureCard, MenuListItem } from "./navbar/VisualCard";
import { MegaMenuLayout } from "./navbar/MegaMenuLayout";
import { MobileMenu } from "./navbar/MobileMenu";

export const Navbar = ({ currentTheme }) => {
    const [activeTab, setActiveTab] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Theme Logic: Dark backgrounds need white text. Light backgrounds need dark text.
    // However, if we scroll, the navbar becomes white/glassy, so we force dark text.
    const isDarkBg = ['dark', 'blue', 'orange'].includes(currentTheme);
    const useDarkText = scrolled || !isDarkBg;

    return (
        <>
            <nav 
                className={`fixed top-0 inset-x-0 z-[50] transition-all duration-500 border-b border-transparent
                ${scrolled ? 'bg-white/80 backdrop-blur-xl border-gray-200/50 py-2' : 'bg-transparent py-3'}
                `}
            >
                <div className="max-w-[1400px] mx-auto px-3 flex items-center justify-between">
                    
                    {/* Left: Branding */}
                    <div className="h-12 flex items-center overflow-hidden">
                        <Logo theme={useDarkText ? "light" : "dark"} />
                        
                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-2.5">


  {/* Product / Platform */}
  <NavLink
    title="Product"
    id="product"
    activeTab={activeTab}
    setActiveTab={setActiveTab}
    width="w-[950px]"
    textColor={useDarkText ? "text-gray-700" : "text-white/90"}
  >
    <MegaMenuLayout
      title="Clinical Platform"
      items={[
        {
          icon: Activity,
          title: "AI Diagnostics",
          desc: "Cough-based respiratory risk analysis",
          color: "black",
          image: "/premium_photo-1745378835073-07d1c1d446d2.avif",
          visualTitle: "AI-Powered Diagnostic Engine",
          visualLabel: "Core Tech"
        },
        {
            icon: Database,
            title: "Patient Reports",
            desc: "IPFS-backed medical records",
            color: "black",
            image: "public/istockphoto-2234934544-612x612.webp",
            visualTitle: "Secure Decentralized Records",
            visualLabel: "Privacy"
        },
        {
            icon: Languages,
            title: "Multilingual Voice",
            desc: "Telugu, Hindi & English",
            color: "black",
            image: "public/photo-1564325724739-bae0bd08762c.avif",
            visualTitle: "Native Language Interaction",
            visualLabel: "Accessibility"
        },
        {
            icon: Smartphone,
            title: "Offline Screening",
            desc: "Edge-ready for rural deployment",
            color: "black",
            image: "public/photo-1682706841297-5524ba1faa9c.avif",
            visualTitle: "Zero-Latency Edge Compute",
            visualLabel: "Offline Mode"
        }
      ]}
      defaultImage="/premium_photo-1745378835073-07d1c1d446d2.avif"
    />
  </NavLink>

  {/* Solutions */}
  <NavLink
    title="Solutions"
    id="solutions"
    activeTab={activeTab}
    setActiveTab={setActiveTab}
    width="w-[850px]"
    textColor={useDarkText ? "text-gray-700" : "text-white/90"}
  >
    <MegaMenuLayout
      title="Healthcare Use Cases"
      items={[
        {
            icon: Stethoscope,
            title: "For Clinicians",
            desc: "Hospital-grade screening & analytics",
            color: "black",
            image: "public/photo-1576086085526-0de1930a57c7.avif",
            visualTitle: "Clinical Decision Support",
            visualLabel: "Hospitals"
        },
        {
            icon: Users,
            title: "For ASHA Workers",
            desc: "Voice-only field diagnostics",
            color: "black",
            image: "public/premium_photo-1764688009700-68837c84150f.avif",
            visualTitle: "Empowering Field Workers",
            visualLabel: "Rural Health"
        },
        {
            icon: Globe,
            title: "Public Health Programs",
            desc: "Population-level surveillance",
            color: "black",
            image: "public/photo-1743767587847-08c42b31cdec.avif",
            visualTitle: "Population-Scale Analytics",
            visualLabel: "Government"
        },
        {
            icon: Mic,
            title: "Research Institutions",
            desc: "Vocal biomarker datasets",
            color: "black",
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2670&auto=format&fit=crop",
            visualTitle: "Accelerating Respiratory Research",
            visualLabel: "R&D"
        }
      ]}
      visual={
        <LargeFeatureCard
          title="Designed for India’s Healthcare System"
          activeLabel="Impact"
         
          
          
        />
      }
    />
  </NavLink>

  {/* Simple Links (No Mega Menu) */}
  <a
    href="#"
    className={`px-6 py-2.5 text-[15px] font-bold border border-transparent rounded-full transition-all hover:shadow-sm hover:-translate-y-0.5
      ${useDarkText 
        ? "text-gray-700 bg-gray-50/50 hover:bg-white hover:border-gray-200" 
        : "text-white/90 bg-white/10 hover:bg-white/20 hover:border-white/30"
      }
    `}
  >
    AI Engine
  </a>

  <a
    href="#"
    className={`px-6 py-2.5 text-[15px] font-bold border border-transparent rounded-full transition-all hover:shadow-sm hover:-translate-y-0.5
      ${useDarkText 
        ? "text-gray-700 bg-gray-50/50 hover:bg-white hover:border-gray-200" 
        : "text-white/90 bg-white/10 hover:bg-white/20 hover:border-white/30"
      }
    `}
  >
    Research
  </a>

  <a
    href="/about"
    className={`px-6 py-2.5 text-[15px] font-bold border border-transparent rounded-full transition-all hover:shadow-sm hover:-translate-y-0.5
      ${useDarkText 
        ? "text-gray-700 bg-gray-50/50 hover:bg-white hover:border-gray-200" 
        : "text-white/90 bg-white/10 hover:bg-white/20 hover:border-white/30"
      }
    `}
  >
    About
  </a>

</div>

                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-4">
                        <a href="/auth/login" className={`hidden sm:block text-sm font-bold transition-colors px-4 ${useDarkText ? "text-gray-600 hover:text-black" : "text-white/80 hover:text-white"}`}>
                            Log in
                        </a>
                        <Button variant="shiny" className="hidden lg:flex h-9 px-6 text-[13px] tracking-wide uppercase rounded-full group">
                            Get Demo
                            <Sparkles size={14} className="ml-2 group-hover:rotate-12 transition-transform text-orange-400" />
                        </Button>
                        <button 
                            className={`lg:hidden group flex items-center gap-2 px-4 py-2 rounded-full transition-all active:scale-95
                              ${useDarkText ? "bg-gray-100/50 hover:bg-gray-100" : "bg-white/10 hover:bg-white/20"}
                            `}
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className={`text-xs font-bold uppercase tracking-wider ${useDarkText ? "text-gray-600" : "text-white"}`}>Menu</span>
                            <div className="p-1 bg-white rounded-full shadow-sm">
                                <Menu size={16} className="text-gray-900" />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        </>
    );
};
