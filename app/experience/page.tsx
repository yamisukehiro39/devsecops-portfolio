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
      intro="I have worked on network security, monitoring and web development."
    >
      <h2>Network Security & Monitoring Intern — SkyVaults</h2>
      <p><strong>06.2025 — 08.2025 · Agadir, Morocco</strong></p>
      <p>
        Used Uptime Kuma, Zabbix and Snort to monitor systems and detect security problems. I also built GeoMonitor to check uptime and response time from different countries.
      </p>

      <h2>Web Developer Intern — BigBang Center</h2>
      <p><strong>04.2024 — 05.2024 · Beni Mellal, Morocco</strong></p>
      <p>
        Built an inventory web application with Python and a database. Users could add, view, edit and delete products.
      </p>

      <h2>Web Developer Intern — BigBang Center</h2>
      <p><strong>06.2023 — 08.2023 · Beni Mellal, Morocco</strong></p>
      <p>
        Built an online store for handmade clothing with HTML, CSS, JavaScript, Python and Django.
      </p>
    </StaticContentPage>
  );
}
