import { Suspense, lazy } from 'react';
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { Separator } from "@/components/ui/separator";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Lazy load heavy components
const Experience = lazy(() => import("@/components/Experience"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const Contact = lazy(() => import("@/components/Contact"));
const SandwormTrail = lazy(() => import("@/components/SandwormTrail"));

// Loading fallback
const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="w-12 h-12 rounded-full border-4 border-dune-orange border-t-transparent animate-spin" />
  </div>
);

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
            <Suspense fallback={null}>
              {/* Only render on mobile to save resources */}
              {typeof window !== 'undefined' && window.innerWidth < 1024 && <SandwormTrail variant="mobile-vertical" />}
            </Suspense>
          </div>

          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>
          <Separator className="my-12 bg-dune-gold/10" />

          <Suspense fallback={<SectionLoader />}>
            <Skills />
          </Suspense>
          <Separator className="my-12 bg-dune-gold/10" />

          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
          <Separator className="my-12 bg-dune-gold/10" />

          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </div>
      </Layout>
    </LanguageProvider>
  )
}

export default App
