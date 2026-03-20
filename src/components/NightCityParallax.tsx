import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const NightCityParallax: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const cityBackY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
    const cityMidY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
    const cityFrontY = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);

    return (
        <div ref={ref} className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-b from-theme-base via-black to-theme-primary/10"
                style={{ y: backgroundY }}
            >
                {/* Cyberpunk Neon Grid / Stars abstract */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-20"></div>
            </motion.div>

            {/* Back City Layer */}
            <motion.div
                className="absolute bottom-[10%] left-0 right-0 z-10 w-full h-[70%] flex items-end opacity-80 justify-center"
                style={{ y: cityBackY }}
            >
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-[150%] sm:w-full h-full fill-[#080808]">
                    <path d="M0,320 L0,150 L100,150 L100,50 L200,50 L200,180 L300,180 L300,100 L400,100 L400,220 L500,220 L500,80 L600,80 L600,160 L700,160 L700,40 L800,40 L800,190 L900,190 L900,120 L1000,120 L1000,210 L1100,210 L1100,60 L1200,60 L1200,250 L1300,250 L1300,130 L1440,130 L1440,320 Z"></path>
                </svg>
            </motion.div>

            {/* Mid City Layer */}
            <motion.div
                className="absolute bottom-[0%] left-0 right-0 z-20 w-full h-[80%] flex items-end opacity-95 justify-center"
                style={{ y: cityMidY }}
            >
                <div className="absolute bottom-[20%] w-full h-[1px] bg-theme-primary opacity-50 shadow-[0_0_25px_var(--theme-primary)]"></div>
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-[120%] sm:w-full h-full fill-[#050810] stroke-theme-primary/40 stroke-[1px]">
                    <path d="M0,320 L0,200 L50,200 L50,110 L150,110 L150,230 L250,230 L250,90 L350,90 L350,180 L450,180 L450,130 L550,130 L550,50 L650,50 L650,190 L750,190 L750,140 L850,140 L850,260 L950,260 L950,80 L1050,80 L1050,210 L1150,210 L1150,150 L1250,150 L1250,280 L1350,280 L1350,110 L1440,110 L1440,320 Z"></path>
                </svg>
            </motion.div>

            {/* Front City Layer */}
            <motion.div
                className="absolute bottom-[-10%] left-0 right-0 z-30 w-full h-[90%] flex items-end justify-center"
                style={{ y: cityFrontY, filter: 'drop-shadow(0 -10px 20px rgba(0,240,255,0.2))' }}
            >
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-[110%] sm:w-full h-full fill-[#050505] stroke-theme-accent/60 stroke-[2px]">
                    <path d="M0,320 L0,240 L80,240 L80,150 L180,150 L180,260 L280,260 L280,130 L380,130 L380,210 L480,210 L480,90 L580,90 L580,280 L680,280 L680,160 L780,160 L780,290 L880,290 L880,180 L980,180 L980,250 L1080,250 L1080,120 L1180,120 L1180,220 L1280,220 L1280,100 L1380,100 L1380,270 L1440,270 L1440,320 Z"></path>
                </svg>
            </motion.div>

            {/* Gradient Overlay for bottom blending */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-theme-base to-transparent z-40"></div>
        </div>
    );
};

export default NightCityParallax;
