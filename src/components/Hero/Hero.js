"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: "/image/hero1.png", alt: "Conceptual Photography" },
    { src: "/image/hero2.png", alt: "Architectural Symmetry" },
    { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05", alt: "Foggy Forest Landscape" },
    { src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e", alt: "Modern Architecture View" }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <section id="hero">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ position: "absolute", width: "100%", height: "100%", zIndex: index === currentSlide ? 1 : 0, transition: "opacity 1.5s ease-in-out", opacity: index === currentSlide ? 1 : 0 }}
          >
            <Image 
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              quality={80}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
      <div className="hero-overlay"></div>
      <div className="floating-gear">
        <i className="bx bx-camera float-1"></i>
        <i className="bx bx-aperture float-2"></i>
        <i className="bx bx-landscape float-3"></i>
      </div>
      <div className="watermark-overlay">© Ziad El Asad | Visual Artist</div>

      <div className="hero-content-v4 animate-on-scroll">
        <div className="status-badge mb-3">
          <span className="status-dot"></span> Available for new projects
        </div>
        <h1 className="hero-title-main">
          Ziad <span id="typing-name">El Asad</span><span className="typing-cursor">|</span>
        </h1>
        <p className="hero-subtitle-small">Architectural &amp; Conceptual Photographer</p>
        <p className="hero-desc text-white">Documenting excellence through architectural photography and visual identity.</p>

        <div className="hero-btns mt-4">
          <a href="#gallery" className="btn-primary-glow btn-lg" aria-label="Explore Showcase">Explore Showcase</a>
          <a href="#contact" className="btn-outline-white btn-lg" aria-label="Book a Session">Book a Session</a>
        </div>
      </div>
    </section>
  );
}
