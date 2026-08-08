import type { Metadata } from 'next';
import { StaticContentPage } from '../../components/StaticContentPage';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Othman El-Mansour, a Network & Telecommunications Systems Engineering student focused on DevSecOps, cybersecurity, cloud security and networking.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <StaticContentPage
      eyebrow="ABOUT / PROFILE"
      title="About Othman El-Mansour."
      intro="I build and study secure, observable infrastructure across cloud, networks, systems and DevOps workflows."
    >
      <h2>Profile</h2>
      <p>
        I am Othman El-Mansour, a Network &amp; Telecommunications Systems Engineering student focused on DevSecOps, cloud security, cybersecurity, networking and infrastructure observability.
      </p>

      <h2>Technical focus</h2>
      <p>
        My work connects Linux administration, routing and switching, Kubernetes, CI/CD, monitoring and security controls. I am especially interested in systems that remain understandable and secure under operational pressure.
      </p>

      <h2>What I publish</h2>
      <p>
        The blog contains practical field notes about architecture, troubleshooting, security controls, deployment workflows and lessons learned while building infrastructure projects.
      </p>

      <h2>Editorial approach</h2>
      <p>
        Articles are written to explain context, trade-offs and implementation decisions. If you notice an error or outdated statement, you can contact me so I can review it.
      </p>
    </StaticContentPage>
  );
}
