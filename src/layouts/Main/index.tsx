import { lazy } from 'react';

import { mediaQueries } from '~/theme/breakpoints';
import { useMediaQuery } from '~/utils/hooks/useMediaQuery';

const DesktopLayout = lazy(() => import('./Desktop'));
const MobileLayout = lazy(() => import('./Mobile'));

const MainLayout = () => {
  const isMobile = useMediaQuery(mediaQueries.MOBILE);

  return <>{isMobile ? <MobileLayout /> : <DesktopLayout />}</>;
};

export default MainLayout;
