import SiteLayout from "../components/SiteLayout";
import Reveal from "../components/Reveal";
import { projects } from "../data/siteData";

const ProjectsPage = () => (
  <SiteLayout active="projects">
    <Reveal>
      <h1 className="page-title">Projects</h1>
    </Reveal>

    <hr className="divider" />

    <Reveal>
      <div className="proj-list">
        {projects.map((project, i) => (
          <a
            key={project.title}
            className="proj-row"
            href={project.href}
            target="_blank"
            rel="noreferrer"
          >
            <span className="proj-num">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="proj-body">
              <h2 className="proj-name">{project.title}</h2>
              <p className="proj-desc">{project.description}</p>
            </div>
            <div className="proj-meta">
              <span className="proj-stack">{project.stack.join(", ")}</span>
              <span className="proj-arrow" aria-hidden="true">&#8599;</span>
            </div>
          </a>
        ))}
      </div>
    </Reveal>
  </SiteLayout>
);

export default ProjectsPage;
