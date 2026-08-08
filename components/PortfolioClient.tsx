'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import type { BlogCategory, BlogPublication } from '../lib/blog-data';

import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock3,
  Cloud,
  Code2,
  Download,
  ExternalLink,
  Github,
  Globe2,
  Linkedin,
  Mail,
  Menu,
  Network,
  Edit3,
  Eye,
  FilePlus2,
  ImagePlus,
  Save,
  Send,
  Trash2,
  Tag,
  Search,
  LayoutDashboard,
  KeyRound,
  LockKeyhole,
  LogIn,
  LogOut,
  Radar,
  Server,
  ShieldCheck,
  Terminal,
  X,
} from 'lucide-react';

const cvPath = '/cv.pdf';
const heroPhotoPath = '/othman-profile.png';

const experience = [
  {
    date: '06.2025 — 08.2025',
    role: 'Network Security & Monitoring Intern',
    company: 'SkyVaults · Agadir, Morocco',
    badge: 'Security / Observability',
    summary:
      'Built the visibility layer for secure infrastructure: monitoring, intrusion detection, and geographic service intelligence in one operational loop.',
    details: [
      'Deployed and configured Uptime Kuma, Zabbix, and Snort for real-time visibility and availability tracking.',
      'Designed a custom GeoMonitor module for Uptime Kuma to track service latency and uptime by country.',
      'Integrated Snort IDS with monitoring dashboards for faster correlation of suspicious activity.',
      'Strengthened security monitoring through proactive alerting and dashboard customization.',
    ],
  },
  {
    date: '04.2024 — 05.2024',
    role: 'Web Developer Intern',
    company: 'BigBang Center · Beni Mellal, Morocco',
    badge: 'Product / CRUD',
    summary:
      'Delivered a full-featured inventory management web app with an intuitive interface and complete CRUD functionality.',
    details: ['Worked across HTML5, CSS3, JavaScript, Python, and a relational database backend.'],
  },
  {
    date: '06.2023 — 08.2023',
    role: 'Web Developer Intern',
    company: 'BigBang Center · Beni Mellal, Morocco',
    badge: 'Web / Django',
    summary:
      'Developed a responsive e-commerce platform for artisanal clothing, from product catalog to cart and checkout flow.',
    details: ['Built with HTML5, CSS3, JavaScript, Python, and Django.'],
  },
];

const projects = [
  {
    number: '01 / 02',
    title: 'GeoMonitor',
    description:
      'A global latency and uptime tracking module that extends Uptime Kuma with geographic context. Service health becomes a map, not just a timestamp.',
    tags: ['Uptime Kuma', 'Monitoring', 'Latency', 'Geographic regions'],
    main: true,
  },
  {
    number: '02 / 02',
    title: 'Network Security Monitoring Stack',
    description:
      'A unified monitoring setup combining Snort, Zabbix, and Uptime Kuma for visibility, alerting, and faster security correlation.',
    tags: ['Snort', 'Zabbix', 'IDS', 'Alerting'],
  },
];

const skillGroups = [
  {
    label: 'Security',
    icon: ShieldCheck,
    note: 'Security is treated as a signal problem: collect context, reduce noise, respond with intent.',
    skills: ['IDS/IPS', 'Snort', 'Security Monitoring', 'Firewalls', 'Cryptography & Steganography', 'Risk Assessment', 'Incident Response', 'System & Network Hardening'],
  },
  {
    label: 'Networking',
    icon: Network,
    note: 'Routing, switching, and the protocols underneath are where dependable infrastructure starts.',
    skills: ['Cisco Routing & Switching', 'VLAN', 'TCP/IP', 'DNS', 'DHCP', 'SSH', 'GNS3', 'Packet Tracer'],
  },
  {
    label: 'Cloud & Containers',
    icon: Cloud,
    note: 'Building familiarity with modern deployment primitives and the systems around them.',
    skills: ['Docker', 'Kubernetes'],
  },
  {
    label: 'DevOps & Automation',
    icon: Terminal,
    note: 'Repeatable delivery, sensible automation, and CI/CD workflows that keep secure changes moving.',
    skills: ['Git', 'GitHub', 'GitHub Actions (CI/CD)', 'Automation', 'Bash Scripting'],
  },
  {
    label: 'Observability',
    icon: Radar,
    note: 'Make infrastructure legible through dashboards, alerting, and service health signals.',
    skills: ['Zabbix', 'Uptime Kuma', 'Snort', 'Infrastructure Visibility', 'Alerting & Dashboards'],
  },
  {
    label: 'Programming',
    icon: Code2,
    note: 'A pragmatic software foundation for building tools, APIs, and useful interfaces.',
    skills: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'Node.js', 'HTML5', 'CSS3', 'Django', 'REST APIs'],
  },
  {
    label: 'Systems & Data',
    icon: Server,
    note: 'Comfortable moving between operating systems, databases, and the protocols that connect them.',
    skills: ['Linux (Advanced Administration)', 'Windows', 'SQL', 'Relational Database Design', 'SIP', 'WebRTC', 'VoIP', 'Asterisk', 'jsSIP'],
  },
];

const education = [
  {
    years: '09.2024 — 06.2027',
    title: 'Engineering Degree',
    school: 'Network & Telecommunications Systems Engineering · ENSA Kénitra',
    detail: 'In progress · Track: Network & Information Systems Security',
  },
  {
    years: '2022 — 2024',
    title: 'University Diploma of Technology (DUT)',
    school: 'Computer Engineering · EST Beni Mellal',
    detail: 'Software development, networks, databases, systems administration',
    honor: 'Très Bien · High Honors',
  },
  {
    years: '2020 — 2021',
    title: 'International Baccalaureate',
    school: 'Physical & Chemical Sciences · Lycée Moussa Bno Noussair',
    detail: 'Secondary education',
    honor: 'Bien · Honors',
  },
];


function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `field-note-${Date.now()}`;
}

function formatPostDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
    .format(date)
    .split('/').join('.');
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 210)).toString().padStart(2, '0')} min read`;
}


function escapeSvgText(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildTitleLines(title: string) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= 18) {
      current = next;
      return;
    }
    if (current) lines.push(current);
    current = word;
  });

  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function createBlogImage(title: string, category: string) {
  const palette: Record<string, [string, string, string]> = {
    'DevOps': ['#132033', '#1b3658', '#7dd3fc'],
    'Observability': ['#0f1728', '#19314d', '#67e8f9'],
    'Cloud Security': ['#101827', '#1c2a43', '#a3e635'],
    'Networks': ['#101826', '#172c46', '#60a5fa'],
    'Incident Response': ['#1a1220', '#3b1f2c', '#fda4af'],
    'Engineering': ['#171629', '#24244d', '#c4b5fd'],
  };

  const [start, end, accent] = palette[category] ?? ['#111827', '#1f2937', '#67e8f9'];
  const safeCategory = escapeSvgText(category.toUpperCase());
  const titleLines = buildTitleLines(title);
  const titleMarkup = titleLines
    .map((line, index) => `<text x="40" y="${118 + index * 34}" fill="#f8fafc" font-size="28" font-family="Arial, Helvetica, sans-serif" font-weight="700">${escapeSvgText(line)}</text>`)
    .join('');

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${start}"/>
          <stop offset="100%" stop-color="${end}"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#g)"/>
      <circle cx="1030" cy="130" r="180" fill="${accent}" opacity="0.12"/>
      <circle cx="1100" cy="570" r="240" fill="#ffffff" opacity="0.04"/>
      <rect x="40" y="42" width="240" height="34" rx="17" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.16)"/>
      <text x="58" y="64" fill="#dbeafe" font-size="16" font-family="Arial, Helvetica, sans-serif" font-weight="700" letter-spacing="1.8">${safeCategory}</text>
      ${titleMarkup}
      <text x="40" y="590" fill="rgba(248,250,252,0.76)" font-size="22" font-family="Arial, Helvetica, sans-serif">Othman El-Mansour · Field Notes</text>
      <path d="M40 528 H420" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity="0.9"/>
      <rect x="40" y="508" width="1120" height="1" fill="rgba(255,255,255,0.09)"/>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}


function normalizeArticleHtml(content?: string) {
  const raw = (content ?? '').trim();
  if (!raw) return '<p>Your HTML preview will appear here.</p>';
  if (/<[a-z][\s\S]*>/i.test(raw)) return raw;
  return raw
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeSvgText(paragraph)}</p>`)
    .join('');
}

function withPublicationImage(publication: BlogPublication) {
  return {
    ...publication,
    image: publication.image?.trim() || createBlogImage(publication.title, publication.category),
  };
}


function scrollToSection(id: string, closeMenu?: () => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  closeMenu?.();
}

export function SiteHeader({ isBlog = false }: { isBlog?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionLinks = [
    ['about', 'Profile'],
    ['experience', 'Experience'],
    ['projects', 'Projects'],
    ['skills', 'Stack'],
    ['contact', 'Contact'],
  ];

  function goHome() {
    if (isBlog) {
      window.location.assign('/');
      return;
    }
    scrollToSection('top');
  }

  function goToSection(id: string) {
    if (isBlog) {
      window.location.assign(`/#${id}`);
      return;
    }
    scrollToSection(id, () => setMenuOpen(false));
  }

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="brand-lockup" onClick={goHome} data-testid="button-home">
          <span className="brand-mark">OE</span>
          <span className="brand-name">OTHMAN / EL-MANSOUR</span>
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {sectionLinks.map(([id, label]) => (
            <button key={id} className="nav-link" onClick={() => goToSection(id)} data-testid={`link-${id}`}>
              {label}
            </button>
          ))}
          <a className={`nav-link ${isBlog ? 'current' : ''}`} href="/blog" aria-current={isBlog ? 'page' : undefined} data-testid="link-blog">
            Blog
          </a>
        </nav>
        <a className="cv-button" href={cvPath} target="_blank" rel="noreferrer" data-testid="link-cv-top">
          <Download size={13} /> View CV
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen} data-testid="button-menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {sectionLinks.map(([id, label]) => (
            <button key={id} className="nav-link" onClick={() => goToSection(id)} data-testid={`mobile-link-${id}`}>
              {label}
            </button>
          ))}
          <a className={`nav-link ${isBlog ? 'current' : ''}`} href="/blog" aria-current={isBlog ? 'page' : undefined} data-testid="mobile-link-blog">
            Blog
          </a>
          <a className="cv-button" href={cvPath} target="_blank" rel="noreferrer" data-testid="link-cv-mobile">
            <Download size={13} /> View original CV
          </a>
        </nav>
      )}
    </header>
  );
}


export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-container">

        <div className="footer-main">
          <div className="footer-brand">
            <span className="footer-logo">OE</span>

            <div>
              <h3>Othman El-Mansour</h3>
              <p>Cloud Security · DevOps · Networking</p>
            </div>
          </div>

          <nav className="footer-nav">
            <a href="/">Portfolio</a>
            <a href="/blog">Blog</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/privacy-policy">Privacy</a>
            <a href="/terms">Terms</a>
          </nav>

          <div className="footer-socials">
            <a
              href="https://github.com/yamisukehiro39"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>

            <a
              href="https://linkedin.com/in/el-mansour-othman"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>

            <a
              href="mailto:elmansourothman7@gmail.com"
              aria-label="Email"
            >
              <Mail size={17} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Othman El-Mansour
          </span>

          <span className="footer-status">
            <span className="footer-status-dot" />
            Available for opportunities
          </span>

          <a href="#top" className="footer-top">
            Back to top ↑
          </a>
        </div>

      </div>
    </footer>
  );
}

