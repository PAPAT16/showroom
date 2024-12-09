import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    build: {
      outDir: 'build',
      sourcemap: mode === 'production' ? false : true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    define: {
      'process.env.VITE_APP_NAME': JSON.stringify(env.VITE_APP_NAME),
      'process.env.VITE_APP_DESCRIPTION': JSON.stringify(env.VITE_APP_DESCRIPTION),
      'process.env.VITE_BASE_URL': JSON.stringify(env.VITE_BASE_URL),
      'process.env.VITE_API_ENDPOINT': JSON.stringify(env.VITE_API_ENDPOINT),
    },
  };
});
