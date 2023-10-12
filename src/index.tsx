import './index.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

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

serviceWorkerRegistration.unregister();
