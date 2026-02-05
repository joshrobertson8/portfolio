import SiteLayout from "../components/SiteLayout";
import { experience } from "../data/siteData";

const ExperiencePage = () => (
  <SiteLayout active="experience">
    <h1 className="page-title">Experience</h1>

    <hr className="divider" />

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
  </SiteLayout>
);

export default ExperiencePage;
