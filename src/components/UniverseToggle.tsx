import React from 'react';
import { motion } from 'framer-motion';
import { useUniverse } from '../contexts/UniverseContext';

const UniverseToggle: React.FC = () => {
    const { universe, toggleUniverse } = useUniverse();
    const isCyberpunk = universe === 'cyberpunk';

    return (
        <button
            onClick={toggleUniverse}
            className={`cursor-pointer relative w-16 h-8 rounded-full flex items-center p-1 transition-colors duration-500 border border-theme-primary/30 ${
                isCyberpunk ? 'bg-theme-surface/80' : 'bg-theme-base/80'
            }`}
            aria-label="Toggle Universe"
            title="Switch Universe"
        >
            <motion.div
                className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${
                    isCyberpunk ? 'bg-theme-accent shadow-[0_0_10px_#FF007F]' : 'bg-theme-primary shadow-[0_0_10px_#d17136]'
                }`}
                animate={{
                    x: isCyberpunk ? 32 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <span className="text-[10px] text-white font-bold opacity-80 font-heading">
                    {isCyberpunk ? "CP" : "DN"}
                </span>
            </motion.div>
        </button>
    );
};

export default UniverseToggle;
