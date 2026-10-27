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
      intro="Practical projects focused on uptime, network visibility and security monitoring."
    >
      <h2>GeoMonitor</h2>
      <p>
        GeoMonitor extends Uptime Kuma monitoring with uptime and response-time checks from different geographic locations. It helps compare service reachability and latency across regions.
      </p>
      <p><strong>Tools:</strong> Uptime Kuma, monitoring, geographic probes and latency tracking.</p>

      <h2>Network Security Monitoring Stack</h2>
      <p>
        A monitoring setup combining network intrusion detection and infrastructure health checks. Snort alerts connect with Zabbix and Uptime Kuma monitoring so issues are easier to see and investigate.
      </p>
      <p><strong>Tools:</strong> Snort, Zabbix, Uptime Kuma, alerting and dashboards.</p>

      <h2>My goal</h2>
      <p>
        I build practical tools that make systems easier to understand, monitor and protect.
      </p>
    </StaticContentPage>
  );
}
