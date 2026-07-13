import SiteLayout from "../components/SiteLayout";
import Reveal from "../components/Reveal";
import { focusAreas, toolbox } from "../data/siteData";

const base = import.meta.env.BASE_URL;

const AboutPage = () => (
  <SiteLayout active="about">
    <Reveal>
      <section className="page-header about-header">
        <p className="eyebrow">About me</p>
        <h1>Curious by nature.<br /><span>Intentional by design.</span></h1>
        <p>Computer science student at UNC Chapel Hill, engineer by practice, and lifelong believer that the best technology disappears into the experience.</p>
      </section>
    </Reveal>

    <Reveal>
      <section className="about-story">
        <div className="about-photo"><img src={`${base}assets/img/about.jpg`} alt="Coastal landscape near Josh's hometown" /></div>
        <div className="about-text">
          <p className="eyebrow">My story</p>
          <h2>From the coast to code.</h2>
          <p>
            I grew up in Wilmington, NC, where I spent most of my time surfing,
            playing basketball, and developing a love for math and science. That
            curiosity led me to study computer science, and I&apos;m now a junior
            at the University of North Carolina at Chapel Hill.
          </p>
          <p>
            Today I&rsquo;m focused on backend and full-stack engineering, API design,
            and cloud systems—especially the hard, invisible work that makes a
            product feel effortless.
          </p>
        </div>
      </section>
    </Reveal>

    <Reveal>
      <section className="section-shell">
        <div className="section-heading"><div><p className="eyebrow">How I work</p><h2>Built around the fundamentals.</h2></div></div>
        <div className="principles-grid">
          {focusAreas.map((area, index) => (
            <article className="principle-card" key={area}>
              <span>0{index + 1}</span><h3>{area}</h3>
              <p>{["Reliability is a product feature. I design for the edge cases, not just the happy path.", "The best tools remove friction and give people time back.", "Speed, accessibility, and clarity are part of the experience—not polish added later."][index]}</p>
            </article>
          ))}
        </div>
      </section>
    </Reveal>

    <Reveal>
      <section className="section-shell toolbox-section">
        <div className="section-heading"><div><p className="eyebrow">Toolkit</p><h2>Things I build with.</h2></div></div>
        <div className="toolbox">
          {toolbox.map((row) => (
            <div key={row.label} className="toolbox-row">
              <span className="toolbox-label">{row.label}</span>
              <span className="toolbox-items">{row.items}</span>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  </SiteLayout>
);

export default AboutPage;
