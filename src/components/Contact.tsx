import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

const Contact = () => {
    return (
        <section id="contact" className="py-24 w-full container mx-auto px-6 max-w-5xl mb-20">
            <div className="flex flex-col items-center mb-16 space-y-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-dune text-4xl font-bold text-dune-copper tracking-[0.2em] uppercase"
                >
                    Contact
                </motion.h2>
                <div className="h-1 w-24 bg-dune-orange rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8 text-dune-sand/80"
                >
                    <p className="text-lg leading-relaxed font-light">
                        Intéressé par une collaboration ou simplement envie d'échanger sur l'IA et les sciences cognitives ?
                        <br />
                        <span className="text-dune-orange font-bold">L'avenir s'écrit ensemble.</span>
                    </p>

                    <div className="space-y-6">
                        <a href="mailto:contact@example.com" className="flex items-center gap-4 group">
                            <div className="p-3 rounded-full bg-dune-copper/10 text-dune-orange group-hover:bg-dune-orange group-hover:text-white transition-all duration-300">
                                <Mail size={24} />
                            </div>
                            <span className="group-hover:text-dune-orange transition-colors">contact@example.com</span>
                        </a>

                        <div className="flex gap-4 pt-4">
                            {[Linkedin, Github, Twitter].map((Icon, idx) => (
                                <a key={idx} href="#" className="p-3 rounded-full bg-dune-copper/10 text-dune-copper hover:bg-dune-orange hover:text-white hover:scale-110 transition-all duration-300">
                                    <Icon size={24} />
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6 bg-dune-base/30 p-8 rounded-2xl border border-dune-copper/10"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="space-y-2">
                        <Input
                            placeholder="Votre Nom"
                            className="bg-dune-base/50 border-dune-copper/20 focus:border-dune-orange focus:ring-1 focus:ring-dune-orange text-dune-sand placeholder:text-dune-sand/30 rounded-lg h-12 transition-all duration-300"
                        />
                    </div>
                    <div className="space-y-2">
                        <Input
                            type="email"
                            placeholder="Votre Email"
                            className="bg-dune-base/50 border-dune-copper/20 focus:border-dune-orange focus:ring-1 focus:ring-dune-orange text-dune-sand placeholder:text-dune-sand/30 rounded-lg h-12 transition-all duration-300"
                        />
                    </div>
                    <div className="space-y-2">
                        <Textarea
                            placeholder="Votre Message"
                            className="bg-dune-base/50 border-dune-copper/20 focus:border-dune-orange focus:ring-1 focus:ring-dune-orange text-dune-sand placeholder:text-dune-sand/30 rounded-lg min-h-[150px] transition-all duration-300"
                        />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-dune-copper to-dune-orange text-white hover:shadow-[0_0_20px_rgba(255,85,0,0.4)] hover:scale-[1.02] transition-all duration-300 rounded-lg h-12 font-bold tracking-widest uppercase">
                        Envoyer le message
                    </Button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;
