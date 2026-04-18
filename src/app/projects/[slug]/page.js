"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/data/projectsData";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useEffect, useRef, useCallback } from "react";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectsData.find((p) => p.slug === slug);
  const progressRef = useRef(null);
  const rafRef = useRef(null);

  const updateProgress = useCallback(() => {
    if (!progressRef.current) return;
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalScroll > 0 ? (window.scrollY / totalScroll) : 0;
    progressRef.current.style.transform = `scaleX(${progress})`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateProgress]);

  if (!project) {
    return (
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-white bg-dark">
        <h2>Story Not Found</h2>
        <Link href="/" className="btn-primary-glow mt-3">Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <main className="bg-dark min-vh-100 pb-100">
      <Navbar />

      {/* Reading Progress Bar — GPU-accelerated via transform */}
      <div ref={progressRef} className="reading-progress" aria-hidden="true"></div>

      <header className="project-detail-header" style={{ position: 'relative', height: '65vh', minHeight: '450px' }}>
        <Image 
          src={project.img} 
          alt={project.title} 
          fill 
          priority 
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          style={{ objectFit: 'cover', opacity: 0.6 }} 
        />
        <div className="header-overlay d-flex align-items-center justify-content-center text-center">
          <div className="container">
            <span className="blog-category mb-3 d-inline-block px-3 py-1" style={{ background: 'rgba(212, 175, 55, 0.1)', color: 'var(--primary)', borderRadius: '20px', fontSize: '0.85rem' }}>
              <i className={`bx ${project.icon || 'bx-camera'}`}></i> {project.cat}
            </span>
            <h1 className="display-2 fw-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair), serif', letterSpacing: '-1px' }}>{project.title}</h1>
            <div className="post-meta text-white-50 d-flex align-items-center justify-content-center gap-3">
              <span className="d-flex align-items-center gap-2 text-uppercase ls-1" style={{ fontSize: '0.8rem' }}><i className='bx bx-calendar'></i> {project.year}</span>
              <span className="opacity-25">|</span>
              <span className="d-flex align-items-center gap-2 text-uppercase ls-1" style={{ fontSize: '0.8rem' }}><i className='bx bx-map-pin'></i> {project.map}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mt-n5 pt-5" style={{ position: 'relative', zIndex: 10 }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <article className="blog-content-card p-4 p-md-5" style={{ background: 'rgba(18,18,18,0.95)', backdropFilter: 'blur(30px)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              
              <div className="project-story-content mb-5">
                <p className="lead-text" style={{ fontSize: '1.4rem', color: 'var(--primary)', fontStyle: 'italic', marginBottom: '30px', lineHeight: '1.8' }}>
                  "{project.desc}"
                </p>
                <div 
                  className="story-body"
                  style={{ color: '#ccc', lineHeight: '2.1', fontSize: '1.2rem' }}
                >
                    {project.story}
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="tech-specs-editorial pt-5 border-top border-white-10">
                <h4 className="text-white mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>Technical Specifications</h4>
                <div className="row g-4">
                  {[
                    { label: 'Camera', value: project.technical.camera, icon: 'bx-camera' },
                    { label: 'Settings', value: project.technical.settings, icon: 'bx-cog' },
                    { label: 'Lens', value: project.technical.lens, icon: 'bx-briefcase' },
                    { label: 'Collection', value: project.photos, icon: 'bx-photo-album' },
                    { label: 'Location', value: project.map, icon: 'bx-map-pin' },
                    { label: 'Year', value: project.year, icon: 'bx-calendar' }
                  ].map((spec, idx) => (
                    <div key={idx} className="col-lg-4 col-sm-6 text-start">
                      <div className="spec-item d-flex align-items-center gap-3 p-3 h-100" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid rgba(212, 175, 55, 0.1)', transition: 'all 0.3s' }}>
                        <i className={`bx ${spec.icon}`} style={{ fontSize: '1.6rem', color: 'var(--primary)' }}></i>
                        <div>
                          <div className="small text-white-50" style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{spec.label}</div>
                          <div className="fw-bold text-white" style={{ fontSize: '0.95rem' }}>{spec.value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-5 pt-4 text-center">
                <Link href="/#projects" className="btn-outline-white d-inline-flex align-items-center gap-2 px-5 py-3" style={{ borderRadius: '50px', fontWeight: '800' }}>
                  <i className='bx bx-arrow-back'></i> Back to Portfolio
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .reading-progress {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--primary);
          z-index: 10000;
          transform-origin: left;
          transform: scaleX(0);
          will-change: transform;
          box-shadow: 0 0 10px var(--primary);
        }
        .header-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent, #0a0a0a);
        }
        .story-body :global(p) {
          margin-bottom: 25px;
        }
        .ls-1 { letter-spacing: 1px; }
        .mt-n5 { margin-top: -5rem !important; }
        .border-white-10 { border-color: rgba(255,255,255,0.1) !important; }
      `}</style>
    </main>
  );
}
