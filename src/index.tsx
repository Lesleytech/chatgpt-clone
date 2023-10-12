import './index.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { createStandaloneToast } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '~/App';
import { AppProviders } from '~/providers';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.Fragment>
    <AppProviders>
      <App />
    </AppProviders>
  </React.Fragment>,
);

serviceWorkerRegistration.register({
  onUpdate: handleSwUpdate,
});

function handleSwUpdate(reg: ServiceWorkerRegistration) {
  const sw = reg.waiting;

  if (sw) {
    const { toast } = createStandaloneToast();

    sw.addEventListener('statechange', (e) => {
      if ((e.target as ServiceWorker).state === 'activated') {
        window.location.reload();
      }
    });

    sw.postMessage({ type: 'SKIP_WAITING' });

    toast({ title: 'Update found! Reloading...', status: 'info' });
  }
}
