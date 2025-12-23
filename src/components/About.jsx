const About = () => (
  <section id="about" className="about section-morph visible">
    <div className="container section-content">
      <div className="section-header parallax-element parallax-slow">
        <span className="section-number reveal-left">01</span>
        <h2 className="section-title text-reveal reveal-element">About</h2>
      </div>

      <div className="about-layout">
        {/* Main content area */}
        <div className="about-main">
          {/* Hero intro with photo */}
          <div className="about-hero">
            <div className="about-photo-feature hover-glow magnetic">
              <img src="/portfolio/assets/img/headshot.jpeg" alt="Josh Robertson" />
              <div className="photo-accent" />
            </div>
            <div className="about-intro">
              <h3 className="about-greeting">Hi, I'm Josh</h3>
              <div className="about-quick-info">
                <div className="info-item">
                  <i className="fas fa-graduation-cap" />
                  <span>CS + Math @ UNC Chapel Hill</span>
                </div>
                <div className="info-item">
                  <i className="fas fa-map-marker-alt" />
                  <span>Wilmington, NC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio section */}
          <div className="about-bio">
            <p>
              I grew up in Wilmington, NC, where I spent most of my time
              surfing, playing basketball, and developing a love for math and
              science. That curiosity led me to study computer science, and I'm
              now a junior at the University of North Carolina at Chapel Hill.
            </p>
            <p>
              I find satisfaction in elegant solutions and low-friction
              applications. I love software engineering, with a particular
              interest in API design and Backend Engineering.
            </p>
          </div>
        </div>

        {/* Side photo */}
        <div className="about-side">
          <div className="about-photo-secondary hover-glow magnetic">
            <img
              src="/portfolio/assets/img/headshot2.jpeg"
              alt="Josh Robertson - Casual"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
