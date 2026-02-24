import { motion } from "framer-motion";
import DramaticSection from "./DramaticSection";
import { SECTIONS, PERSONAL } from "../data/projects";

export default function Future({ theme }) {
  const textColor = theme === "dark" ? "#E5E7EB" : "#0B0F1A";
  const subColor  = theme === "dark" ? "#9CA3AF" : "#6B7280";

  return (
    <>
      <DramaticSection section={SECTIONS[2]} theme={theme} index={2} />

      {/* Contact section */}
      <section
        id="contact"
        style={{
          padding: "8rem 2rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            width: 550,
            height: 550,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,124,255,0.07) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: 620, margin: "0 auto", position: "relative", zIndex: 1 }}
        >
          <div style={{ fontSize: "3.5rem", marginBottom: "1.2rem" }}>✉️</div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
              fontWeight: 900,
              color: textColor,
              margin: "0 0 1.2rem 0",
              lineHeight: 1.1,
            }}
          >
            لنتحدث
          </h2>

          <p
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontSize: "1.05rem",
              color: subColor,
              lineHeight: 1.9,
              marginBottom: "3rem",
            }}
          >
            هل لديك مشروع يستحق البناء؟ أو فكرة تريد استكشافها؟
            <br />
            أنا دائماً مفتوح للفرص والتعاون الجديد.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <motion.a
              whileHover={{ scale: 1.07, y: -3 }}
              whileTap={{ scale: 0.97 }}
              href={`mailto:${PERSONAL.email}`}
              style={{
                background: "linear-gradient(135deg, #7C7CFF, #A78BFA)",
                color: "#fff",
                padding: "0.9rem 2.8rem",
                borderRadius: 100,
                textDecoration: "none",
                fontFamily: "'Cairo', sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                boxShadow: "0 0 35px rgba(124,124,255,0.42)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              📧 راسلني
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.07, y: -3 }}
              whileTap={{ scale: 0.97 }}
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "transparent",
                color: textColor,
                padding: "0.9rem 2.8rem",
                borderRadius: 100,
                textDecoration: "none",
                fontFamily: "'Cairo', sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                border: "1px solid rgba(124,124,255,0.35)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              💼 LinkedIn
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.07, y: -3 }}
              whileTap={{ scale: 0.97 }}
              href={PERSONAL.github}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "transparent",
                color: textColor,
                padding: "0.9rem 2.8rem",
                borderRadius: 100,
                textDecoration: "none",
                fontFamily: "'Cairo', sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              🐱 GitHub
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "2rem",
          textAlign: "center",
          borderTop: "1px solid rgba(124,124,255,0.1)",
        }}
      >
        <p
          style={{
            fontFamily: "'Cairo', sans-serif",
            fontSize: "0.8rem",
            color: "#6B7280",
            margin: 0,
          }}
        >
          صُنع بـ ❤️ و ☕ · {PERSONAL.name} © {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
