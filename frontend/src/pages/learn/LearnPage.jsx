import { motion } from "framer-motion";
import { BookOpen, AlertTriangle, Shield, CheckCircle2 } from "lucide-react";

export default function LearnPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">Awareness & Learning</h1>
                <p className="text-slate-500 mt-1">Understanding asthma, symptoms, and prevention</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4 md:space-y-6">
                    <ArticleCard 
                        title="What is Asthma?" 
                        icon={<BookOpen className="w-6 h-6 text-blue-600" />}
                        color="bg-blue-50"
                        content="Asthma is a chronic condition that affects the airways in the lungs. The airways become inflamed and narrow and produce extra mucus, which makes it difficult to breathe."
                    />
                     <ArticleCard 
                        title="Common Symptoms" 
                        icon={<AlertTriangle className="w-6 h-6 text-orange-600" />}
                        color="bg-orange-50"
                        content={
                            <ul className="list-disc list-inside space-y-2 mt-2">
                                <li>Shortness of breath</li>
                                <li>Chest tightness or pain</li>
                                <li>Wheezing when exhaling</li>
                                <li>Trouble sleeping caused by shortness of breath</li>
                            </ul>
                        }
                    />
                </div>
                
                 <div className="space-y-4 md:space-y-6">
                    <ArticleCard 
                        title="Prevention & Management" 
                        icon={<Shield className="w-6 h-6 text-green-600" />}
                        color="bg-green-50"
                        content="While asthma cannot be cured, its symptoms can be controlled. Identify and avoid asthma triggers, take medication as prescribed, and monitor your breathing."
                    />
                     <ArticleCard 
                        title="When to Seek Help" 
                        icon={<CheckCircle2 className="w-6 h-6 text-purple-600" />}
                        color="bg-purple-50"
                        content="Seek emergency medical treatment if you have: Rapid worsening of shortness of breath or wheezing, or no improvement even after using a quick-relief inhaler."
                    />
                </div>
            </div>

             <div className="bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">Need More Information?</h2>
                    <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm md:text-base">Access our complete library of resources, video tutorials, and local language guides.</p>
                    <button className="px-6 py-3 md:px-8 md:py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors w-full md:w-auto">
                        View Resource Library
                    </button>
                </div>
                
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/2" />
            </div>
        </div>
    );
}

function ArticleCard({ title, icon, color, content }) {
    return (
        <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all"
        >
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${color} flex items-center justify-center mb-4 md:mb-6`}>
                {icon}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-4">{title}</h3>
            <div className="text-sm md:text-base text-slate-600 leading-relaxed">
                {content}
            </div>
        </motion.div>
    )
}
