import type { Metadata } from 'next';
import { StaticContentPage } from '../../components/StaticContentPage';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Othman El-Mansour and the editorial purpose of this cloud security and DevOps blog.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <StaticContentPage
      eyebrow="ABOUT / EDITORIAL"
      title="About this site."
      intro="This portfolio documents my work and publishes practical technical notes about secure, observable infrastructure."
    >
      <h2>Who I am</h2>
      <p>I am Othman El-Mansour, a Network & Telecommunications Systems Engineering student focused on cloud security, DevOps, networking, observability and practical infrastructure security.</p>

      <h2>What I publish</h2>
      <p>The blog focuses on lessons, architecture patterns, troubleshooting approaches, security controls and implementation notes that can help readers understand how infrastructure behaves in real environments.</p>

      <h2>Editorial approach</h2>
      <p>Articles are written to be useful rather than promotional. I aim to explain the context behind a technical decision, the trade-offs involved, and the checks that make the result easier to trust.</p>

      <h2>Corrections</h2>
      <p>Technology changes quickly. If you notice an error or an outdated statement, contact me so I can review and correct it.</p>
    </StaticContentPage>
  );
}
