import { motion } from "framer-motion";
import { SKILLS } from "../data/projects";

export default function DataLab({ theme }) {
  const headingColor = theme === "dark" ? "#E5E7EB" : "#0B0F1A";

  return (
    <section
      style={{
        padding: "6rem 2rem",
        maxWidth: 900,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: "center", marginBottom: "4rem" }}
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
          ما أتقنه
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight: 900,
            color: headingColor,
            margin: 0,
          }}
        >
          المهارات
        </h2>
      </motion.div>

      {/* Skills */}
      <div style={{ display: "grid", gap: "1.6rem" }}>
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.09 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.55rem",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cairo', sans-serif",
                  color: headingColor,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                {skill.name}
              </span>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 + 0.6 }}
                style={{
                  fontFamily: "'Cairo', sans-serif",
                  color: skill.color,
                  fontSize: "0.82rem",
                  fontWeight: 700,
                }}
              >
                {skill.pct}%
              </motion.span>
            </div>

            {/* Track */}
            <div
              style={{
                height: 6,
                background:
                  theme === "dark"
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.06)",
                borderRadius: 100,
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.pct}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.3,
                  delay: i * 0.09,
                  ease: "easeOut",
                }}
                style={{
                  height: "100%",
                  borderRadius: 100,
                  background: `linear-gradient(to right, ${skill.color}70, ${skill.color})`,
                  boxShadow: `0 0 12px ${skill.color}55`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
