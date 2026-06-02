import { useState, useEffect } from "react";
import { ReactComponent as LogoSVG } from "../assets/DialoguePoolLogo.svg";

const DAY = {
  color: "#D85A30",
  seam: "#fff8f5",
  bg: "#fff8f5",
  text: "#1a1a1a",
  pool: "#D85A30",
};

const NIGHT = {
  color: "#e8e8f0",
  seam: "#0e0e14",
  bg: "#0e0e14",
  text: "#e8e8f0",
  pool: "#a8a8cc",
};

export default function DialoguePoolLogo({ showWordmark = true }) {
  const [t, setT] = useState(DAY);

  useEffect(() => {
    const apply = () => {
      const h = new Date().getHours();
      setT(h >= 20 || h < 6 ? NIGHT : DAY);
    };
    apply();
    const id = setInterval(apply, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: t.bg,
        padding: "8px 16px",
        borderRadius: 10,
        transition: "background 0.6s, color 0.6s",
      }}
    >
      <LogoSVG
        width={40}
        height={18}
        style={{
          color: t.color,
          "--seam-bg": t.seam,
          transition: "color 0.6s",
        }}
      />
      {showWordmark && (
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 18,
            fontWeight: 500,
            color: t.text,
            transition: "color 0.6s",
          }}
        >
          Dialogue{" "}
          <span style={{ color: t.pool, transition: "color 0.6s" }}>Pool</span>
        </span>
      )}
    </div>
  );
}