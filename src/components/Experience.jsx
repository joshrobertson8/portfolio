import { experienceData, skillsData } from '../data/content';

const Experience = () => (
  <section id="experience" className="experience section-morph visible">
    <div className="container section-content">
      <div className="section-header parallax-element parallax-slow">
        <span className="section-number reveal-left">02</span>
        <h2 className="section-title text-reveal reveal-element">Experience</h2>
      </div>
      <div className="experience-grid">
        {experienceData.map((item) => (
          <div className="experience-item stagger-item" key={`${item.company}-${item.role}`}>
            <div className="experience-header">
              <h3>{item.role}</h3>
              <span className="company">{item.company}</span>
              <span className="period">{item.period}</span>
            </div>
            <ul className="experience-description">
              {item.bullets.map((bullet, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: bullet }} />
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="skills-section">
        <div className="skills-header">
          <h3>Technical Skills</h3>
        </div>
        <div className="skills-grid">
          {skillsData.map((category) => (
            <div className="skill-category stagger-item hover-tilt floating" key={category.title}>
              <div className="skill-icon">
                <i className={category.icon} />
              </div>
              <h4>{category.title}</h4>
              <div className="skill-icon-grid">
                {category.items.map((skill) => (
                  <img
                    key={skill.title}
                    src={skill.src}
                    title={skill.title}
                    alt={skill.title}
                    className={`skill-icon-img ${skill.className}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
