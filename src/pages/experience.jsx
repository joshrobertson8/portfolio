import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Navbar from '../components/Navbar'
import Experience from '../components/Experience'
import Footer from '../components/Footer'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about.html', label: 'About' },
  { href: '/experience.html', label: 'Experience' },
  { href: '/projects.html', label: 'Projects' },
  { href: '/contact.html', label: 'Contact' },
];

const ExperiencePage = () => {
  const currentPath = window.location.pathname;
  const activeSection = currentPath === '/' ? '/' : currentPath.replace('.html', '');

  return (
    <div className="app-shell">
      <Navbar 
        activeSection={activeSection}
        navLinks={navLinks}
        scrolled={true}
      />
      <main>
        <Experience />
      </main>
      <Footer />
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExperiencePage />
  </StrictMode>,
)
