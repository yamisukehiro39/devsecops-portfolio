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
      title="About me."
      intro="I am a Network and Telecommunications Systems Engineering student in Morocco, focused on secure and reliable infrastructure."
    >
      <h2>Profile</h2>
      <p>
        I am studying Network &amp; Telecommunications Systems Engineering at ENSA Kénitra, with a focus on network and information systems security. My studies build on a DUT in Computer Engineering from EST Beni Mellal, where I graduated with high honors.
      </p>

      <h2>Technical focus</h2>
      <p>
        My practical experience includes network security monitoring, web development and building tools for uptime and response-time monitoring. I work with Linux, networking, Docker, Kubernetes, CI/CD and tools such as Snort, Zabbix and Uptime Kuma.
      </p>

      <h2>What I publish</h2>
      <p>
        I share practical notes about cloud security, networks, monitoring and DevOps, including lessons from projects and technical problems I have worked through.
      </p>

      <h2>Editorial approach</h2>
      <p>
        I aim to make each article clear, useful and grounded in practical work. You can contact me if you spot an error or want to discuss a topic.
      </p>
    </StaticContentPage>
  );
}
