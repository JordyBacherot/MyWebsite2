import { Suspense, lazy } from 'react';
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { Separator } from "@/components/ui/separator";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { UniverseProvider, useUniverse } from "@/contexts/UniverseContext";

// Lazy load heavy components
const Experience = lazy(() => import("@/components/Experience"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const Contact = lazy(() => import("@/components/Contact"));
const SandwormTrail = lazy(() => import("@/components/SandwormTrail"));
const CyberBikeTrail = lazy(() => import("@/components/CyberBikeTrail"));

// Loading fallback
const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="w-12 h-12 rounded-full border-4 border-theme-accent border-t-transparent animate-spin" />
  </div>
);

function MainContent() {
  const { universe } = useUniverse();
  
  return (
    <Layout>
      <Hero />
      <Separator className="my-12 bg-theme-glow/10" />

      {/* Global Sandworm/Bike Container for Mobile */}
      <div className="relative w-full">
        {/* Mobile Vertical Effect - Visible only on mobile and tablet */}
        <div className="absolute inset-0 z-0 hidden max-lg:block pointer-events-none overflow-hidden">
          <Suspense fallback={null}>
            {universe === 'dune' ? (
              <SandwormTrail variant="mobile-vertical" />
            ) : (
              <CyberBikeTrail variant="mobile-vertical" />
            )}
          </Suspense>
        </div>

        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>
        <Separator className="my-12 bg-theme-glow/10" />

        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        <Separator className="my-12 bg-theme-glow/10" />

        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Separator className="my-12 bg-theme-glow/10" />

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <UniverseProvider>
      <LanguageProvider>
        <MainContent />
      </LanguageProvider>
    </UniverseProvider>
  )
}

export default App
