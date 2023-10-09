import './index.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import App from '~/App';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Suspense>
      <App />
    </Suspense>
  </React.StrictMode>,
);

serviceWorkerRegistration.unregister();
