import SiteNav from "./SiteNav";

const SiteLayout = ({ active, children }) => (
  <>
    <SiteNav active={active} />

    <main className="page">{children}</main>

    <footer className="footer">
      <span>&copy; {new Date().getFullYear()} Josh Robertson</span>
      <div className="footer-links">
        <a href="https://github.com/joshrobertson8" target="_blank" rel="noreferrer">
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
    </footer>
  </>
);

export default SiteLayout;
