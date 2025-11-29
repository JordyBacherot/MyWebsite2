import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { scrollYProgress } = useScroll();
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className="min-h-screen bg-dune-base text-dune-sand font-sans selection:bg-dune-orange selection:text-white overflow-x-hidden relative transition-colors duration-500">
            {/* Dynamic Background */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-0 opacity-20"
                style={{
                    y: backgroundY,
                    background: 'radial-gradient(circle at 50% 50%, rgba(184, 115, 51, 0.15) 0%, rgba(15, 10, 10, 0) 70%)'
                }}
            />

            {/* Grain Effect */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay z-50"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            <header className="fixed top-0 left-0 right-0 z-40 bg-dune-base/80 backdrop-blur-md border-b border-dune-copper/10 transition-colors duration-500">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xl font-bold tracking-[0.3em] text-dune-copper uppercase font-dune"
                    >
                        Portfolio
                    </motion.div>
                    <div className="flex items-center gap-8">
                        <nav className="hidden md:flex space-x-8 text-sm tracking-widest uppercase">
                            {['Profil', 'Parcours', 'Competences', 'Projets', 'Contact'].map((item, index) => {
                                const targetId = item.toLowerCase().replace('é', 'e');
                                return (
                                    <motion.a
                                        key={item}
                                        href={`#${targetId}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="hover:text-dune-orange transition-colors duration-300 relative group font-dune text-xs"
                                    >
                                        {item}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dune-orange transition-all duration-300 group-hover:w-full"></span>
                                    </motion.a>
                                );
                            })}
                        </nav>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="text-dune-copper hover:text-dune-orange hover:bg-dune-copper/10 rounded-full transition-all duration-300"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </Button>
                    </div>
                </div>
            </header>

            <main className="w-full relative z-10 flex flex-col items-center pt-24 pb-12">
                {children}
            </main>

            <footer className="border-t border-dune-copper/10 py-8 text-center text-dune-sand/50 text-xs tracking-widest uppercase relative z-10">
                <p>&copy; {new Date().getFullYear()} - Architecte de l'Esprit & du Code</p>
            </footer>
        </div>
    );
};

export default Layout;
