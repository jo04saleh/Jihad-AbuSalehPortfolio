import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PERSONAL } from "../data/projects";

export default function Hero({ theme }) {
  const [displayed, setDisplayed] = useState("");
  const fullText = PERSONAL.title;

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 85);
    return () => clearInterval(interval);
  }, [fullText]);

  const textColor = theme === "dark" ? "#E5E7EB" : "#0B0F1A";

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "80px 2rem 0",
        textAlign: "center",
      }}
    >
      {/* Central glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,124,255,0.1) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", zIndex: 1, maxWidth: 800 }}
      >
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            background: "rgba(124,124,255,0.09)",
            border: "1px solid rgba(124,124,255,0.28)",
            borderRadius: 100,
            padding: "0.4rem 1.3rem",
            marginBottom: "2.5rem",
            fontSize: "0.78rem",
            color: "#A78BFA",
            letterSpacing: "0.1em",
            fontFamily: "'Cairo', sans-serif",
            fontWeight: 600,
          }}
        >
          <span
            className="pulse-dot"
            style={{
              display: "inline-block",
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#10B981",
              flexShrink: 0,
            }}
          />
          متاح للعمل · Available for Work
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3.2rem, 9vw, 8rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            marginBottom: "1.8rem",
            background:
              theme === "dark"
                ? "linear-gradient(135deg, #E5E7EB 0%, #7C7CFF 55%, #A78BFA 100%)"
                : "linear-gradient(135deg, #0B0F1A 0%, #4F46E5 55%, #7C3AED 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.025em",
          }}
        >
          {PERSONAL.name}
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            fontFamily: "'Cairo', sans-serif",
            fontSize: "clamp(1rem, 2.5vw, 1.55rem)",
            color: theme === "dark" ? "#9CA3AF" : "#6B7280",
            marginBottom: "3.5rem",
            minHeight: "2.2em",
            letterSpacing: "0.02em",
          }}
        >
          {displayed}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.75 }}
            style={{ color: "#7C7CFF", marginRight: 2 }}
          >
            |
          </motion.span>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          style={{
            display: "flex",
            gap: "4rem",
            justifyContent: "center",
            marginBottom: "3.5rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { n: PERSONAL.yearsExp,       label: "سنوات خبرة"  },
            { n: PERSONAL.projectsCount,  label: "مشروع منجز"  },
            { n: PERSONAL.techCount,      label: "تقنية متقنة" },
          ].map((stat) => (
            <motion.div
              key={stat.n}
              whileHover={{ y: -4 }}
              style={{ textAlign: "center" }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.8rem",
                  fontWeight: 800,
                  color: "#7C7CFF",
                  lineHeight: 1,
                }}
              >
                {stat.n}
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "#6B7280",
                  fontFamily: "'Cairo', sans-serif",
                  marginTop: "0.35rem",
                  letterSpacing: "0.04em",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "linear-gradient(135deg, #7C7CFF, #A78BFA)",
              color: "#fff",
              padding: "0.85rem 2.6rem",
              borderRadius: 100,
              textDecoration: "none",
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              boxShadow: "0 0 35px rgba(124,124,255,0.45)",
              letterSpacing: "0.03em",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            🚀 اكتشف أعمالي
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "transparent",
              color: textColor,
              padding: "0.85rem 2.6rem",
              borderRadius: 100,
              textDecoration: "none",
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              border: "1px solid rgba(124,124,255,0.38)",
              letterSpacing: "0.03em",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            تواصل معي
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            color: "#6B7280",
            letterSpacing: "0.12em",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          اسكرول
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 44,
            background: "linear-gradient(to bottom, rgba(124,124,255,0.9), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
