
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import SideDecoration from "./SideDecoration";
import SandwormTrail from "./SandwormTrail";

const Skills = () => {
    const { t } = useLanguage();
    const skillCategories = t.skills.categories;

    return (
        <section id="competences" className="py-24 w-full relative overflow-hidden">
            <SideDecoration side="left" variant="mountain" mode="geometry" className="left-0 top-10" />
            <SideDecoration side="right" variant="dune1" mode="geometry" className="right-0 top-40" />
            
            {/* Sandworm Trail Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <SandwormTrail />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="flex flex-col items-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-dune text-4xl font-bold text-dune-copper tracking-[0.2em] uppercase"
                    >
                        {t.skills.title}
                    </motion.h2>
                    <div className="h-1 w-24 bg-dune-orange rounded-full"></div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 group/skills">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-dune-base/30 border border-dune-copper/10 p-8 rounded-2xl hover:bg-dune-base/50 hover:border-dune-orange/30 transition-all duration-500 group-hover/skills:blur-[2px] group-hover/skills:scale-95 hover:!blur-0 hover:!scale-105 hover:z-10"
                        >
                            <h3 className="text-xl text-dune-orange font-bold mb-6 flex items-center">
                                <span className="w-2 h-2 bg-dune-orange rounded-full mr-3 shadow-[0_0_10px_rgba(255,85,0,0.8)]"></span>
                                {category.name}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {category.skills.map((skill, idx) => (
                                    <Badge
                                        key={idx}
                                        variant="secondary"
                                        className="bg-dune-copper/10 text-dune-sand hover:bg-dune-orange hover:text-white transition-all duration-300 rounded-lg px-4 py-2 text-sm cursor-default"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
