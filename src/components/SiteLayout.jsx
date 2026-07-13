import SiteNav from "./SiteNav";
import { profile } from "../data/siteData";

const SiteLayout = ({ active, children }) => (
  <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <SiteNav active={active} />

    <main className="page" id="main-content">{children}</main>

    <footer className="footer">
      <div className="footer-cta">
        <p>Have something interesting in mind?</p>
        <a href={`mailto:${profile.email}`}>Let&rsquo;s make it happen <span aria-hidden="true">↗</span></a>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Josh Robertson</span>
        <span>Designed &amp; built with care.</span>
        <div className="footer-links">
          <a href="https://github.com/joshrobertson8" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/josh-robertson-66b370330" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  </>
);

export default SiteLayout;
