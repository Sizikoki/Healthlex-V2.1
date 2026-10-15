import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackMetaPageView } from '@/services/metaPixel';

/**
 * Sends a Meta Pixel PageView on SPA route changes (pathname + search).
 * trackMetaPageView is a no-op without marketing consent / loaded pixel and
 * ignores repeated URLs, so the initial load is never counted twice.
 */
export const MetaPixelRouteTracker = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackMetaPageView(`${pathname}${search}`);
  }, [pathname, search]);

  return null;
};

export default MetaPixelRouteTracker;
