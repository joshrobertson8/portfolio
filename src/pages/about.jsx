import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Navbar from '../components/Navbar'
import About from '../components/About'
import Footer from '../components/Footer'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about.html', label: 'About' },
  { href: '/experience.html', label: 'Experience' },
  { href: '/projects.html', label: 'Projects' },
  { href: '/contact.html', label: 'Contact' },
];

const AboutPage = () => {
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
        <About />
      </main>
      <Footer />
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AboutPage />
  </StrictMode>,
)
