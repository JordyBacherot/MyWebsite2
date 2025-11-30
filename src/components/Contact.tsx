import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Linkedin, Github, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import SideDecoration from "./SideDecoration";

const Contact = () => {
    const { t } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax 3D effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

    // Generate sand particles
    useEffect(() => {
        const newParticles = Array.from({ length: 25 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <section id="contact" className="py-24 w-full mb-20 relative overflow-hidden">
            <SideDecoration side="left" variant="dune1" mode="storm" className="left-0 top-10" />
            <SideDecoration side="right" variant="dune2" mode="storm" className="right-0 top-40" />

            {/* Sand Storm Background Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute w-1 h-1 bg-dune-copper rounded-full"
                        initial={{ x: `${particle.x}%`, y: `${particle.y}%`, opacity: 0 }}
                        animate={{
                            x: [`${particle.x}%`, `${particle.x + 20}%`, `${particle.x}%`],
                            y: [`${particle.y}%`, `${particle.y + 30}%`, `${particle.y}%`],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: 8 + particle.delay,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="flex flex-col items-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-dune text-2xl md:text-3xl lg:text-4xl font-bold text-dune-copper tracking-[0.2em] uppercase"
                    >
                        {t.contact.title}
                    </motion.h2>
                    <div className="h-1 w-24 bg-dune-orange rounded-full"></div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center text-dune-sand/70 max-w-2xl text-lg"
                    >
                        {t.contact.subtitle}
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    {/* Left side - Info cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-6"
                    >

                        {/* Social links card */}
                        <motion.div
                            whileHover={{ scale: 1.03, y: -5 }}
                            className="bg-gradient-to-br from-dune-copper/10 to-dune-orange/5 p-6 rounded-2xl border border-dune-copper/20 backdrop-blur-sm hover:border-dune-orange/40 transition-all duration-500"
                        >
                            <h3 className="font-bold text-dune-copper mb-4 tracking-wider">{t.contact.networks}</h3>
                            <div className="flex gap-3">
                                {[
                                    { Icon: Linkedin, label: "LinkedIn" },
                                    { Icon: Github, label: "GitHub" },
                                ].map(({ Icon, label }, idx) => (
                                    <motion.a
                                        key={idx}
                                        href="#"
                                        whileHover={{ scale: 1.15, rotate: 10 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-3 rounded-full bg-dune-copper/20 text-dune-copper hover:bg-dune-orange hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(210,144,38,0.5)]"
                                        aria-label={label}
                                    >
                                        <Icon size={24} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quote card */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-dune-orange/10 to-transparent p-6 rounded-2xl border border-dune-orange/20 italic"
                        >
                            <p className="text-dune-glow text-sm leading-relaxed">
                                "{t.contact.quote}"
                            </p>
                            <p className="text-dune-copper/60 text-xs mt-2 text-right">{t.contact.quoteAuthor}</p>
                        </motion.div>
                    </motion.div>

                    {/* Right side - Floating 3D Form */}
                    <motion.div
                        ref={containerRef}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => {
                            setIsHovered(false);
                            mouseX.set(0);
                            mouseY.set(0);
                        }}
                        style={{ perspective: 1000 }}
                    >
                        <motion.div
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d",
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <form
                                className="relative bg-gradient-to-br from-dune-base/40 to-dune-copper/5 p-8 md:p-10 rounded-3xl border-2 border-dune-copper/30 backdrop-blur-md shadow-2xl"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                {/* Spice glow effect */}
                                <motion.div
                                    className="absolute -inset-1 bg-gradient-to-r from-dune-orange/20 via-dune-copper/20 to-dune-orange/20 rounded-3xl blur-xl -z-10"
                                    animate={{
                                        opacity: isHovered ? 0.8 : 0.3,
                                        scale: isHovered ? 1.05 : 1,
                                    }}
                                    transition={{ duration: 0.5 }}
                                />

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-dune-copper font-bold flex items-center gap-2">
                                            <span className="w-2 h-2 bg-dune-orange rounded-full animate-pulse"></span>
                                            {t.contact.formLabels.identity}
                                        </label>
                                        <Input
                                            placeholder={t.contact.placeholders.name}
                                            className="bg-dune-base/70 border-dune-copper/30 focus:border-dune-orange focus:ring-2 focus:ring-dune-orange/50 text-dune-sand placeholder:text-dune-sand/40 rounded-xl h-14 transition-all duration-300 hover:border-dune-orange/50"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-dune-copper font-bold flex items-center gap-2">
                                            <span className="w-2 h-2 bg-dune-orange rounded-full animate-pulse"></span>
                                            {t.contact.formLabels.coordinates}
                                        </label>
                                        <Input
                                            type="email"
                                            placeholder={t.contact.placeholders.email}
                                            className="bg-dune-base/70 border-dune-copper/30 focus:border-dune-orange focus:ring-2 focus:ring-dune-orange/50 text-dune-sand placeholder:text-dune-sand/40 rounded-xl h-14 transition-all duration-300 hover:border-dune-orange/50"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-dune-copper font-bold flex items-center gap-2">
                                            <span className="w-2 h-2 bg-dune-orange rounded-full animate-pulse"></span>
                                            {t.contact.formLabels.transmission}
                                        </label>
                                        <Textarea
                                            placeholder={t.contact.placeholders.message}
                                            className="bg-dune-base/70 border-dune-copper/30 focus:border-dune-orange focus:ring-2 focus:ring-dune-orange/50 text-dune-sand placeholder:text-dune-sand/40 rounded-xl min-h-[160px] transition-all duration-300 hover:border-dune-orange/50 resize-none"
                                        />
                                    </div>

                                    {/* Stylized submit button */}
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-dune-copper via-dune-orange to-dune-copper bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold tracking-[0.3em] uppercase rounded-xl h-14 text-sm relative overflow-hidden group transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_rgba(210,144,38,0.6)]"
                                        >
                                            {/* Animated background */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                animate={{
                                                    x: ["-100%", "100%"],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                            />
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                <Send size={18} />
                                                {t.contact.submit}
                                            </span>
                                        </Button>
                                    </motion.div>

                                    {/* Footer note */}
                                    <p className="text-center text-xs text-dune-sand/50 italic pt-2">
                                        {t.contact.footerNote}
                                    </p>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
