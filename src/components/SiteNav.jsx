import { useMemo, useState } from "react";
import { navLinks } from "../data/siteData";

const SiteNav = ({ active }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const base = import.meta.env.BASE_URL;

  const links = useMemo(
    () =>
      navLinks.map((item) => ({
        ...item,
        href: item.slug === "home" ? base : `${base}${item.slug}.html`,
      })),
    [base],
  );

  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="nav-brand" href={base} aria-label="Josh Robertson, home">
          <span className="brand-mark">JR</span>
          <span className="brand-name">Josh Robertson</span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          <span className="menu-line" />
          <span className="menu-line" />
        </button>

        <nav className={`nav-links${menuOpen ? " open" : ""}`}>
          {links.map((link) => (
            <a
              key={link.slug}
              href={link.href}
              className={`nav-link${link.slug === active ? " active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default SiteNav;
