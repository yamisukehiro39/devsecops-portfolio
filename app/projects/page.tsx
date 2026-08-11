import type { Metadata } from 'next';
import { StaticContentPage } from '../../components/StaticContentPage';

export const metadata: Metadata = {
  title: 'DevSecOps & Security Projects',
  description:
    'Explore DevSecOps, monitoring, network security and infrastructure projects by Othman El-Mansour.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <StaticContentPage
      eyebrow="PROJECTS / MY WORK"
      title="My projects."
      intro="Here are some projects I built to improve monitoring and security."
    >
      <h2>GeoMonitor</h2>
      <p>
        A tool for Uptime Kuma that checks website uptime and response time from different locations.
      </p>
      <p><strong>Tools:</strong> Uptime Kuma, monitoring and latency tracking.</p>

      <h2>Network Security Monitoring Stack</h2>
      <p>
        A system that uses Snort, Zabbix and Uptime Kuma to monitor servers and send alerts when a problem appears.
      </p>
      <p><strong>Tools:</strong> Snort, Zabbix, Uptime Kuma, alerts and dashboards.</p>

      <h2>My goal</h2>
      <p>
        I build practical tools that make systems easier to understand, monitor and protect.
      </p>
    </StaticContentPage>
  );
}
