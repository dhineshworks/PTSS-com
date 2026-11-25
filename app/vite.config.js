import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login/index.html'),
        beginEnrollment: resolve(__dirname, 'Begin-Enrollment.html'),
        forgotPassword: resolve(__dirname, 'forgot-password/index.html'),
        infoAbout: resolve(__dirname, 'info/about/index.html'),
        game: resolve(__dirname, 'game/index.html'),
      },
    },
  },
});
