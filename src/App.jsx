import { useEffect, useRef, useState } from "react";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiBookOpen,
  FiCheck,
  FiChevronDown,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMenu,
  FiDownload,
  FiPhone,
  FiPlus,
  FiX,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import {
  SiAmazonec2,
  SiAmazons3,
  SiApacheairflow,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGithubactions,
  SiGooglebigquery,
  SiGooglecloud,
  SiMedium,
  SiMicrosoftazure,
  SiMongodb,
  SiNodedotjs,
  SiNumpy,
  SiOpenai,
  SiOpencv,
  SiPandas,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiSelenium,
  SiSqlite,
  SiSnowflake,
  SiTypescript,
} from "react-icons/si";
import { motion } from "framer-motion";
import "./App.scss";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "Wins", href: "#wins" },
  { label: "Leadership", href: "#leadership" },
];

const roleLenses = [
  {
    id: "ai",
    tab: "AI engineering",
    title: "Applied AI that stays connected to real data.",
    summary:
      "I combine LLM workflows with the data, validation, APIs, memory and delivery layers needed to make them useful beyond a demo.",
    evidence: [
      "Gemini-based forecast insight generation grounded in structured comparisons",
      "Independent LangGraph, RAG, MCP and tool-calling systems",
      "FastAPI, Docker and CI/CD delivery patterns",
    ],
    tech: [
      { label: "Python", icon: SiPython },
      "LangGraph",
      "LangChain",
      "RAG",
      "MCP / FastMCP",
      "Gemini",
      { label: "OpenAI", icon: SiOpenai },
      "Tool calling",
      "Vector search",
      "Memory / state",
      { label: "FastAPI", icon: SiFastapi },
      "REST APIs",
      "Document processing",
      "Web retrieval",
      { label: "Docker", icon: SiDocker },
      { label: "GitHub Actions", icon: SiGithubactions },
    ],
  },
  {
    id: "analytics",
    tab: "Analytics engineering",
    title: "Reliable movement, modeling and validation of data.",
    summary:
      "I work from warehouse logic through reporting outputs—building integration workflows, repeatable checks and scheduled analytical layers.",
    evidence: [
      "BigQuery–GCS–Snowflake integration and reconciliation",
      "Python and SQL validation across row, aggregate and business levels",
      "Airflow-scheduled forecast reporting and warehouse debugging",
    ],
    tech: [
      { label: "Python", icon: SiPython },
      "SQL",
      { label: "BigQuery", icon: SiGooglebigquery },
      "GCS",
      { label: "Snowflake", icon: SiSnowflake },
      { label: "Airflow", icon: SiApacheairflow },
      { label: "Pandas", icon: SiPandas },
      { label: "PostgreSQL", icon: SiPostgresql },
      "ETL / ELT",
      "Data validation",
      "Forecast reporting",
      "Warehouse debugging",
    ],
  },
  {
    id: "science",
    tab: "Data science",
    title: "Analysis that explains what changed and why it matters.",
    summary:
      "My work connects forecast behavior, model evaluation and business interpretation so stakeholders can act on the output—not just inspect it.",
    evidence: [
      "Prior vs refreshed forecast and actuals comparison",
      "ML pipelines with drift checks, feature engineering and promotion gates",
      "Stakeholder-ready forecast readouts and analytical storytelling",
    ],
    tech: [
      { label: "Python", icon: SiPython },
      { label: "scikit-learn", icon: SiScikitlearn },
      { label: "Pandas", icon: SiPandas },
      { label: "NumPy", icon: SiNumpy },
      { label: "BigQuery", icon: SiGooglebigquery },
      "Feature engineering",
      "Forecast evaluation",
      "Drift detection",
      "Model validation",
      "Computer vision",
      { label: "OpenCV", icon: SiOpencv },
    ],
  },
  {
    id: "fde",
    tab: "Forward deployed",
    title: "Technical delivery at the point where users feel it.",
    summary:
      "I translate ambiguous requirements into product configuration, data checks, reporting logic and cross-functional execution for enterprise clients.",
    evidence: [
      "PlanSmart and ItemSmart configuration for client requirements",
      "Root-cause analysis across data, transformation, product and reporting layers",
      "Collaboration with Product, Data Engineering, QA, Ingestion and clients",
    ],
    tech: [
      { label: "Python", icon: SiPython },
      "SQL",
      { label: "GCP", icon: SiGooglecloud },
      { label: "BigQuery", icon: SiGooglebigquery },
      { label: "Snowflake", icon: SiSnowflake },
      "REST APIs",
      { label: "Postman", icon: SiPostman },
      "Data validation",
      "Product configuration",
      "UAT / release checks",
      "Implementation readiness",
      "Issue triage",
    ],
  },
];

