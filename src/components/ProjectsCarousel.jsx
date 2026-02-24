import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "../data/projects";

// ─── Single Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, relIndex, isActive, onClick }) {
  const abs = Math.abs(relIndex);

  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 300,
        height: 400,
        marginLeft: -150,
        marginTop: -200,
        borderRadius: 22,
        overflow: "hidden",
        cursor: "pointer",
        background: project.gradient,
        border: isActive
          ? `1px solid ${project.color}55`
          : "1px solid rgba(255,255,255,0.06)",
        transform: `
          translateX(${relIndex * 190}px)
          translateZ(${isActive ? 0 : -abs * 70}px)
          scale(${isActive ? 1 : Math.max(0.72, 1 - abs * 0.13)})
          rotateY(${relIndex * -9}deg)
        `,
        opacity: Math.max(0.25, 1 - abs * 0.28),
        transition: "all 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
        zIndex: isActive ? 20 : 20 - abs,
        boxShadow: isActive
          ? `0 32px 90px ${project.color}38, 0 0 0 1px ${project.color}18`
          : "0 8px 24px rgba(0,0,0,0.4)",
        userSelect: "none",
      }}
    >
      {/* Top */}
      <div
        style={{
          padding: "2rem 1.8rem 1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ fontSize: "3.2rem", lineHeight: 1 }}>{project.emoji}</div>
        <span
          style={{
            background: `${project.color}1a`,
            border: `1px solid ${project.color}35`,
            borderRadius: 100,
            padding: "0.25rem 0.75rem",
            fontSize: "0.68rem",
            color: project.accent,
            fontFamily: "'Cairo', sans-serif",
            letterSpacing: "0.06em",
          }}
        >
          {project.year}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "0 1.8rem 1.5rem" }}>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.45rem",
            fontWeight: 800,
            color: "#E5E7EB",
            margin: "0 0 0.3rem 0",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "'Cairo', sans-serif",
            fontSize: "0.78rem",
            color: project.accent,
            margin: "0 0 1.3rem 0",
            letterSpacing: "0.02em",
          }}
        >
          {project.subtitle}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {project.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 6,
                padding: "0.18rem 0.55rem",
                fontSize: "0.68rem",
                color: "#9CA3AF",
                fontFamily: "'Cairo', sans-serif",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1.2rem 1.8rem",
          background: `linear-gradient(to top, ${project.color}18, transparent)`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Cairo', sans-serif",
            fontSize: "0.75rem",
            color: "#6B7280",
          }}
        >
          {isActive ? "اضغط للتفاصيل" : "اضغط للتحديد"}
        </span>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: isActive ? project.color : "rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.85rem",
            transition: "background 0.3s",
          }}
        >
          →
        </div>
      </div>

      {/* Active glow overlay */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 0%, ${project.color}12, transparent 65%)`,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

// ─── Carousel ────────────────────────────────────────────────────────────────
export default function ProjectsCarousel({ theme, onOpenProject }) {
  const [active, setActive] = useState(0);
  const dragStartX = useRef(null);
  const autoRef = useRef(null);
  const total = PROJECTS.length;

  const resetAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(
      () => setActive((a) => (a + 1) % total),
      3500
    );
  }, [total]);

  useEffect(() => {
    resetAuto();
    return () => clearInterval(autoRef.current);
  }, [resetAuto]);

  const go = (dir) => {
    setActive((a) => (a + dir + total) % total);
    resetAuto();
  };

  // Touch / drag support
  const handleDragEnd = (startX, endX) => {
    const diff = endX - startX;
    if (Math.abs(diff) > 45) go(diff > 0 ? -1 : 1);
  };

  const headingColor = theme === "dark" ? "#E5E7EB" : "#0B0F1A";

  return (
    <section id="projects" style={{ padding: "6rem 0 5rem", position: "relative" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: "center", marginBottom: "4.5rem", padding: "0 2rem" }}
      >
        <div
          style={{
            fontSize: "0.72rem",
            color: "#7C7CFF",
            letterSpacing: "0.22em",
            fontFamily: "'Cairo', sans-serif",
            fontWeight: 700,
            marginBottom: "0.9rem",
            textTransform: "uppercase",
          }}
        >
          ما بنيته
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5.5vw, 4rem)",
            fontWeight: 900,
            color: headingColor,
            margin: 0,
            lineHeight: 1.08,
          }}
        >
          المشاريع
        </h2>
      </motion.div>

      {/* 3-D stage */}
      <div
        style={{
          position: "relative",
          height: 480,
          perspective: "1400px",
          overflow: "hidden",
        }}
        onMouseDown={(e) => { dragStartX.current = e.clientX; }}
        onMouseUp={(e) => {
          if (dragStartX.current !== null) {
            handleDragEnd(dragStartX.current, e.clientX);
            dragStartX.current = null;
          }
        }}
        onTouchStart={(e) => { dragStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (dragStartX.current !== null) {
            handleDragEnd(dragStartX.current, e.changedTouches[0].clientX);
            dragStartX.current = null;
          }
        }}
      >
        {PROJECTS.map((p, i) => {
          const relIndex = ((i - active + total) % total + total) % total;
          const centered = relIndex > total / 2 ? relIndex - total : relIndex;
          return (
            <ProjectCard
              key={p.id}
              project={p}
              relIndex={centered}
              isActive={i === active}
              onClick={() => {
                if (i === active) {
                  onOpenProject(p);
                } else {
                  setActive(i);
                  resetAuto();
                }
              }}
            />
          );
        })}
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.2rem",
          marginTop: "3rem",
        }}
      >
        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
          onClick={() => go(-1)}
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: "rgba(124,124,255,0.1)",
            border: "1px solid rgba(124,124,255,0.28)",
            color: "#7C7CFF",
            fontSize: "1.1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ←
        </motion.button>

        {PROJECTS.map((_, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.3 }}
            onClick={() => { setActive(i); resetAuto(); }}
            style={{
              width: i === active ? 26 : 8,
              height: 8,
              borderRadius: 100,
              background: i === active ? "#7C7CFF" : "rgba(124,124,255,0.22)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.35s ease, background 0.35s ease",
            }}
          />
        ))}

        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
          onClick={() => go(1)}
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: "rgba(124,124,255,0.1)",
            border: "1px solid rgba(124,124,255,0.28)",
            color: "#7C7CFF",
            fontSize: "1.1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          →
        </motion.button>
      </div>

      {/* Active project name */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ textAlign: "center", marginTop: "2rem" }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.35rem",
            color: headingColor,
            marginBottom: "0.25rem",
          }}
        >
          {PROJECTS[active].title}
        </div>
        <div
          style={{
            fontFamily: "'Cairo', sans-serif",
            fontSize: "0.82rem",
            color: PROJECTS[active].color,
            letterSpacing: "0.04em",
          }}
        >
          {PROJECTS[active].subtitle}
        </div>
      </motion.div>
    </section>
  );
}
