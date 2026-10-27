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
      intro="A snapshot of the tools and technical areas I have studied and used in projects and internships."
    >
      <h2>Security</h2>
      <p>Snort, IDS/IPS, firewalls, security monitoring, risk assessment, incident response, cryptography, steganography and system and network hardening.</p>

      <h2>Networking</h2>
      <p>Cisco routing and switching, VLANs, TCP/IP, DNS, DHCP, SSH, GNS3 and Packet Tracer.</p>

      <h2>Cloud & Containers</h2>
      <p>Docker, Kubernetes and cloud infrastructure fundamentals.</p>

      <h2>DevOps & Automation</h2>
      <p>Git, GitHub, GitHub Actions and CI/CD, automation and Bash scripting.</p>

      <h2>Observability</h2>
      <p>Zabbix, Uptime Kuma, Snort, server monitoring, alerts and dashboards.</p>

      <h2>Programming & Systems</h2>
      <p>Python, C, C++, Java, JavaScript, Node.js, HTML, CSS, Django, REST APIs, Linux, Windows and SQL.</p>

      <h2>Telephony &amp; Real-Time Communication</h2>
      <p>SIP, WebRTC, VoIP, Asterisk and jsSIP.</p>
    </StaticContentPage>
  );
}
