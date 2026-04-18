"use client";
import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(hover: hover)').matches) {
      const updatePosition = (e) => setPosition({ x: e.clientX, y: e.clientY });
      window.addEventListener("mousemove", updatePosition);
      return () => window.removeEventListener("mousemove", updatePosition);
    }
  }, []);

  return (
    <div 
      className="cursor-glow" 
      style={{ left: position.x + 'px', top: position.y + 'px' }}
    />
  );
}
