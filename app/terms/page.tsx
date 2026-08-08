import type { Metadata } from 'next';
import { StaticContentPage } from '../../components/StaticContentPage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for the Othman El-Mansour portfolio and technical blog.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <StaticContentPage
      eyebrow="LEGAL / TERMS"
      title="Terms of Use."
      intro="These terms describe the basic conditions for using this portfolio and its technical articles."
    >
      <p><strong>Last updated:</strong> 8 August 2026</p>

      <h2>Educational content</h2>
      <p>The technical content on this website is provided for general educational and informational purposes. It is not a substitute for professional security, legal, financial or operational advice.</p>

      <h2>Accuracy</h2>
      <p>I aim to keep articles accurate and useful, but software, cloud services and security practices change. Always verify commands, versions and configuration choices against the documentation for your own environment.</p>

      <h2>Responsible use</h2>
      <p>Readers are responsible for testing technical guidance safely and only on systems they own or are authorized to administer.</p>

      <h2>Intellectual property</h2>
      <p>Unless otherwise stated, original articles, text and site design content are owned by Othman El-Mansour. Product names, trademarks and third-party materials remain the property of their respective owners.</p>

      <h2>External links</h2>
      <p>Links to third-party websites are provided for convenience. Their availability, security and content are controlled by their respective operators.</p>

      <h2>Contact</h2>
      <p>Questions about these terms can be sent to <a href="mailto:elmansourothman7@gmail.com">elmansourothman7@gmail.com</a>.</p>
    </StaticContentPage>
  );
}
