import React from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Footer } from '../components/landing/Footer';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF4F18]/30 font-sans">
      <Navbar currentTheme="dark" />
      
      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-24 text-center">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
            >
                Start with a <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">better diagnosis.</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
                CoughLens AI is revolutionizing respiratory healthcare in India by leveraging advanced auditory analysis to detect conditions early, accurately, and accessibly.
            </motion.p>
        </section>

        {/* Mission / Content Grid */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-32">
            <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="relative aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10"
            >
                {/* Abstract Visual */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-32 h-32 rounded-full bg-orange-500 blur-[80px] opacity-60 animate-pulse" />
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                    <div className="p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
                        <h4 className="text-lg font-semibold mb-2">Our Mission</h4>
                        <p className="text-gray-400 text-sm">To bridge the gap in respiratory diagnostic accessibility for rural and urban India alike.</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <h3 className="text-3xl font-bold mb-6">Built for Impact</h3>
                <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                    <p>
                        Respiratory illnesses affect millions, yet early diagnosis remains a challenge in resource-constrained settings. CoughLens AI listens to what the body is saying.
                    </p>
                    <p>
                        By analyzing cough sounds with state-of-the-art machine learning models, we provide clinicians and health workers with an instant "second opinion" — identifying potential risks of TB, COPD, and COVID-19 with just a smartphone.
                    </p>
                    <p>
                        Our platform is designed to work offline, supports multiple Indian languages, and integrates securely with decentralized health records.
                    </p>
                </div>
            </motion.div>
        </section>
        
        {/* Placeholder Team or Stats */}
         <section className="border-t border-white/10 pt-24 mb-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                    <h4 className="text-4xl font-bold text-orange-500 mb-2">95%</h4>
                    <p className="text-gray-500 text-sm uppercase tracking-wider">Accuracy Goal</p>
                </div>
                <div>
                    <h4 className="text-4xl font-bold text-white mb-2">3+</h4>
                    <p className="text-gray-500 text-sm uppercase tracking-wider">Languages</p>
                </div>
                 <div>
                    <h4 className="text-4xl font-bold text-white mb-2">0s</h4>
                    <p className="text-gray-500 text-sm uppercase tracking-wider">Latency Edge AI</p>
                </div>
                 <div>
                    <h4 className="text-4xl font-bold text-white mb-2">24/7</h4>
                    <p className="text-gray-500 text-sm uppercase tracking-wider">Availability</p>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
