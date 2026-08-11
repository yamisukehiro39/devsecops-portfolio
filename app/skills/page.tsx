import type { Metadata } from 'next';
import { StaticContentPage } from '../../components/StaticContentPage';

export const metadata: Metadata = {
  title: 'DevSecOps & Networking Skills',
  description:
    'Technical stack of Othman El-Mansour across DevSecOps, cybersecurity, networking, cloud, Kubernetes, observability, Linux and programming.',
  alternates: { canonical: '/skills' },
};

export default function SkillsPage() {
  return (
    <StaticContentPage
      eyebrow="STACK / TECHNICAL SKILLS"
      title="My technical skills."
      intro="These are the main tools and technologies I use."
    >
      <h2>Security</h2>
      <p>Snort, IDS/IPS, firewalls, security monitoring, risk assessment and incident response.</p>

      <h2>Networking</h2>
      <p>Cisco routing &amp; switching, VLANs, TCP/IP, DNS, DHCP, SSH, GNS3 and Packet Tracer.</p>

      <h2>Cloud & Containers</h2>
      <p>Docker, Kubernetes and basic cloud infrastructure.</p>

      <h2>DevOps & Automation</h2>
      <p>Git, GitHub, GitHub Actions, CI/CD, automation and Bash scripting.</p>

      <h2>Observability</h2>
      <p>Zabbix, Uptime Kuma, Snort, alerts and dashboards.</p>

      <h2>Programming & Systems</h2>
      <p>Python, C, C++, Java, JavaScript, Node.js, Django, REST APIs, Linux and SQL.</p>
    </StaticContentPage>
  );
}
