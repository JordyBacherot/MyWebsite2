import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import SandstormEffect from "./SandstormEffect";
import DesertParallax from "./DesertParallax";
import NightCityParallax from "./NightCityParallax";
import CyberRainEffect from "./CyberRainEffect";
import { useLanguage } from "../contexts/LanguageContext";
import { useUniverse } from "../contexts/UniverseContext";
import { useState, useEffect } from "react";

const Hero = () => {
    const { t } = useLanguage();
    const { universe } = useUniverse();
    const [showEffects, setShowEffects] = useState(false);

    useEffect(() => {
        // Defer heavy effects to allow LCP (text) to paint first
        const timer = setTimeout(() => {
            setShowEffects(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="profil" className="min-h-[90vh] relative w-full flex flex-col justify-center items-center overflow-hidden">
            {/* Layer 0: Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-theme-accent/10 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* Layer 1: Parallax Background */}
            <div className="absolute inset-0 z-0">
                {showEffects && (universe === 'dune' ? <DesertParallax /> : <NightCityParallax />)}
            </div>

            {/* Layer 2: Atmosphere overlay (Sandstorm / Cyber Rain) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {showEffects && (universe === 'dune' ? <SandstormEffect /> : <CyberRainEffect />)}
            </div>

            {/* Layer 3: Content Container */}
            <div className="w-full max-w-4xl mx-auto px-4 flex flex-col justify-center items-center text-center space-y-12 relative z-20 -mt-20">
                <div className="space-y-6 relative">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-heading text-3xl md:text-5xl lg:text-7xl font-bold text-theme-primary mb-4 tracking-[0.1em] uppercase"
                    >
                        {t.hero.name}
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-lg md:text-xl text-theme-surface drop-shadow-md font-medium leading-relaxed"
                    >
                        {t.hero.description}
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col md:flex-row gap-6"
                >
                    <Button asChild className="bg-theme-accent text-white hover:bg-theme-glow hover:animate-spice-glow transition-all duration-300 rounded-full px-10 py-7 text-lg tracking-widest uppercase font-bold">
                        <a href="#projets">{t.hero.viewProjects}</a>
                    </Button>
                    <Button asChild variant="outline" className="bg-theme-base border-theme-primary text-theme-primary hover:bg-theme-primary/10 hover:text-theme-surface hover:border-theme-accent transition-all duration-300 rounded-full px-10 py-7 text-lg tracking-widest uppercase font-bold">
                        <a href="#contact">{t.hero.contactMe}</a>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
