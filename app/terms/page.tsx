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
      intro="These are the basic rules for using this website and its articles."
    >
      <p><strong>Last updated:</strong> 8 August 2026</p>

      <h2>Educational content</h2>
      <p>The content is for learning and general information. It is not professional security, legal or financial advice.</p>

      <h2>Accuracy</h2>
      <p>I try to keep the content correct, but technology changes. Check commands and settings in the official documentation before using them.</p>

      <h2>Responsible use</h2>
      <p>Test all technical instructions safely. Only use them on systems you own or have permission to manage.</p>

      <h2>Intellectual property</h2>
      <p>Unless stated otherwise, the original text, articles and design belong to Othman El-Mansour. Third-party names and materials belong to their owners.</p>

      <h2>External links</h2>
      <p>This site may link to other websites. Their owners control their content, security and availability.</p>

      <h2>Contact</h2>
      <p>Questions about these terms can be sent to <a href="mailto:elmansourothman7@gmail.com">elmansourothman7@gmail.com</a>.</p>
    </StaticContentPage>
  );
}
