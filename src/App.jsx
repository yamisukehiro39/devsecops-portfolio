import './App.css'

const skills = [
  {
    id: '01',
    title: 'Security',
    description:
      'IDS/IPS, Snort, firewalls, incident response, risk assessment, system and network hardening.',
    tags: ['Snort', 'IDS/IPS', 'Hardening'],
  },
  {
    id: '02',
    title: 'Cloud & DevOps',
    description:
      'Containerized services, CI/CD automation, source control and cloud-native foundations.',
    tags: ['Docker', 'Kubernetes', 'GitHub Actions'],
  },
  {
    id: '03',
    title: 'Networking',
    description:
      'Routing, switching, VLANs and core protocols across simulated and real environments.',
    tags: ['TCP/IP', 'Cisco', 'DNS', 'SSH'],
  },
  {
    id: '04',
    title: 'Observability',
    description:
      'Availability tracking, infrastructure visibility, alerting and security dashboards.',
    tags: ['Zabbix', 'Uptime Kuma', 'Dashboards'],
  },
  {
    id: '05',
    title: 'Development',
    description:
      'Backend and frontend development with REST APIs and relational databases.',
    tags: ['Node.js', 'JavaScript', 'Python', 'SQL'],
  },
  {
    id: '06',
    title: 'Systems & Telecom',
    description:
      'Advanced Linux administration plus VoIP and real-time communication foundations.',
    tags: ['Linux', 'SIP', 'WebRTC', 'Asterisk'],
  },
]

const experience = [
  {
    date: 'JUN — AUG 2025',
    company: 'SKYVAULTS · AGADIR',
    role: 'Network Security & Monitoring Intern',
    points: [
      'Deployed a monitoring stack using Uptime Kuma, Zabbix and Snort.',
      'Built GeoMonitor to track latency and uptime by country.',
      'Connected intrusion detection signals with dashboards and proactive alerts.',
    ],
  },
  {
    date: 'APR — MAY 2024',
    company: 'BIGBANG CENTER · BENI MELLAL',
    role: 'Web Developer Intern',
    points: [
      'Built a complete inventory management application.',
      'Implemented CRUD workflows and a relational database backend.',
    ],
  },
  {
    date: 'JUN — AUG 2023',
    company: 'BIGBANG CENTER · BENI MELLAL',
    role: 'Web Developer Intern',
    points: [
      'Developed a responsive Django e-commerce platform for artisanal clothing.',
    ],
  },
]

const projects = [
  {
    label: 'MONITORING · DEVELOPMENT',
    index: '01',
    title: 'GeoMonitor',
    description:
      'A custom Uptime Kuma module that visualizes service latency and availability across geographic regions, giving teams a clearer view of distributed performance.',
    featured: true,
    tags: ['Uptime Kuma', 'Node.js', 'Geolocation'],
  },
  {
    label: 'CYBERSECURITY · OBSERVABILITY',
    index: '02',
    title: 'Security Monitoring Stack',
    description:
      'A unified open-source monitoring setup combining intrusion detection, infrastructure metrics and uptime tracking for faster incident correlation.',
    tags: ['Snort', 'Zabbix', 'Uptime Kuma'],
  },
]

