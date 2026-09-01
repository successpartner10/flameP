import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Handle PWA Service Worker
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(
        (reg) => console.log('[PWA] Service Worker registered:', reg.scope),
        (err) => console.log('[PWA] Service Worker registration failed:', err)
      );
    });
  } else {
    // In development: unregister all SWs AND wipe every cache so hot-reload is never blocked
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
        console.log('[PWA Dev] Unregistered cached Service Worker');
      }
    });
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((name) => {
        caches.delete(name);
        console.log('[PWA Dev] Deleted cache:', name);
      });
    });
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

