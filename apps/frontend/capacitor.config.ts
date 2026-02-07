import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.plumi.app',
  appName: 'Plumi',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
    // Development: point to local Vite server
    // Production: use built assets
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000, // 2s duration: enough for children (6-7 years) to recognize the app without impatience
      launchAutoHide: true,
      backgroundColor: '#F0F7FF', // sky-50 from Plumi palette
      androidSplashResourceName: 'splash',
      iosSplashResourceName: 'Default',
      showSpinner: false,
    },
  },
};

export default config;
