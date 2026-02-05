import SiteLayout from "../components/SiteLayout";
import { profile } from "../data/siteData";

const ContactPage = () => (
  <SiteLayout active="contact">
    <h1 className="page-title">Let&rsquo;s talk.</h1>
    <p className="contact-subtext"> Especially if you're in the Bay Area this summer, reach out!</p>

    <hr className="divider" />

    <div className="contact-grid">
      <div className="contact-block">
        <h2>Details</h2>
        <div className="contact-item">
          <span className="contact-item-label">Email</span>
          <a className="contact-item-value" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
        <div className="contact-item">
          <span className="contact-item-label">Location</span>
          <span className="contact-item-value">{profile.location}</span>
        </div>
      </div>

      <div className="contact-block">
        <h2>Elsewhere</h2>
        <div className="contact-socials">
          <a
            href="https://github.com/joshrobertson8"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/josh-robertson-66b370330"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </SiteLayout>
);

export default ContactPage;
