import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import SandstormEffect from "./SandstormEffect";
import DesertParallax from "./DesertParallax";
import { useLanguage } from "../contexts/LanguageContext";

const Hero = () => {
    const { t } = useLanguage();
    return (
        <section id="profil" className="min-h-[90vh] relative w-full flex flex-col justify-center items-center overflow-hidden">
            {/* Layer 0: Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-dune-orange/10 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* Layer 1: Desert Parallax */}
            <div className="absolute inset-0 z-0">
                <DesertParallax />
            </div>

            {/* Layer 2: Sandstorm Effect (Atmosphere overlay) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <SandstormEffect />
            </div>

            {/* Layer 3: Content Container */}
            <div className="w-full max-w-4xl mx-auto px-4 flex flex-col justify-center items-center text-center space-y-12 relative z-20 -mt-20">
                <div className="space-y-6 relative">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-dune text-6xl md:text-7xl lg:text-8xl text-dune-orange tracking-wider mb-8"
                    >
                        {t.hero.name}
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-lg md:text-xl text-dune-sand/80 leading-relaxed"
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
                    <Button asChild className="bg-dune-orange text-white hover:bg-dune-glow hover:shadow-[0_0_20px_rgba(255,85,0,0.4)] transition-all duration-300 rounded-full px-10 py-7 text-lg tracking-widest uppercase font-bold">
                        <a href="#projets">{t.hero.viewProjects}</a>
                    </Button>
                    <Button asChild variant="outline" className="bg-dune-sand border-dune-copper text-dune-copper hover:bg-dune-copper/10 hover:text-white hover:border-dune-orange transition-all duration-300 rounded-full px-10 py-7 text-lg tracking-widest uppercase font-bold">
                        <a href="#contact">{t.hero.contactMe}</a>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