export function BlogPage({ publications, categories: databaseCategories }: { publications: BlogPublication[]; categories: BlogCategory[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const allPublications = publications
    .filter((publication) => publication.status === 'published')
    .map((publication) => withPublicationImage({ ...publication, href: `/blog/${publication.slug}` }));
  const categories = ['All', ...Array.from(new Set(databaseCategories.map((category) => category.name)))];
  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredPublications = allPublications.filter((publication) => {
    const matchesCategory = activeCategory === 'All' || publication.category === activeCategory;
    const haystack = [publication.title, publication.excerpt, publication.category, publication.tags.join(' ')].join(' ').toLowerCase();
    const matchesSearch = !normalizedSearch || haystack.includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });

  const featuredPublication = filteredPublications.find((publication) => publication.featured);
  const regularPublications = filteredPublications.filter((publication) => publication !== featuredPublication);

  const firstPageRegularCount = featuredPublication ? 5 : 6;
  const totalPages = featuredPublication
    ? Math.max(1, 1 + Math.ceil(Math.max(0, regularPublications.length - firstPageRegularCount) / 6))
    : Math.max(1, Math.ceil(regularPublications.length / 6));

  const page = Math.min(currentPage, totalPages);
  const paginatedRegulars = featuredPublication
    ? page === 1
      ? regularPublications.slice(0, firstPageRegularCount)
      : regularPublications.slice(firstPageRegularCount + (page - 2) * 6, firstPageRegularCount + (page - 1) * 6)
    : regularPublications.slice((page - 1) * 6, page * 6);

  const hasResults = Boolean(filteredPublications.length);

  return (
    <div className="portfolio-shell blog-shell">
      <SiteHeader isBlog />
      <main className="site-content blog-content">
        <section className="blog-hero section-wrap">
          <div className="blog-hero-grid">
            <div>
              <div className="hero-kicker reveal"><span className="pulse-dot" /><span className="eyebrow">PUBLICATIONS / FIELD NOTES</span></div>
              <h1 className="blog-title reveal delay-1">Notes from<br /><span>the edge.</span></h1>
              <p className="blog-intro reveal delay-2">
                Short dispatches on cloud security, observable infrastructure, and the work between a change request and a system you can trust.
              </p>
            </div>
            <aside className="blog-index reveal delay-2" aria-label="Publication index">
              <div className="blog-index-top"><BookOpen size={16} /><span>INDEX / OE-LOG</span></div>
              <div className="blog-index-row"><span>DISPATCHES</span><strong>{String(allPublications.length).padStart(2, '0')}</strong></div>
              <div className="blog-index-row"><span>ACTIVE THREAD</span><strong>{activeCategory.toUpperCase()}</strong></div>
              <div className="blog-index-row"><span>SEARCH</span><strong>{normalizedSearch ? 'FILTERED' : 'OPEN'}</strong></div>
              <div className="blog-index-foot"><span className="pulse-dot" /> archive is live</div>
            </aside>
          </div>
        </section>

        <section className="section-wrap publications-section" aria-labelledby="publication-list-title">
          <div className="publication-toolbar">
            <div>
              <span className="eyebrow">READ / FILTER</span>
              <h2 id="publication-list-title" className="publication-heading">Selected <em>signals.</em></h2>
            </div>

            <div className="blog-tools" role="search" aria-label="Filter publications">
              <div className="blog-tool-group">
                <label htmlFor="publication-search" className="blog-tool-label">
                  <Search size={13} aria-hidden="true" />
                  Search archive
                </label>
                <div className="blog-search">
                  <Search size={17} aria-hidden="true" />
                  <input
                    id="publication-search"
                    type="search"
                    value={searchQuery}
                    onChange={(event) => {
                      setSearchQuery(event.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Title, tag, topic…"
                    autoComplete="off"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="blog-search-clear"
                      aria-label="Clear publication search"
                      onClick={() => {
                        setSearchQuery('');
                        setCurrentPage(1);
                      }}
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              </div>

              <div className="category-select-wrap">
                <label htmlFor="category-filter" className="category-select-label">
                  <Tag size={13} aria-hidden="true" />
                  Category
                </label>
                <div className="category-select-control">
                  <select
                    id="category-filter"
                    className="category-select"
                    value={activeCategory}
                    onChange={(event) => {
                      setActiveCategory(event.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="category-select-icon" size={17} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          <div className="blog-results-row">
            <p>{filteredPublications.length} result{filteredPublications.length === 1 ? '' : 's'} found{normalizedSearch ? ` for “${searchQuery.trim()}”` : ''}.</p>
            {normalizedSearch && <button className="text-link blog-clear-search" onClick={() => { setSearchQuery(''); setCurrentPage(1); }}>Clear search <X size={14} /></button>}
          </div>

          {hasResults ? (
            <>
              <div className="publication-list">
                {page === 1 && featuredPublication && (
                  <a className="featured-publication" href={featuredPublication.href ?? '#'} data-testid="card-publication-featured">
                    <div className="publication-card-top"><span className="publication-flag">FEATURED / 001</span><ArrowUpRight size={18} /></div>
                    <div className="publication-media featured-media">
                      <img src={featuredPublication.image} alt={featuredPublication.imageAlt || featuredPublication.title} loading="lazy" />
                    </div>
                    <div className="featured-copy">
                      <span className="publication-category">{featuredPublication.category}</span>
                      <h3>{featuredPublication.title}</h3>
                      <p>{featuredPublication.excerpt}</p>
                    </div>
                    <div className="publication-meta">
                      <span><CalendarDays size={13} /> {featuredPublication.date}</span>
                      <span><Clock3 size={13} /> {featuredPublication.readTime}</span>
                    </div>
                    <div className="publication-tags">{featuredPublication.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </a>
                )}
                {paginatedRegulars.map((publication, index) => (
                  <a className="publication-card" href={publication.href ?? '#'} key={`${publication.title}-${publication.date}`} data-testid={`card-publication-${index}`}>
                    <div className="publication-card-top"><span className="publication-flag">FIELD NOTE / {String(((page - 1) * 6) + index + 1).padStart(3, '0')}</span><ArrowUpRight size={16} /></div>
                    <div className="publication-media">
                      <img src={publication.image} alt={publication.imageAlt || publication.title} loading="lazy" />
                    </div>
                    <span className="publication-category">{publication.category}</span>
                    <h3>{publication.title}</h3>
                    <p>{publication.excerpt}</p>
                    <div className="publication-meta">
                      <span><CalendarDays size={13} /> {publication.date}</span>
                      <span><Clock3 size={13} /> {publication.readTime}</span>
                    </div>
                    <div className="publication-tags">{publication.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </a>
                ))}
              </div>

              {totalPages > 1 && (
                <nav className="pagination" aria-label="Publications pagination">
                  <button className="pagination-button" onClick={() => setCurrentPage(Math.max(1, page - 1))} disabled={page === 1}>
                    <ChevronLeft size={15} /> Previous
                  </button>
                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        className={`pagination-button number ${pageNumber === page ? 'active' : ''}`}
                        onClick={() => setCurrentPage(pageNumber)}
                        aria-current={pageNumber === page ? 'page' : undefined}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>
                  <button className="pagination-button" onClick={() => setCurrentPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
                    Next <ChevronRight size={15} />
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className="publication-empty" data-testid="empty-publications">
              <span className="empty-code">ERR / 204</span>
              <h3>No signals matched your search.</h3>
              <p>Try another keyword, remove the category filter, or return to the full archive.</p>
              <button className="outline-button" onClick={() => { setActiveCategory('All'); setSearchQuery(''); setCurrentPage(1); }} data-testid="button-reset-filter">View all publications <ArrowUpRight size={14} /></button>
            </div>
          )}
        </section>

        <section className="blog-close section-wrap">
          <span className="eyebrow">END OF TRANSMISSION</span>
          <p>More notes are forming at the boundary between secure systems and useful systems.</p>
          <button className="text-link" onClick={() => window.location.assign('/')} data-testid="button-blog-home">Return to portfolio home <ArrowUpRight size={14} /></button>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}



export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Identity verification required.');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(false);
    setLoading(true);
    setMessage('Verifying credentials…');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json().catch(() => ({})) as { error?: string };

      if (!response.ok) {
        setError(true);
        setMessage(payload.error ?? 'Access denied. Check your credentials.');
        return;
      }

      setMessage('Access granted. Opening publishing control plane…');
      window.location.assign('/admin');
    } catch {
      setError(true);
      setMessage('Authentication service is unavailable. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="portfolio-shell login-shell">
      <header className="topbar login-topbar">
        <div className="topbar-inner">
          <a className="brand-lockup" href="/">
            <span className="brand-mark">OE</span>
            <span className="brand-name">OTHMAN / EL-MANSOUR</span>
          </a>
          <nav className="desktop-nav login-nav" aria-label="Login navigation">
            <a className="nav-link" href="/">Portfolio</a>
            <a className="nav-link" href="/blog">Blog</a>
            <span className="nav-link current">Admin access</span>
          </nav>
          <a className="cv-button" href="/blog"><BookOpen size={13} /> Field notes</a>
        </div>
      </header>

      <main className="site-content login-content">
        <section className="section-wrap login-grid">
          <div className="login-copy">
            <div className="hero-kicker reveal"><span className="pulse-dot" /><span className="eyebrow">ADMIN / AUTHENTICATION</span></div>
            <h1 className="login-title reveal delay-1">Secure<br /><span>access.</span></h1>
            <p className="login-intro reveal delay-2">Restricted entry to the blog publishing control plane. Authenticate to create, edit, draft, and publish field notes.</p>
            <div className="login-signal reveal delay-3">
              <div><span>CHANNEL</span><strong>BLOG / ADMIN</strong></div>
              <div><span>SESSION</span><strong>JWT / HTTPONLY</strong></div>
              <div><span>STATE</span><strong className="green">LOCKED</strong></div>
            </div>
          </div>

          <div className="login-panel reveal delay-2">
            <div className="login-panel-head">
              <div><LockKeyhole size={16} /><span>IDENTITY GATE / 01</span></div>
              <span>ENCRYPTED CHANNEL</span>
            </div>
            <form className="login-form" onSubmit={authenticate}>
              <div className="login-status-line">
                <span className={`pulse-dot ${error ? 'login-dot-error' : ''}`} />
                <span className={error ? 'login-error-text' : ''}>{message}</span>
              </div>
              <label className="admin-field login-field">
                <span>OPERATOR ID</span>
                <small className="login-field-hint">Use the administrator email for this portfolio.</small>
                <div className="login-input-wrap">
                  <LogIn size={15} />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="username"
                    required
                  />
                </div>
              </label>
              <label className="admin-field login-field">
                <span>ACCESS KEY</span>
                <small className="login-field-hint">Use your access password to unlock the blog panel.</small>
                <div className="login-input-wrap">
                  <KeyRound size={15} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••••"
                    autoComplete="current-password"
                    required
                  />
                  <button className="login-visibility" type="button" onClick={() => setShowPassword((current) => !current)}><Eye size={14} /> {showPassword ? 'Hide' : 'Show'}</button>
                </div>
              </label>
              <button className="cv-button login-submit" type="submit" disabled={loading}><LockKeyhole size={14} /> {loading ? 'Authenticating…' : 'Authenticate'}</button>
            </form>
            <div className="login-panel-foot">
              <span><span className="pulse-dot" /> SECURITY MODE / JWT</span>
              <span>OE-AUTH / V1</span>
            </div>
          </div>
        </section>

        <section className="section-wrap login-footnote">
          <span className="eyebrow">ACCESS NOTE</span>
          <p>Authentication is handled server-side with PostgreSQL, signed JWT sessions, and an HTTP-only cookie. Credentials are never stored in the browser.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

type EditorState = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  tags: string;
  image: string;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogImageUrl: string;
  noindex: boolean;
  content: string;
  featured: boolean;
};

const emptyEditor: EditorState = {
  title: '',
  slug: '',
  category: 'Cloud Security',
  excerpt: '',
  tags: '',
  image: '',
  imageAlt: '',
  seoTitle: '',
  seoDescription: '',
  canonicalUrl: '',
  ogImageUrl: '',
  noindex: false,
  content: '',
  featured: false,
};

function AdminHeader({ onLogoutRequest }: { onLogoutRequest: () => void }) {
  return (
    <header className="topbar admin-topbar">
      <div className="topbar-inner">
        <a className="brand-lockup" href="/" data-testid="admin-home">
          <span className="brand-mark">OE</span>
          <span className="brand-name">OTHMAN / EL-MANSOUR</span>
        </a>
        <nav className="desktop-nav admin-nav" aria-label="Admin navigation">
          <a className="nav-link" href="/">Portfolio</a>
          <a className="nav-link" href="/blog">Blog</a>
          <span className="nav-link current">Blog panel</span>
        </nav>
        <div className="admin-header-actions">
          <a className="outline-button admin-header-view" href="/blog" data-testid="admin-view-blog"><Eye size={13} /> Live blog</a>
          <button className="cv-button admin-logout" type="button" onClick={onLogoutRequest}><LogOut size={13} /> Log out</button>
        </div>
      </div>
    </header>
  );
}

type ConfirmationRequest = {
  title: string;
  message: string;
  confirmLabel: string;
  danger?: boolean;
  action: () => void | Promise<void>;
};

function ConfirmationDialog({
  request,
  busy,
  onCancel,
  onConfirm,
}: {
  request: ConfirmationRequest;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="admin-confirm-backdrop" role="presentation">
      <div className="admin-confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="admin-confirm-title" aria-describedby="admin-confirm-message">
        <span className="eyebrow">CONFIRM / ACTION</span>
        <h3 id="admin-confirm-title">{request.title}</h3>
        <p id="admin-confirm-message">{request.message}</p>
        <div className="admin-confirm-actions">
          <button type="button" className="outline-button" onClick={onCancel} disabled={busy}>Cancel</button>
          <button type="button" className={request.danger ? 'admin-confirm-danger' : 'cv-button'} onClick={onConfirm} disabled={busy}>
            {busy ? 'Working…' : request.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminPage({ initialPosts, categories }: { initialPosts: BlogPublication[]; categories: BlogCategory[] }) {
  const defaultCategory = categories.find((category) => category.name === 'Cloud Security')?.name ?? categories[0]?.name ?? 'Cloud Security';
  const [posts, setPosts] = useState<BlogPublication[]>(initialPosts);
  const [editor, setEditor] = useState<EditorState>(() => ({ ...emptyEditor, category: defaultCategory }));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notice, setNotice] = useState('Connected to PostgreSQL. Ready for a new field note.');
  const [confirmation, setConfirmation] = useState<ConfirmationRequest | null>(null);
  const [confirmBusy, setConfirmBusy] = useState(false);

  const publishedCount = posts.filter((post) => post.status === 'published').length;
  const draftCount = posts.filter((post) => post.status === 'draft').length;
  const previewTags = editor.tags.split(',').map((tag) => tag.trim()).filter(Boolean);
  const previewSlug = slugify(editor.slug || editor.title || 'new-publication');
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.0thman.tech').replace(/\/$/, '');
  const previewCanonical = editor.canonicalUrl.trim() || `${siteUrl}/blog/${previewSlug}`;
  const previewSeoTitle = editor.seoTitle.trim() || editor.title.trim() || 'Article title';
  const previewSeoDescription = editor.seoDescription.trim() || editor.excerpt.trim() || 'Add an SEO description for this article.';
  const seoChecks = [
    { label: 'SEO title 30–60 chars', ok: previewSeoTitle.length >= 30 && previewSeoTitle.length <= 60 },
    { label: 'Meta description 120–160 chars', ok: previewSeoDescription.length >= 120 && previewSeoDescription.length <= 160 },
    { label: 'Clean URL slug', ok: previewSlug.length >= 3 && previewSlug.length <= 80 },
    { label: 'Cover image alt text', ok: editor.imageAlt.trim().length >= 5 },
    { label: 'Indexing enabled', ok: !editor.noindex },
  ];
  const seoScore = seoChecks.filter((check) => check.ok).length;

  function updateEditor<K extends keyof EditorState>(key: K, value: EditorState[K]) {
    setEditor((current) => ({ ...current, [key]: value }));
  }

  function editorFromPost(post: BlogPublication): EditorState {
    return {
      title: post.title,
      slug: post.slug ?? '',
      category: post.category,
      excerpt: post.excerpt,
      tags: post.tags.join(', '),
      image: post.image ?? '',
      imageAlt: post.imageAlt ?? post.title,
      seoTitle: post.seoTitle ?? post.title,
      seoDescription: post.seoDescription ?? post.excerpt,
      canonicalUrl: post.canonicalUrl ?? '',
      ogImageUrl: post.ogImageUrl ?? '',
      noindex: Boolean(post.noindex),
      content: post.content ?? '',
      featured: Boolean(post.featured),
    };
  }

  function resetEditor() {
    setEditor({ ...emptyEditor, category: defaultCategory });
    setEditingId(null);
    setNotice('New publication buffer opened.');
  }

  function requestConfirmation(request: ConfirmationRequest) {
    setConfirmation(request);
  }

  async function runConfirmedAction() {
    if (!confirmation) return;
    setConfirmBusy(true);
    try {
      await confirmation.action();
      setConfirmation(null);
    } finally {
      setConfirmBusy(false);
    }
  }

  function requestNewPost() {
    requestConfirmation({
      title: 'Open a new publication?',
      message: 'The editor will be cleared. Any unsaved changes currently in the form will be lost.',
      confirmLabel: 'New field note',
      action: resetEditor,
    });
  }

  function insertHtmlImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      if (!result) return;
      setEditor((current) => ({
        ...current,
        content: `${current.content}${current.content.trim() ? '\n\n' : ''}<figure><img src="${result}" alt="${file.name}" /><figcaption>${file.name}</figcaption></figure>`,
      }));
      setNotice(`Image imported into the HTML editor: ${file.name}`);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  }

  function validateSave(status: 'draft' | 'published') {
    if (!editor.title.trim()) {
      setNotice('Title is required before this note can be saved.');
      return false;
    }
    if (!editor.category.trim()) {
      setNotice('Select a database category before saving.');
      return false;
    }
    if (status === 'published' && (!editor.excerpt.trim() || !editor.content.trim())) {
      setNotice('Add an excerpt and HTML article body before publishing.');
      return false;
    }
    return true;
  }

  async function save(status: 'draft' | 'published') {
    const payload = {
      title: editor.title.trim(),
      slug: previewSlug,
      category: editor.category,
      excerpt: editor.excerpt.trim(),
      tags: previewTags,
      content: editor.content.trim(),
      image: editor.image.trim(),
      imageAlt: editor.imageAlt.trim() || editor.title.trim(),
      seoTitle: editor.seoTitle.trim() || editor.title.trim(),
      seoDescription: editor.seoDescription.trim() || editor.excerpt.trim(),
      canonicalUrl: editor.canonicalUrl.trim(),
      ogImageUrl: editor.ogImageUrl.trim(),
      noindex: editor.noindex,
      featured: editor.featured,
      status,
    };

    const endpoint = editingId ? `/api/admin/posts/${editingId}` : '/api/admin/posts';
    const method = editingId ? 'PUT' : 'POST';

    try {
      setNotice(status === 'published' ? 'Publishing to PostgreSQL…' : 'Saving draft to PostgreSQL…');
      const response = await fetch(endpoint, {
        method,
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({})) as { error?: string; id?: string; posts?: BlogPublication[] };

      if (response.status === 401) {
        window.location.assign('/login');
        return;
      }
      if (!response.ok) throw new Error(data.error || 'The publication could not be saved.');

      const nextPosts = data.posts ?? posts;
      const savedId = editingId ?? data.id ?? null;
      setPosts(nextPosts);
      setEditingId(savedId);

      if (savedId) {
        const savedPost = nextPosts.find((post) => post.id === savedId);
        if (savedPost) setEditor(editorFromPost(savedPost));
      }

      setNotice(status === 'published'
        ? 'Publication confirmed and published from PostgreSQL. It is now live in /blog.'
        : 'Draft confirmed and saved in PostgreSQL.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'The publication could not be saved.');
    }
  }

  function requestSave(status: 'draft' | 'published') {
    if (!validateSave(status)) return;
    requestConfirmation({
      title: status === 'published' ? 'Publish this publication?' : 'Save this publication as a draft?',
      message: status === 'published'
        ? 'This will write the publication to PostgreSQL and make it visible on the public blog immediately.'
        : 'This will write the current editor content to PostgreSQL as a private draft.',
      confirmLabel: status === 'published' ? 'Publish signal' : 'Save draft',
      action: () => save(status),
    });
  }

  function editPost(post: BlogPublication) {
    setEditingId(post.id ?? null);
    setEditor(editorFromPost(post));
    setNotice(`Editing database publication: ${post.title}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function requestEdit(post: BlogPublication) {
    requestConfirmation({
      title: 'Load this publication into the editor?',
      message: `You are about to edit “${post.title}”. Unsaved changes currently in the editor will be replaced.`,
      confirmLabel: 'Edit publication',
      action: () => editPost(post),
    });
  }

  async function removePost(post: BlogPublication) {
    if (!post.id) return;
    try {
      setNotice(`Removing “${post.title}” from PostgreSQL…`);
      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: 'DELETE',
        credentials: 'same-origin',
      });
      const data = await response.json().catch(() => ({})) as { error?: string; posts?: BlogPublication[] };
      if (response.status === 401) {
        window.location.assign('/login');
        return;
      }
      if (!response.ok) throw new Error(data.error || 'Publication could not be removed.');
      setPosts(data.posts ?? posts.filter((item) => item.id !== post.id));
      if (editingId === post.id) resetEditor();
      setNotice('Publication removed from PostgreSQL.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Publication could not be removed.');
    }
  }

  function requestRemove(post: BlogPublication) {
    requestConfirmation({
      title: 'Remove this publication permanently?',
      message: `“${post.title}” will be deleted from PostgreSQL. This action cannot be undone.`,
      confirmLabel: 'Remove publication',
      danger: true,
      action: () => removePost(post),
    });
  }

  async function logout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    } finally {
      window.location.assign('/login');
    }
  }

  function requestLogout() {
    requestConfirmation({
      title: 'Log out of the admin panel?',
      message: 'Your authenticated admin session will be revoked and you will return to the login page.',
      confirmLabel: 'Log out',
      action: logout,
    });
  }

  return (
    <div className="portfolio-shell admin-shell">
      <AdminHeader onLogoutRequest={requestLogout} />
      <main className="site-content admin-content">
        <section className="admin-hero section-wrap">
          <div>
            <div className="hero-kicker reveal"><span className="pulse-dot" /><span className="eyebrow">PUBLISHING / CONTROL PLANE</span></div>
            <h1 className="admin-title reveal delay-1">Editorial<br /><span>control.</span></h1>
            <p className="admin-intro reveal delay-2">Write, preview, save, and publish field notes directly through the PostgreSQL publication store.</p>
          </div>
          <div className="admin-status-grid reveal delay-2">
            <div className="admin-stat"><span>LIVE SIGNALS</span><strong>{String(publishedCount).padStart(2, '0')}</strong></div>
            <div className="admin-stat"><span>DRAFT BUFFER</span><strong>{String(draftCount).padStart(2, '0')}</strong></div>
            <div className="admin-stat"><span>EDITOR STATE</span><strong>{editingId ? 'EDIT' : 'NEW'}</strong></div>
          </div>
        </section>

        <section className="section-wrap admin-console">
          <aside className="admin-rail">
            <div className="admin-rail-label"><LayoutDashboard size={15} /> CONSOLE / 01</div>
            <button className="admin-rail-action active" onClick={requestNewPost}><FilePlus2 size={15} /> New field note</button>
            <a className="admin-rail-action" href="/blog"><Eye size={15} /> Public archive</a>
            <div className="admin-rail-divider" />
            <span className="admin-rail-caption">DATABASE PUBLICATIONS</span>
            <div className="admin-post-mini-list">
              {posts.length === 0 ? (
                <p className="admin-empty-mini">No database notes yet.</p>
              ) : posts.slice(0, 6).map((post) => (
                <button key={post.id} className={`admin-post-mini ${editingId === post.id ? 'active' : ''}`} onClick={() => requestEdit(post)}>
                  <span>{post.status === 'published' ? 'LIVE' : post.status?.toUpperCase()}</span>
                  <strong>{post.title}</strong>
                </button>
              ))}
            </div>
          </aside>

          <div className="admin-main-panel">
            <div className="admin-panel-head">
              <div><span className="eyebrow">COMPOSE / FIELD NOTE</span><h2>{editingId ? 'Edit transmission.' : 'New transmission.'}</h2></div>
              <span className="admin-notice"><span className="pulse-dot" /> {notice}</span>
            </div>

            <div className="admin-editor-grid">
              <form className="admin-form" onSubmit={(event) => event.preventDefault()}>
                <label className="admin-field admin-field-wide">
                  <span>ARTICLE TITLE</span>
                  <input value={editor.title} onChange={(event) => updateEditor('title', event.target.value)} placeholder="Kubernetes security starts before the cluster" />
                </label>

                <div className="admin-form-row">
                  <label className="admin-field">
                    <span>CATEGORY</span>
                    <select value={editor.category} onChange={(event) => updateEditor('category', event.target.value)} disabled={categories.length === 0}>
                      {categories.length === 0
                        ? <option value="">No categories in PostgreSQL</option>
                        : categories.map((category) => <option value={category.name} key={category.id}>{category.name}</option>)}
                    </select>
                  </label>
                  <label className="admin-field">
                    <span><Tag size={12} /> TAGS / COMMA SEPARATED</span>
                    <input value={editor.tags} onChange={(event) => updateEditor('tags', event.target.value)} placeholder="Kubernetes, RBAC, Supply chain" />
                  </label>
                </div>

                <div className="admin-form-row">
                  <label className="admin-field">
                    <span>COVER IMAGE URL</span>
                    <input value={editor.image} onChange={(event) => updateEditor('image', event.target.value)} placeholder="https://... or leave empty to auto-generate" />
                    <small>Used on the blog card and article page.</small>
                  </label>
                  <label className="admin-field">
                    <span>COVER IMAGE ALT TEXT</span>
                    <input value={editor.imageAlt} onChange={(event) => updateEditor('imageAlt', event.target.value)} placeholder="Describe the image for accessibility and SEO" />
                    <small>Describe the image naturally; do not stuff keywords.</small>
                  </label>
                </div>

                <label className="admin-field admin-field-wide">
                  <span>SHORT EXCERPT</span>
                  <textarea className="admin-excerpt" value={editor.excerpt} onChange={(event) => updateEditor('excerpt', event.target.value)} placeholder="A concise description used on the public blog card." />
                  <small>{editor.excerpt.length}/240 recommended characters</small>
                </label>

                <section className="admin-seo-panel" aria-label="Search engine optimization settings">
                  <div className="admin-seo-head">
                    <div>
                      <span className="eyebrow">SEO / SEARCH</span>
                      <h3>Search appearance.</h3>
                    </div>
                    <strong>{seoScore}/5 checks</strong>
                  </div>

                  <label className="admin-field admin-field-wide">
                    <span>URL SLUG</span>
                    <input value={editor.slug} onChange={(event) => updateEditor('slug', event.target.value)} placeholder="how-ai-is-changing-cybersecurity" />
                    <small>Public URL: {siteUrl}/blog/{previewSlug}</small>
                  </label>

                  <label className="admin-field admin-field-wide">
                    <span>SEO TITLE</span>
                    <input value={editor.seoTitle} onChange={(event) => updateEditor('seoTitle', event.target.value)} placeholder="How AI Is Changing Cybersecurity in 2026" />
                    <small>{previewSeoTitle.length}/60 characters · aim for 30–60</small>
                  </label>

                  <label className="admin-field admin-field-wide">
                    <span>META DESCRIPTION</span>
                    <textarea className="admin-excerpt" value={editor.seoDescription} onChange={(event) => updateEditor('seoDescription', event.target.value)} placeholder="A clear summary of the article for Google search results." />
                    <small>{previewSeoDescription.length}/160 characters · aim for 120–160</small>
                  </label>

                  <div className="admin-form-row">
                    <label className="admin-field">
                      <span>CANONICAL URL</span>
                      <input value={editor.canonicalUrl} onChange={(event) => updateEditor('canonicalUrl', event.target.value)} placeholder={previewCanonical} />
                      <small>Leave blank to use the article URL automatically.</small>
                    </label>
                    <label className="admin-field">
                      <span>OPEN GRAPH IMAGE URL</span>
                      <input value={editor.ogImageUrl} onChange={(event) => updateEditor('ogImageUrl', event.target.value)} placeholder="Defaults to the cover image" />
                      <small>Used when the article is shared on social platforms.</small>
                    </label>
                  </div>

                  <label className="admin-feature-check admin-seo-index-check">
                    <input type="checkbox" checked={editor.noindex} onChange={(event) => updateEditor('noindex', event.target.checked)} />
                    <span className="admin-check-box" />
                    <span><strong>NOINDEX THIS ARTICLE</strong><small>Keep this disabled for articles you want Google to index.</small></span>
                  </label>

                  <div className="admin-seo-checks">
                    {seoChecks.map((check) => (
                      <span className={check.ok ? 'ok' : 'warn'} key={check.label}>{check.ok ? '✓' : '•'} {check.label}</span>
                    ))}
                  </div>
                </section>

                <label className="admin-field admin-field-wide">
                  <span>ARTICLE HTML</span>
                  <textarea className="admin-body-input admin-html-input" value={editor.content} onChange={(event) => updateEditor('content', event.target.value)} placeholder={'<h2>Opening section</h2>\n<p>Write your article in HTML format.</p>\n<p>You can paste lists, headings, links, code blocks, and more.</p>'} />
                  <small>{estimateReadTime(editor.content)} · {editor.content.trim().split(/\s+/).filter(Boolean).length} words</small>
                </label>

                <div className="admin-import-tools">
                  <label className="outline-button admin-import-button">
                    <ImagePlus size={14} /> Import image into HTML
                    <input type="file" accept="image/*" onChange={insertHtmlImage} hidden />
                  </label>
                  <p>Tip: uploaded images are inserted directly into the HTML editor as inline <code>&lt;img&gt;</code> elements.</p>
                </div>

                <label className="admin-feature-check">
                  <input type="checkbox" checked={editor.featured} onChange={(event) => updateEditor('featured', event.target.checked)} />
                  <span className="admin-check-box" />
                  <span><strong>FEATURED SIGNAL</strong><small>Use the large lead card in the public archive.</small></span>
                </label>

                <div className="admin-actions">
                  <button type="button" className="outline-button admin-save" onClick={() => requestSave('draft')}><Save size={14} /> Save draft</button>
                  <button type="button" className="cv-button admin-publish" onClick={() => requestSave('published')}><Send size={14} /> Publish signal</button>
                </div>
              </form>

              <aside className="admin-preview">
                <div className="admin-preview-top"><span>LIVE PREVIEW / CARD</span><Eye size={15} /></div>
                <div className={`admin-preview-card ${editor.featured ? 'featured' : ''}`}>
                  <div className="publication-card-top"><span className="publication-flag">{editor.featured ? 'FEATURED / PREVIEW' : 'FIELD NOTE / PREVIEW'}</span><ArrowUpRight size={16} /></div>
                  <div className="publication-media">
                    <img src={editor.image.trim() || createBlogImage(editor.title || 'Field note', editor.category)} alt={editor.imageAlt || editor.title || 'Field note preview'} />
                  </div>
                  <span className="publication-category">{editor.category}</span>
                  <h3>{editor.title || 'Your article title appears here.'}</h3>
                  <p>{editor.excerpt || 'The short article excerpt will appear here and introduce the signal before the reader opens it.'}</p>
                  <div className="publication-meta"><span><CalendarDays size={13} /> {formatPostDate()}</span><span><Clock3 size={13} /> {estimateReadTime(editor.content)}</span></div>
                  <div className="publication-tags">{(previewTags.length ? previewTags : ['Tag one', 'Tag two']).map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <div className="admin-seo-preview">
                  <div className="admin-preview-top"><span>GOOGLE / SEARCH PREVIEW</span><Search size={15} /></div>
                  <div className="admin-google-snippet">
                    <span className="admin-google-url">{previewCanonical}</span>
                    <h4>{previewSeoTitle}</h4>
                    <p>{previewSeoDescription}</p>
                  </div>
                </div>
                <div className="admin-html-preview">
                  <div className="admin-preview-top"><span>LIVE PREVIEW / ARTICLE HTML</span><Eye size={15} /></div>
                  <div className="admin-html-preview-body article-body" dangerouslySetInnerHTML={{ __html: normalizeArticleHtml(editor.content) }} />
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="section-wrap admin-library">
          <div className="section-head-row">
            <div><span className="eyebrow">ARCHIVE / POSTGRESQL</span><h2 className="section-title">Publication <em>buffer.</em></h2></div>
            <span className="section-index">{String(posts.length).padStart(2, '0')} RECORDS</span>
          </div>
          {posts.length === 0 ? (
            <div className="publication-empty"><span className="empty-code">DATABASE / EMPTY</span><h3>No publications in PostgreSQL yet.</h3><p>Create a field note above, save it as a draft, or publish it to the blog.</p></div>
          ) : (
            <div className="admin-table">
              {posts.map((post) => (
                <article className="admin-table-row" key={post.id}>
                  <div className={`admin-status-pill ${post.status}`}><span /> {post.status}</div>
                  <div className="admin-row-copy"><span>{post.category} / {post.date}</span><h3>{post.title}</h3></div>
                  <div className="admin-row-meta">{post.readTime}</div>
                  <div className="admin-row-actions">
                    {post.status === 'published' && <a href={`/blog/${post.slug}`} title="View"><Eye size={15} /></a>}
                    <button onClick={() => requestEdit(post)} title="Edit"><Edit3 size={15} /></button>
                    <button onClick={() => requestRemove(post)} title="Delete"><Trash2 size={15} /></button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
      {confirmation && (
        <ConfirmationDialog
          request={confirmation}
          busy={confirmBusy}
          onCancel={() => !confirmBusy && setConfirmation(null)}
          onConfirm={() => void runConfirmedAction()}
        />
      )}
    </div>
  );
}

export function ArticlePage({ publication }: { publication: BlogPublication }) {
  const post = withPublicationImage(publication);

  return (
    <div className="portfolio-shell blog-shell">
      <SiteHeader isBlog />
      <main className="site-content article-content">
        <article className="section-wrap article-page">
          <a className="text-link article-back" href="/blog"><ArrowDown className="article-back-icon" size={14} /> Back to field notes</a>
          <div className="article-kicker"><span className="publication-category">{post.category}</span><span>FIELD NOTE / {post.date}</span></div>
          <h1>{post.title}</h1>
          <p className="article-lead">{post.excerpt}</p>
          <div className="article-image"><img src={post.image} alt={post.imageAlt || post.title} /></div>
          <div className="publication-meta article-meta"><span><CalendarDays size={13} /> {post.date}</span><span><Clock3 size={13} /> {post.readTime}</span></div>
          <div className="article-rule" />
          <div className="article-body" dangerouslySetInnerHTML={{ __html: normalizeArticleHtml(post.content) }} />
          <div className="publication-tags article-tags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="article-end"><span className="pulse-dot" /> END OF TRANSMISSION</div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

export function PortfolioHome() {
  const [openExperience, setOpenExperience] = useState(0);
  const [activeSkill, setActiveSkill] = useState(0);
  const ActiveIcon = skillGroups[activeSkill].icon;

  return (
    <div className="portfolio-shell">
      <SiteHeader />
      <main className="site-content">
        <section className="hero section-wrap" id="top">
          <div className="hero-grid">
            <div>
              <div className="hero-kicker reveal"><span className="pulse-dot" /><span className="eyebrow">Cloud Security &amp; DevOps · Morocco</span></div>
              <h1 className="hero-title reveal delay-1" data-testid="text-hero-title">
                Securing
                <span className="line-accent">the signal.</span>
                <span className="line-quiet font-light">Building the system around it.</span>
              </h1>
              <p className="hero-copy reveal delay-2">
                I&apos;m <strong>Othman El-Mansour</strong>, a Network &amp; Telecommunications Systems Engineering student building secure, observable infrastructure across cloud, networks, and DevOps.
              </p>
              <div className="hero-actions reveal delay-3">
                <button className="cv-button" onClick={() => scrollToSection('contact')} data-testid="button-start-conversation">Start a conversation <ArrowUpRight size={14} /></button>
                <a className="text-link" href={cvPath} target="_blank" rel="noreferrer" data-testid="link-cv-hero">Read my CV <ArrowDown size={14} /></a>
              </div>
              <div className="hero-meta reveal delay-4">
                <span><Globe2 size={13} /> Khemisset, Morocco</span>
                <span><Mail size={13} /> elmansourothman7@gmail.com</span>
              </div>
            </div>
            <div className="hero-portrait-card reveal delay-2" data-testid="card-hero-photo">
              <div className="hero-portrait-shell">
                <span className="hero-portrait-badge hero-portrait-badge-top">Available for opportunities</span>
                <img src={heroPhotoPath} alt="Othman El-Mansour portrait" className="hero-portrait-image" />
                <span className="hero-portrait-badge hero-portrait-badge-bottom">Cloud Security · DevOps</span>
              </div>
            </div>
          </div>
        </section>

        <div className="signal-strip">
          <div className="section-wrap signal-strip-inner">
            <div className="signal-stat"><div className="signal-value">03</div><div className="signal-label">field engagements</div></div>
            <div className="signal-stat"><div className="signal-value">02</div><div className="signal-label">security projects</div></div>
            <div className="signal-stat"><div className="signal-value">L2—L7</div><div className="signal-label">systems perspective</div></div>
            <div className="signal-stat"><div className="signal-value">MA</div><div className="signal-label">based in Morocco</div></div>
          </div>
        </div>

        <section className="section-wrap section-pad" id="about">
          <div className="about-grid">
            <div>
              <span className="eyebrow">01 / Profile</span>
              <h2 className="section-heading" style={{ marginTop: 22 }}>The person behind<br /><em>the packets.</em></h2>
            </div>
            <div>
              <p className="section-intro"><strong>Network &amp; Telecommunications Systems Engineering student</strong> with hands-on experience in network security, infrastructure monitoring, and intrusion detection.</p>
              <p className="section-intro">I work comfortably across Linux administration, routing, switching, VLANs, TCP/IP, and modern cloud/container technologies. My current edge is growing the bridge between reliable infrastructure and secure delivery.</p>
              <div className="focus-grid">
                <div className="focus-card"><ShieldCheck className="focus-icon" size={21} /><h3>Reduce blind spots</h3><p>Security monitoring that turns noisy infrastructure into legible signals.</p></div>
                <div className="focus-card"><Network className="focus-icon" size={21} /><h3>Understand the path</h3><p>Routing, switching, and protocols from the packet up.</p></div>
                <div className="focus-card"><Terminal className="focus-icon" size={21} /><h3>Make it repeatable</h3><p>Automation and CI/CD habits for changes you can trust.</p></div>
                <div className="focus-card"><Cloud className="focus-icon" size={21} /><h3>Keep learning forward</h3><p>Cloud and containers as the next layer of secure operations.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap section-pad" id="experience">
          <div className="section-head-row">
            <div><span className="eyebrow">02 / Experience</span><h2 className="section-heading" style={{ marginTop: 22 }}>Field<br /><em>experience.</em></h2></div>
            <span className="section-index">Three missions · one trajectory</span>
          </div>
          <div className="timeline">
            {experience.map((item, index) => {
              const isOpen = openExperience === index;
              return (
                <article className="experience-item" key={item.date} data-testid={`card-experience-${index}`}>
                  <div className="experience-node" />
                  <div className="experience-date">{item.date}</div>
                  <div className="experience-card">
                    <div className="role-top"><div><h3 className="role-title">{item.role}</h3><div className="role-company">{item.company}</div></div><span className="role-badge">{item.badge}</span></div>
                    <p className="role-summary">{item.summary}</p>
                    <button className={`detail-toggle ${isOpen ? 'open' : ''}`} onClick={() => setOpenExperience(isOpen ? -1 : index)} data-testid={`button-details-${index}`}>
                      {isOpen ? 'Hide mission details' : 'Read mission details'} <ChevronDown size={14} />
                    </button>
                    {isOpen && <ul className="role-details">{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="projects-section section-pad" id="projects">
          <div className="section-wrap">
            <div className="section-head-row">
              <div><span className="eyebrow">03 / Projects</span><h2 className="section-heading" style={{ marginTop: 22 }}>Proof of<br /><em>practice.</em></h2></div>
              <span className="section-index">Built to be useful, not ornamental</span>
            </div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <article key={project.title} className={`project-card ${project.main ? 'main-project' : ''}`} data-testid={`card-project-${index}`}>
                  <div className="project-number">{project.number}</div><ExternalLink className="project-corner" size={18} />
                  <h3>{project.title}</h3><p>{project.description}</p>
                  <div className="project-tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap section-pad" id="skills">
          <div className="skills-grid">
            <div>
              <span className="eyebrow">04 / Stack</span>
              <h2 className="section-heading" style={{ marginTop: 22 }}>Tools for<br /><em>the signal.</em></h2>
              <div className="skill-tabs" role="tablist" aria-label="Skill categories">
                {skillGroups.map((group, index) => {
                  const Icon = group.icon;
                  return <button key={group.label} role="tab" aria-selected={activeSkill === index} className={`skill-tab ${activeSkill === index ? 'active' : ''}`} onClick={() => setActiveSkill(index)} data-testid={`tab-skill-${index}`}><span>{group.label}</span><Icon size={15} /></button>;
                })}
              </div>
            </div>
            <div className="skill-display" role="tabpanel" data-testid="panel-skills">
              <div className="skill-display-head"><div><ActiveIcon className="focus-icon" size={22} /><h3 style={{ marginTop: 20 }}>{skillGroups[activeSkill].label}</h3></div><span className="skill-count">{String(skillGroups[activeSkill].skills.length).padStart(2, '0')} SIGNALS</span></div>
              <div className="skill-chips">{skillGroups[activeSkill].skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div>
              <p className="skill-note">/ {skillGroups[activeSkill].note}</p>
            </div>
          </div>
        </section>

        <section className="section-wrap section-pad" id="education">
          <div className="education-layout">
            <div><span className="eyebrow">05 / Formation</span><h2 className="section-heading" style={{ marginTop: 22 }}>Always<br /><em>in motion.</em></h2><p className="section-intro" style={{ marginTop: 30 }}>A technical foundation built across software, networks, systems administration, and security.</p></div>
            <div className="education-list">{education.map((item, index) => <article className="education-item" key={item.title} data-testid={`card-education-${index}`}><div className="education-years">{item.years}</div><div><h3>{item.title}</h3><p>{item.school}</p><p>{item.detail}</p>{item.honor && <span className="honor">{item.honor}</span>}</div></article>)}</div>
          </div>
        </section>

        <section className="section-wrap contact-section" id="contact">
          <div className="contact-panel">
            <span className="eyebrow">06 / Open channel</span>
            <h2 style={{ marginTop: 25 }}>Let&apos;s build a<br /><em>safer system.</em></h2>
            <p>If the problem involves infrastructure, visibility, and trust, I&apos;d like to hear about it. Let&apos;s build systems that stay understandable under pressure.</p>
            <div className="contact-links">
              <a className="contact-link" href="mailto:elmansourothman7@gmail.com" data-testid="link-email"><Mail size={15} /> elmansourothman7@gmail.com</a>
              <a className="contact-link" href="tel:0684756805" data-testid="link-phone"><span className="mono">+212</span> 06 84 75 68 05</a>
              <a className="contact-link" href="https://linkedin.com/in/el-mansour-othman" target="_blank" rel="noreferrer" data-testid="link-linkedin"><Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} /></a>
              <a className="contact-link" href="https://github.com/yamisukehiro39" target="_blank" rel="noreferrer" data-testid="link-github"><Github size={15} /> GitHub <ArrowUpRight size={13} /></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

