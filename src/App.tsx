import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { Separator } from "@/components/ui/separator";
import { LanguageProvider } from "@/contexts/LanguageContext";
import SandwormTrail from "@/components/SandwormTrail";

function App() {
  return (
    <LanguageProvider>
      <Layout>
        <Hero />
        <Separator className="my-12 bg-dune-gold/10" />
        
        {/* Global Sandworm Container for Mobile */}
        <div className="relative w-full">
            {/* Mobile Vertical Sandworm - Visible only on mobile and tablet */}
            <div className="absolute inset-0 z-0 lg:hidden pointer-events-none overflow-hidden">
                 <SandwormTrail variant="mobile-vertical" />
            </div>

            <Experience />
            <Separator className="my-12 bg-dune-gold/10" />
            <Skills />
            <Separator className="my-12 bg-dune-gold/10" />
            <Projects />
            <Separator className="my-12 bg-dune-gold/10" />
            <Contact />
        </div>
      </Layout>
    </LanguageProvider>
  )
}

export default App
