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
        <a className="nav-brand" href={base}>
          Josh Robertson
        </a>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          menu
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
