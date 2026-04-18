import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-100 about-premium-section">
      <div className="container">
        <div className="row g-5 align-items-center">
          {/* --- LEFT SIDE: THE ARTIST --- */}
          <div className="col-lg-5 animate-on-scroll">
            <div className="editorial-single-image-wrapper">
              <div className="image-main-single">
                <Image 
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32" 
                  alt="Vintage Leica Camera" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 40vw"
                  loading="lazy"
                  style={{ objectFit: 'cover' }} 
                />
              </div>
              <div className="float-experience-card-v4">
                <span className="years">12+</span>
                <span className="label">Years of<br/>Digital Art</span>
              </div>
              <div className="image-frame-border"></div>
            </div>
          </div>

          {/* --- RIGHT SIDE: THE STORY --- */}
          <div className="col-lg-7 animate-on-scroll">
            <div className="editorial-content">
              <span className="editorial-tag">The Storyteller</span>
              <h2 className="editorial-title mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Capturing <span className="light-highlight">Light</span>, <br/>
                Defining <span className="text-white">Perspective</span>.
              </h2>
              
              <div className="editorial-description mb-5">
                <p className="description-text">
                  I am <span className="text-white fw-bold">Ziad El Asad</span>, a visionary photographer dedicated to the art of visual storytelling. 
                  My work transcends simple image capture; it is about finding the profound in the ordinary 
                  and the eternal in the ephemeral.
                </p>
                <div className="signature-wrapper mt-4">
                    <div className="signature-text" style={{ fontFamily: 'var(--font-signature)', fontSize: '3rem', color: 'var(--primary)', opacity: 0.9 }}>
                        Ziad El Asad
                    </div>
                </div>
              </div>

              {/* Achievement Cards Grid */}
              <div className="honor-cards-grid mb-5">
                <div className="honor-card">
                  <div className="card-inner">
                    <div className="card-icon-box">
                      <i className='bx bxs-award'></i>
                    </div>
                    <div className="card-info">
                      <h4 style={{ fontFamily: 'var(--font-playfair), serif' }}>Awards</h4>
                      <ul className="honor-list">
                        <li>Intl. Photo Awards '23</li>
                        <li>Sony World Open '22</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="honor-card">
                  <div className="card-inner">
                    <div className="card-icon-box">
                      <i className='bx bxs-camera-movie'></i>
                    </div>
                    <div className="card-info">
                      <h4 style={{ fontFamily: 'var(--font-playfair), serif' }}>Exhibitions</h4>
                      <ul className="honor-list">
                        <li>The Grid — Dubai</li>
                        <li>Urban Soul — London</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="editorial-footer-premium d-flex flex-wrap align-items-center gap-4">
                <a href="#contact" className="btn-premium-pill-solid">
                  <span>Let's Create</span>
                  <i className='bx bx-right-arrow-alt'></i>
                </a>
                <a href="#" className="btn-premium-pill-glass">
                  <i className='bx bxs-file-pdf'></i>
                  <span>Download CV</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
