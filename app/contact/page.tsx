import type { Metadata } from 'next';
import { StaticContentPage } from '../../components/StaticContentPage';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Othman El-Mansour about DevSecOps, cybersecurity, cloud security, networking, technical writing or professional opportunities.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <StaticContentPage
      eyebrow="CONTACT / OPEN CHANNEL"
      title="Get in touch."
      intro="For technical questions, collaboration, corrections, or professional opportunities, use one of the channels below."
    >
      <h2>Email</h2>
      <p><a href="mailto:elmansourothman7@gmail.com">elmansourothman7@gmail.com</a></p>

      <h2>Professional profiles</h2>
      <p>
        <a href="https://linkedin.com/in/el-mansour-othman" target="_blank" rel="noreferrer">LinkedIn</a>
        {' · '}
        <a href="https://github.com/yamisukehiro39" target="_blank" rel="noreferrer">GitHub</a>
      </p>

      <h2>About replies</h2>
      <p>
        I read messages related to the portfolio, technical articles, infrastructure security and professional collaboration. Please avoid sending credentials, private keys, passwords or other sensitive information.
      </p>
    </StaticContentPage>
  );
}
