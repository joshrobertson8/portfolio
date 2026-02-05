import SiteLayout from "../components/SiteLayout";
import { profile } from "../data/siteData";

const base = import.meta.env.BASE_URL;

const HomePage = () => (
  <SiteLayout active="home">
    <section className="hero">
      <h1 className="hero-name">
        Josh
        <br />
        Robertson
      </h1>
      <p className="hero-meta">
        {profile.role} &mdash; {profile.location}
      </p>
      <p className="hero-summary">{profile.summary}</p>
    </section>

    <hr className="divider" />

    <section className="home-grid">
      <div className="home-block">
        <h2>Currently</h2>
        <p>incoming software engineering intern @ apple</p>
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
  </SiteLayout>
);

export default HomePage;
