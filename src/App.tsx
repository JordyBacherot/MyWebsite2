import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { Separator } from "@/components/ui/separator";

function App() {
  return (
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
  )
}

export default App
