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
      eyebrow="CONTACT"
      title="Contact me."
      intro="You can contact me for a job, a project or a technical question."
    >
      <h2>Email</h2>
      <p><a href="mailto:elmansourothman7@gmail.com">elmansourothman7@gmail.com</a></p>

      <h2>Online profiles</h2>
      <p>
        <a href="https://linkedin.com/in/el-mansour-othman" target="_blank" rel="noreferrer">LinkedIn</a>
        {' · '}
        <a href="https://github.com/yamisukehiro39" target="_blank" rel="noreferrer">GitHub</a>
      </p>

      <h2>Messages</h2>
      <p>
        I will reply as soon as I can. Please do not send passwords, private keys or other sensitive information.
      </p>
    </StaticContentPage>
  );
}
