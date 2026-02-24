import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      }
    };

    // Ring follows with lerp
    const animate = () => {
      const dx = mouseRef.current.x - ringPosRef.current.x;
      const dy = mouseRef.current.y - ringPosRef.current.y;
      ringPosRef.current.x += dx * 0.12;
      ringPosRef.current.y += dy * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPosRef.current.x - 18}px, ${ringPosRef.current.y - 18}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseDown = () => {
      dotRef.current?.classList.add("cursor-click");
      setTimeout(() => dotRef.current?.classList.remove("cursor-click"), 150);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onMouseDown);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const base = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 9999,
    top: 0,
    left: 0,
    willChange: "transform",
  };

  return (
    <>
      <style>{`
        .cursor-dot { transition: width 0.15s, height 0.15s; }
        .cursor-click { width: 14px !important; height: 14px !important; }
        a:hover ~ .cursor-dot, button:hover ~ .cursor-dot { width: 16px; height: 16px; }
      `}</style>

      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          ...base,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#7C7CFF",
          boxShadow: "0 0 8px rgba(124,124,255,0.8)",
          mixBlendMode: "difference",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          ...base,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(124,124,255,0.5)",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
