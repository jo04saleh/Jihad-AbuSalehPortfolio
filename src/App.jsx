import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PROJECTS } from "./data/projects";

import ParticlesBg      from "./components/ParticlesBg";
import CustomCursor     from "./components/CustomCursor";
import Navbar           from "./components/Navbar";
import Hero             from "./components/Hero";
import University       from "./components/University";
import Builder          from "./components/Builder";
import ProjectsCarousel from "./components/ProjectsCarousel";
import ProjectFullscreen from "./components/ProjectFullscreen";
import DataLab          from "./components/DataLab";
import Future           from "./components/Future";

export default function App() {
  const [theme, setTheme]           = useState("dark");
  const [openProject, setOpenProject] = useState(null);

  // index of currently open project
  const openIndex = openProject
    ? PROJECTS.findIndex((p) => p.id === openProject.id)
    : -1;

  const handleNext = () =>
    setOpenProject(PROJECTS[(openIndex + 1) % PROJECTS.length]);

  const handlePrev = () =>
    setOpenProject(PROJECTS[(openIndex - 1 + PROJECTS.length) % PROJECTS.length]);

  const bg   = theme === "dark" ? "#0B0F1A" : "#F9FAFB";
  const text = theme === "dark" ? "#E5E7EB" : "#0B0F1A";

  return (
    <div
      style={{
        background: bg,
        color: text,
        minHeight: "100vh",
        overflowX: "hidden",
        transition: "background 0.4s ease, color 0.4s ease",
      }}
    >
      {/* Fixed layers */}
      <ParticlesBg />
      <CustomCursor />

      {/* Sticky nav */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* Page content — all sections sit above particles (z-index: 1) */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Hero theme={theme} />

        <section id="journey">
          <University theme={theme} />
          <Builder    theme={theme} />
        </section>

        <ProjectsCarousel
          theme={theme}
          onOpenProject={setOpenProject}
        />

        <DataLab theme={theme} />

        <Future theme={theme} />
      </div>

      {/* Fullscreen project overlay */}
      <AnimatePresence>
        {openProject && (
          <ProjectFullscreen
            key={openProject.id}
            project={openProject}
            onClose={() => setOpenProject(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
