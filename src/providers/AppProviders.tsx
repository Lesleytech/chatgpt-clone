import { ChakraProvider } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as StoreProvider } from 'react-redux';

import { theme } from '~/theme';

import store from '../store';

const queryClient = new QueryClient();

const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={store}>
        <ChakraProvider toastOptions={{ defaultOptions: { position: 'top' } }} theme={theme}>
          {children}
        </ChakraProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
};

export { AppProviders };
