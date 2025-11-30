import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { Separator } from "@/components/ui/separator";
import { LanguageProvider } from "@/contexts/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <Layout>
        <Hero />
        <Separator className="my-12 bg-dune-gold/10" />
        <Experience />
        <Separator className="my-12 bg-dune-gold/10" />
        <Skills />
        <Separator className="my-12 bg-dune-gold/10" />
        <Projects />
        <Separator className="my-12 bg-dune-gold/10" />
        <Contact />
      </Layout>
    </LanguageProvider>
  )
}

export default App
