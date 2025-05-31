import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Smart Health Monitoring',
        short_name: 'HealthMonitor',
        description: 'Track and improve your mental well-being',
        theme_color: '#0d9488',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: ({url}) => url.pathname.startsWith('/api/users/profile'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'user-profile-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
            },
          },
          {
            urlPattern: ({url}) => url.pathname.startsWith('/api/dashboard'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'dashboard-data-cache',
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
            },
          },
          {
            urlPattern: ({url}) => url.pathname.startsWith('/api/notifications'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'notifications-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 12, // 12 hours
              },
            },
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});