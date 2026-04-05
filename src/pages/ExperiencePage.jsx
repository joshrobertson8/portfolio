import SiteLayout from "../components/SiteLayout";
import Reveal from "../components/Reveal";
import { experience } from "../data/siteData";

const ExperiencePage = () => (
  <SiteLayout active="experience">
    <Reveal>
      <h1 className="page-title">Experience</h1>
    </Reveal>

    <hr className="divider" />

    <Reveal>
      <div className="exp-list">
        {experience.map((item) => (
          <article key={`${item.company}-${item.role}`} className="exp-item">
            <h2 className="exp-role">{item.role}</h2>
            <p className="exp-meta">
              {item.company} &middot; {item.location} &middot; {item.period}
            </p>
            <ul className="exp-bullets">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Reveal>
  </SiteLayout>
);

export default ExperiencePage;
