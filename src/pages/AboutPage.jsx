import SiteLayout from "../components/SiteLayout";
import { toolbox } from "../data/siteData";

const AboutPage = () => (
  <SiteLayout active="about">
    <section className="about-intro">
      <p className="section-label">About</p>
      <h1>
        Junior at UNC Chapel Hill studying computer science
      </h1>
    </section>

    <section className="about-text-only">
      <div className="about-text">
        <p>
          I grew up in Wilmington, NC, where I spent most of my time surfing,
          playing basketball, and developing a love for math and science. That
          curiosity led me to study computer science, and I&apos;m now a junior
          at the University of North Carolina at Chapel Hill.
        </p>
        <p>
         Now i'm looking to specialize in roles adjacent to backend/full stack engineering, API design, and cloud computing.
        </p>
      </div>
    </section>

    <hr className="divider" />

    <section>
      <p className="section-label">Technologies</p>
      <div className="toolbox">
        {toolbox.map((row) => (
          <div key={row.label} className="toolbox-row">
            <span className="toolbox-label">{row.label}</span>
            <span className="toolbox-items">{row.items}</span>
          </div>
        ))}
      </div>
    </section>
  </SiteLayout>
);

export default AboutPage;
