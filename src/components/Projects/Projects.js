import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/data/projectsData";

export default function Projects() {
  return (
    <section id="projects" style={{ background: '#0a0a0a', padding: '100px 0' }}>
      <div className="container">
        <div className="section-header animate-on-scroll text-center mb-5">
          <span className="section-tag" style={{ color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: '700' }}>
            <i className='bx bx-folder-open'></i> Featured Work
          </span>
          <h2 style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: '900', marginTop: '10px' }}>OUR LATEST STORIES</h2>
          <p style={{ color: '#aaaaaa', maxWidth: '600px', margin: '15px auto' }}>Unique photography projects telling visual stories from around the world</p>
          <div className="section-divider" style={{ width: '60px', height: '4px', background: 'var(--primary)', margin: '20px auto' }}></div>
        </div>

        <div className="row g-4">
          {projectsData.map((p, i) => (
            <div key={i} className="col-lg-4 col-md-6 animate-on-scroll">
              <div className="project-card" style={{ background: '#111', borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="project-card-img" style={{ position: 'relative', height: '280px' }}>
                  <Image src={p.img} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw" priority={i < 2} loading={i < 2 ? "eager" : "lazy"} style={{ objectFit: 'cover' }} />
                  <span className="project-badge" style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '5px 15px', borderRadius: '20px', fontSize: '0.75rem', backdropFilter: 'blur(5px)' }}>
                    <i className={`bx ${p.icon}`}></i> {p.cat}
                  </span>
                </div>
                <div className="project-card-body" style={{ padding: '30px' }}>
                  <h3 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '800', marginBottom: '15px' }}>{p.title}</h3>
                  <p style={{ color: '#999999', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>{p.desc}</p>
                  <div className="project-meta" style={{ display: 'flex', gap: '15px', marginBottom: '20px', color: '#777', fontSize: '0.85rem' }}>
                    <span><i className='bx bx-calendar' style={{ color: 'var(--primary)', marginRight: '5px' }}></i> {p.year}</span>
                    <span><i className='bx bx-camera' style={{ color: 'var(--primary)', marginRight: '5px' }}></i> {p.photos}</span>
                  </div>
                  <div className="project-tech" style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
                    {p.tags.slice(0, 2).map((tag, j) => (
                      <span key={j} style={{ fontSize: '0.7rem', color: 'var(--primary)', background: 'rgba(var(--primary-rgb), 0.1)', padding: '4px 12px', borderRadius: '4px', border: '1px solid rgba(var(--primary-rgb), 0.2)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/projects/${p.slug}`} aria-label={`Explore story: ${p.title}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', transition: 'all 0.3s' }}>
                    EXPLORE STORY <i className='bx bx-right-arrow-alt'></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