const impactStreams = [
  {
    number: "01",
    title: "Enterprise data integration",
    summary: "Built and validated a cross-platform BigQuery–GCS–Snowflake workflow for downstream client requirements.",
    details: [
      "Worked across extraction, raw tables, sourcing logic, transformation, standardization and downstream forecast consumption.",
      "Reconciled source and target systems to catch schema issues, missing records and data mismatches before release.",
      "Partnered with Data Engineering and Ingestion teams to resolve movement and availability issues.",
    ],
    tech: [
      { label: "BigQuery", icon: SiGooglebigquery },
      { label: "GCS", icon: SiGooglecloud },
      { label: "Snowflake", icon: SiSnowflake },
      { label: "Python", icon: SiPython },
    ],
  },
  {
    number: "02",
    title: "Validation and data quality tooling",
    summary: "Created reusable Python and SQL checks that made release-readiness validation faster and more repeatable.",
    details: [
      "Built secondary validation after Snowflake-to-BigQuery extraction across row, aggregate and business levels.",
      "Standardized historical data checks used by Product, QA, Ingestion and Data Engineering teams.",
      "Improved root-cause analysis by surfacing discrepancies earlier in the workflow.",
    ],
    tech: [
      { label: "Python", icon: SiPython },
      { label: "SQL", icon: SiPostgresql },
      { label: "Pandas", icon: SiPandas },
    ],
  },
  {
    number: "03",
    title: "Forecast intelligence",
    summary: "Supported demand-forecasting readiness from usable input data and feature context through recurring forecast evaluation.",
    details: [
      "Prepared and validated demand-forecasting data in the formats required by downstream forecasting workflows.",
      "Worked with feature inputs, forecast drivers, scope and constraints, including event context and feature-engineering support.",
      "Created a running-window structure that preserves forecast snapshots and exposes movement between refreshes.",
      "Scheduled the recurring reporting layer through an existing Airflow workflow.",
      "Helped stakeholders understand what changed between runs and how the changes related to actual outcomes.",
    ],
    tech: [
      { label: "Python", icon: SiPython },
      { label: "Pandas", icon: SiPandas },
      { label: "Airflow", icon: SiApacheairflow },
      { label: "BigQuery", icon: SiGooglebigquery },
    ],
  },
  {
    number: "04",
    title: "AI-assisted insight generation",
    summary: "Built a weekly Gemini workflow that turns validated forecast comparisons into stakeholder-ready explanations.",
    details: [
      "Grounded generated summaries in structured latest-vs-previous forecast data.",
      "Used AI to improve the speed and readability of weekly communication while retaining analytical checks.",
      "Contributed to internal Claude Skills for schema-mapping and exploratory data analysis workflows.",
    ],
    tech: [
      { label: "Gemini", icon: SiGooglecloud },
      { label: "Python", icon: SiPython },
      { label: "BigQuery", icon: SiGooglebigquery },
    ],
  },
  {
    number: "05",
    title: "Product and client implementation",
    summary: "Translate client needs into product configuration, reporting logic, validation rules and implementation follow-through.",
    details: [
      "Configured PlanSmart and ItemSmart around business workflows and underlying data dependencies.",
      "Led a forecast readout under Project Lead guidance, connecting technical changes to business context.",
      "Drove blockers toward closure across Product, QA, Data Engineering, Ingestion and client stakeholders.",
    ],
    tech: [
      { label: "SQL", icon: SiPostgresql },
      { label: "Python", icon: SiPython },
      { label: "Snowflake", icon: SiSnowflake },
    ],
  },
];

