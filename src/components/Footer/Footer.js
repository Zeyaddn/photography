export default function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="footer-brand"><i className='bx bx-camera'></i> Lens of Creativity</div>
              <p className="footer-desc">We document the beauty of the world through a professional lens, delivering images that tell stories and inspire wonder. Every shot is a unique story.</p>
              <div className="social-links">
                <a href="#" aria-label="Visit our Instagram profile"><i className='bx bxl-instagram'></i></a>
                <a href="#" aria-label="Follow us on Twitter"><i className='bx bxl-twitter'></i></a>
                <a href="#" aria-label="Watch our YouTube videos"><i className='bx bxl-youtube'></i></a>
                <a href="#" aria-label="View our Behance projects"><i className='bx bxl-behance'></i></a>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <h2 className="footer-title h4">Quick Links</h2>
              <ul className="footer-links">
                <li><a href="#hero"><i className='bx bx-chevron-right'></i> Home</a></li>
                <li><a href="#gallery"><i className='bx bx-chevron-right'></i> Gallery</a></li>
                <li><a href="#projects"><i className='bx bx-chevron-right'></i> Projects</a></li>
                <li><a href="#about"><i className='bx bx-chevron-right'></i> About</a></li>
                <li><a href="#blog"><i className='bx bx-chevron-right'></i> Blog</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h2 className="footer-title h4">Services</h2>
              <ul className="footer-links">
                <li><a href="#"><i className='bx bx-chevron-right'></i> Nature &amp; Landscape</a></li>
                <li><a href="#"><i className='bx bx-chevron-right'></i> Architecture &amp; Interiors</a></li>
                <li><a href="#"><i className='bx bx-chevron-right'></i> Portrait Photography</a></li>
                <li><a href="#"><i className='bx bx-chevron-right'></i> Event Photography</a></li>
                <li><a href="#"><i className='bx bx-chevron-right'></i> Aerial / Drone</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h2 className="footer-title h4">Newsletter</h2>
              <p style={{ color: "var(--light-3)", fontSize: "0.9rem", marginBottom: "15px" }}>Subscribe to get the latest work and photography tips delivered to your inbox.</p>
              <form id="newsletter-form" className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <div className="newsletter-input-wrapper">
                  <label htmlFor="newsletter-email" className="visually-hidden">Email Address for Newsletter</label>
                  <input id="newsletter-email" type="email" placeholder="Your email address" required aria-required="true" />
                  <button type="submit" aria-label="Subscribe to newsletter"><i className='bx bx-send'></i></button>
                </div>
              </form>
              <div className="footer-trust"><span><i className='bx bx-shield-quarter'></i> Your privacy is protected</span></div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Made with <i className='bx bxs-heart' style={{ color: "var(--primary)" }}></i> by <a href="#" style={{ color: "var(--primary)", textDecoration: "underline" }}>Ziad El Asad</a> | 2026</p>
          </div>
        </div>
      </footer>
    </>
  );
}
