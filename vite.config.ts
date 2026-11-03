import {defineConfig} from 'vite';

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 4174,
    strictPort: true,
    watch: {
      // Native Windows file watching can fail with EBUSY while PNGs are copied.
      usePolling: true,
      interval: 500,
      ignored: ['**/.pnpm-store/**', '**/dist/**', '**/*.log'],
    },
  },
});
