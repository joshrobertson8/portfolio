import SiteLayout from "../components/SiteLayout";
import Reveal from "../components/Reveal";
import { projects } from "../data/siteData";

const ProjectsPage = () => (
  <SiteLayout active="projects">
    <Reveal>
      <section className="page-header">
        <p className="eyebrow">Selected projects</p>
        <h1>Built to solve.<br /><span>Designed to last.</span></h1>
        <p>A collection of products, infrastructure, and experiments—each shaped by curiosity and refined through use.</p>
      </section>
    </Reveal>

    <Reveal>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <a
            key={project.title}
            className={`project-tile ${i === 0 ? "project-tile-featured" : ""}`}
            href={project.href}
            target="_blank"
            rel="noreferrer"
          >
            <div className={`project-tile-image${project.visual ? " project-visual" : ""}`}>
              {project.image ? <img src={project.image} alt="" /> : <><span>RATE / LIMIT</span><strong>{project.visual}</strong><i>requests, controlled.</i></>}
            </div>
            <div className="project-tile-body">
              <div className="tile-kicker"><span>{String(i + 1).padStart(2, "0")}</span><span>{project.category}</span></div>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="tile-footer">
                <span>{project.stack.join(" · ")}</span>
                <b aria-hidden="true">↗</b>
              </div>
            </div>
          </a>
        ))}
      </div>
    </Reveal>
  </SiteLayout>
);

export default ProjectsPage;
