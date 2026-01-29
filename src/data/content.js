export const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export const heroContent = {
  location: "Chapel Hill, NC",
  coordinates: "35.9132°N 79.0558°W",
  title: "Software Engineer",
};

export const experienceData = [
  {
    role: "Software Engineering Intern",
    company: "Apiture",
    period: "May 2025 – Present",
    bullets: [
      "Developed and maintained end-to-end API tests using Playwright, Node.js, and TypeScript to validate digital banking microservices handling <strong>56M+ hits/month across 100+ endpoints</strong>.",
      "Designed and implemented a recursive schema dereferencing utility, integrated into <strong>150+ test suites</strong>, reducing boilerplate and improving clarity.",
      "Optimized Jenkins CI/CD build execution, reducing pipeline runtime by <strong>30%</strong>.",
    ],
  },
  {
    role: "Software Engineer | Production Team",
    company: "App Team Carolina",
    period: "August 2025 – Present",
    bullets: [
      "Worked on <strong>Luminary</strong>, an accessibility-focused mobile app that helps individuals with mobility limitations navigate UNC campus more easily by finding accessible routes and facilities.",
      "Built and maintained scalable backend infrastructure for <strong>300+ daily active users</strong>, implementing authentication, user data storage, and custom + third-party API integrations.",
      "Collaborated with cross-functional teams of developers, designers, and product managers using modern app development practices to deliver technology-driven accessibility solutions.",
      "Worked with cloud-based tools and modern APIs including Firebase, OpenAI, and Plaid to support real-time experiences and secure data access.",
    ],
  },
  {
    role: "Freelance UI Engineer",
    company: "Novant Health",
    period: "July 2025",
    bullets: [
      "Implemented the guest Wi-Fi access system used by <strong>3,000+ daily users</strong>, including authentication flow, landing page UI, and user experience design.",
      "Built the solution using HTML and JavaScript, optimizing for simplicity.",
    ],
  },
];

