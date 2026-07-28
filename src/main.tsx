import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/theme/globals.css';
import '@/theme/xp-aero.css';
import '@/theme/apps.css';
import '@/theme/responsive.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