const education = [
  {
    span: '2024 — 2027',
    title: 'Engineering Degree',
    description: 'Network & Telecommunications Systems Engineering\nENSA Kénitra',
  },
  {
    span: '2022 — 2024',
    title: 'DUT — Computer Engineering',
    description: 'High Honors\nEST Beni Mellal',
  },
]

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <nav className="nav container" aria-label="Main navigation">
          <a className="logo" href="#home" aria-label="Othman home">
            <span>0</span>THMAN.
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
          </div>
          <a className="button button-small" href="#contact">
            Let's talk
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero container" id="home">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot"></span> Available for a 2-month
              internship
            </p>
            <h1>
              I build secure,
              <br />
              <span>observable</span> systems.
            </h1>
            <p className="hero-text">
              Network & Telecommunications Systems Engineering student focused on
              network security, DevSecOps and cloud security.
            </p>
            <div className="hero-actions">
              <a className="button" href="#projects">
                Explore my work <span aria-hidden="true">↗</span>
              </a>
              <a
                className="text-link"
                href="mailto:elmansourothman7@gmail.com?subject=Resume%20Request"
              >
                Request résumé <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="social-row" aria-label="Social links">
              <a
                href="https://github.com/yamisukehiro39"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/el-mansour-othman"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a href="mailto:elmansourothman7@gmail.com">Email</a>
            </div>
          </div>

          <div className="terminal" aria-label="Professional profile terminal">
            <div className="terminal-bar">
              <i></i>
              <i></i>
              <i></i>
              <span>othman@cloud:~</span>
            </div>
            <div className="terminal-body">
              <p><b>$</b> whoami</p>
              <p className="output">Othman El-Mansour</p>
              <p><b>$</b> cat focus.txt</p>
              <p className="output cyan">
                DevSecOps · Cloud Security
                <br />
                Network Security · Observability
              </p>
              <p><b>$</b> systemctl status portfolio</p>
              <p className="output">
                <span className="status-dot"></span> active (running)
              </p>
              <div className="metrics">
                <div>
                  <span>UPTIME</span>
                  <strong>99.99%</strong>
                </div>
                <div>
                  <span>STATUS</span>
                  <strong>SECURE</strong>
                </div>
                <div>
                  <span>REGION</span>
                  <strong>MA</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section container" id="about">
          <div className="section-label">01 / About</div>
          <div className="about-grid">
            <h2>
              Security mindset.
              <br />
              Builder's approach.
            </h2>
            <div>
              <p className="lead">
                I turn infrastructure into systems that are easier to deploy,
                monitor and defend.
              </p>
              <p>
                My experience spans Linux administration, routing and switching,
                containers, CI/CD and security monitoring. I enjoy connecting
                development and operations with practical security controls—from
                alerting and dashboards to intrusion detection.
              </p>
              <div className="fact-grid">
                <div>
                  <strong>03+</strong>
                  <span>Internships</span>
                </div>
                <div>
                  <strong>02</strong>
                  <span>Security projects</span>
                </div>
                <div>
                  <strong>2027</strong>
                  <span>Graduation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="skills">
          <div className="container">
            <div className="section-label">02 / Expertise</div>
            <div className="section-heading">
              <h2>What I work with</h2>
              <p>A practical toolkit for secure infrastructure and modern delivery.</p>
            </div>
            <div className="skills-grid">
              {skills.map((skill) => (
                <article className="skill-card" key={skill.id}>
                  <span>{skill.id}</span>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                  <div className="tags">
                    {skill.tags.map((tag) => (
                      <em key={tag}>{tag}</em>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section container" id="experience">
          <div className="section-label">03 / Experience</div>
          <div className="section-heading">
            <h2>Professional journey</h2>
            <p>Hands-on work across monitoring, security and web development.</p>
          </div>
          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item" key={`${item.date}-${item.role}`}>
                <div className="date">{item.date}</div>
                <div className="timeline-content">
                  <p className="company">{item.company}</p>
                  <h3>{item.role}</h3>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-alt" id="projects">
          <div className="container">
            <div className="section-label">04 / Selected work</div>
            <div className="section-heading">
              <h2>Projects with purpose</h2>
              <p>Where security, development and visibility meet.</p>
            </div>
            <div className="projects-grid">
              {projects.map((project) => (
                <article
                  className={`project${project.featured ? ' featured' : ''}`}
                  key={project.index}
                >
                  <div className="project-top">
                    <span>{project.label}</span>
                    <b>{project.index}</b>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <em key={tag}>{tag}</em>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section education container">
          <div className="section-label">05 / Education</div>
          <div className="education-grid">
            {education.map((item) => (
              <div key={item.title}>
                <span>{item.span}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container contact-inner">
            <p className="eyebrow">Have a project or opportunity?</p>
            <h2>
              Let's build something
              <br />
              <span>secure.</span>
            </h2>
            <a
              className="button button-light"
              href="mailto:elmansourothman7@gmail.com"
            >
              elmansourothman7@gmail.com <span>↗</span>
            </a>
            <p className="location">
              Khemisset, Morocco · Open to internships and collaborations
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>© 2026 Othman El-Mansour</p>
          <p>Designed for security. Built for the web.</p>
        </div>
      </footer>
    </>
  )
}

export default App
