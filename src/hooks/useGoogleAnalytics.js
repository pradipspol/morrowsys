import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useGoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('pageview', {
        page_path: location.pathname + location.hash,
        page_title: document.title,
      });
    }
  }, [location]);
}
