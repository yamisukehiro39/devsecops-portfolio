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
      eyebrow="PROJECTS / PROOF OF PRACTICE"
      title="DevSecOps & security projects."
      intro="Selected projects focused on monitoring, network security, infrastructure visibility and practical engineering."
    >
      <h2>GeoMonitor</h2>
      <p>
        A geographic latency and uptime monitoring module built around Uptime Kuma. The project adds regional context to service health so availability can be understood by location instead of only as a global status.
      </p>
      <p><strong>Focus:</strong> Uptime Kuma, monitoring, latency, geographic regions and service visibility.</p>

      <h2>Network Security Monitoring Stack</h2>
      <p>
        A monitoring setup combining Snort, Zabbix and Uptime Kuma to improve infrastructure visibility, security alerting and correlation between availability and suspicious activity.
      </p>
      <p><strong>Focus:</strong> Snort, Zabbix, IDS, alerting, dashboards and observability.</p>

      <h2>Engineering approach</h2>
      <p>
        The projects on this portfolio are built to solve operational problems: reduce blind spots, make system behavior easier to understand and turn security signals into useful context.
      </p>
    </StaticContentPage>
  );
}
