import type { Metadata } from 'next';
import { StaticContentPage } from '../../components/StaticContentPage';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Professional and technical experience of Othman El-Mansour in network security, monitoring, web development and infrastructure engineering.',
  alternates: { canonical: '/experience' },
};

export default function ExperiencePage() {
  return (
    <StaticContentPage
      eyebrow="EXPERIENCE / FIELD WORK"
      title="My experience."
      intro="Three internships across network security, infrastructure monitoring and web development."
    >
      <h2>Network Security & Monitoring Intern — SkyVaults</h2>
      <p><strong>06.2025 — 08.2025 · Agadir, Morocco</strong></p>
      <p>
        Monitored servers and networks for availability and security issues. Set up Uptime Kuma, Zabbix and Snort, and built GeoMonitor to check uptime and response time across geographic regions. Connected Snort alerts to monitoring dashboards and improved alerting for easier investigation.
      </p>

      <h2>Web Developer Intern — BigBang Center</h2>
      <p><strong>04.2024 — 05.2024 · Beni Mellal, Morocco</strong></p>
      <p>
        Built an inventory web application that lets users create, view, update and delete products, using HTML, CSS, JavaScript, Python and a relational database.
      </p>

      <h2>Web Developer Intern — BigBang Center</h2>
      <p><strong>06.2023 — 08.2023 · Beni Mellal, Morocco</strong></p>
      <p>
        Built an online store for handmade clothing with product listings, a cart and checkout, using HTML, CSS, JavaScript, Python and Django.
      </p>
    </StaticContentPage>
  );
}
