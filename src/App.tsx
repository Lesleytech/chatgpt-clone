import { Center, Spinner } from '@chakra-ui/react';
import { lazy, Suspense, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { idbService } from '~/services/idb.service';
import { socketService } from '~/services/socket.service';
import { chatActions } from '~/store/chat';
import { mediaQueries } from '~/theme/breakpoints';
import { useMediaQuery } from '~/utils/hooks/useMediaQuery';

const DesktopLayout = lazy(() => import('~/layouts/Main/Desktop'));
const MobileLayout = lazy(() => import('~/layouts/Main/Mobile'));

const MobileChatsPage = lazy(() => import('~/modules/Main/pages/MobileChatsPage'));
const MobileMessagesPage = lazy(() => import('~/modules/Main/pages/MobileMessagesPage'));

const App = () => {
  const isMobile = useMediaQuery(mediaQueries.MOBILE);

  const dispatch = useDispatch();

  const getInitialRooms = useCallback(async () => {
    const rooms = await idbService.getRooms();

    if (rooms) {
      dispatch(chatActions.setInitialRooms(rooms));
    }
  }, [dispatch]);

  useEffect(() => {
    getInitialRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socketService.socket.on('message-token', (d) => {
      dispatch(chatActions.streamTokens(d));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Suspense
        fallback={
          <Center position="fixed" top="0" bottom="0" w="100vw">
            <Spinner />
          </Center>
        }>
        {isMobile ? (
          <BrowserRouter>
            <Routes>
              <Route element={<MobileLayout />} path="/">
                <Route index element={<MobileChatsPage />} />
                <Route path="messages" element={<MobileMessagesPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        ) : (
          <DesktopLayout />
        )}
      </Suspense>
    </>
  );
};

export default App;