const projects = [
  {
    index: "P/01",
    title: "Agentic AI Workspace",
    descriptor: "Full-stack analytical assistant · LangGraph / RAG / FastAPI",
    problem:
      "General chat interfaces lose context and make it difficult to verify answers across mixed business files. I wanted an analytical workspace that remembers the thread, retrieves from the right source and shows its grounding.",
    system:
      "A FastAPI backend and React interface with persistent chat APIs, thread-scoped RAG over PDF, DOCX, TXT, Markdown, Python and CSV files, plus tools for search, calculation, document retrieval and memory recall.",
    reliability:
      "Gemini embeddings, ChromaDB retrieval, SQLite persistence and LangGraph checkpoints keep conversations stateful. Source-grounded generation makes the response easier to validate; Docker and GitHub Actions support deployment to ECR/EC2.",
    tags: [
      "Python", "LangGraph", "LangChain", "RAG", "Gemini", "MCP / FastMCP",
      "Tool calling", "FastAPI", "React", "Vector search", "Document processing",
      "Web retrieval", "SQLite", "Docker", "GitHub Actions", "EC2",
    ],
    repo: "https://github.com/amanjain200",
    repoLabel: "Explore on GitHub",
  },
  {
    index: "P/02",
    title: "US Visa Prediction E2E",
    descriptor: "Production-minded ML system · ingestion to promotion",
    problem:
      "A notebook can train a model; a usable ML system must also validate inputs, preserve artifacts, detect drift and decide whether a new model is actually better than the approved one.",
    system:
      "A modular pipeline covering MongoDB ingestion, schema validation, drift reporting, mixed-feature transformation, company-age logic, model training and FastAPI/Jinja2 prediction serving.",
    reliability:
      "Typed configuration and artifact objects keep stages reproducible. SMOTEENN handles class imbalance, F1 drives evaluation, and an S3-backed promotion gate advances only improved models with the matching preprocessing object.",
    tags: [
      "Python", "scikit-learn", "Pandas", "NumPy", "MongoDB", "FastAPI",
      "AWS S3", "Feature engineering", "Drift detection", "Class imbalance",
      "Model validation", "Model promotion", "MLOps", "REST APIs",
    ],
    repo: "https://github.com/amanjain200",
    repoLabel: "Explore on GitHub",
  },
  {
    index: "P/03",
    title: "AI Calling Agent",
    descriptor: "Real-time conversational system · speech to reasoning to voice",
    problem:
      "Voice agents feel useful only when the loop is fast enough to resemble a conversation and stateful enough to remember what was already said.",
    system:
      "A browser-based agent that captures speech through the Web Speech API, sends the query to a Node/Express backend, reasons with GPT-4o and returns natural speech through Smallest.ai's low-latency TTS model.",
    reliability:
      "Conversation history is carried through the prompt for contextual replies, while the frontend and Azure-hosted backend remain modular enough to extend into support, sales or workflow automation use cases.",
    tags: [
      "GPT-4o", "Web Speech API", "Smallest.ai", "React", "Node", "Express",
      "Azure", "REST APIs", "Speech-to-text", "Text-to-speech", "Conversation state",
    ],
    repo: "https://github.com/amanjain200/AI-Calling-Agent",
    repoLabel: "View repository",
    live: "https://ai-calling-agent.netlify.app/",
  },
];

const writingProfiles = [
  {
    platform: "Medium",
    handle: "@amanjain189200",
    description: "Technical essays, ideas and longer-form explorations.",
    url: "https://medium.com/@amanjain189200",
    icon: SiMedium,
  },
];

const articles = [
  {
    index: "A/01",
    title: "Why Future Lies at the Edge?",
    date: "MAY 25, 2023",
    readTime: "TECHNICAL ESSAY",
    excerpt:
      "An exploration of why rising compute demand and transformative AI and ML applications are pushing more intelligence closer to where data is created.",
    topics: ["Edge computing", "AI / ML", "Cloud systems"],
    url: "https://medium.com/@amanjain189200",
  },
];

const credentials = [
  { mark: "DB", title: "Generative AI Fundamentals", issuer: "Databricks", date: "Aug 2026" },
  { mark: "AI", title: "Agentic AI", issuer: "GeeksforGeeks · Skill Up", date: "Jul 2026" },
  { mark: "PM", title: "API Fundamentals Student Expert", issuer: "Postman", date: "Jul 2024" },
  { mark: "GS", title: "Software Engineering Virtual Experience", issuer: "Goldman Sachs", date: "Aug 2023" },
  { mark: "GD", title: "Fundamentals of Digital Marketing", issuer: "Google Digital Garage", date: "May 2022" },
];

const technologyIcons = {
  Python: SiPython,
  FastAPI: SiFastapi,
  OpenAI: SiOpenai,
  "GPT-4o": SiOpenai,
  Docker: SiDocker,
  "GitHub Actions": SiGithubactions,
  BigQuery: SiGooglebigquery,
  Snowflake: SiSnowflake,
  Airflow: SiApacheairflow,
  MongoDB: SiMongodb,
  React: SiReact,
  TypeScript: SiTypescript,
  Node: SiNodedotjs,
  Express: SiExpress,
  Azure: SiMicrosoftazure,
  NumPy: SiNumpy,
  SQLite: SiSqlite,
  Postman: SiPostman,
  "AWS S3": SiAmazons3,
  EC2: SiAmazonec2,
  GCS: SiGooglecloud,
  SQL: SiPostgresql,
  "REST APIs": SiPostman,
  OpenCV: SiOpencv,
  Selenium: SiSelenium,
  "scikit-learn": SiScikitlearn,
};

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ number, children, light = false }) {
  return (
    <div className={`section-label ${light ? "section-label-light" : ""}`}>
      <span>{number}</span>
      <i />
      <span>{children}</span>
    </div>
  );
}

