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
            {typeof window !== 'undefined' && window.innerWidth >= 1024 && (
                <>
                    <SideDecoration side="left" variant="dune1" mode="sandworm" className="left-0 top-10" />
                    <SideDecoration side="right" variant="dune2" mode="sandworm" className="right-0 top-40" />
                </>
            )}

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="flex flex-col items-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-dune text-2xl md:text-3xl lg:text-4xl font-bold text-dune-copper tracking-[0.2em] uppercase"
                    >
                        {t.projects.title}
                    </motion.h2>
                    <div className="h-1 w-24 bg-dune-orange rounded-full"></div>
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
                            <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                {/* Front Face */}
                                <div className="absolute inset-0 [backface-visibility:hidden] bg-dune-base/40 backdrop-blur-md border border-dune-copper/20 rounded-xl p-6 flex flex-col justify-center items-center text-center shadow-lg group-hover:shadow-[0_0_30px_rgba(255,85,0,0.15)]">
                                    <div className="h-2 w-full absolute top-0 left-0 bg-gradient-to-r from-dune-copper to-dune-orange opacity-50 rounded-t-xl" />

                                    <h3 className="text-2xl font-bold text-dune-sand mb-2 group-hover:text-dune-orange transition-colors duration-300">
                                        {project.title}
                                    </h3>

                                    <div className="w-12 h-1 bg-dune-orange/50 rounded-full my-4" />

                                    <p className="text-dune-copper font-medium text-lg mb-6">
                                        {project.theme}
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-2 mt-auto">
                                        {project.tags.map((tag, idx) => (
                                            <Badge key={idx} variant="outline" className="border-dune-copper/30 text-dune-copper/80 text-xs rounded-md">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Back Face */}
                                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-dune-base/90 backdrop-blur-xl border border-dune-orange/50 rounded-xl p-8 flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(255,85,0,0.2)]">
                                    <h3 className="text-xl font-bold text-dune-orange mb-4">
                                        {t.projects.details}
                                    </h3>

                                    <p className="text-dune-sand/90 text-lg leading-relaxed mb-8">
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
