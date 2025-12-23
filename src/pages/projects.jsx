import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Footer from "../components/Footer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about.html", label: "About" },
  { href: "/experience.html", label: "Experience" },
  { href: "/projects.html", label: "Projects" },
  { href: "/contact.html", label: "Contact" },
];

const ProjectsPage = () => {
  const currentPath = window.location.pathname;
  const activeSection =
    currentPath === "/" ? "/" : currentPath.replace(".html", "");

  return (
    <div className="app-shell">
      <Navbar
        activeSection={activeSection}
        navLinks={navLinks}
        scrolled={true}
      />
      <main>
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProjectsPage />
  </StrictMode>
);
