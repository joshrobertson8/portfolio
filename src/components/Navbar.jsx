import { useState } from "react";

const Navbar = ({ activeSection, navLinks, scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  // Normalize activeSection for comparison
  const normalizeSection = (section) => {
    if (section === '/' || section === '/index' || section === '#hero') return '/';
    if (section.startsWith('#')) return section.replace('#', '/');
    if (section.endsWith('.html')) return section.replace('.html', '');
    return section;
  };

  const normalizedActive = normalizeSection(activeSection);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a 
          href="/" 
          className="nav-logo"
        >
          <span className="nav-logo-text">JR</span>
        </a>

        <button
          className={`mobile-menu-btn ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          {navLinks.map((link) => {
            const normalizedLink = normalizeSection(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${normalizedActive === normalizedLink ? "active" : ""}`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
