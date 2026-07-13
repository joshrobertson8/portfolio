import SiteLayout from "../components/SiteLayout";
import Reveal from "../components/Reveal";
import { experience } from "../data/siteData";

const ExperiencePage = () => (
  <SiteLayout active="experience">
    <Reveal>
      <section className="page-header">
        <p className="eyebrow">Experience</p>
        <h1>Growing through<br /><span>real-world impact.</span></h1>
        <p>Building reliable systems, shipping products people use, and learning from teams with a high bar.</p>
      </section>
    </Reveal>

    <Reveal>
      <div className="experience-timeline">
        {experience.map((item, index) => (
          <article key={`${item.company}-${item.role}`} className="exp-item">
            <div className="exp-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
            <div className="exp-main">
              <div className="exp-heading"><div><p>{item.company}</p><h2>{item.role}</h2></div><span>{item.period}</span></div>
              <p className="exp-location">{item.location}</p>
              <ul className="exp-bullets">{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
    </Reveal>
  </SiteLayout>
);

export default ExperiencePage;
