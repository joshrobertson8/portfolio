import SiteLayout from "../components/SiteLayout";
import Reveal from "../components/Reveal";

const ContactPage = () => (
  <SiteLayout active="contact">
    <Reveal>
      <h1 className="page-title">Links</h1>
    </Reveal>

    <hr className="divider" />

    <Reveal>
      <div className="links-list">
        <a href="https://github.com/joshrobertson8" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://linkedin.com/in/josh-robertson-66b370330" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </Reveal>
  </SiteLayout>
);

export default ContactPage;
