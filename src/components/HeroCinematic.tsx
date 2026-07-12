import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import heroVideoWebm from "@/assets/hero/hero-arrakis.webm";
import heroVideoMp4 from "@/assets/hero/hero-arrakis.mp4";
import heroPosterAvif from "@/assets/hero/hero-poster.avif";
import heroPosterWebp from "@/assets/hero/hero-poster.webp";
import heroFinalAvif from "@/assets/hero/hero-final.avif";
import heroFinalWebp from "@/assets/hero/hero-final.webp";

type Phase = "intro" | "video" | "final";

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const HeroCinematic = () => {
    const reducedMotion = useReducedMotion();
    const [phase, setPhase] = useState<Phase>(() => (prefersReducedMotion() ? "final" : "intro"));

    // Micro-parallax au scroll sur le fond permanent
    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 800], [1, 1.08]);
    const y = useTransform(scrollY, [0, 800], [0, 40]);

    useEffect(() => {
        if (phase !== "intro") return;
        // Différé comme les anciens effets canvas : le texte (LCP) peint d'abord
        const timer = setTimeout(() => setPhase("video"), 100);
        return () => clearTimeout(timer);
    }, [phase]);

    return (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            {/* Fond permanent : cible du fondu de fin de vidéo */}
            <motion.div
                className="absolute inset-0"
                style={reducedMotion ? undefined : { scale, y }}
            >
                <picture>
                    <source srcSet={heroFinalAvif} type="image/avif" />
                    <source srcSet={heroFinalWebp} type="image/webp" />
                    <img
                        src={heroFinalWebp}
                        alt=""
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                </picture>
            </motion.div>

            {/* Poster : peint immédiatement, masque le fond permanent jusqu'à la fin de la vidéo */}
            {phase !== "final" && (
                <picture className="absolute inset-0">
                    <source srcSet={heroPosterAvif} type="image/avif" />
                    <source srcSet={heroPosterWebp} type="image/webp" />
                    <img
                        src={heroPosterWebp}
                        alt=""
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                </picture>
            )}

            {/* Vidéo d'intro : jouée une fois, fondu de 0,5 s vers le fond permanent */}
            <AnimatePresence>
                {phase === "video" && (
                    <motion.video
                        key="hero-video"
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        poster={heroPosterWebp}
                        onEnded={() => setPhase("final")}
                        onError={() => setPhase("final")}
                    >
                        <source src={heroVideoWebm} type="video/webm" />
                        <source src={heroVideoMp4} type="video/mp4" />
                    </motion.video>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HeroCinematic;
