"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { galleryImages } from "@/data/galleryData";

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  // Memoize slides for performance and smooth lightbox transitions
  const slides = useMemo(() => galleryImages.map((image) => ({
    src: image.img,
    alt: image.title,
    title: image.title,
    description: image.location
  })), []);

  return (
    <section id="gallery">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-tag"><i className='bx bx-images'></i> Photo Gallery</span>
          <h2>Featured Shots</h2>
          <p>A curated collection of my finest work in nature, architecture, and aerial photography</p>
          <div className="section-divider"></div>
        </div>

        <div className="gallery-filters mb-5 animate-on-scroll">
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Works</button>
          <button className={`filter-btn ${filter === 'landscape' ? 'active' : ''}`} onClick={() => setFilter('landscape')}>Landscape</button>
          <button className={`filter-btn ${filter === 'architecture' ? 'active' : ''}`} onClick={() => setFilter('architecture')}>Architecture</button>
          <button className={`filter-btn ${filter === 'nature' ? 'active' : ''}`} onClick={() => setFilter('nature')}>Nature</button>
          <button className={`filter-btn ${filter === 'aerial' ? 'active' : ''}`} onClick={() => setFilter('aerial')}>Aerial</button>
          <button className={`filter-btn ${filter === 'portrait' ? 'active' : ''}`} onClick={() => setFilter('portrait')}><i className='bx bx-user'></i> Portrait</button>
        </div>

        <div className="gallery-grid" id="gallery-grid">
          {galleryImages.map((item, i) => {
            const isVisible = filter === 'all' || filter === item.cat;
            return (
              <div 
                key={i} 
                className={`gallery-item animate-on-scroll ${item.tall ? 'tall' : ''} ${isVisible ? 'd-block' : 'd-none'}`}
                onClick={() => setLightboxIndex(i)}
                style={{ cursor: "pointer" }}
              >
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill
                  priority={i < 3}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <div className="watermark-logo-overlay" style={{fontSize: 'clamp(1rem, 3vw, 2rem)', opacity: 0.25}}>Zeyad LENS</div>
                <div className="gallery-item-overlay">
                  <div className="zoom-icon"><i className='bx bx-zoom-in'></i></div>
                  <h3>{item.title}</h3>
                  {item.location && <span><i className='bx bx-map'></i> {item.location}</span>}
                </div>
                <div className="watermark">© Lens of Creativity</div> 
              </div>
            )
          })}
        </div>

        <div className="text-center mt-5 animate-on-scroll">
          <a href="#" className="btn-outline-white"><i className='bx bx-images'></i> View All Work</a>
        </div>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex >= 0 ? lightboxIndex : 0}
        close={() => setLightboxIndex(-1)}
        slides={slides}
      />
    </section>
  );
}
