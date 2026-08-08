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
      intro="This page explains what information this website may process and how advertising or analytics services may use cookies and similar technologies."
    >
      <p><strong>Last updated:</strong> 8 August 2026</p>

      <h2>Information you provide</h2>
      <p>If you contact me by email or through an external professional profile, the information you choose to send is handled through that service. Do not send passwords, secrets, payment information or other unnecessary sensitive data.</p>

      <h2>Local browser storage</h2>
      <p>Administrative features of this portfolio may use browser storage for temporary session state and local editorial data. These administrative tools are not intended for general visitors.</p>

      <h2>Advertising and Google AdSense</h2>
      <p>If advertising is enabled on this website, Google and its partners may use cookies, web beacons or similar technologies to serve, measure and personalize advertising where permitted. Advertising behavior can vary according to your region, consent choices and Google settings.</p>

      <h2>Cookies and consent</h2>
      <p>Where required by applicable law, an appropriate consent mechanism should be presented before advertising or other non-essential tracking technologies are used. Consent choices may be managed through Google&apos;s privacy and messaging tools or another compatible consent platform.</p>

      <h2>Third-party services</h2>
      <p>This site may link to external services such as GitHub and LinkedIn. Those services have their own privacy practices. External links do not mean that this site controls how those services collect or process information.</p>

      <h2>Contact</h2>
      <p>For questions about this policy, email <a href="mailto:elmansourothman7@gmail.com">elmansourothman7@gmail.com</a>.</p>
    </StaticContentPage>
  );
}
