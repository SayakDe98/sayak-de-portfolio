import Head from "next/head";
import { useEffect, useState } from "react";
import { Syne, Inter, Instrument_Serif } from "next/font/google";
import styles from "@/styles/Home.module.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  // Matter is KCD's custom font; Inter is the closest Google Fonts equivalent
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  // Initialise theme from localStorage or system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("light", initial === "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    localStorage.setItem("theme", next);
  };

  useEffect(() => {
    // Custom cursor — dot snaps, ring springs via RAF
    const cursor = document.getElementById("cursor");
    const trail = document.getElementById("cursor-trail");

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    let rafId;

    const lerp = (a, b, t) => a + (b - a) * t;

    const animateTrail = () => {
      trailX = lerp(trailX, mouseX, 0.12);
      trailY = lerp(trailY, mouseY, 0.12);
      trail.style.left = trailX + "px";
      trail.style.top  = trailY + "px";
      rafId = requestAnimationFrame(animateTrail);
    };
    rafId = requestAnimationFrame(animateTrail);

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = e.clientX + "px";
      cursor.style.top  = e.clientY + "px";
    };
    document.addEventListener("mousemove", onMouseMove);

    const onEnter = () => document.body.classList.add("cursor-hover");
    const onLeave = () => document.body.classList.remove("cursor-hover");

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Scroll reveal
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));

    // Skill bars animation
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".skill-bar-fill").forEach((bar) => {
              bar.style.width = bar.dataset.width + "%";
            });
          }
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll("#about").forEach((el) => barObserver.observe(el));

    // Nav active state on scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    const onScroll = () => {
      let current = "";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      navLinks.forEach((a) => {
        a.style.color =
          a.getAttribute("href") === "#" + current ? "var(--text)" : "";
      });
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      barObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Sayak De — Full Stack Engineer</title>
        <meta name="description" content="Fullstack Software Engineer · React.js · Vue.js · Go · Node.js · AWS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${syne.variable} ${inter.variable} ${instrumentSerif.variable}`}>
        <div id="cursor"></div>
        <div id="cursor-trail"></div>

        {/* NAV */}
        <nav>
          <a href="#hero" className="nav-logo">SD<span>.</span></a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Personal Projects</a></li>
            <li><a href="#leetcode">DSA</a></li>
            <li><a href="#contact" className="nav-cta">Hire Me</a></li>
          </ul>
          <div className="nav-right">
            {/* Theme toggle */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {/* Sun — shown in dark mode */}
              <svg className="icon-sun" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              {/* Moon — shown in light mode */}
              <svg className="icon-moon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </button>

            <button
              className={`nav-hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="mobile-menu">
            {["#about", "#experience", "#projects", "#leetcode"].map((href) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {href.replace("#", "").replace("projects", "Personal Projects")}
              </a>
            ))}
            <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Hire Me</a>
          </div>
        )}

        {/* HERO */}
        <section id="hero" className="hero-fullbleed">
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
          <div className="hero-orb hero-orb-3"></div>
          <div className="hero-noise"></div>

          <div className="hero-vertical-label">
            <span className="hero-vertical-dot"></span>
            Available for Work
          </div>

          <div className="hero-content">
            <h1 className="hero-display">
              Full-Stack<br />
              <span className="hero-display-italic">Web Dev</span>
            </h1>
            <p className="hero-byline">Sayak De · Howrah, India · 4+ yrs · React · Vue · Go · AWS</p>
          </div>

          <div className="hero-pills">
            <span className="hero-pill">Full-Time</span>
            <span className="hero-pill">Remote</span>
            <a href="#contact" className="hero-pill hero-pill-accent">Get in Touch →</a>
          </div>

          <div className="hero-scroll">
            <div className="scroll-line"></div>
            Scroll
          </div>

            <img
              src="/kody_skiing_flying_yellow.png"
              alt="Developer mascot"
              className="hero-mascot"
            />
        </section>

        {/* MARQUEE */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[
              "Vue.js 3","React.js","Go (Golang)","Node.js","TypeScript","Next.js","Nuxt 3",
              "AWS CloudFront","Redis","PostgreSQL","GraphQL","WebSocket","Juspay","Stripe","Sentry","Docker",
              "Vue.js 3","React.js","Go (Golang)","Node.js","TypeScript","Next.js","Nuxt 3",
              "AWS CloudFront","Redis","PostgreSQL","GraphQL","WebSocket","Juspay","Stripe","Sentry","Docker",
            ].map((item, i) => (
              <div key={i} className="marquee-item">{item}</div>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about">
          <div className="section-header reveal">
            <span className="section-num">01</span>
            <h2 className="section-title">About</h2>
            <div className="section-line"></div>
          </div>
          <div className="about-grid">
            <div className="about-text reveal">
              <p>Hi, I&apos;m <strong>Sayak De</strong> — a Fullstack Software Engineer based in Howrah, India,
                with 4+ years of production experience building secure, scalable web applications. I graduated with a
                B.Tech in Applied Electronics and Instrumentation Engineering from Netaji Subhash
                Engineering College, Kolkata in 2021.</p>
              <p>I specialise in end-to-end delivery — from building intuitive Vue.js 3 / React frontends to engineering
                performant Go &amp; Node.js backends. Deep expertise in payment systems (Razorpay→Juspay migration, Stripe),
                CDN optimisation (AWS CloudFront, Gumlet), and frontend performance monitoring with Sentry.</p>
              <p>I believe in shipping code that <strong>moves real metrics</strong>: lifted DebugBear scores by 24 points,
                cut cloud spend by ₹1L/month, drove a viral feature to +20% MAU growth — and earned CEO recognition at
                an all-hands meeting.</p>
              <div className="about-highlight">
                <p>&quot;Passionate about elegant systems that balance developer experience with end-user delight.&quot;</p>
              </div>
            </div>

            <div className="reveal reveal-delay-2">
              <div style={{ marginBottom: "32px" }}>
                <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px" }}>
                  Proficiency
                </p>
                {[
                  { name: "Vue.js 3 / React.js",   pct: 92 },
                  { name: "Go (Golang)",            pct: 85 },
                  { name: "Node.js / REST APIs",    pct: 88 },
                  { name: "AWS / Cloud & CDN",      pct: 78 },
                  { name: "PostgreSQL / Redis",     pct: 80 },
                ].map(({ name, pct }) => (
                  <div key={name} className="skill-bar-wrap">
                    <div className="skill-bar-meta">
                      <span className="skill-bar-name">{name}</span>
                      <span className="skill-bar-pct">{pct}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <div className="skill-bar-fill" data-width={pct}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="skills-grid">
                {[
                  { cat: "Frontend",        tags: ["Vue.js 3","Nuxt 3","React.js","Next.js","TypeScript","TanStack Query","Zod","Storybook","WCAG"] },
                  { cat: "Backend",         tags: ["Go","Node.js","GraphQL","WebSocket","RESTful APIs","PHP","Python"] },
                  { cat: "Data",            tags: ["PostgreSQL","MongoDB","MySQL","Redis"] },
                  { cat: "Payments",        tags: ["Juspay","Razorpay","Stripe"] },
                  { cat: "Cloud & DevOps",  tags: ["AWS CloudFront","AWS S3","AWS Route53","Gumlet CDN","GitHub Actions","Docker"] },
                  { cat: "Security",        tags: ["JWT","RBAC","Google OAuth","OWASP"] },
                  { cat: "Monitoring",      tags: ["Sentry","DebugBear","Google Analytics","WebEngage","A/B Testing"] },
                  { cat: "AI in Workflow",  tags: ["Claude","GitHub Copilot","Cursor","OpenAPI codegen"] },
                ].map(({ cat, tags }) => (
                  <div key={cat} className="skill-category">
                    <div className="skill-cat-name">{cat}</div>
                    <div className="skill-tags">
                      {tags.map((t) => <span key={t} className="skill-tag">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <div className="section-header reveal">
            <span className="section-num">02</span>
            <h2 className="section-title">Experience</h2>
            <div className="section-line"></div>
          </div>

          <div className="timeline">
            {/* Nua */}
            <div className="tl-item reveal">
              <div className="tl-dot"></div>
              <div className="tl-header">
                <div className="tl-left">
                  <div className="tl-company">Nua</div>
                  <div className="tl-role">Software Engineer I — Frontend-Led Fullstack</div>
                </div>
                <div className="tl-date">Oct 2024 – Present · Remote</div>
              </div>
              <ul className="tl-bullets">
                <li><strong>Payment Gateway Migration:</strong> Partnered with Product, Design, and backend teams to migrate payment links from Razorpay to Juspay — re-architected the checkout API layer and updated the payment flow; ensured <strong>zero downtime</strong> during cutover.</li>
                <li><strong>Checkout Reliability:</strong> Implemented JWT-secured transaction APIs — improved transaction reliability and reduced payment failure rate post-launch.</li>
                <li><strong>Period Tracker — Viral Feature:</strong> Designed and shipped full-stack feature in close collaboration with Product and Design; drove <strong>+20% Monthly Active User (MAU)</strong> engagement within 30 days; <strong>recognised by CEO</strong> at all-hands meeting. <span className="impact-badge">+20% MAU</span></li>
                <li><strong>Performance Triage &amp; Optimisation:</strong> Triaged and resolved Collection Page performance issues; instrumented Sentry for error reporting and applied Redis caching — <strong>lifted DebugBear score by 24 points</strong> in a single sprint. <span className="impact-badge">+24pts perf</span></li>
                <li><strong>CDN Cost Reduction:</strong> Integrated Gumlet for image delivery with responsive width/height optimisation — cut monthly cloud spend by <strong>~₹1,00,000/month (~$1,200 USD)</strong>; deployed assets via AWS CloudFront and AWS Route53 for low-latency global delivery. <span className="impact-badge">₹1L/month saved</span></li>
                <li><strong>Server-Side APIs:</strong> Designed and implemented server-side APIs for internal tooling and storefront endpoints — improved data consistency and reduced client-server round-trips.</li>
                <li><strong>Web Standards &amp; Architecture:</strong> Applied web components and island architecture for selective hydration — improved Time-to-Interactive and reduced unnecessary JavaScript execution on content-heavy pages.</li>
                <li><strong>Subscription Flows &amp; Triage:</strong> Resolved drop-off issues in subscription flows; redesigned My Orders page and shipped Out-of-Stock recommendation engine — reduced upsell drop-off within 2 weeks; instrumented Google Analytics + WebEngage funnels informing 3 roadmap decisions.</li>
                <li><strong>Mentorship &amp; Code Reviews:</strong> Mentored 2 junior engineers in frontend patterns, WCAG, and performance profiling; led weekly code-review sessions upholding software engineering best practices.</li>
                <li><strong>Multicultural Collaboration:</strong> Collaborated daily with colleagues distributed across India via Slack and Confluence — navigating diverse working styles in an inclusive agile squad environment.</li>
              </ul>
            </div>

            {/* Thinkitive */}
            <div className="tl-item reveal reveal-delay-1">
              <div className="tl-dot"></div>
              <div className="tl-header">
                <div className="tl-left">
                  <div className="tl-company">Thinkitive Technologies</div>
                  <div className="tl-role">Software Engineer — Frontend &amp; Backend</div>
                </div>
                <div className="tl-date">Jun 2022 – Sep 2024 · Pune</div>
              </div>
              <ul className="tl-bullets">
                <li><strong>Frontend:</strong> Built and maintained complex UI features — multilingual video captions, interactive charts, stepper forms. Applied Storybook for component visualisation and UI testing. <span className="impact-badge">+35% engagement</span></li>
                <li><strong>Performance Optimisation:</strong> Cut client-side load time by 30% by rewriting data-fetch orchestration — replacing N+1 waterfalls with single batched API responses. <span className="impact-badge">-30% load time</span></li>
                <li><strong>Payments Backend:</strong> Delivered Stripe payment integration end-to-end following software engineering best practices; reduced transaction failure rate by 25%.</li>
                <li><strong>Voice Search:</strong> Implemented Voice Search in frontend — boosted search-feature participation by 40%, the largest single engagement increase of the year. <span className="impact-badge">+40% participation</span></li>
                <li><strong>Scalable APIs:</strong> Engineered timezone-flexible event booking API — unlocked international user segments and increased booking activity by +20%.</li>
                <li><strong>Security &amp; Auth:</strong> Hardened authentication with JWT + granular Role-Based Access Control (RBAC), eliminating privilege-escalation vulnerabilities flagged in security audit; aligned with OWASP standards.</li>
                <li><strong>Product Issue Triage:</strong> Triaged and resolved product issues using LLM-assisted scaffolding and GitHub Actions CI/CD pipelines — compressed average ticket cycle time from 5 days to 3 days across the team.</li>
                <li><strong>Real-Time Features:</strong> Integrated live-chat SDK — delivered a +25% rise in daily active interactions. <span className="impact-badge">+25% activity</span></li>
                <li><strong>API Design:</strong> Designed APIs with OpenAPI codegen for consistent, schema-driven development.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="section-header reveal">
            <span className="section-num">03</span>
            <h2 className="section-title">Personal Projects</h2>
            <div className="section-line"></div>
          </div>

          <div className="reveal" style={{ marginBottom: "20px" }}>
            <p style={{ fontSize: "13px", color: "var(--muted)", maxWidth: "600px", lineHeight: "1.8" }}>
              Side projects I build to explore new domains and sharpen full-stack skills beyond my day job.
            </p>
          </div>

          <div className="projects-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {/* 01 — Chess Gambit */}
            <div className="project-card reveal" style={{ position: "relative", overflow: "hidden" }}>
              <div className="proj-first-line">
                <div className="proj-num">01 — Active</div>
                <div className={styles.badgeGreen}>Live</div>
              </div>
              <div className="proj-title">Chess Gambit</div>
              <div className="proj-desc">A full-featured real-time multiplayer chess platform with WebSocket-driven board synchronisation handling concurrent game sessions with sub-100ms move latency. Redis-backed session state for seamless reconnect, deployed on AWS S3 with CloudFront CDN delivery.</div>
              <div className="proj-tech">
                {["React.js","Go","WebSocket","Redis","PostgreSQL","AWS S3","CloudFront"].map((t) => <span key={t}>{t}</span>)}
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a href="https://chess-frontend-sand.vercel.app" target="_blank" rel="noopener noreferrer" className="proj-link">Visit Live Site ↗</a>
                <a href="https://github.com/SayakDe98/chess-frontend" target="_blank" rel="noopener noreferrer" className="proj-link" style={{ borderColor: "var(--border)", color: "var(--text-mid)" }}>GitHub ↗</a>
              </div>
            </div>

            {/* 02 — URL Shortener */}
            <div className="project-card reveal reveal-delay-1" style={{ position: "relative", overflow: "hidden" }}>
              <div className="proj-first-line">
                <div className="proj-num">02 — Active</div>
                <div className={styles.badgeGreen}>Live</div>
              </div>
              <div className="proj-title">URL Shortener</div>
              <div className="proj-desc">A high-performance URL shortening service achieving sub-5ms redirect resolution via Redis-first lookup with MySQL persistence. Features custom aliases, click analytics dashboard, and expiry management — demonstrating high-throughput API design.</div>
              <div className="proj-tech">
                {["Go","Redis","MySQL","React.js","Node.js"].map((t) => <span key={t}>{t}</span>)}
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a href="https://url-shortener-frontend-mu-blond.vercel.app" target="_blank" rel="noopener noreferrer" className="proj-link">Visit Live Site ↗</a>
                <a href="https://github.com/SayakDe98/url-shortener-frontend" target="_blank" rel="noopener noreferrer" className="proj-link" style={{ borderColor: "var(--border)", color: "var(--text-mid)" }}>GitHub ↗</a>
              </div>
            </div>

            {/* 03 — Wanderlust */}
            <div className="project-card reveal reveal-delay-2" style={{ position: "relative", overflow: "hidden" }}>
              <div className="proj-first-line">
                <div className="proj-num">03 — Active</div>
                <div className={styles.badgeGreen}>Live</div>
              </div>
              <div className="proj-title">Wanderlust — AI Travel Planner</div>
              <div className="proj-desc">An AI-powered travel itinerary builder that generates up to 5 slides per destination, each packed with local attractions, curated photos, and tourist insights — turning any city into a ready-to-go guided tour.</div>
              <div className="proj-tech">
                {["Next.js","Gemini API","React.js","Vercel"].map((t) => <span key={t}>{t}</span>)}
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a href="https://wanderlust-travel-app-theta.vercel.app/" target="_blank" rel="noopener noreferrer" className="proj-link">Visit Live Site ↗</a>
                <a href="https://github.com/SayakDe98/wanderlust-travel-app" target="_blank" rel="noopener noreferrer" className="proj-link" style={{ borderColor: "var(--border)", color: "var(--text-mid)" }}>GitHub ↗</a>
              </div>
            </div>

            {/* 04 — The Rainforest Canopy */}
            <div className="project-card reveal reveal-delay-3" style={{ position: "relative", overflow: "hidden" }}>
              <div className="proj-first-line">
                <div className="proj-num">04 — Active</div>
                <div className={styles.badgeGreen}>Live</div>
              </div>
              <div className="proj-title">The Rainforest Canopy</div>
              <div className="proj-desc">A single-page nature site built around Amazon rainforest footage — full-bleed hero video, canopy cross-section infographic, species spotlight cards, and a deforestation data visualisation.</div>
              <div className="proj-tech">
                {["Next.js","App Router","React.js","Vercel"].map((t) => <span key={t}>{t}</span>)}
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a href="https://rainforest-canopy.vercel.app/" target="_blank" rel="noopener noreferrer" className="proj-link">Visit Live Site ↗</a>
                <a href="https://github.com/SayakDe98/rainforest-canopy" target="_blank" rel="noopener noreferrer" className="proj-link" style={{ borderColor: "var(--border)", color: "var(--text-mid)" }}>GitHub ↗</a>
              </div>
            </div>

            {/* 05 — The Moto Cafe */}
            <div className="project-card reveal reveal-delay-3" style={{ position: "relative", overflow: "hidden" }}>
              <div className="proj-first-line">
                <div className="proj-num">05 — Active</div>
                <div className={styles.badgeGreen}>Live</div>
              </div>
              <div className="proj-title">The Moto Cafe</div>
              <div className="proj-desc">A biker-themed café site with a custom badge logo, transformed interior photography, and warm, editorial styling built for a distinctive local brand feel.</div>
              <div className="proj-tech">
                {["Next.js","React.js","CSS Modules","Vercel"].map((t) => <span key={t}>{t}</span>)}
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a href="https://moto-cafe.vercel.app/" target="_blank" rel="noopener noreferrer" className="proj-link">Visit Live Site ↗</a>
                <a href="https://github.com/SayakDe98/moto-cafe" target="_blank" rel="noopener noreferrer" className="proj-link" style={{ borderColor: "var(--border)", color: "var(--text-mid)" }}>GitHub ↗</a>
              </div>
            </div>

            {/* 06 — Inkwell */}
            <div className="project-card reveal reveal-delay-3" style={{ position: "relative", overflow: "hidden" }}>
              <div className="proj-first-line">
                <div className="proj-num">06 — Active</div>
                <div className={styles.badgeGreen}>Live</div>
              </div>
              <div className="proj-title">Inkwell — Writing Platform</div>
              <div className="proj-desc">Built and deployed an ongoing full-stack writing tool in Next.js and TypeScript. Demonstrates end-to-end ownership from architecture through deployment.</div>
              <div className="proj-tech">
                {["Next.js","TypeScript","React.js","Vercel"].map((t) => <span key={t}>{t}</span>)}
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a href="https://inkwell-six-coral.vercel.app" target="_blank" rel="noopener noreferrer" className="proj-link">Visit Live Site ↗</a>
                <a href="https://github.com/SayakDe98/inkwell" target="_blank" rel="noopener noreferrer" className="proj-link" style={{ borderColor: "var(--border)", color: "var(--text-mid)" }}>GitHub ↗</a>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "36px" }} className="reveal reveal-delay-3">
            <a href="https://github.com/SayakDe98" target="_blank" rel="noopener noreferrer"
              className="btn-secondary" style={{ display: "inline-block" }}>
              More on GitHub →
            </a>
          </div>
        </section>

        {/* OPEN SOURCE */}
        <section id="opensource">
          <div className="section-header reveal">
            <span className="section-num">04</span>
            <h2 className="section-title">Open Source</h2>
            <div className="section-line"></div>
          </div>

          <div className="oss-grid" style={{ width: "100%", display: "grid", gap: "20px" }}>
            {/* react-toastify */}
            <div className="oss-card reveal" style={{ gridColumn: "span 2", borderColor: "rgba(0,179,122,0.2)", background: "rgba(0,179,122,0.03)" }}>
              <div className="oss-header">
                <span className="oss-icon">🍞</span>
                <div>
                  <div className="oss-name">react-toastify — Merged PR</div>
                  <div style={{ fontSize: "11px", color: "var(--accent)", marginTop: "3px", letterSpacing: "0.06em" }}>
                    fkhadra/react-toastify · 5M+ weekly npm downloads
                  </div>
                </div>
              </div>
              <div className="oss-desc" style={{ marginBottom: "16px" }}>
                Identified a reproducible bug open since January 2023 in{" "}
                <strong style={{ color: "var(--text)" }}>react-toastify</strong> — one of the most widely
                used React notification libraries on npm. Submitted a targeted PR with full backward
                compatibility.
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
                <span style={{ fontSize: "11px", padding: "4px 12px", border: "1px solid rgba(0,179,122,0.3)", borderRadius: "2px", color: "var(--accent)" }}>React</span>
                {["TypeScript","Bug Fix","PR Merged"].map((t) => (
                  <span key={t} style={{ fontSize: "11px", padding: "4px 12px", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--muted)" }}>{t}</span>
                ))}
              </div>
              <a href="https://github.com/fkhadra/react-toastify/pull/1281" target="_blank" rel="noopener noreferrer" className="proj-link">
                View PR #1281 ↗
              </a>
            </div>

            {/* kana-dojo */}
            <div className="oss-card reveal reveal-delay-1" style={{ gridColumn: "span 2", borderColor: "rgba(100,120,255,0.2)", background: "rgba(100,120,255,0.03)" }}>
              <div className="oss-header">
                <span className="oss-icon">🇯🇵</span>
                <div>
                  <div className="oss-name">kana-dojo — Japanese Language Learning Platform</div>
                  <div style={{ fontSize: "11px", color: "#8080ff", marginTop: "3px", letterSpacing: "0.06em" }}>
                    lingdojo/kana-dojo · 5 Merged PRs
                  </div>
                </div>
              </div>
              <div className="oss-desc" style={{ marginBottom: "16px" }}>
                Delivered frontend improvements across two merged PRs to an active open-source Japanese
                language education project — demonstrating both technical contribution and genuine
                interest in the Japanese tech ecosystem.
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
                <span style={{ fontSize: "11px", padding: "4px 12px", border: "1px solid rgba(100,120,255,0.3)", borderRadius: "2px", color: "#8080ff" }}>Frontend</span>
                {["Education","5 PRs Merged","Japanese Market"].map((t) => (
                  <span key={t} style={{ fontSize: "11px", padding: "4px 12px", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--muted)" }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <a href="https://github.com/lingdojo/kana-dojo/pull/11038" target="_blank" rel="noopener noreferrer" className="proj-link">
                  View PR #11038 ↗
                </a>
                <a href="https://github.com/lingdojo/kana-dojo/pull/11253" target="_blank" rel="noopener noreferrer" className="proj-link">
                  View PR #11253 ↗
                </a>
                 <a href="https://github.com/lingdojo/kana-dojo/pull/11376" target="_blank" rel="noopener noreferrer" className="proj-link">
                  View PR #11376 ↗
                </a>
                 <a href="https://github.com/lingdojo/kana-dojo/pull/11378" target="_blank" rel="noopener noreferrer" className="proj-link">
                  View PR #11378 ↗
                </a>
                 <a href="https://github.com/lingdojo/kana-dojo/pull/11517" target="_blank" rel="noopener noreferrer" className="proj-link">
                  View PR #11517 ↗
                </a>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "40px" }} className="reveal reveal-delay-3">
            <a href="https://github.com/SayakDe98" target="_blank" rel="noopener noreferrer"
              className="btn-secondary" style={{ display: "inline-block" }}>
              View All Repos on GitHub →
            </a>
          </div>
        </section>

        {/* LEETCODE */}
        <section id="leetcode">
          <div className="section-header reveal">
            <span className="section-num">05</span>
            <h2 className="section-title">DSA / LeetCode</h2>
            <div className="section-line"></div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "20px", marginBottom: "32px" }} className="reveal">
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "28px 36px", borderRadius: "4px", textAlign: "center", minWidth: "160px", width: "100%" }}>
              <div className="lc-stat-num" style={{ fontFamily: "var(--font-syne)", fontSize: "48px", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>400+</div>
              <div className="lc-stat-label" style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: "0.08em", marginTop: "8px" }}>Problems Solved</div>
            </div>
          </div>

          <div className="lc-diff-row reveal reveal-delay-1">
            {[
              { cls: "easy",   num: "120+", label: "Easy" },
              { cls: "medium", num: "140+", label: "Medium" },
              { cls: "hard",   num: "40+",  label: "Hard" },
            ].map(({ cls, num, label }) => (
              <div key={cls} className={`lc-diff ${cls}`}>
                <div className="lc-diff-num">{num}</div>
                <div className="lc-diff-label">{label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "40px", maxWidth: "700px" }} className="reveal reveal-delay-2">
            <p style={{ color: "var(--muted)", fontSize: "13px", lineHeight: "1.9" }}>
              Consistent problem solver with a focus on pattern recognition over memorization.
            </p>
            <div style={{ marginTop: "20px" }}>
              <a href="https://leetcode.com/u/SayakDe98/" target="_blank" rel="noopener noreferrer"
                className="btn-secondary" style={{ display: "inline-block" }}>
                View LeetCode Profile →
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="contact-inner">
            <div className="section-num reveal" style={{ display: "block", textAlign: "center", marginBottom: "20px" }}>06</div>
            <h2 className="contact-line reveal">
              Let&apos;s build something<br /><em>great together.</em>
            </h2>
            <a href="mailto:sayakde777@gmail.com" className="contact-email reveal reveal-delay-1">
              sayakde777@gmail.com
            </a>
            <div className="contact-links reveal reveal-delay-2">
              <a href="https://www.linkedin.com/in/sayakde/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a href="https://github.com/SayakDe98" target="_blank" rel="noopener noreferrer" className="contact-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
              <a href="https://leetcode.com/u/SayakDe98/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>
                LeetCode
              </a>
              <a href="tel:+917980489637" className="contact-link">📞 +91 79804 89637</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <p>© {new Date().getFullYear()} Sayak De. Built with Next.js</p>
          <p>Howrah, India · sayakde777@gmail.com</p>
        </footer>
      </div>
    </>
  );
}