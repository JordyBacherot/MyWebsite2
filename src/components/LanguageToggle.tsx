import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'fr' ? 'en' : 'fr');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="relative px-3 py-1.5 rounded-lg flex items-center justify-center group cursor-pointer bg-dune-copper/10 hover:bg-dune-orange/20 border border-dune-copper/30 hover:border-dune-orange/50 transition-all duration-300"
            aria-label="Toggle language"
        >
            <motion.div
                className="flex items-center gap-1.5"
                initial={false}
                animate={{
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 0.3,
                }}
            >
                <span className="text-dune-copper group-hover:text-dune-orange font-bold text-xs uppercase tracking-wider transition-colors">
                    {language}
                </span>
                <svg
                    className="w-3 h-3 text-dune-copper group-hover:text-dune-orange transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
            </motion.div>
        </button>
    );
};

export default LanguageToggle;