export const skillsData = [
  {
    title: "Languages",
    items: [
      {
        title: "Python",
        className: "hover-python",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        title: "Java",
        className: "hover-java",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        title: "C",
        className: "hover-c",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
      },
      {
        title: "JavaScript",
        className: "hover-javascript",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        title: "TypeScript",
        className: "hover-typescript",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        title: "HTML5",
        className: "hover-html5",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        title: "CSS3",
        className: "hover-css3",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
    ],
  },
  {
    title: "Frameworks & Tools",
    items: [
      {
        title: "React",
        className: "hover-react",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        title: "Flask",
        className: "hover-flask",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
      },
      {
        title: "Playwright",
        className: "hover-playwright",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg",
      },
      {
        title: "Node.js",
        className: "hover-nodejs",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        title: "Docker",
        className: "hover-docker",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        title: "Git",
        className: "hover-git",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        title: "Firebase",
        className: "hover-firebase",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      },
    ],
  },
  {
    title: "AI & APIs",
    items: [
      {
        title: "OpenAI",
        className: "hover-openai",
        src: "https://cdn.simpleicons.org/openai",
      },
      {
        title: "Google",
        className: "hover-google",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
      },
      {
        title: "Plaid",
        className: "hover-plaid",
        src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgNDAiPjx0ZXh0IHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmb250LXNpemU9IjMwIiBmaWxsPSJ3aGl0ZSI+UExBSUQ8L3RleHQ+PC9zdmc+",
      },
    ],
  },
];

export const projectsData = [
  {
    title: "Cover Letter Generator",
    image: `${import.meta.env.BASE_URL}assets/img/covergen.png`,
    description:
      "Developed a web application that generates personalized cover letters using Google's Generative AI. Features include drag-and-drop resume upload and dynamic job description input.",
    tech: ["Flask", "HTML/CSS", "Google AI"],
    github: "https://github.com/joshrobertson8/Cover-gen",
    external: "https://github.com/joshrobertson8/Cover-gen",
  },
  {
    title: "Conversational Translator",
    image: `${import.meta.env.BASE_URL}assets/img/port.png`,
    description:
      "Built a real-time, context-aware translation web application enabling seamless multilingual conversations using Flask and Google Generative AI.",
    tech: ["Flask", "HTML/CSS", "Google AI"],
    github: "https://github.com/joshrobertson8/port-to-language",
    external: "https://github.com/joshrobertson8/port-to-language",
  },
  {
    title: "Chess Engine",
    image: `${import.meta.env.BASE_URL}assets/img/chess.jpg`,
    description:
      "Created an interactive chess game featuring an AI opponent that uses minimax and alpha‑beta pruning, including game features like automatic queen promotion and comprehensive endgame detection.",
    tech: ["Python", "Pygame"],
    github: "https://github.com/joshrobertson8/chess-engine",
    external: "https://github.com/joshrobertson8/chess-engine",
  },
  {
    title: "APSky",
    image: `${import.meta.env.BASE_URL}assets/img/APSky.png`,
    description:
      "Full‑stack weather application with city search, current weather display, 5‑day forecasts, and dynamic themes. Features responsive UI, demo cities, and real‑time metrics including temperature, humidity, and wind speed.",
    tech: ["Node.js", "Express", "OpenWeatherMap API", "Vanilla JS"],
    github: "https://github.com/joshrobertson8/weatherAPI",
    external: "https://github.com/joshrobertson8/weatherAPI",
  },
  {
    title: "ReadmeRanker",
    image: `${import.meta.env.BASE_URL}assets/img/readmeranker.png`,
    description:
      "CLI tool that analyzes README.md files and provides quality scores with actionable improvement suggestions. Features local and remote GitHub analysis, AI‑powered recommendations, and configurable scoring weights.",
    tech: ["TypeScript", "Node.js", "Commander", "Gemini AI"],
    github: "https://github.com/joshrobertson8/readmeRanker",
    external: "https://github.com/joshrobertson8/readmeranker",
  },
  {
    title: "Multi-AI Chat",
    image: `${import.meta.env.BASE_URL}assets/img/gptoss20b.png`,
    description:
      "Responsive web chat app that lets users talk to multiple free AI models (Hugging Face, Gemini, OpenAI, Mistral) using public/free API keys. Built with React + TypeScript + TailwindCSS frontend and Node.js + Express backend.",
    tech: ["TypeScript", "React", "TailwindCSS", "Node.js", "Express"],
    github: "https://github.com/joshrobertson8/multi-ai-chat",
    external: "https://github.com/joshrobertson8/multi-ai-chat",
  },
];

export const contactMethods = [
  {
    icon: "fas fa-envelope",
    label: "Email",
    value: "joshjrob@unc.edu",
    href: "mailto:joshjrob@unc.edu",
  },
  {
    icon: "fas fa-phone",
    label: "Phone",
    value: "910‑442‑7289",
    href: "tel:910-442-7289",
  },
  {
    icon: "fas fa-map-marker-alt",
    label: "Location",
    value: "Chapel Hill, NC",
    note: "Available to relocate",
  },
];

export const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/joshrobertson8",
    className: "github",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/josh-robertson-66b370330",
    className: "linkedin",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  },
];

export const mapUrls = {
  dark: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10746.844677925506!2d-79.05284622215449!3d35.90837345098078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acc2d2cb17aaeb%3A0xb33bf0976497e0e0!2sUniversity%20of%20North%20Carolina%20at%20Chapel%20Hill!5e0!3m2!1sen!2sus&style=feature:all%7Celement:geometry%7Ccolor:0x242f3e&style=feature:all%7Celement:labels.text.stroke%7Ccolor:0x242f3e&style=feature:all%7Celement:labels.text.fill%7Ccolor:0x746855&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi.park%7Celement:geometry%7Ccolor:0x263c3f&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x6b9a76&style=feature:road%7Celement:geometry%7Ccolor:0x38414e&style=feature:road%7Celement:geometry.stroke%7Ccolor:0x212a37&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x9ca5b3&style=feature:road.highway%7Celement:geometry%7Ccolor:0x746855&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x1f2835&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xf3d19c&style=feature:transit%7Celement:geometry%7Ccolor:0x2f3948&style=feature:transit.station%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:water%7Celement:geometry%7Ccolor:0x17263c&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x515c6d&style=feature:water%7Celement:labels.text.stroke%7Ccolor:0x17263c",
  light:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10746.844677925506!2d-79.05284622215449!3d35.90837345098078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acc2d2cb17aaeb%3A0xb33bf0976497e0e0!2sUniversity%20of%20North%20Carolina%20at%20Chapel%20Hill!5e0!3m2!1sen!2sus!4v1720039200959!5m2!1sen!2sus",
};
