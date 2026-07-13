import SiteLayout from "../components/SiteLayout";
import Reveal from "../components/Reveal";
import { profile } from "../data/siteData";

const ContactPage = () => (
  <SiteLayout active="contact">
    <Reveal>
      <section className="contact-hero">
        <p className="eyebrow"><span className="status-dot" /> Open to conversations</p>
        <h1>Let&rsquo;s build something<br /><span>worth caring about.</span></h1>
        <p>I&rsquo;m always happy to meet thoughtful people, trade ideas, or talk about an interesting problem—especially in the Bay Area this summer.</p>
        <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <span aria-hidden="true">↗</span></a>
      </section>
    </Reveal>

    <Reveal>
      <div className="contact-cards">
        <div className="contact-card">
          <span>Based in</span><strong>{profile.location}</strong><p>In the Bay Area for summer 2026.</p>
        </div>
        <div className="contact-card">
          <span>Find me online</span>
          <div className="contact-socials"><a href="https://github.com/joshrobertson8" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://linkedin.com/in/josh-robertson-66b370330" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
          <p>Code, projects, and the occasional update.</p>
        </div>
      </div>
    </Reveal>
  </SiteLayout>
);

export default ContactPage;
