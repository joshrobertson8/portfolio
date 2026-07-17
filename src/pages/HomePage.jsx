import SiteLayout from "../components/SiteLayout";
import Reveal from "../components/Reveal";

const base = import.meta.env.BASE_URL;

const HomePage = () => (
  <SiteLayout active="home">
    <Reveal>
      <section className="hero">
        <h1 className="hero-name">
          Josh
          <br />
          Robertson
        </h1>
      </section>
    </Reveal>

    <hr className="divider" />

    <Reveal>
      <section className="home-grid">
        <div className="home-block">
          <h2>Currently</h2>
          <p>software engineering intern @ apple</p>
          <a className="link-arrow" href={`${base}experience.html`}>
            All experience <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <div className="home-block">
          <h2>Featured</h2>
          <p>working on a java rate limiter library for springboot APIS</p>
          <a className="link-arrow" href={`${base}projects.html`}>
            All projects <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>
    </Reveal>
  </SiteLayout>
);

export default HomePage;
