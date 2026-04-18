"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogData } from "@/data/blogData";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useEffect, useRef, useCallback } from "react";

export default function BlogDetail() {
  const { slug } = useParams();
  const post = blogData.find((b) => b.slug === slug);
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

  if (!post) {
    return (
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-white bg-dark">
        <h2>Post Not Found</h2>
        <Link href="/" className="btn-primary-glow mt-3">Back to Blog</Link>
      </div>
    );
  }

  return (
    <main className="bg-dark min-vh-100 pb-100">
      <Navbar />

      {/* Reading Progress Bar — GPU-accelerated via transform */}
      <div ref={progressRef} className="reading-progress" aria-hidden="true"></div>

      <header className="blog-detail-header" style={{ position: 'relative', height: '65vh', minHeight: '450px' }}>
        <Image 
          src={post.img} 
          alt={post.title} 
          fill 
          priority 
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          style={{ objectFit: 'cover', opacity: 0.5 }} 
        />
        <div className="header-overlay d-flex align-items-center justify-content-center text-center">
          <div className="container">
            <span className="blog-category mb-3 d-inline-block px-3 py-1" style={{ background: 'rgba(212, 175, 55, 0.1)', color: 'var(--primary)', borderRadius: '20px', fontSize: '0.85rem' }}>
              <i className={`bx ${post.catIcon}`}></i> {post.cat}
            </span>
            <h1 className="display-2 fw-bold text-white mb-4" style={{ fontFamily: 'var(--font-cairo), sans-serif', letterSpacing: '-1px' }}>{post.title}</h1>
            <div className="post-meta text-white-50 d-flex align-items-center justify-content-center gap-3">
              <span className="d-flex align-items-center gap-2 text-uppercase ls-1" style={{ fontSize: '0.8rem' }}><i className='bx bx-calendar'></i> {post.day} {post.month} {post.year}</span>
              <span className="opacity-25">|</span>
              <span className="d-flex align-items-center gap-2 text-uppercase ls-1" style={{ fontSize: '0.8rem' }}><i className={`bx ${post.metaIcon}`}></i> {post.meta}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mt-n5 pt-5" style={{ position: 'relative', zIndex: 10 }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <article className="blog-content-card p-4 p-md-5" style={{ background: 'rgba(18,18,18,0.95)', backdropFilter: 'blur(30px)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              <div 
                className="blog-inner-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <div className="blog-share mt-5 pt-4 border-top border-white-10">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-4">
                  <div className="share-info">
                    <span className="text-white-50 small text-uppercase ls-1">Share this story:</span>
                    <div className="d-flex gap-3 mt-2">
                      <a href="#" className="share-btn" aria-label="Share on Facebook"><i className='bx bxl-facebook'></i></a>
                      <a href="#" className="share-btn" aria-label="Share on Twitter"><i className='bx bxl-twitter'></i></a>
                      <a href="#" className="share-btn" aria-label="Share on Instagram"><i className='bx bxl-instagram'></i></a>
                    </div>
                  </div>
                  <Link href="/#blog" className="btn-outline-white d-inline-flex align-items-center gap-2 px-4 py-2" style={{ borderRadius: '50px' }}>
                    <i className='bx bx-arrow-back'></i> Back to Portfolio
                  </Link>
                </div>
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
        .blog-inner-content :global(h3) {
          color: white;
          margin: 50px 0 25px;
          font-weight: 800;
          font-family: var(--font-cairo), serif;
          font-size: 2rem;
          line-height: 1.3;
        }
        .blog-inner-content :global(p) {
          line-height: 2;
          margin-bottom: 30px;
          font-size: 1.25rem;
          color: #ccc;
          font-weight: 400;
        }
        .blog-inner-content :global(p:first-of-type::first-letter) {
          float: left;
          font-size: 4.5rem;
          line-height: 1;
          margin-top: 0.1em;
          margin-right: 0.1em;
          color: var(--primary);
          font-weight: 900;
          font-family: var(--font-cairo), serif;
        }
        .blog-inner-content :global(img) {
          width: 100%;
          border-radius: 20px;
          margin: 40px 0;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }
        .share-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }
        .share-btn:hover {
          background: var(--primary);
          border-color: var(--primary);
          color: #000;
          transform: translateY(-3px);
        }
        .ls-1 { letter-spacing: 1px; }
        .mt-n5 { margin-top: -5rem !important; }
        .border-white-10 { border-color: rgba(255,255,255,0.1) !important; }
      `}</style>
    </main>
  );
}
