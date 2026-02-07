import { Capacitor } from '@capacitor/core';

/**
 * Configuration API pour web, iOS et Android
 *
 * Dev web : proxy Vite vers localhost:3011
 * Dev mobile : connexion directe au backend local
 * Production web : proxy Nginx /api
 * Production mobile : HTTPS vers le backend de production
 */
const isNative = Capacitor.isNativePlatform();

export const API_BASE_URL = import.meta.env.DEV
  ? isNative
    ? 'http://10.0.2.2:3011' // Android emulator localhost alias
    : '/api' // Web proxy
  : import.meta.env.VITE_API_URL || '/api';

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;