function TechChip({ technology }) {
  const item = typeof technology === "string" ? { label: technology } : technology;
  const Icon = item.icon || technologyIcons[item.label];

  return (
    <span className="tech-chip">
      {Icon ? <Icon aria-hidden="true" /> : <i aria-hidden="true" />}
      <span>{item.label}</span>
    </span>
  );
}

function WritingProfileCard({ profile }) {
  const Icon = profile.icon;

  return (
    <a className="writing-profile-card" href={profile.url} target="_blank" rel="noreferrer">
      <Icon aria-hidden="true" />
      <div>
        <span>PRIMARY WRITING CHANNEL</span>
        <h3>{profile.platform}</h3>
        <p>{profile.handle}</p>
      </div>
      <p>{profile.description}</p>
      <FiArrowUpRight aria-hidden="true" />
    </a>
  );
}

function ProjectPlaceholder({ index }) {
  return (
    <div className="project-placeholder" aria-label="Reserved project screenshot area">
      <div className="placeholder-toolbar">
        <span>{index} / MEDIA</span>
        <span>16:9</span>
      </div>
      <div className="placeholder-grid" />
      <div className="placeholder-cross cross-a" />
      <div className="placeholder-cross cross-b" />
      <div className="placeholder-center">
        <FiPlus />
        <p>Project screenshots<br />coming next</p>
        <span>UI · DEMO · ARCHITECTURE</span>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLensIndex, setActiveLensIndex] = useState(0);
  const [lensInteracted, setLensInteracted] = useState(false);
  const [lensVisible, setLensVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lensSectionRef = useRef(null);
  const activeLens = roleLenses[activeLensIndex];

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    const section = lensSectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setLensVisible(entry.isIntersecting),
      { threshold: 0.32 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!lensVisible || lensInteracted || reducedMotion) return undefined;

    const rotation = window.setInterval(() => {
      setActiveLensIndex((index) => (index + 1) % roleLenses.length);
    }, 5200);
    return () => window.clearInterval(rotation);
  }, [lensInteracted, lensVisible]);

  const chooseLens = (index) => {
    setActiveLensIndex(index);
    setLensInteracted(true);
  };

  return (
    <div className="portfolio-shell">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Aman Jain home">
          <span className="wordmark-box">AJ</span>
          <span className="wordmark-text">AMAN JAIN <i>/ 2026</i></span>
        </a>
        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Contact <FiArrowUpRight /></a>
        </nav>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-main site-width">
            <div className="hero-copy">
              <Reveal className="hero-kicker">
                <span>AI ANALYST @ IMPACT ANALYTICS</span>
                <span>BENGALURU, INDIA</span>
              </Reveal>
              <Reveal delay={0.07}>
                <p className="hero-name">AMAN JAIN</p>
                <h1>AI <span>+</span><br />Analytics<br />Engineer</h1>
              </Reveal>
              <Reveal className="hero-deck" delay={0.15}>
                <p>
                  I build data-grounded AI applications and analytics systems—from enterprise data pipelines and forecast intelligence to agentic RAG products and client delivery.
                </p>
                <div className="hero-actions">
                  <a href="#role-lens">See where I fit <FiArrowDown /></a>
                  <a href="https://www.linkedin.com/in/the-aman-jain/" target="_blank" rel="noreferrer">LinkedIn <FiArrowUpRight /></a>
                  <a href="/Aman_Jain_Resume_AI_Analytics.pdf" download>Resume <FiDownload /></a>
                </div>
              </Reveal>
            </div>

            <Reveal className="hero-media" delay={0.12}>
              <img src="/images/hero-impact-office.jpeg" alt="Aman Jain outside the Impact Analytics office in Bengaluru" />
              <div className="hero-media-noise" />
              <div className="hero-media-top"><span>CURRENT / 01</span><span>12.9716° N</span></div>
              <div className="hero-media-caption">
                <span>IMPACT ANALYTICS</span>
                <p>Forecasting · data engineering · AI-assisted insights · client implementation</p>
              </div>
              <div className="hero-badge hero-badge-awards"><b>03×</b><span>company<br />recognitions</span></div>
              <div className="hero-badge hero-badge-builds"><b>04</b><span>highlighted<br />build wins</span></div>
            </Reveal>
          </div>

          <div className="hero-role-rail">
            <div className="hero-role-track">
              <span>ANALYTICS ENGINEERING</span><i>✳</i><span>DATA SCIENCE</span><i>✳</i><span>AI ANALYTICS</span><i>✳</i><span>AI ENGINEERING</span><i>✳</i><span>FORWARD DEPLOYED</span><i>✳</i><span>AGENTIC AI</span><i>✳</i>
              <span>ANALYTICS ENGINEERING</span><i>✳</i><span>DATA SCIENCE</span><i>✳</i><span>AI ANALYTICS</span><i>✳</i><span>AI ENGINEERING</span><i>✳</i><span>FORWARD DEPLOYED</span><i>✳</i><span>AGENTIC AI</span><i>✳</i>
            </div>
          </div>
        </section>

        <section
          className="role-lens"
          id="role-lens"
          ref={lensSectionRef}
          onPointerDown={() => setLensInteracted(true)}
          onKeyDown={() => setLensInteracted(true)}
        >
          <div className="site-width">
            <Reveal className="role-lens-heading">
              <SectionLabel number="00">RANGE / PRACTICE</SectionLabel>
              <h2>One foundation.<br /><em>Multiple ways to create value.</em></h2>
              <p>The through-line is simple: understand the system, ground the intelligence in reliable data, and carry it through to delivery.</p>
            </Reveal>

            <div className="lens-tabs" role="tablist" aria-label="Areas of practice">
              {roleLenses.map((lens, index) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeLens.id === lens.id}
                  className={activeLens.id === lens.id ? "active" : ""}
                  key={lens.id}
                  onClick={() => chooseLens(index)}
                >
                  <span>0{index + 1}</span>{lens.tab}
                </button>
              ))}
            </div>
            <div className={`lens-autoplay ${lensInteracted ? "is-held" : ""}`} aria-hidden="true">
              <span>{lensInteracted ? "MANUAL / HELD" : "AUTO / EXPLORING"}</span>
              <i key={`${activeLens.id}-${lensVisible}`} />
            </div>

            <motion.div
              className="lens-panel"
              key={activeLens.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="lens-panel-copy">
                <p className="lens-overline">THE PRACTICE</p>
                <h3>{activeLens.title}</h3>
                <p>{activeLens.summary}</p>
              </div>
              <div className="lens-evidence">
                <p className="lens-overline">IN PRACTICE</p>
                <ol>
                  {activeLens.evidence.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}
                </ol>
              </div>
              <div className="lens-tech-stack">
                <span className="stack-label">WORKING STACK</span>
                {activeLens.tech.map((technology) => <TechChip technology={technology} key={typeof technology === "string" ? technology : technology.label} />)}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="site-width">
            <Reveal className="experience-heading">
              <SectionLabel number="01">EXPERIENCE / IMPACT ANALYTICS</SectionLabel>
              <div className="experience-title-row">
                <h2>Enterprise analytics,<br /><em>end to end.</em></h2>
                <p>AI Analyst working across retail analytics, demand-forecasting workflows, data engineering, product configuration, validation automation and AI-assisted insight generation for large enterprise clients.</p>
              </div>
            </Reveal>

            <div className="experience-hero-grid">
              <Reveal className="experience-photo" delay={0.08}>
                <img src="/images/impact-office-selfie.jpeg" alt="Aman Jain at the Impact Analytics office" loading="lazy" />
                <div className="photo-caption"><span>IMPACT ANALYTICS / BENGALURU</span><span>FEB 2025 → NOW</span></div>
              </Reveal>
              <Reveal className="experience-summary-card" delay={0.13}>
                <div className="experience-role">
                  <span>AI ANALYST</span>
                  <b>JUL 2025 — PRESENT</b>
                </div>
                <p>Building business-facing AI and analytics workflows across demand-forecasting data readiness, feature and event context, warehouse systems, product behavior and stakeholder decisions.</p>
                <div className="experience-stat-grid">
                  <div><b>03</b><span>company awards</span></div>
                  <div><b>05</b><span>delivery lanes</span></div>
                  <div><b>05+</b><span>cross-functional groups</span></div>
                </div>
                <div className="experience-recognition">
                  <span>GEN AI PACESETTER · Q2 2025</span>
                  <span>QUARTER AWARDS · Q2 2025 / Q1 2026</span>
                </div>
              </Reveal>
            </div>

            <div className="impact-streams">
              {impactStreams.map((stream, index) => (
                <Reveal key={stream.number} delay={index * 0.04}>
                  <details className="impact-stream" defaultOpen={index === 0}>
                    <summary>
                      <span className="stream-number">{stream.number}</span>
                      <span className="stream-title">{stream.title}</span>
                      <span className="stream-summary">{stream.summary}</span>
                      <FiChevronDown />
                    </summary>
                    <div className="stream-details">
                      <p>DETAIL / CONTRIBUTION</p>
                      <div className="stream-detail-body">
                        <ul>{stream.details.map((detail) => <li key={detail}><FiCheck />{detail}</li>)}</ul>
                        <div className="stream-tech">
                          {stream.tech.map((technology) => <TechChip technology={technology} key={typeof technology === "string" ? technology : technology.label} />)}
                        </div>
                      </div>
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>

            <Reveal className="intern-row">
              <span>FOUNDATION / 2025</span>
              <h3>AI Analyst Intern</h3>
              <p>Started in analytics implementation, SQL validation, product configuration support and release-readiness checks; converted to a full-time AI Analyst role after five months.</p>
              <span>FEB — JUL 2025</span>
            </Reveal>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="site-width">
            <Reveal className="projects-heading">
              <SectionLabel number="02" light>SELECTED SYSTEMS</SectionLabel>
              <h2>Projects with the<br /><em>architecture left in.</em></h2>
              <p>Not just what the interface does—what sits behind it, what can fail, and how I designed the delivery path.</p>
            </Reveal>

            <div className="project-list">
              {projects.map((project, index) => (
                <Reveal className="project-case" key={project.index} delay={index * 0.06}>
                  <div className="project-case-head">
                    <span>{project.index}</span>
                    <div><h3>{project.title}</h3><p>{project.descriptor}</p></div>
                    <FiArrowUpRight />
                  </div>
                  <ProjectPlaceholder index={project.index} />
                  <div className="project-story-grid">
                    <div><span>01 / PROBLEM</span><p>{project.problem}</p></div>
                    <div><span>02 / SYSTEM</span><p>{project.system}</p></div>
                    <div><span>03 / RELIABILITY</span><p>{project.reliability}</p></div>
                  </div>
                  <div className="project-case-footer">
                    <div className="project-tags">{project.tags.map((tag) => <TechChip technology={tag} key={tag} />)}</div>
                    <div className="project-links">
                      <a href={project.repo} target="_blank" rel="noreferrer"><FiGithub /> {project.repoLabel}</a>
                      {project.live ? (
                        <a href={project.live} target="_blank" rel="noreferrer"><FiExternalLink /> Live demo</a>
                      ) : (
                        <span className="link-pending">LIVE LINK / PENDING</span>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
              <Reveal className="future-project-slot">
                <FiPlus />
                <div><span>NEXT / PROJECT</span><h3>Built to grow with the next case study.</h3><p>Reserved structure for screenshots, live link, GitHub, architecture, problem framing and implementation details.</p></div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="writing-section" id="writing">
          <div className="site-width">
            <Reveal className="writing-heading">
              <SectionLabel number="03">WRITING / IDEAS</SectionLabel>
              <h2>Thinking in public,<br /><em>one system at a time.</em></h2>
              <p>Longer notes on computing, applied intelligence and the infrastructure underneath emerging products.</p>
            </Reveal>

            <div className="writing-profile-grid">
              {writingProfiles.map((profile) => <WritingProfileCard profile={profile} key={profile.platform} />)}
              <div className="profile-expansion-note">
                <span>NEXT / CHANNELS</span>
                <p>More technical and publishing profiles will join this index.</p>
                <FiPlus aria-hidden="true" />
              </div>
            </div>

            <div className="article-grid">
              {articles.map((article) => (
                <Reveal className="article-card" key={article.index}>
                  <div className="article-art" aria-hidden="true">
                    <span>EDGE / COMPUTE</span>
                    <b>01</b>
                    <div className="edge-signal"><i /><i /><i /><i /></div>
                    <p>DATA<br />MOVES<br />OUTWARD</p>
                  </div>
                  <div className="article-copy">
                    <div className="article-meta"><span>{article.index}</span><span>{article.date}</span><span>{article.readTime}</span></div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <div className="article-topics">{article.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
                    <a href={article.url} target="_blank" rel="noreferrer"><FiBookOpen /> Find on Medium <FiArrowUpRight /></a>
                  </div>
                </Reveal>
              ))}
              <Reveal className="article-next-card" delay={0.08}>
                <span>A/NEXT</span>
                <FiPlus aria-hidden="true" />
                <h3>Notes on AI systems, analytics and the work behind the interface.</h3>
                <p>Future articles will follow the same editorial card system.</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="wins-section" id="wins">
          <div className="site-width">
            <Reveal className="wins-heading">
              <SectionLabel number="04">BUILDS UNDER PRESSURE</SectionLabel>
              <h2>Hackathons, demos<br />and <em>winning rooms.</em></h2>
              <p>The photos are not decoration. They are evidence of presenting, collaborating and shipping against a clock.</p>
            </Reveal>

            <div className="wins-grid">
              <Reveal className="win-card win-card-codeutsava">
                <div className="win-collage codeutsava-collage">
                  <img className="win-image-main" src="/images/codeutsava-win.jpeg" alt="Aman Jain and team winning CodeUtsava 7.0" loading="lazy" />
                  <img className="win-image-small small-a" src="/images/codeutsava-training.jpeg" alt="Machine learning model training during CodeUtsava" loading="lazy" />
                  <img className="win-image-small small-b" src="/images/codeutsava-news.jpeg" alt="Newspaper coverage of the CodeUtsava win" loading="lazy" />
                  <span className="image-sticker">28 HOURS / BUILD</span>
                </div>
                <div className="win-copy">
                  <span>2023 · OVERALL WINNER</span>
                  <h3>CodeUtsava 7.0</h3>
                  <p>Team CtrlShiftHack built an end-to-end system for real-time pothole detection using drones, with a web interface, location-aware alerts and visual reporting for authorities.</p>
                  <div className="win-proof"><b>THE BUILD</b><span>YOLO / computer vision</span><span>drone-based capture</span><span>road-safety workflow</span></div>
                  <div className="win-tech"><TechChip technology={{ label: "OpenCV", icon: SiOpencv }} /><TechChip technology={{ label: "Python", icon: SiPython }} /></div>
                </div>
              </Reveal>

              <Reveal className="win-card win-card-ideathon" delay={0.08}>
                <div className="win-collage ideathon-collage">
                  <img className="win-image-main" src="/images/ideathon-presenting-2.jpeg" alt="Aman Jain presenting at the Makerspace Ideathon" loading="lazy" />
                  <img className="win-image-small small-a" src="/images/ideathon-win.jpeg" alt="Aman Jain receiving the Ideathon winner certificate" loading="lazy" />
                  <span className="image-sticker">PITCH / PROTOTYPE / WIN</span>
                </div>
                <div className="win-copy">
                  <span>2023 · WINNER</span>
                  <h3>Makerspace Ideathon</h3>
                  <p>Presented an IoT and machine-learning concept for tackling road accidents—moving from problem framing and system design to a live room presentation and first-place finish.</p>
                  <div className="win-proof"><b>THE BUILD</b><span>IoT</span><span>machine learning</span><span>public-safety problem</span></div>
                  <div className="win-tech"><TechChip technology={{ label: "Python", icon: SiPython }} /><TechChip technology={{ label: "Computer vision", icon: SiOpencv }} /></div>
                </div>
              </Reveal>

              <Reveal className="win-card win-card-digital" delay={0.1}>
                <div className="digital-win-mark">FB<span>01</span></div>
                <div className="win-copy">
                  <span>2025 · TECHNICAL EXCELLENCE</span>
                  <h3>FocusBuddy</h3>
                  <p>A React and TypeScript browser extension that tracks browsing habits, turns local activity into focus metrics and adds AI-powered productivity insights with privacy-focused storage.</p>
                  <div className="win-tech"><TechChip technology="React" /><TechChip technology="TypeScript" /></div>
                  <div className="asset-pending"><FiPlus /> Screenshot / certificate asset slot</div>
                </div>
              </Reveal>

              <Reveal className="win-card win-card-digital win-card-comply" delay={0.14}>
                <div className="digital-win-mark">CS<span>02</span></div>
                <div className="win-copy">
                  <span>2025 · TECHNICAL ARCHITECTURE &amp; SCALE</span>
                  <h3>ComplyScan</h3>
                  <p>An AI-powered accessibility audit workflow using Selenium to extract ARIA, contrast and keyboard-navigation evidence, then LLMs to produce structured reports and suggested fixes.</p>
                  <div className="win-tech"><TechChip technology="Selenium" /><TechChip technology="Python" /><TechChip technology="GPT-4o" /></div>
                  <div className="asset-pending"><FiPlus /> Screenshot / certificate asset slot</div>
                </div>
              </Reveal>
            </div>

            <Reveal className="field-note">
              <div className="field-note-images">
                <img src="/images/vigyan-demo.jpeg" alt="Aman Jain demonstrating the Innovators United project at Vigyan" loading="lazy" />
                <img src="/images/vigyan-team.jpeg" alt="The Innovators United team at Vigyan" loading="lazy" />
              </div>
              <div className="field-note-copy">
                <span>FIELD NOTE / INNOVATORS UNITED</span>
                <h3>Railway track inspection,<br />designed end to end.</h3>
                <p>A computer-vision concept for scanning railway tracks and identifying defects—another early exercise in connecting model output to an operational workflow.</p>
                <div className="win-tech"><TechChip technology="OpenCV" /><TechChip technology="Python" /></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="leadership-section" id="leadership">
          <div className="site-width">
            <Reveal className="leadership-heading">
              <SectionLabel number="05">LEADERSHIP / VOLUNTEERING</SectionLabel>
              <h2>Rooms, teams and<br /><em>real-world delivery.</em></h2>
            </Reveal>

            <div className="leadership-grid">
              <Reveal className="leadership-card ecell-card">
                <div className="leadership-image"><img src="/images/ecell-esummit.jpeg" alt="E-Summit at NIT Raipur" loading="lazy" /><span>5K+ FOOTFALL</span></div>
                <div className="leadership-copy">
                  <span>ENTREPRENEURSHIP CELL · NIT RAIPUR</span>
                  <h3>Sponsorship Lead</h3>
                  <p>Helped take the flagship E-Summit from months of sponsorship outreach and partner coordination to a campus event with 5,000+ footfall. Progressed through Executive, Manager and Head Coordinator roles across three years.</p>
                  <div className="leadership-tags"><span>Sponsorship</span><span>Partnerships</span><span>Event delivery</span><span>Team leadership</span></div>
                </div>
              </Reveal>

              <Reveal className="leadership-card tedx-card" delay={0.08}>
                <div className="tedx-photo-stack">
                  <img className="tedx-main" src="/images/tedx-venue.jpeg" alt="TEDx NIT Raipur venue and speaker banners" loading="lazy" />
                  <img className="tedx-small" src="/images/tedx-coordinating.jpeg" alt="Aman Jain coordinating TEDx NIT Raipur" loading="lazy" />
                </div>
                <div className="leadership-copy">
                  <span>TEDx NIT RAIPUR</span>
                  <h3>PR &amp; Marketing</h3>
                  <p>Helped continue TEDx NIT Raipur after the post-COVID pause—supporting public relations, marketing, guest-facing coordination and event operations around a strong, multi-disciplinary speaker panel.</p>
                  <div className="leadership-tags"><span>PR</span><span>Marketing</span><span>Guest coordination</span><span>Operations</span></div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="education-section" id="education">
          <div className="site-width">
            <Reveal className="education-heading">
              <SectionLabel number="06">EDUCATION + CREDENTIALS</SectionLabel>
              <h2>The foundation,<br /><em>still compounding.</em></h2>
            </Reveal>

            <div className="education-grid">
              <Reveal className="education-feature">
                <div className="education-photo">
                  <img src="/images/nit-convocation.jpeg" alt="Aman Jain at the NIT Raipur convocation" loading="lazy" />
                  <span>NIT RAIPUR / CLASS OF 2025</span>
                </div>
                <div className="education-copy">
                  <span>B.TECH / COMPUTER SCIENCE &amp; ENGINEERING</span>
                  <h3>National Institute of Technology Raipur</h3>
                  <div><b>8.41</b><span>CGPA</span><b>2021—25</b><span>COHORT</span></div>
                </div>
              </Reveal>

              <div className="credential-list">
                {credentials.map((credential, index) => (
                  <Reveal className="credential-card" key={credential.title} delay={index * 0.04}>
                    <div className="credential-mark">{credential.mark}</div>
                    <div><span>{credential.issuer}</span><h3>{credential.title}</h3></div>
                    <span>{credential.date}</span>
                    <FiArrowUpRight />
                  </Reveal>
                ))}
                <Reveal className="credential-placeholder">
                  <FiPlus /><span>Certificate images and credential links can drop into this system without changing the layout.</span>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="site-width contact-inner">
            <Reveal>
              <SectionLabel number="07" light>CONTACT</SectionLabel>
              <p className="contact-pretitle">DATA / AI / ANALYTICS / DELIVERY</p>
              <h2>Let&apos;s build<br /><em>the useful thing.</em></h2>
            </Reveal>
            <Reveal className="contact-actions" delay={0.1}>
              <a className="contact-email" href="mailto:amanjain189200@gmail.com"><FiMail /> amanjain189200@gmail.com <FiArrowUpRight /></a>
              <a className="contact-phone" href="tel:+919668525792"><FiPhone /> +91 96685 25792 <FiArrowUpRight /></a>
              <a className="resume-download" href="/Aman_Jain_Resume_AI_Analytics.pdf" download><FiDownload /> Download resume <span>PDF / 86 KB</span></a>
              <div className="contact-socials">
                <a href="https://www.linkedin.com/in/the-aman-jain/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a>
                <a href="https://github.com/amanjain200" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
                <a href="https://x.com/the_aman_jain" target="_blank" rel="noreferrer"><FaXTwitter /> X</a>
                <a href="https://medium.com/@amanjain189200" target="_blank" rel="noreferrer"><SiMedium /> Medium</a>
              </div>
            </Reveal>
          </div>
          <div className="contact-marquee"><span>AMAN JAIN — AI + ANALYTICS ENGINEER — </span><span>AMAN JAIN — AI + ANALYTICS ENGINEER — </span></div>
        </section>
      </main>

      <footer className="site-footer site-width">
        <span>© {new Date().getFullYear()} AMAN JAIN</span>
        <span>BENGALURU / INDIA</span>
        <a href="#home">BACK TO TOP <FiArrowUpRight /></a>
      </footer>
    </div>
  );
}

export default App;
