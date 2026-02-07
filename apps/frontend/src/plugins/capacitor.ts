import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App } from '@capacitor/app';
import { Network } from '@capacitor/network';

/**
 * Initialise les plugins Capacitor pour les plateformes natives
 */
export async function initializeCapacitor(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  // Barre de statut claire (thème Plumi sky-50)
  try {
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: '#F0F7FF' });
  } catch {
    // StatusBar non disponible sur certaines plateformes
  }

  // Masquer le splash screen
  try {
    await SplashScreen.hide();
  } catch {
    // SplashScreen non disponible
  }

  // Monitorer la connexion réseau (mode hors-ligne)
  Network.addListener('networkStatusChange', (status) => {
    console.log('[Capacitor] Réseau:', status.connected ? 'connecté' : 'hors-ligne');
  });

  // Gérer le bouton retour Android
  App.addListener('backButton', ({ canGoBack }) => {
    if (canGoBack) {
      window.history.back();
    } else {
      App.exitApp();
    }
  });
}

/** Vérifie si l'app tourne en mode natif */
export const isNativeApp = (): boolean => Capacitor.isNativePlatform();

/** Retourne la plateforme (ios, android, web) */
export const getPlatform = (): string => Capacitor.getPlatform();
