import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function DramaticSection({ section, theme, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y       = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.18], [0.94, 1]);

  const isEven = index % 2 === 0;

  return (
    <motion.div ref={ref} style={{ opacity, scale }}>
      <div
        style={{
          padding: "5rem 2rem",
          maxWidth: 960,
          margin: "0 auto",
          display: "flex",
          gap: "4rem",
          alignItems: "center",
          flexDirection: isEven ? "row" : "row-reverse",
          flexWrap: "wrap",
        }}
      >
        {/* Icon */}
        <motion.div style={{ y }} className="float">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 6 }}
            transition={{ type: "spring", stiffness: 280 }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 28,
              background: `linear-gradient(135deg, ${section.color}18, ${section.color}06)`,
              border: `1px solid ${section.color}35`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "4.5rem",
              boxShadow: `0 24px 70px ${section.color}18`,
              backdropFilter: "blur(12px)",
              flexShrink: 0,
            }}
          >
            {section.icon}
          </motion.div>
        </motion.div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <div
            style={{
              fontSize: "0.7rem",
              color: section.color,
              letterSpacing: "0.18em",
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 700,
              marginBottom: "0.6rem",
              textTransform: "uppercase",
            }}
          >
            {section.year}
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)",
              fontWeight: 900,
              margin: "0 0 0.4rem 0",
              color: theme === "dark" ? "#E5E7EB" : "#0B0F1A",
              lineHeight: 1.08,
            }}
          >
            {section.title}
          </h2>

          <div
            style={{
              fontSize: "0.95rem",
              color: section.color,
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 700,
              marginBottom: "1.6rem",
              letterSpacing: "0.02em",
            }}
          >
            {section.subtitle}
          </div>

          <p
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontSize: "1.05rem",
              lineHeight: 2,
              color: theme === "dark" ? "#9CA3AF" : "#6B7280",
              margin: 0,
              maxWidth: 520,
            }}
          >
            {section.content}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          height: 1,
          background: `linear-gradient(to right, transparent, ${section.color}28, transparent)`,
        }}
      />
    </motion.div>
  );
}
