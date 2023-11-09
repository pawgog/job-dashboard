import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './pages/NavBar/NavBar.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavBar />
    <Dashboard />
  </React.StrictMode>
);
