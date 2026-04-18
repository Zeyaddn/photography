"use client";
import { useState, useEffect } from "react";

import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("hero");
  const [showCopyToast, setShowCopyToast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      
      const sections = document.querySelectorAll('section[id], #hero');
      let current = '';
      sections.forEach(section => {
        if (section.offsetTop && window.scrollY >= section.offsetTop - 150) {
          current = section.getAttribute('id') || '';
        } else if (window.scrollY < 150) {
          current = 'hero';
        }
      });
      if(current) setActiveLink(current);
    };

    const handleContextMenu = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        setShowCopyToast(true);
        setTimeout(() => setShowCopyToast(false), 3000);
      }
    };
    
    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') e.preventDefault();
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  const handleNavLinkClick = () => {
    const navCollapse = document.getElementById('navbarNav');
    if (navCollapse && navCollapse.classList.contains('show')) {
      if (window.bootstrap) {
        new window.bootstrap.Collapse(navCollapse).hide();
      }
    }
  };

  return (
    <>
      <div className="side-social">
        <a href="#" aria-label="Follow Ziad El Asad on Instagram"><i className='bx bxl-instagram'></i></a>
        <a href="#" aria-label="View our photography on Behance"><i className='bx bxl-behance'></i></a>
        <a href="#" aria-label="Connect with me on LinkedIn"><i className='bx bxl-linkedin'></i></a>
        <div className="side-line"></div>
      </div>

      <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'scrolled' : ''}`} id="main-navbar">
        <div className="container">
          <Link className="navbar-brand" href="/#hero">
            <div className="brand-logo"><i className='bx bx-camera'></i></div>
            <div className="brand-text">
              <span className="brand-name" style={{ color: "#fff" }}>ZIAD <span>EL ASAD</span></span>
              <span className="brand-sub">Creative Design &amp; Photography</span>
            </div>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className={`nav-link ${activeLink === 'hero' ? 'active' : ''}`} href="/#hero" onClick={handleNavLinkClick}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${activeLink === 'gallery' ? 'active' : ''}`} href="/#gallery" onClick={handleNavLinkClick}>Gallery</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${activeLink === 'projects' ? 'active' : ''}`} href="/#projects" onClick={handleNavLinkClick}>Projects</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${activeLink === 'about' ? 'active' : ''}`} href="/#about" onClick={handleNavLinkClick}>About</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${activeLink === 'blog' ? 'active' : ''}`} href="/#blog" onClick={handleNavLinkClick}>Blog</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`} href="/#contact" onClick={handleNavLinkClick}>Contact</Link>
              </li>
            </ul>
            <Link href="/#contact" className="btn-primary-glow btn-nav-cta ms-3" onClick={handleNavLinkClick}>
              <i className='bx bx-calendar-check'></i> Book a Session
            </Link>
          </div>
        </div>
      </nav>

      {/* Copy Protection Toast */}
      <div className={`toast-notification ${showCopyToast ? 'show' : ''}`} style={{zIndex: 999999}}>
        <i className='bx bx-copyright text-danger' style={{color: 'var(--danger)', fontSize: '1.5rem'}}></i>
        <div>
          <strong>Protected Content</strong>
          <p className="mb-0 text-light-3" style={{ fontSize: '0.8rem' }}>Images are copyright protected by Lens of Creativity.</p>
        </div>
      </div>
    </>
  );
}
