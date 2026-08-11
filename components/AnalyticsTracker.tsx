'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function isTrackedPath(pathname: string) {
  return !pathname.startsWith('/admin') && !pathname.startsWith('/login') && !pathname.startsWith('/api');
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isTrackedPath(pathname)) return;

    const controller = new AbortController();
    const articleMatch = pathname.match(/^\/blog\/([^/]+)$/);

    void fetch('/api/analytics/visit', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        articleSlug: articleMatch?.[1],
      }),
      keepalive: true,
      signal: controller.signal,
    }).catch(() => {
      // Analytics must never interrupt the public site.
    });

    return () => controller.abort();
  }, [pathname]);

  return null;
}
