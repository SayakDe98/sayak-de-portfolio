import Head from "next/head";
import { useEffect, useState } from "react";
import { Syne, Open_Sans, Instrument_Serif } from "next/font/google";
import styles from "@/styles/Home.module.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-open-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    // Custom cursor
    const cursor = document.getElementById("cursor");
    const trail = document.getElementById("cursor-trail");

    const onMouseMove = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      setTimeout(() => {
        trail.style.left = e.clientX + "px";
        trail.style.top = e.clientY + "px";
      }, 80);
    };
    document.addEventListener("mousemove", onMouseMove);

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%,-50%) scale(2.5)";
        trail.style.transform = "translate(-50%,-50%) scale(1.5)";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%,-50%) scale(1)";
        trail.style.transform = "translate(-50%,-50%) scale(1)";
      });
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
      observer.disconnect();
      barObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Sayak De — Full Stack Engineer</title>
        <meta name="description" content="Full Stack Engineer — Frontend · Backend · Cloud" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${syne.variable} ${openSans.variable} ${instrumentSerif.variable}`}>
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
          <button
            className={`nav-hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span><span></span><span></span>
          </button>
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
        <section id="hero">
          <div className="hero-glow"></div>
          <div className="float-tag float-tag-1"><span className="dot"></span>React.js</div>
          <div className="float-tag float-tag-2"><span className="dot"></span>Go</div>
          <div className="float-tag float-tag-3"><span className="dot"></span>AWS</div>

          <div className="hero-inner">
            <div className="hero-tag">Available for opportunities</div>
            <h1 className="hero-name">Sayak<br /><em>De</em></h1>
            <p className="hero-subtitle">Full Stack Engineer — Frontend · Backend · Cloud</p>
            <p className="hero-desc">
              3+ years building high-impact web products at scale. I craft performant
              full-stack systems with ReactJs, Go, NodeJs, and AWS — from pixel-perfect
              UIs to reliable backend APIs.
            </p>
            <div className="hero-stats">
              {[
                { num: "3+",    label: "Years of Experience" },
                { num: "40%",   label: "Load Time Reduction" },
                { num: "99.9%", label: "System Uptime" },
                { num: "25%",   label: "User Engagement Boost" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="hero-stat-num">{num}</div>
                  <div className="hero-stat-label">{label}</div>
                </div>
              ))}
            </div>
            <div className="hero-actions">
              <a href="#contact" className="btn-primary">Get in Touch</a>
              <a href="https://github.com/SayakDe98" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                View GitHub →
              </a>
            </div>
          </div>

          <div className="hero-scroll">
            <div className="scroll-line"></div>
            Scroll to explore
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[
              "React.js","Go (Golang)","Node.js","Vue.js","TypeScript",
              "AWS S3","PostgreSQL","MongoDB","Redis","GraphQL","WebSocket","REST APIs",
              "React.js","Go (Golang)","Node.js","Vue.js","TypeScript",
              "AWS S3","PostgreSQL","MongoDB","Redis","GraphQL","WebSocket","REST APIs",
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
              <p>Hi, I&apos;m <strong>Sayak De</strong> — a Full Stack Engineer based in Howrah, India,
                with over 3 years of experience building scalable web applications. I graduated with a
                B.Tech in Applied Electronics and Instrumentation Engineering from Netaji Subhash
                Engineering College, Kolkata in 2021.</p>
              <p>I specialize in crafting end-to-end solutions — from building intuitive React/Vue
                frontends to engineering performant Go &amp; Node.js backends. Currently at <strong>Nua</strong>,
                I&apos;m driving product development including a period tracker feature that boosted
                user engagement by 20%.</p>
              <p>I believe in shipping code that <strong>actually moves metrics</strong>: reduced load
                times by 40%, cut infrastructure costs by ₹1 lakh/month through CDN optimization, and
                delivered major product updates 20% ahead of schedule.</p>
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
                  { name: "React.js / Vue.js",    pct: 92 },
                  { name: "Go (Golang)",           pct: 85 },
                  { name: "Node.js / REST APIs",   pct: 88 },
                  { name: "AWS / Cloud",           pct: 75 },
                  { name: "MySQL / MongoDB",  pct: 80 },
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
                  { cat: "Frontend",      tags: ["HTML/CSS","React","Vue.js","JavaScript","TypeScript"] },
                  { cat: "Backend",       tags: ["Go","Node.js","GraphQL","WebSocket","REST APIs"] },
                  { cat: "Data",          tags: ["PostgreSQL","MongoDB","MySQL","Redis"] },
                  { cat: "Tools",         tags: ["AWS","Git","Jira","Webpack"] },
                  { cat: "Analytics & AI",tags: ["Google Analytics","WebEngage","Gen AI","Automation Scripts", "Python"] },
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
                  <div className="tl-role">Software Engineer Developer – I</div>
                </div>
                <div className="tl-date">Oct 2024 – Present · Remote</div>
              </div>
              <ul className="tl-bullets">
                <li>Designed &amp; shipped a <strong>Period Tracker</strong> feature (full-stack in React + Go) with automated communication workflows — went unexpectedly viral and was <strong>personally recognized by the CEO</strong> in a company-wide discussion. <span className="impact-badge">+20% engagement</span></li>
                <li>Integrated <strong>Redis caching</strong> for Collection Page data, improving <strong>DebugBear performance score by 24%</strong> and fixing all pre-existing page errors. <span className="impact-badge">+24% perf</span></li>
                <li>Revamped the <strong>My Orders page</strong> with refund initiation, status tracking, and Reorder capability — improving post-purchase UX significantly.</li>
                <li>Delivered a redesigned <strong>Collection Page</strong> with updated pricing logic; improved conversion clarity and eliminated all existing UI errors.</li>
                <li>Implemented <strong>Out-of-Stock recommendations</strong> within subscription plans, reducing user drop-off.</li>
                <li>Optimized image delivery via <strong>CDN best practices</strong>, significantly cutting monthly infrastructure costs. <span className="impact-badge">₹1L/month saved</span></li>
                <li>Leveraged <strong>Google Analytics</strong> and <strong>WebEngage</strong> for behavioral tracking and targeted user communication workflows.</li>
                <li>Built <strong>automation scripts</strong> to streamline internal workflows and reduce manual engineering overhead.</li>
                <li>Mentored junior developers and interns on best practices, code quality, and system design fundamentals.</li>
              </ul>
            </div>

            {/* Thinkitive */}
            <div className="tl-item reveal reveal-delay-1">
              <div className="tl-dot"></div>
              <div className="tl-header">
                <div className="tl-left">
                  <div className="tl-company">Thinkitive Technologies</div>
                  <div className="tl-role">Software Engineer</div>
                </div>
                <div className="tl-date">Jun 2022 – Sep 2024 · Pune</div>
              </div>
              <ul className="tl-bullets">
                <li>Enhanced ReactJs UI with multilingual video captions, charts, and stepper forms. <span className="impact-badge">+35% engagement</span></li>
                <li>Built Go and Node.js APIs that cut client-side loading times by 30%. <span className="impact-badge">-30% load time</span></li>
                <li>Implemented <strong>Voice Search</strong>, boosting navigation participation by 40%.</li>
                <li>Strengthened auth with <strong>JWT tokens</strong> and granular role-based access control.</li>
                <li>Integrated <strong>live chat</strong> to increase user activity and implemented RBAC permissions. <span className="impact-badge">+25% activity</span></li>
                <li>Built a timezone-flexible event booking API. <span className="impact-badge">+20% activity</span></li>
                <li>Developed <strong>Stripe payment integration</strong> backend, reducing transaction failures by 25%.</li>
                <li>Wrote <strong>automation scripts</strong> to reduce repetitive manual processes and speed up team workflows.</li>
                <li>Applied <strong>Generative AI</strong> knowledge to prototype intelligent features and accelerate development cycles.</li>
                <li>Mentored junior developers and interns through code reviews and hands-on knowledge-sharing sessions.</li>
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
            <div className="project-card reveal" style={{ position: "relative", overflow: "hidden" }}>
              <div className="proj-first-line">
                <div className="proj-num">01 — Active</div>
                <div className={styles.badgeGreen}>Deployed</div>
              </div>
              <div className="proj-title">Chess Gambit</div>
              <div className="proj-desc">A full-featured online chess game with real-time multiplayer, move
                validation, and gambit opening analysis. Built with WebSocket for live board sync, with
                plans for an AI opponent and opening theory explorer.</div>
              <div className="proj-tech">
                {["React.js","Go","WebSocket","Redis","PostgreSQL"].map((t) => <span key={t}>{t}</span>)}
              </div>
              <a href="http://chess-frontend-sayak.s3-website.ap-south-1.amazonaws.com" target="_blank" rel="noopener noreferrer" className="proj-link">Visit this website ↗</a>
            </div>

            <div className="project-card reveal reveal-delay-1" style={{ position: "relative", overflow: "hidden" }}>
              <div className="proj-first-line">
                <div className="proj-num">02 — Active</div>
                <div className={styles.badgePurple}>In Progress</div>
              </div>
              <div className="proj-title">URL Shortener</div>
              <div className="proj-desc">A high-performance URL shortening service with custom aliases, click
                analytics, expiry management, and a clean dashboard. Engineered for speed — Redis-backed
                redirect resolution targeting sub-5ms latency.</div>
              <div className="proj-tech">
                {["Go","Redis","PostgreSQL","React.js","REST APIs"].map((t) => <span key={t}>{t}</span>)}
              </div>
              <a
                className="proj-link"
                href="https://github.com/SayakDe98/url-shortner"
                target="_blank" rel="noopener noreferrer"
              >
                Check out the Code on GitHub ↗
              </a>
            </div>
          </div>

          <div style={{ marginTop: "36px" }} className="reveal reveal-delay-2">
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

          <div className="oss-grid" style={{ width: "100%" }}>
            <div className="oss-card reveal" style={{ gridColumn: "span 2", borderColor: "rgba(0,179,122,0.2)", background: "rgba(0,179,122,0.03)" }}>
              <div className="oss-header">
                <span className="oss-icon">🍞</span>
                <div>
                  <div className="oss-name">react-toastify — Open PR</div>
                  <div style={{ fontSize: "11px", color: "var(--accent)", marginTop: "3px", letterSpacing: "0.06em" }}>
                    fkhadra/react-toastify · Issue open since Jan 10, 2023
                  </div>
                </div>
              </div>
              <div className="oss-desc" style={{ marginBottom: "16px" }}>
                Identified and submitted a pull request addressing a long-standing bug in{" "}
                <strong style={{ color: "var(--text)" }}>react-toastify</strong> — one of the most widely
                used React notification libraries on npm (5M+ weekly downloads). The underlying issue has
                been open since <strong style={{ color: "var(--text)" }}>January 10, 2023</strong>, and
                remains unresolved in the main repo. The PR proposes a targeted fix with full backward
                compatibility.
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "11px", padding: "4px 12px", border: "1px solid rgba(0,179,122,0.3)", borderRadius: "2px", color: "var(--accent)" }}>React</span>
                {["TypeScript","Bug Fix","Open PR"].map((t) => (
                  <span key={t} style={{ fontSize: "11px", padding: "4px 12px", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--muted)" }}>{t}</span>
                ))}
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
              <div className="lc-stat-num" style={{ fontFamily: "var(--font-syne)", fontSize: "48px", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>300+</div>
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