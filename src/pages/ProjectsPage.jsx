import SiteLayout from "../components/SiteLayout";
import { projects } from "../data/siteData";

const ProjectsPage = () => (
  <SiteLayout active="projects">
    <h1 className="page-title">Projects</h1>

    <hr className="divider" />

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
            <span className="proj-stack">{project.stack.join(" \u00b7 ")}</span>
            <span className="proj-arrow" aria-hidden="true">&#8599;</span>
          </div>
        </a>
      ))}
    </div>
  </SiteLayout>
);

export default ProjectsPage;
