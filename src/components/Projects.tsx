import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import SideDecoration from "./SideDecoration";

const Projects = () => {
    const { t } = useLanguage();
    const projects = t.projects.items;

    return (
        <section id="projets" className="py-24 w-full relative overflow-hidden">
            {/* Side Decorations - Desktop Only */}
            <div className="hidden lg:block">
                <SideDecoration side="left" variant="dune1" mode="sandworm" className="absolute left-0 top-10" />
                <SideDecoration side="right" variant="dune2" mode="sandworm" className="absolute right-0 top-40" />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="flex flex-col items-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-theme-primary tracking-[0.2em] uppercase"
                    >
                        {t.projects.title}
                    </motion.h2>
                    <div className="h-1 w-24 bg-theme-accent rounded-full"></div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group h-[350px] [perspective:1000px]"
                            style={{ willChange: "opacity, transform" }}
                        >
                            <div className="relative w-full h-full cursor-pointer transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                {/* Front Face */}
                                <div className="absolute inset-0 [backface-visibility:hidden] bg-theme-base/40 backdrop-blur-md border border-theme-primary/20 rounded-xl p-6 flex flex-col justify-center items-center text-center shadow-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(255,85,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.05)]">
                                    <div className="h-2 w-full absolute top-0 left-0 bg-gradient-to-r from-theme-primary to-theme-accent opacity-50 rounded-t-xl" />

                                    <h3 className="text-2xl font-bold text-theme-surface mb-2 group-hover:text-theme-accent transition-colors duration-300">
                                        {project.title}
                                    </h3>

                                    <div className="w-12 h-1 bg-theme-accent/50 rounded-full my-4" />

                                    <p className="text-theme-primary font-medium text-lg mb-6">
                                        {project.theme}
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-2 mt-auto">
                                        {project.tags.map((tag, idx) => (
                                            <Badge key={idx} variant="outline" className="border-theme-primary/30 text-theme-primary/80 text-xs rounded-md">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Back Face */}
                                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-theme-base/90 backdrop-blur-xl border border-theme-accent/50 rounded-xl p-8 flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(255,85,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.05)]">
                                    <h3 className="text-xl font-bold text-theme-accent mb-4">
                                        {t.projects.details}
                                    </h3>

                                    <p className="text-theme-surface/90 text-lg leading-relaxed mb-8">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
