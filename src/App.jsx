import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import {
  initMagnetic,
  initParallax,
  initRevealAnimations,
  initRippleEffect,
  initTooltips,
} from "./lib/effects";

const navLinks = [
  { href: "/portfolio/", label: "Home" },
  { href: "/portfolio/about.html", label: "About" },
  { href: "/portfolio/experience.html", label: "Experience" },
  { href: "/portfolio/projects.html", label: "Projects" },
  { href: "/portfolio/contact.html", label: "Contact" },
];

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const cleanups = [
      initMagnetic(),
      initTooltips(),
      initRippleEffect(),
    ].filter(Boolean);

    return () => {
      cleanups.forEach((cleanup) => typeof cleanup === "function" && cleanup());
    };
  }, []);

  useEffect(() => {
    const cleanups = [
      initRevealAnimations(prefersReducedMotion),
      initParallax(prefersReducedMotion),
    ].filter(Boolean);

    return () => {
      cleanups.forEach((cleanup) => typeof cleanup === "function" && cleanup());
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section"));
    sections.forEach((section) => section.classList.add("visible"));
  }, []);

  return (
    <div className="app-shell">
      <Navbar activeSection="/" navLinks={navLinks} scrolled={scrolled} />
      <main>
        <Hero enableParticles={!prefersReducedMotion} />
      </main>
    </div>
  );
};

export default App;
