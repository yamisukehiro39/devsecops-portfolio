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
      intro="I am Othman El-Mansour. I study networks, cloud, security and DevOps."
    >
      <h2>Profile</h2>
      <p>
        I am a Network &amp; Telecommunications Systems Engineering student. I enjoy building systems that are secure, reliable and easy to monitor.
      </p>

      <h2>Technical focus</h2>
      <p>
        I work with Linux, networks, Docker, Kubernetes, CI/CD and monitoring tools. I also learn how to protect systems from security threats.
      </p>

      <h2>What I publish</h2>
      <p>
        I share simple guides, project lessons and solutions to technical problems.
      </p>

      <h2>Editorial approach</h2>
      <p>
        I try to make every article clear and useful. You can contact me if you find an error.
      </p>
    </StaticContentPage>
  );
}
