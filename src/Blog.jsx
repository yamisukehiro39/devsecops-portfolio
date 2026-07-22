import { useMemo, useState } from 'react'
import './App.css'
import './Blog.css'

const articles = [
  {
    slug: 'secure-react-deployment-docker-nginx',
    category: 'DevSecOps',
    date: 'JUL 22, 2026',
    readTime: '8 MIN READ',
    title: 'Deploying React securely with Docker and NGINX',
    excerpt:
      'A practical deployment workflow using a multi-stage image, an NGINX gateway, TLS and automated health checks.',
    tags: ['Docker', 'NGINX', 'TLS'],
    featured: true,
  },
  {
    slug: 'github-actions-secure-cicd-pipeline',
    category: 'CI/CD',
    date: 'JUL 18, 2026',
    readTime: '10 MIN READ',
    title: 'Building a secure CI/CD pipeline with GitHub Actions',
    excerpt:
      'Lint, audit, scan and publish container images before deploying them safely to a production server.',
    tags: ['GitHub Actions', 'Trivy', 'Gitleaks'],
  },
  {
    slug: 'k3s-vs-kubernetes-homelab',
    category: 'Kubernetes',
    date: 'JUL 14, 2026',
    readTime: '6 MIN READ',
    title: 'K3s or Kubernetes: choosing a portfolio cluster',
    excerpt:
      'A resource-focused comparison for running cloud-native projects, monitoring and security tools on one VPS.',
    tags: ['K3s', 'Kubernetes', 'VPS'],
  },
  {
    slug: 'prometheus-grafana-observability-stack',
    category: 'Observability',
    date: 'JUL 10, 2026',
    readTime: '9 MIN READ',
    title: 'Monitoring infrastructure with Prometheus and Grafana',
    excerpt:
      'Turn infrastructure metrics into useful dashboards and alerts without losing sight of system performance.',
    tags: ['Prometheus', 'Grafana', 'Alerting'],
  },
  {
    slug: 'harden-ubuntu-cloud-server',
    category: 'Cloud Security',
    date: 'JUL 06, 2026',
    readTime: '7 MIN READ',
    title: 'A practical baseline for hardening an Ubuntu VPS',
    excerpt:
      'Reduce exposure with SSH keys, restricted access, firewall rules, automatic updates and useful logging.',
    tags: ['Ubuntu', 'SSH', 'Firewall'],
  },
  {
    slug: 'argocd-gitops-deployment-workflow',
    category: 'GitOps',
    date: 'JUL 02, 2026',
    readTime: '8 MIN READ',
    title: 'Understanding GitOps deployments with Argo CD',
    excerpt:
      'How desired state, reconciliation and Git history create a visible and repeatable deployment workflow.',
    tags: ['Argo CD', 'GitOps', 'Kubernetes'],
  },
]

const categories = ['All', ...new Set(articles.map((article) => article.category))]

function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')

  const visibleArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === 'All' || article.category === activeCategory
      const searchableText = [
        article.title,
        article.excerpt,
        article.category,
        ...article.tags,
      ]
        .join(' ')
        .toLowerCase()

      return matchesCategory && searchableText.includes(normalizedQuery)
    })
  }, [activeCategory, query])

  const featuredArticle = articles.find((article) => article.featured)

  return (
    <>
      <a className="skip-link" href="#blog-content">
        Skip to articles
      </a>

      <header className="site-header">
        <nav className="nav container" aria-label="Main navigation">
          <a className="logo" href="/" aria-label="Othman home">
            <span>0</span>THMAN.
          </a>
          <div className="nav-links">
            <a href="/#about">About</a>
            <a href="/#skills">Skills</a>
            <a href="/#experience">Experience</a>
            <a href="/#projects">Projects</a>
            <a className="blog-nav-active" href="/blog" aria-current="page">
              Blog
            </a>
          </div>
          <a className="button button-small" href="/#contact">
            Let's talk
          </a>
        </nav>
      </header>

      <main id="blog-content">
        <section className="blog-hero container">
          <div>
            <p className="eyebrow">
              <span className="status-dot"></span> Notes from the lab
            </p>
            <h1>
              Build. Secure.
              <br />
              <span>Document.</span>
            </h1>
          </div>
          <div className="blog-hero-copy">
            <p>
              Practical notes on DevSecOps, cloud security, Kubernetes and
              observability—written from systems I build and operate.
            </p>
            <div className="blog-command" aria-label="Blog status">
              <span>$</span> find ./knowledge -type f
              <strong>{articles.length} articles found</strong>
            </div>
          </div>
        </section>

        <section className="section section-alt blog-featured">
          <div className="container">
            <div className="section-label">01 / Featured article</div>
            <article className="featured-article">
              <div className="featured-index" aria-hidden="true">
                01
              </div>
              <div className="featured-content">
                <div className="article-meta">
                  <span>{featuredArticle.category}</span>
                  <span>{featuredArticle.date}</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <h2>{featuredArticle.title}</h2>
                <p>{featuredArticle.excerpt}</p>
                <div className="tags">
                  {featuredArticle.tags.map((tag) => (
                    <em key={tag}>{tag}</em>
                  ))}
                </div>
                <a className="article-link" href={`/blog/${featuredArticle.slug}`}>
                  Read article <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="section container blog-library">
          <div className="section-label">02 / Knowledge base</div>
          <div className="section-heading">
            <h2>Latest field notes</h2>
            <p>
              Focused guides, architecture decisions and lessons from practical
              infrastructure work.
            </p>
          </div>

          <div className="blog-toolbar">
            <label className="blog-search">
              <span>SEARCH /</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Docker, Kubernetes, security..."
              />
            </label>

            <div className="category-filter" aria-label="Filter articles">
              {categories.map((category) => (
                <button
                  className={activeCategory === category ? 'active' : ''}
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {visibleArticles.length > 0 ? (
            <div className="article-grid">
              {visibleArticles.map((article, index) => (
                <article className="article-card" key={article.slug}>
                  <div className="article-card-top">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span>{article.category}</span>
                  </div>
                  <div className="article-card-body">
                    <div className="article-meta">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                  </div>
                  <div className="tags">
                    {article.tags.map((tag) => (
                      <em key={tag}>{tag}</em>
                    ))}
                  </div>
                  <a className="article-link" href={`/blog/${article.slug}`}>
                    Read article <span aria-hidden="true">→</span>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="blog-empty">
              <span>404 / NO MATCH</span>
              <p>No article matches this search. Try another keyword.</p>
            </div>
          )}
        </section>

        <section className="blog-cta">
          <div className="container blog-cta-inner">
            <div>
              <p className="eyebrow">Following the build?</p>
              <h2>
                Explore the systems
                <br />
                behind the <span>articles.</span>
              </h2>
            </div>
            <a className="button button-light" href="/#projects">
              View projects <span aria-hidden="true">↗</span>
            </a>
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

export default Blog
