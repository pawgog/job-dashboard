import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import NavBar from './pages/NavBar/NavBar.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Dashboard />
    </QueryClientProvider>
  </React.StrictMode>
);
