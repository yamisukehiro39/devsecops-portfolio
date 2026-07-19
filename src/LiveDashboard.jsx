import { useEffect, useState } from 'react'
import './LiveDashboard.css'

const initialInfrastructure = {
  status: 'Operational',
  cpu: 24,
  memory: 61,
  disk: 38,
  uptime: '7d 14h 32m',
  requests: '1,284',
  latency: 42,
}

const visitor = {
  ip: '197.230.***.***',
  location: 'Morocco',
  region: 'Rabat-Salé-Kénitra',
  browser: 'Chrome',
  operatingSystem: 'Windows 10',
  connection: 'HTTPS · TLS 1.3',
}

function MetricBar({ label, value, suffix = '%' }) {
  return (
    <div className="metric-bar">
      <div className="metric-bar__heading">
        <span>{label}</span>
        <strong>{value}{suffix}</strong>
      </div>
      <div className="metric-bar__track" aria-hidden="true">
        <span style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  )
}

function DataRow({ label, value, secure = false }) {
  return (
    <div className="data-row">
      <span>{label}</span>
      <strong className={secure ? 'secure-value' : ''}>{value}</strong>
    </div>
  )
}

function LiveDashboard() {
  const [infrastructure, setInfrastructure] = useState(initialInfrastructure)
  const [updatedAt, setUpdatedAt] = useState(new Date())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setInfrastructure((current) => ({
        ...current,
        cpu: Math.max(16, Math.min(43, current.cpu + Math.round(Math.random() * 8 - 4))),
        memory: Math.max(55, Math.min(70, current.memory + Math.round(Math.random() * 4 - 2))),
        latency: Math.max(31, Math.min(58, current.latency + Math.round(Math.random() * 10 - 5))),
      }))
      setUpdatedAt(new Date())
    }, 3000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="live-lab section section-alt" id="live-lab">
      <div className="container">
        <div className="section-label">05 / Live Lab</div>

        <div className="section-heading live-lab__heading">
          <h2>Inside the system</h2>
          <div className="live-status">
            <span className="status-dot" />
            Live telemetry · updated {updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </div>

        <div className="lab-grid">
          <article className="lab-panel infrastructure-panel">
            <header className="lab-panel__header">
              <div>
                <span className="panel-index">01</span>
                <h3>Live Infrastructure</h3>
              </div>
              <span className="operational-badge">
                <i /> {infrastructure.status}
              </span>
            </header>

            <div className="server-identity">
              <div className="server-icon" aria-hidden="true">
                <span /><span /><span />
              </div>
              <div>
                <span>PRODUCTION NODE</span>
                <strong>portfolio-prod-01</strong>
                <small>AWS Lightsail · Ubuntu 24.04 LTS</small>
              </div>
            </div>

            <div className="metric-bars">
              <MetricBar label="CPU LOAD" value={infrastructure.cpu} />
              <MetricBar label="MEMORY" value={infrastructure.memory} />
              <MetricBar label="DISK" value={infrastructure.disk} />
            </div>

            <div className="quick-metrics">
              <div><span>UPTIME</span><strong>{infrastructure.uptime}</strong></div>
              <div><span>REQUESTS / 24H</span><strong>{infrastructure.requests}</strong></div>
              <div><span>API LATENCY</span><strong>{infrastructure.latency} ms</strong></div>
            </div>
          </article>

          <article className="lab-panel visitor-panel">
            <header className="lab-panel__header">
              <div>
                <span className="panel-index">02</span>
                <h3>Visitor Intelligence</h3>
              </div>
              <span className="privacy-badge">PRIVACY SAFE</span>
            </header>

            <p className="panel-intro">
              Public connection metadata detected for this session. No personal data is stored.
            </p>

            <div className="visitor-map" aria-label="Approximate visitor location: Morocco">
              <div className="map-grid" />
              <div className="location-pulse"><i /><span>MA</span></div>
              <div className="map-coordinate">33.9° N · 6.8° W</div>
            </div>

            <div className="visitor-data">
              <DataRow label="PUBLIC IP" value={visitor.ip} />
              <DataRow label="LOCATION" value={visitor.location} />
              <DataRow label="REGION" value={visitor.region} />
              <DataRow label="CLIENT" value={`${visitor.browser} · ${visitor.operatingSystem}`} />
              <DataRow label="CONNECTION" value={visitor.connection} secure />
            </div>
          </article>
        </div>

        <p className="telemetry-note">
          <span>$</span> Metrics are displayed for observability demonstration and refresh automatically.
        </p>
      </div>
    </section>
  )
}

export default LiveDashboard
