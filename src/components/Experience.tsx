import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const Experience = () => {
    const experiences = [
        {
            title: "Master en Sciences Cognitives",
            organization: "IDMC",
            period: "2023 - Présent",
            description: "Spécialisation en Intelligence Artificielle et Ingénierie Linguistique.",
            type: "Académique"
        },
        {
            title: "Alternance Data Scientist",
            organization: "Entreprise Innovante",
            period: "2024 - Présent",
            description: "Développement de modèles prédictifs et intégration de solutions d'IA générative.",
            type: "Professionnel"
        },
        {
            title: "Licence MIASHS",
            organization: "Université de Lorraine",
            period: "2020 - 2023",
            description: "Mathématiques et Informatique Appliquées aux Sciences Humaines et Sociales.",
            type: "Académique"
        }
    ];

    return (
        <section id="parcours" className="py-24 w-full container mx-auto px-6 max-w-5xl">
            <div className="flex flex-col items-center mb-16 space-y-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-dune text-4xl font-bold text-dune-copper tracking-[0.2em] uppercase"
                >
                    Parcours
                </motion.h2>
                <div className="h-1 w-24 bg-dune-orange rounded-full"></div>
            </div>

            <div className="relative border-l-2 border-dune-copper/20 ml-4 md:ml-1/2 space-y-12">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="relative pl-8 md:pl-12"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-dune-base border-2 border-dune-orange shadow-[0_0_10px_rgba(255,85,0,0.5)]"></div>

                        {/* Spice Glow Card Wrapper */}
                        <div className="relative group/card transition-all duration-500 hover:scale-[1.02] hover:z-10">
                            {/* Gradient Border/Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-dune-orange via-dune-copper to-dune-base rounded-xl opacity-0 group-hover/card:opacity-100 transition-all duration-500 blur-[1px] group-hover/card:blur-sm group-hover/card:shadow-[0_0_30px_rgba(210,144,38,0.4)]" />

                            {/* Inner Content */}
                            <div className="relative bg-dune-base/40 backdrop-blur-sm border border-dune-copper/20 rounded-xl p-[1px] overflow-hidden group-hover/card:bg-dune-base group-hover/card:border-transparent transition-colors duration-500">
                                <div className="relative bg-dune-base/40 group-hover/card:bg-dune-base rounded-xl p-6 transition-all duration-300">
                                    <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
                                        <div>
                                            <h3 className="text-xl text-dune-sand font-bold group-hover/card:text-dune-orange transition-colors duration-300">
                                                {exp.title}
                                            </h3>
                                            <p className="text-dune-copper mt-1 font-medium">{exp.organization}</p>
                                        </div>
                                        <Badge variant="outline" className="border-dune-orange text-dune-orange rounded-full px-3 py-1 uppercase tracking-wider text-xs shadow-[0_0_10px_rgba(255,85,0,0.2)] group-hover/card:shadow-[0_0_15px_rgba(255,85,0,0.6)] transition-shadow duration-300">
                                            {exp.period}
                                        </Badge>
                                    </div>
                                    <p className="text-dune-sand/70 mb-4 group-hover/card:text-dune-sand/90 transition-colors duration-300">{exp.description}</p>
                                    <Badge className="bg-dune-copper/10 text-dune-copper group-hover/card:bg-dune-copper/20 rounded-full uppercase text-xs tracking-widest transition-colors duration-300">
                                        {exp.type}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
