import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "../data/projects";

export default function ProjectFullscreen({ project, onClose, onNext, onPrev }) {
  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft")  onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const projectIndex = PROJECTS.findIndex((p) => p.id === project.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(5,7,15,0.88)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
        }}
      />

      {/* Card */}
      <motion.div
        key={project.id}
        initial={{ scale: 0.78, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.82, opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 880,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 30,
          background: project.gradient,
          border: `1px solid ${project.color}28`,
          boxShadow: `0 50px 130px ${project.color}28, 0 0 0 1px ${project.color}15`,
          padding: "clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        {/* Animated blobs */}
        <motion.div
          animate={{ y: [-25, 25, -25], x: [-12, 12, -12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${project.color}22 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <motion.div
          animate={{ y: [18, -18, 18], x: [10, -10, 10] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{
            position: "absolute",
            bottom: "15%",
            left: -40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${project.color}14 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "2.2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.3rem", flexWrap: "wrap" }}>
            <motion.div
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: "3.8rem", lineHeight: 1, flexShrink: 0 }}
            >
              {project.emoji}
            </motion.div>
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: project.accent,
                  letterSpacing: "0.16em",
                  fontFamily: "'Cairo', sans-serif",
                  fontWeight: 700,
                  marginBottom: "0.35rem",
                  textTransform: "uppercase",
                }}
              >
                {project.year} · {project.subtitle}
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
                  fontWeight: 900,
                  color: "#E5E7EB",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                {project.title}
              </h2>
            </div>
          </div>

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "#E5E7EB",
              fontSize: "1.1rem",
              cursor: "pointer",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.25s",
            }}
            title="إغلاق (Esc)"
          >
            ✕
          </motion.button>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Cairo', sans-serif",
            fontSize: "1.02rem",
            lineHeight: 2,
            color: "#D1D5DB",
            margin: "0 0 2.2rem 0",
            borderRight: `3px solid ${project.color}`,
            paddingRight: "1.4rem",
          }}
        >
          {project.description}
        </p>

        {/* Detail cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(195px, 1fr))",
            gap: "0.85rem",
            marginBottom: "2.2rem",
          }}
        >
          {project.details.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 + 0.25 }}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${project.color}20`,
                borderRadius: 12,
                padding: "0.85rem 1.1rem",
                fontFamily: "'Cairo', sans-serif",
                fontSize: "0.82rem",
                color: "#D1D5DB",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.65rem",
              }}
            >
              <span style={{ color: project.color, fontSize: "0.95rem", flexShrink: 0, marginTop: 1 }}>✓</span>
              {d}
            </motion.div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "2.2rem" }}>
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                background: `${project.color}12`,
                border: `1px solid ${project.color}30`,
                borderRadius: 8,
                padding: "0.3rem 0.85rem",
                fontSize: "0.77rem",
                color: project.accent,
                fontFamily: "'Cairo', sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {/* Buttons */}
          <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: `linear-gradient(135deg, ${project.color}, ${project.accent})`,
                color: "#fff",
                border: "none",
                borderRadius: 100,
                padding: "0.7rem 1.8rem",
                fontFamily: "'Cairo', sans-serif",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: "pointer",
                boxShadow: `0 0 28px ${project.color}45`,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              🔗 عرض المشروع
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.06, y: -2 }}
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "#E5E7EB",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 100,
                padding: "0.7rem 1.8rem",
                fontFamily: "'Cairo', sans-serif",
                fontSize: "0.88rem",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              📂 GitHub
            </motion.a>
          </div>

          {/* Prev / Next + counter */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            <span
              style={{
                fontFamily: "'Cairo', sans-serif",
                fontSize: "0.75rem",
                color: "#6B7280",
              }}
            >
              {projectIndex + 1} / {PROJECTS.length}
            </span>
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              onClick={onPrev}
              title="← السابق"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#E5E7EB",
                fontSize: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ←
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              onClick={onNext}
              title="→ التالي"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#E5E7EB",
                fontSize: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              →
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
