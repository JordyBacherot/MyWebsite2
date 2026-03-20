import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const DesertParallax = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Parallax transforms
    // Background moves slowest
    const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    // Middle moves medium speed
    const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
    // Front moves fastest
    const yFront = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);

    return (
        <div ref={ref} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {/* Vignette Gradients (Smooth transition to page background) */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-theme-base to-transparent z-40" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-theme-base to-transparent z-40" />

            {/* Layer 1: Back Dunes (Darkest, Slowest) */}
            <motion.div
                style={{ y: yBack, willChange: "transform" }}
                className="absolute bottom-0 left-0 w-full h-[75%] md:h-[105%] z-10"
            >
                <svg viewBox="0 0 1440 320" className="w-full h-full preserve-3d" preserveAspectRatio="xMidYMax slice">
                    <path
                        fill="#8a4c22" // Darker rust
                        fillOpacity="0.5"
                        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </motion.div>

            {/* Layer 1.5: Realistic Mountain (Left side feature) */}
            <motion.div
                style={{ y: yMid, willChange: "transform" }}
                className="absolute bottom-[-5%] left-[-5%] w-[120%] sm:w-[90%] md:w-[60%] lg:w-[45%] z-[15]"
            >
                <svg viewBox="0 0 500 500" className="w-full h-auto drop-shadow-2xl" preserveAspectRatio="xMinYMax meet">
                    {/* Mountain Base (Darkest) */}
                    <path
                        fill="#3e2723" // Very dark brown
                        d="M0,500 L0,150 L50,120 L100,180 L150,100 L220,250 L280,200 L350,350 L420,300 L500,500 Z"
                    />
                    {/* Mountain Mid-tones (Texture/Volume) */}
                    <path
                        fill="#5d4037" // Dark brown
                        d="M0,500 L0,180 L40,160 L80,220 L120,150 L180,280 L240,240 L300,380 L350,350 L400,500 Z"
                        opacity="0.8"
                    />
                    {/* Mountain Highlights (Light hitting the peaks) */}
                    <path
                        fill="#8d6e63" // Lighter brown
                        d="M50,120 L65,140 L40,160 Z M150,100 L165,130 L120,150 Z M280,200 L290,220 L240,240 Z"
                        opacity="0.6"
                    />
                </svg>
            </motion.div>

            {/* Layer 2: Middle Dunes (Medium, Medium Speed) */}
            <motion.div
                style={{ y: yMid, willChange: "transform" }}
                className="absolute bottom-0 left-0 w-full h-[65%] md:h-[90%] z-20"
            >
                <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
                    <path
                        fill="#b56d3b" // Medium rust/orange
                        fillOpacity="0.9"
                        d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,170.7C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </motion.div>

            {/* Layer 3: Front Dunes (Lightest, Fastest) */}
            <motion.div
                style={{ y: yFront, willChange: "transform" }}
                className="absolute bottom-0 left-0 w-full h-[50%] md:h-[70%] z-30"
            >
                <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
                    <path
                        fill="#d47f46" // Lightest orange
                        fillOpacity="1"
                        d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,122.7C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
                {/* Gradient overlay for smooth transition to page background */}
                <div className="absolute -bottom-1 left-0 w-full h-48 bg-gradient-to-t from-theme-base via-theme-base/90 to-transparent" />
            </motion.div>
        </div>
    );
};

export default DesertParallax;
