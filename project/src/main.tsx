import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/browserrouter';
import QueryClientProvider from './components/QueryClientProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);