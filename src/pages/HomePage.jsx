import SiteLayout from "../components/SiteLayout";
import Reveal from "../components/Reveal";
import { profile, projects } from "../data/siteData";

const base = import.meta.env.BASE_URL;

const HomePage = () => (
  <SiteLayout active="home">
    <Reveal className="hero-reveal">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Software engineer · Cupertino</p>
          <h1>Software that feels simple. <span>Systems that stay solid.</span></h1>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={`${base}projects.html`}>Explore my work <span aria-hidden="true">↗</span></a>
            <a className="button button-secondary" href={`mailto:${profile.email}`}>Get in touch</a>
          </div>
        </div>
        <div className="hero-portrait" aria-label="Portrait of Josh Robertson">
          <img src={`${base}assets/img/headshot-optimized.jpg`} alt="Josh Robertson" />
          <div className="portrait-note">
            <span>Currently</span>
            <strong>Engineering at Apple</strong>
          </div>
        </div>
      </section>
    </Reveal>

    <Reveal>
      <section className="impact-strip" aria-label="Selected impact">
        <div><strong>56M+</strong><span>monthly API requests supported</span></div>
        <div><strong>30%</strong><span>faster continuous integration</span></div>
        <div><strong>20</strong><span>engineers &amp; PMs led</span></div>
      </section>
    </Reveal>

    <Reveal>
      <section className="section-shell">
        <div className="section-heading">
          <div><p className="eyebrow">Selected work</p><h2>Ideas, shipped.</h2></div>
          <a className="text-link" href={`${base}projects.html`}>View every project <span aria-hidden="true">→</span></a>
        </div>
        <div className="featured-grid">
          {projects.filter((project) => project.featured).map((project, index) => (
            <a className={`project-card project-card-${index + 1}`} href={project.href} target="_blank" rel="noreferrer" key={project.title}>
              <div className={`project-image${project.visual ? " project-visual" : ""}`}>
                {project.image ? <img src={project.image} alt="" /> : <><span>RATE / LIMIT</span><strong>{project.visual}</strong><i>requests, controlled.</i></>}
              </div>
              <div className="project-card-copy">
                <p>{project.category}</p>
                <h3>{project.title}</h3>
                <span>{project.stack.slice(0, 3).join(" · ")} <b aria-hidden="true">↗</b></span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </Reveal>

    <Reveal>
      <section className="now-card">
        <div className="now-orb" aria-hidden="true" />
        <div className="now-copy">
          <p className="eyebrow">Now</p>
          <h2>Learning from people who obsess over the details.</h2>
          <p>I&rsquo;m spending summer 2026 in Cupertino as a software engineering intern at Apple—building, learning, and raising my bar for great product work.</p>
          <a className="text-link" href={`${base}experience.html`}>See my experience <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </Reveal>
  </SiteLayout>
);

export default HomePage;
