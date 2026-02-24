import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "البداية",   href: "#hero"     },
  { label: "المسيرة",  href: "#journey"  },
  { label: "المشاريع", href: "#projects" },
  { label: "التواصل",  href: "#contact"  },
];

export default function Navbar({ theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const textColor = theme === "dark" ? "#9CA3AF" : "#6B7280";
  const bg = scrolled
    ? theme === "dark"
      ? "rgba(11,15,26,0.88)"
      : "rgba(249,250,251,0.88)"
    : "transparent";

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: 64,
        padding: "0 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: bg,
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(124,124,255,0.12)" : "none",
        transition: "background 0.4s ease, border 0.4s ease",
      }}
    >
      {/* Logo */}
      <motion.a
        href="#hero"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.5rem",
          fontWeight: 900,
          background: "linear-gradient(135deg, #7C7CFF, #A78BFA)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textDecoration: "none",
          letterSpacing: "0.02em",
        }}
      >
        JO.
      </motion.a>

      {/* Desktop links */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <motion.a
            key={item.href}
            href={item.href}
            whileHover={{ y: -2, color: "#7C7CFF" }}
            style={{
              color: textColor,
              textDecoration: "none",
              fontSize: "0.85rem",
              letterSpacing: "0.04em",
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 600,
              transition: "color 0.25s",
            }}
          >
            {item.label}
          </motion.a>
        ))}

        {/* Theme toggle */}
        <motion.button
          whileHover={{ scale: 1.12, rotate: 20 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "rgba(124,124,255,0.1)",
            border: "1px solid rgba(124,124,255,0.28)",
            cursor: "pointer",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7C7CFF",
            transition: "background 0.3s",
          }}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </motion.button>
      </div>
    </motion.nav>
  );
}
