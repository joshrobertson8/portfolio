import { projectsData } from '../data/content';

const Projects = () => (
  <section id="projects" className="projects section-morph visible">
    <div className="container section-content">
      <div className="section-header parallax-element parallax-slow">
        <span className="section-number reveal-left">03</span>
        <h2 className="section-title text-reveal reveal-element">Projects</h2>
      </div>
      <div className="projects-grid">
        {projectsData.map((project) => (
          <div className="project-card flip-card magnetic stagger-item" key={project.title}>
            <div className="project-image">
              <img src={project.image} alt={`${project.title} Demo`} />
              <div className="project-overlay">
                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                  >
                    <i className="fab fa-github" />
                  </a>
                  <a
                    href={project.external}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                  >
                    <i className="fas fa-external-link-alt" />
                  </a>
                </div>
              </div>
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech) => (
                  <span className="tech-tag" key={`${project.title}-${tech}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
