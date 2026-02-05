export const navLinks = [
  { slug: "home", label: "Home" },
  { slug: "about", label: "About" },
  { slug: "experience", label: "Experience" },
  { slug: "projects", label: "Projects" },
  { slug: "contact", label: "Contact" },
];

export const profile = {
  name: "Josh Robertson",
  role: "Software Engineer",
  location: "Chapel Hill, North Carolina",
  email: "joshrobertson753@gmail.com",
  summary: "",
};

export const focusAreas = [
  "Backend systems and API reliability",
  "Automation and end-to-end testing",
  "Performance-minded web interfaces",
];

export const toolbox = [
  { label: "Languages", items: "Python, TypeScript, Java, JavaScript, C" },
  { label: "Backend & APIs", items: "Spring Boot, Spring MVC, REST APIs, Node.js, Express.js, Flask, OpenAI API, Postman" },
  { label: "Frontend", items: "HTML, CSS, Tailwind CSS, React.js" },
  { label: "Data", items: "PostgreSQL, MySQL, Firebase" },
  { label: "Testing & DevOps", items: "Playwright, Jest, Docker, Jenkins, Git, Bitbucket, CI/CD, JIRA, Faker.js" },
  { label: "Libraries", items: "Matplotlib, Scikit-learn, Pandas, Zod, Axios" },
  { label: "Tools", items: "VS Code, IntelliJ, LaTeX, Cursor, Claude Code" },
  { label: "Certifications", items: "HackerRank Python, LeetCode 100" },
];

export const experience = [
  {
    role: "Incoming Software Engineering Intern",
    company: "Apple",
    period: "Incoming",
    location: "Cupertino, CA",
    bullets: ["Summer 2026"],
  },
  {
    role: "Software Engineering Intern",
    company: "Apiture",
    period: "May 2025 - Present",
    location: "Wilmington, NC",
    bullets: [
      "Developed end-to-end API tests for banking microservices handling 56M+ monthly requests.",
      "Built a recursive schema dereferencing utility used across 150+ tests.",
      "Reduced CI runtime by roughly 30% by optimizing pipeline and test execution.",
    ],
  },
  {
    role: "Team Lead & Software Engineer",
    company: "App Team Carolina",
    period: "August 2025 - Present",
    location: "Chapel Hill, NC",
    bullets: [
      "Leading a team of ~20 PMs, ios, and backend engineers to build an accessibility app supporting campus navigation.",
      "Maintaining backend infrastructure including API's, databases, and pathfinding algorithms.",
      "Find Luminary on the app store today",
    ],
  },
  {
    role: "Freelance UI Engineer",
    company: "Novant Health",
    period: "July 2025",
    location: "North Carolina",
    bullets: [
      "Delivered a guest Wi-Fi portal used by 3,000+ daily visitors.",
      "Built a low-friction authentication flow with fast load performance.",
    ],
  },
];

export const projects = [
  {
    title: "Java Rate Limiter (In Dev)",
    description:
      "In development: Java rate limiter library for Spring Boot APIs with configurable policies and middleware integration.",
    stack: ["Java", "Spring Boot", "Maven"],
    image: `${import.meta.env.BASE_URL}assets/img/APSky.png`,
    href: "https://github.com/joshrobertson8",
  },
  {
    title: "Cover Letter Generator",
    description:
      "Web app that generates tailored cover letters from resume and role inputs.",
    stack: ["Flask", "Google AI", "HTML/CSS"],
    image: `${import.meta.env.BASE_URL}assets/img/covergen.png`,
    href: "https://github.com/joshrobertson8/Cover-gen",
  },
  {
    title: "Conversational Translator",
    description:
      "Context-aware multilingual translator that supports real-time conversational flow.",
    stack: ["Flask", "Google AI", "Web"],
    image: `${import.meta.env.BASE_URL}assets/img/port.png`,
    href: "https://github.com/joshrobertson8/port-to-language",
  },
  {
    title: "APSky",
    description:
      "Full-stack weather app with city search, forecasts, and custom backend written by me.",
    stack: ["Node.js", "Express", "OpenWeatherMap"],
    image: `${import.meta.env.BASE_URL}assets/img/APSky.png`,
    href: "https://github.com/joshrobertson8/weatherAPI",
  },
  {
    title: "ReadmeRanker",
    description:
      "CLI scoring tool for README quality with actionable rewrite recommendations.",
    stack: ["TypeScript", "Node.js", "Commander"],
    image: `${import.meta.env.BASE_URL}assets/img/readmeranker.png`,
    href: "https://github.com/joshrobertson8/readmeRanker",
  },
  {
    title: "GptossUI",
    description:
      "TypeScript chat UI for local Ollama models with streaming responses.",
    stack: ["TypeScript", "Express", "Ollama"],
    image: `${import.meta.env.BASE_URL}assets/img/gptoss20b.png`,
    href: "https://github.com/joshrobertson8/gptossApp",
  },
];
