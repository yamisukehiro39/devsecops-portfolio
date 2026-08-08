import type { ReactNode } from 'react';
import { SiteFooter, SiteHeader } from './PortfolioClient';

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function StaticContentPage({ eyebrow, title, intro, children }: Props) {
  return (
    <div className="portfolio-shell legal-shell">
      <SiteHeader isBlog />
      <main className="site-content">
        <article className="section-wrap legal-page">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="legal-lead">{intro}</p>
          <div className="legal-content">{children}</div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
