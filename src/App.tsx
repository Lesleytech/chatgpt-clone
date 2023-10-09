import { Center, Spinner } from '@chakra-ui/react';
import { Suspense } from 'react';

import MainLayout from './layouts/Main';
import { AppProviders } from './providers';

const App = () => {
  return (
    <AppProviders>
      <Suspense
        fallback={
          <Center position="fixed" top="0" bottom="0" w="100vw">
            <Spinner />
          </Center>
        }>
        <MainLayout />
      </Suspense>
    </AppProviders>
  );
};

export default App;
