import Image from "next/image";
import Link from "next/link";
import { blogData } from "@/data/blogData";

export default function Blog() {
  const blogs = blogData.slice(0, 3);

  return (
    <section id="blog">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-tag"><i className='bx bx-news'></i> From the Blog</span>
          <h2>Tips &amp; Stories</h2>
          <p>Join me on the photography journey — professional tips and behind-the-scenes stories</p>
          <div className="section-divider"></div>
        </div>

        <div className="row g-4">
          {blogs.map((b, i) => (
            <div key={i} className="col-lg-4 col-md-6 animate-on-scroll">
              <div className="blog-card">
                <div className="blog-card-img" style={{ position: 'relative', height: '240px' }}>
                  <Image src={b.img} alt={b.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                  <div className="blog-date-badge">
                    <span className="day">{b.day}</span>
                    <span className="month">{b.month}</span>
                  </div>
                </div>
                <div className="blog-card-body">
                  <span className="blog-category"><i className={`bx ${b.catIcon}`}></i> {b.cat}</span>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                  <div className="blog-footer">
                    <span className="blog-read-time"><i className={`bx ${b.metaIcon}`}></i> {b.meta}</span>
                    <Link href={`/blog/${b.slug}`} className="blog-read-more" aria-label={`Read more: ${b.title}`}>
                      {b.linkText || 'Read More'} <span className="visually-hidden">{b.title}</span> <i className='bx bx-right-arrow-alt'></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
