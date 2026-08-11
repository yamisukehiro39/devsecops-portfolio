import type { Metadata } from 'next';
import { StaticContentPage } from '../../components/StaticContentPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for the Othman El-Mansour portfolio and technical blog.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <StaticContentPage
      eyebrow="LEGAL / PRIVACY"
      title="Privacy Policy."
      intro="This page explains what data this website may use and how it is handled."
    >
      <p><strong>Last updated:</strong> 11 August 2026</p>

      <h2>Information you provide</h2>
      <p>If you contact me by email, LinkedIn or GitHub, those services handle the information you send. Please do not send passwords, payment details or other private data.</p>

      <h2>Browser storage</h2>
      <p>The private admin area may save temporary session information in the browser. Regular visitors do not use these admin tools.</p>

      <h2>Visitor analytics</h2>
      <p>This site records a visitor&apos;s IP address, browser information, visit time and page views. This helps the site owner understand traffic and article views. This information is only available in the private admin panel.</p>

      <h2>Advertising and Google AdSense</h2>
      <p>If ads are enabled, Google and its partners may use cookies to show and measure ads. This depends on your location, consent choices and Google settings.</p>

      <h2>Cookies and consent</h2>
      <p>When the law requires it, the site will ask for permission before using advertising or optional tracking cookies. You can change your choices through the available consent settings.</p>

      <h2>Third-party services</h2>
      <p>This site links to services such as GitHub and LinkedIn. They have their own privacy policies, and this site does not control how they use data.</p>

      <h2>Contact</h2>
      <p>For questions about this policy, email <a href="mailto:elmansourothman7@gmail.com">elmansourothman7@gmail.com</a>.</p>
    </StaticContentPage>
  );
}
