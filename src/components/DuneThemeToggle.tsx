import React from 'react';
import { motion } from 'framer-motion';

interface DuneThemeToggleProps {
    isDarkMode: boolean;
    onToggle: () => void;
}

const DuneThemeToggle: React.FC<DuneThemeToggleProps> = ({ isDarkMode, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className="relative w-16 h-16 rounded-full flex items-center justify-center overflow-visible group cursor-pointer bg-transparent border-2 border-dune-copper/20 hover:border-dune-orange/40 transition-all duration-500"
            aria-label="Toggle theme"
        >
            {/* Container for the planet and sun */}
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Sun behind the planet (first half of orbit - top arc) */}
                {!isDarkMode && (
                    <motion.div
                        className="absolute z-0"
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            width: '200%',
                            height: '200%',
                        }}
                    >
                        <motion.div
                            className="absolute top-0 left-1/2 -translate-x-1/2"
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0, 1, 1, 0, 0], // Visible during top half of orbit
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear",
                                times: [0, 0.25, 0.5, 0.75, 1]
                            }}
                        >
                            {/* Sun Glow */}
                            <div
                                className="absolute inset-0 rounded-full blur-md"
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    background: 'radial-gradient(circle, rgba(255, 223, 0, 0.5) 0%, rgba(255, 183, 77, 0.2) 50%, transparent 70%)',
                                    transform: 'translate(-50%, -50%)',
                                    top: '50%',
                                    left: '50%'
                                }}
                            />
                            
                            {/* Sun Body - Simple sphere */}
                            <div
                                className="relative w-4 h-4 rounded-full shadow-lg"
                                style={{
                                    background: 'radial-gradient(circle at 35% 35%, #ffeb3b 0%, #ffc107 50%, #ff9800 100%)',
                                }}
                            >
                                {/* Sun highlight */}
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6) 0%, transparent 50%)'
                                    }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Dune Planet - Always visible */}
                <motion.div
                    className="relative z-10"
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {/* Planet Glow */}
                    <motion.div
                        className="absolute inset-0 rounded-full blur-xl"
                        animate={{
                            opacity: isDarkMode ? [0.3, 0.5, 0.3] : [0.5, 0.7, 0.5],
                            scale: isDarkMode ? [1, 1.1, 1] : [1.1, 1.2, 1.1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            background: isDarkMode 
                                ? 'radial-gradient(circle, rgba(184, 115, 51, 0.6) 0%, transparent 70%)'
                                : 'radial-gradient(circle, rgba(255, 183, 77, 0.8) 0%, transparent 70%)'
                        }}
                    />
                    
                    {/* Planet Body */}
                    <div className="relative w-7 h-7 rounded-full overflow-hidden shadow-2xl">
                        {/* Base gradient */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: isDarkMode
                                    ? 'radial-gradient(circle at 30% 30%, #d4a574 0%, #b87333 40%, #8b6332 100%)'
                                    : 'radial-gradient(circle at 30% 30%, #f4d9a8 0%, #d4a574 40%, #b87333 100%)'
                            }}
                        />
                        
                        {/* Texture overlay - sand dunes effect */}
                        <motion.div
                            className="absolute inset-0 opacity-40"
                            style={{
                                backgroundImage: `
                                    repeating-linear-gradient(
                                        45deg,
                                        transparent,
                                        transparent 2px,
                                        rgba(0, 0, 0, 0.1) 2px,
                                        rgba(0, 0, 0, 0.1) 4px
                                    ),
                                    repeating-linear-gradient(
                                        -45deg,
                                        transparent,
                                        transparent 3px,
                                        rgba(0, 0, 0, 0.05) 3px,
                                        rgba(0, 0, 0, 0.05) 6px
                                    )
                                `
                            }}
                        />
                        
                        {/* Crater spots */}
                        <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-black/20" />
                        <div className="absolute top-3 right-1 w-1.5 h-1.5 rounded-full bg-black/15" />
                        <div className="absolute bottom-1 left-2 w-1 h-1 rounded-full bg-black/25" />
                        
                        {/* Highlight shine */}
                        <div
                            className="absolute top-0 left-0 w-full h-full"
                            style={{
                                background: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)'
                            }}
                        />
                        
                        {/* Shadow side */}
                        <div
                            className="absolute top-0 right-0 w-full h-full"
                            style={{
                                background: 'radial-gradient(circle at 100% 50%, rgba(0, 0, 0, 0.5) 0%, transparent 60%)'
                            }}
                        />
                    </div>
                </motion.div>

                {/* Sun in front of the planet (second half of orbit - bottom arc) */}
                {!isDarkMode && (
                    <motion.div
                        className="absolute z-20"
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            width: '200%',
                            height: '200%',
                        }}
                    >
                        <motion.div
                            className="absolute top-0 left-1/2 -translate-x-1/2"
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0, 0, 1, 1, 0], // Visible during bottom half of orbit
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear",
                                times: [0, 0.25, 0.5, 0.75, 1]
                            }}
                        >
                            {/* Sun Glow */}
                            <div
                                className="absolute inset-0 rounded-full blur-md"
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    background: 'radial-gradient(circle, rgba(255, 223, 0, 0.6) 0%, rgba(255, 183, 77, 0.3) 50%, transparent 70%)',
                                    transform: 'translate(-50%, -50%)',
                                    top: '50%',
                                    left: '50%'
                                }}
                            />
                            
                            {/* Sun Body - Simple sphere */}
                            <div
                                className="relative w-4 h-4 rounded-full shadow-xl"
                                style={{
                                    background: 'radial-gradient(circle at 35% 35%, #ffeb3b 0%, #ffc107 50%, #ff9800 100%)',
                                }}
                            >
                                {/* Sun highlight */}
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6) 0%, transparent 50%)'
                                    }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>

            {/* Hover effect - orbital ring */}
            <motion.div
                className="absolute inset-0 rounded-full border border-dune-orange/0 group-hover:border-dune-orange/30 transition-all duration-500"
                whileHover={{
                    scale: 1.05,
                    borderColor: 'rgba(184, 115, 51, 0.5)',
                }}
            />
        </button>
    );
};

export default DuneThemeToggle;
