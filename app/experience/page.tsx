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
      title="Technical experience."
      intro="Hands-on experience across network security, monitoring, observability and software development."
    >
      <h2>Network Security & Monitoring Intern — SkyVaults</h2>
      <p><strong>06.2025 — 08.2025 · Agadir, Morocco</strong></p>
      <p>
        Worked on infrastructure visibility and security monitoring using Uptime Kuma, Zabbix and Snort. Built a GeoMonitor module for geographic latency and uptime tracking and connected monitoring signals with intrusion-detection context.
      </p>

      <h2>Web Developer Intern — BigBang Center</h2>
      <p><strong>04.2024 — 05.2024 · Beni Mellal, Morocco</strong></p>
      <p>
        Delivered an inventory-management web application with CRUD workflows using web technologies, Python and a relational database backend.
      </p>

      <h2>Web Developer Intern — BigBang Center</h2>
      <p><strong>06.2023 — 08.2023 · Beni Mellal, Morocco</strong></p>
      <p>
        Developed a responsive e-commerce platform for artisanal clothing using HTML, CSS, JavaScript, Python and Django.
      </p>
    </StaticContentPage>
  );
}
