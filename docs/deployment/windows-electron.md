# Build Windows Desktop avec Capacitor + Electron

## Installation

```bash
cd apps/frontend

# Installer le plugin Electron
pnpm add @capacitor-community/electron

# Initialiser la plateforme Electron
npx cap add @capacitor-community/electron
```

## Configuration

Modifier `capacitor.config.ts` :

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.plumi.app',
  appName: 'Plumi',
  webDir: 'dist',

  // Ajouter la config Electron
  electron: {
    backgroundColor: '#F0F7FF', // sky-50
    // Taille de fenêtre par défaut
    browserWindowOptions: {
      width: 1280,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      // Cacher la barre de menu sur Windows
      autoHideMenuBar: true,
    },
  },
};

export default config;
```

## Build pour Windows

### Développement (test local)

```bash
cd apps/frontend

# Build web assets
pnpm build

# Sync vers Electron
pnpm cap sync @capacitor-community/electron

# Lancer l'app Electron
pnpm cap open @capacitor-community/electron
```

### Build de production

```bash
cd apps/frontend/electron

# Installer electron-builder
npm install electron-builder --save-dev

# Build Windows (génère .exe)
npm run electron:build-windows
```

**Sortie** : `apps/frontend/electron/dist/Plumi-Setup-1.0.0.exe` (~100-150 MB)

## Distribution

### Option 1 : Téléchargement direct
- Héberger le `.exe` sur votre site web
- Les utilisateurs téléchargent et installent

### Option 2 : Microsoft Store
- Créer un compte Microsoft Partner ($19/an)
- Soumettre l'app au Microsoft Store
- Distribution via le store officiel

## Signature de code (Optionnel mais recommandé)

Pour éviter les avertissements "Éditeur inconnu" sur Windows :

1. Acheter un certificat de signature de code (~$100-300/an)
2. Configurer electron-builder avec le certificat
3. Signer l'exe lors du build

Sans signature : Windows SmartScreen affichera un avertissement (mais l'utilisateur peut quand même installer).

## Scripts à ajouter dans package.json

```json
{
  "scripts": {
    "cap:add:electron": "cap add @capacitor-community/electron",
    "cap:open:electron": "cap open @capacitor-community/electron",
    "cap:sync:electron": "cap sync @capacitor-community/electron",
    "build:electron": "vite build && cap sync @capacitor-community/electron"
  }
}
```

## Taille estimée

- **App installée** : ~120-180 MB (inclut Chromium embarqué)
- **Installeur** : ~100-150 MB

## Avantages vs PWA

✅ **App standalone** : Pas de navigateur visible
✅ **Icône dans le menu démarrer** : Comme une vraie app native
✅ **Auto-updates** : Via electron-updater
✅ **Intégration système** : Notifications natives, raccourcis clavier globaux
✅ **Offline par défaut** : Tout est embarqué

## Inconvénients

❌ **Taille** : ~150 MB (vs 5-10 MB pour une app native)
❌ **Mémoire** : ~200-300 MB RAM (Chromium embarqué)
❌ **Updates** : Utilisateurs doivent télécharger un nouveau .exe (ou configurer auto-update)

---

## Configuration complète pour production

### 1. Installer electron-builder

```bash
cd apps/frontend/electron
npm install electron-builder --save-dev
```

### 2. Configurer electron-builder

Créer `apps/frontend/electron/builder.config.json` :

```json
{
  "appId": "com.plumi.app",
  "productName": "Plumi",
  "copyright": "Copyright © 2026 Plumi",
  "directories": {
    "output": "dist",
    "buildResources": "resources"
  },
  "files": [
    "app/**/*",
    "node_modules/**/*",
    "package.json"
  ],
  "extraMetadata": {
    "main": "app/index.js"
  },
  "win": {
    "target": [
      {
        "target": "nsis",
        "arch": ["x64"]
      },
      {
        "target": "portable",
        "arch": ["x64"]
      }
    ],
    "icon": "resources/icon.ico",
    "publisherName": "Plumi",
    "verifyUpdateCodeSignature": false
  },
  "nsis": {
    "oneClick": false,
    "perMachine": false,
    "allowToChangeInstallationDirectory": true,
    "deleteAppDataOnUninstall": false,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true,
    "shortcutName": "Plumi",
    "installerIcon": "resources/icon.ico",
    "uninstallerIcon": "resources/icon.ico",
    "installerHeader": "resources/installerHeader.bmp",
    "installerHeaderIcon": "resources/icon.ico",
    "license": "../../LICENSE"
  },
  "portable": {
    "artifactName": "Plumi-${version}-portable.exe"
  }
}
```

### 3. Créer les icônes Windows

Les icônes Windows nécessitent le format `.ico` (multi-résolution) :

```bash
cd apps/frontend/electron/resources

# Depuis l'icône PNG source (1024x1024)
# Option 1 : Utiliser ImageMagick
convert ../../resources/icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico

# Option 2 : Utiliser un service en ligne
# https://convertio.co/png-ico/
# Uploader icon.png → Télécharger icon.ico
```

**Tailles requises dans icon.ico** :
- 256×256 (Windows 10/11)
- 128×128
- 64×64
- 48×48 (Vue liste)
- 32×32 (Barre des tâches)
- 16×16 (Petite icône)

### 4. Créer le header d'installeur (optionnel)

Pour un installeur plus professionnel :

```bash
# Créer installerHeader.bmp (150x57 pixels)
# Fond : #F0F7FF (sky-50)
# Logo Plumi centré

convert -size 150x57 xc:"#F0F7FF" \
  ../../resources/icon.png -resize 40x40 \
  -gravity center -composite \
  installerHeader.bmp
```

### 5. Ajouter les scripts de build

Modifier `apps/frontend/electron/package.json` :

```json
{
  "name": "plumi-electron",
  "version": "1.0.0",
  "main": "app/index.js",
  "scripts": {
    "electron:start": "electron .",
    "electron:build": "electron-builder",
    "electron:build-windows": "electron-builder --win --x64",
    "electron:build-portable": "electron-builder --win portable",
    "electron:build-all": "electron-builder --win --mac --linux"
  },
  "devDependencies": {
    "electron": "^28.0.0",
    "electron-builder": "^24.9.1"
  }
}
```

### 6. Build de production

```bash
cd apps/frontend

# 1. Build du frontend Vue
pnpm build

# 2. Sync vers Electron
pnpm cap sync @capacitor-community/electron

# 3. Build l'installeur Windows
cd electron
npm run electron:build-windows
```

**Sortie** :
- `electron/dist/Plumi-Setup-1.0.0.exe` — Installeur NSIS (~120 MB)
- `electron/dist/Plumi-1.0.0-portable.exe` — Version portable (~120 MB)

---

## Auto-updates (Optionnel)

Pour permettre les mises à jour automatiques :

### 1. Installer electron-updater

```bash
cd apps/frontend/electron
npm install electron-updater --save
```

### 2. Configurer les updates dans l'app Electron

Modifier `apps/frontend/electron/app/index.js` :

```javascript
const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

// Configurer le serveur de updates
autoUpdater.setFeedURL({
  provider: 'generic',
  url: 'https://plumi.yourdomain.com/updates/windows'
});

// Vérifier les updates au démarrage
app.on('ready', () => {
  createWindow();

  // Vérifier les updates (silencieux)
  autoUpdater.checkForUpdatesAndNotify();
});

// Events auto-update (optionnel - pour debug)
autoUpdater.on('update-available', () => {
  console.log('Update available');
});

autoUpdater.on('update-downloaded', () => {
  console.log('Update downloaded - will install on restart');
});
```

### 3. Publier les updates

Après chaque build, uploader sur le serveur :

```bash
# Fichiers à uploader sur https://plumi.yourdomain.com/updates/windows/
# - latest.yml (métadonnées de version)
# - Plumi-Setup-1.0.0.exe (installeur)
```

**Contenu de `latest.yml`** (généré automatiquement) :

```yaml
version: 1.0.0
files:
  - url: Plumi-Setup-1.0.0.exe
    sha512: <hash>
    size: 125829120
path: Plumi-Setup-1.0.0.exe
sha512: <hash>
releaseDate: '2026-02-13T10:00:00.000Z'
```

---

## Signature de code (Recommandé pour production)

Pour éviter l'avertissement "Éditeur inconnu" :

### 1. Obtenir un certificat de signature

**Options** :
- **Sectigo / DigiCert** : ~$100-300/an (certificat OV - Organization Validation)
- **SSL.com** : ~$150/an
- **Let's Encrypt** : Ne fournit PAS de certificats de signature de code

### 2. Configurer electron-builder

Créer `apps/frontend/electron/signing.env` :

```bash
# Ne JAMAIS committer ce fichier !
CSC_LINK=/path/to/certificate.pfx
CSC_KEY_PASSWORD=your_certificate_password
```

Modifier `builder.config.json` :

```json
{
  "win": {
    "certificateFile": "${CSC_LINK}",
    "certificatePassword": "${CSC_KEY_PASSWORD}",
    "signingHashAlgorithms": ["sha256"],
    "signDlls": true
  }
}
```

### 3. Build signé

```bash
# Charger les variables d'environnement
source signing.env

# Build avec signature
npm run electron:build-windows
```

**Résultat** : Le `.exe` sera signé numériquement et Windows ne montrera plus d'avertissement.

---

## Fonctionnalités Windows spécifiques

### 1. Notifications natives

```javascript
// Dans l'app Electron
const { Notification } = require('electron');

function showNotification(title, body) {
  new Notification({
    title,
    body,
    icon: 'path/to/icon.png'
  }).show();
}

// Appeler depuis le frontend Vue
window.electronAPI.showNotification('Bravo !', 'Chapitre terminé !');
```

### 2. Raccourcis clavier globaux

```javascript
const { globalShortcut } = require('electron');

app.on('ready', () => {
  // Ctrl+Shift+P : Ouvrir Plumi
  globalShortcut.register('CommandOrControl+Shift+P', () => {
    mainWindow.show();
    mainWindow.focus();
  });
});
```

### 3. Menu système

```javascript
const { Menu, Tray } = require('electron');

let tray = null;

app.on('ready', () => {
  tray = new Tray('path/to/icon.ico');

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Ouvrir Plumi', click: () => mainWindow.show() },
    { label: 'Quitter', click: () => app.quit() }
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip('Plumi - Apprendre le Français CE1');
});
```

### 4. Intégration taskbar (Windows 7+)

```javascript
// Afficher la progression dans la barre des tâches
mainWindow.setProgressBar(0.5); // 50% de progression

// Overlay d'icône (badge)
mainWindow.setOverlayIcon('path/to/badge.png', 'Nouveau badge !');
```

---

## Optimisations de bundle

### 1. Réduire la taille de l'app

Par défaut, Electron embarque **tout Chromium** (~120 MB). Pour réduire :

**Option A : Exclure les locales non utilisées**

Modifier `builder.config.json` :

```json
{
  "win": {
    "extraResources": [
      {
        "from": "node_modules/electron/dist/locales",
        "to": "locales",
        "filter": ["fr.pak", "en-US.pak"]
      }
    ]
  }
}
```

**Option B : Utiliser asar pour compresser**

```json
{
  "asar": true,
  "asarUnpack": [
    "**/*.node"
  ]
}
```

**Gain estimé** : 10-20 MB

### 2. Lazy loading des modules Electron

```javascript
// Au lieu de :
const { dialog } = require('electron');

// Utiliser lazy require :
function showDialog() {
  const { dialog } = require('electron');
  dialog.showOpenDialog();
}
```

---

## Tests et débogage

### 1. Tester localement

```bash
cd apps/frontend
pnpm build
pnpm cap sync @capacitor-community/electron
cd electron
npm run electron:start
```

### 2. Déboguer avec DevTools

L'app Electron a Chrome DevTools intégré :
- **Ouvrir DevTools** : Ctrl+Shift+I (ou F12)
- **Recharger** : Ctrl+R
- **Console** : Voir les erreurs JavaScript

### 3. Logs de l'app

Les logs Electron sont dans :
- **Windows** : `%APPDATA%\Plumi\logs\main.log`
- **Console** : `npm run electron:start` affiche les logs en temps réel

### 4. Tester l'installeur

```bash
cd apps/frontend/electron

# Build l'installeur
npm run electron:build-windows

# Installer sur une VM Windows propre
# Vérifier : installation, désinstallation, raccourcis, icônes
```

---

## Distribution

### Option 1 : Téléchargement direct depuis le site web

**Setup** :
1. Héberger `Plumi-Setup-1.0.0.exe` sur votre site
2. Ajouter un bouton "Télécharger pour Windows"
3. Les utilisateurs téléchargent et installent

**Avantages** :
- Simple et rapide
- Contrôle total sur les updates

**Inconvénients** :
- Avertissement SmartScreen (sans signature de code)
- Pas de découvrabilité (pas dans un store)

### Option 2 : Microsoft Store

**Setup** :
1. Créer un compte **Microsoft Partner Center** ($19/an)
2. Créer une **App Windows** dans le Partner Center
3. Générer un package APPX :

```bash
# Modifier builder.config.json
{
  "win": {
    "target": ["appx"]
  },
  "appx": {
    "applicationId": "Plumi",
    "backgroundColor": "#F0F7FF",
    "displayName": "Plumi",
    "identityName": "YourPublisher.Plumi",
    "publisher": "CN=YourPublisher",
    "publisherDisplayName": "Votre Nom"
  }
}

# Build APPX
npm run electron:build-windows
```

4. Uploader le `.appx` sur le Partner Center
5. Soumettre pour certification (~1-3 jours)

**Avantages** :
- Découvrabilité (Microsoft Store)
- Auto-updates gérés par Windows
- Pas d'avertissement SmartScreen

**Inconvénients** :
- Coût annuel ($19/an)
- Processus de certification
- Restrictions du Store (sandboxing)

### Option 3 : Winget (Windows Package Manager)

Distribution via le gestionnaire de paquets officiel de Windows :

```bash
# Créer un manifest winget
wingetcreate new https://plumi.yourdomain.com/Plumi-Setup-1.0.0.exe

# Soumettre au repo winget (GitHub PR)
# https://github.com/microsoft/winget-pkgs
```

**Utilisateurs installent via** :
```bash
winget install Plumi
```

**Avantages** :
- Gratuit
- Installation en ligne de commande
- Auto-updates via winget

---

## Troubleshooting

### Problème : L'app ne démarre pas

**Causes possibles** :
1. **Antivirus bloque l'app** → Ajouter une exception
2. **Fichiers corrompus** → Réinstaller
3. **Chromium manquant** → Vérifier que `electron` est dans `dependencies` (pas `devDependencies`)

**Solution** :
```bash
# Vérifier les logs
%APPDATA%\Plumi\logs\main.log
```

### Problème : L'installeur montre "Éditeur inconnu"

**Cause** : L'app n'est pas signée numériquement

**Solutions** :
1. **Court terme** : Les utilisateurs cliquent "Installer quand même"
2. **Long terme** : Acheter un certificat de signature de code

### Problème : L'app est trop lente

**Causes possibles** :
1. **DevTools ouverts en prod** → Désactiver DevTools en production
2. **Bundle trop gros** → Lazy load des modules
3. **Trop de calculs dans le main process** → Déplacer vers le renderer process

**Solution** :
```javascript
// Désactiver DevTools en production
if (!app.isPackaged) {
  mainWindow.webContents.openDevTools();
}
```

### Problème : Les updates ne fonctionnent pas

**Vérifier** :
1. Le serveur HTTPS est accessible
2. Le fichier `latest.yml` est correct
3. La version dans `package.json` est incrémentée

**Debug** :
```javascript
autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';
```

---

## Versioning et releases

### 1. Incrémenter la version

Modifier `apps/frontend/electron/package.json` :

```json
{
  "version": "1.0.0"  // → "1.1.0" pour une nouvelle feature
}
```

Modifier `apps/frontend/package.json` (garder en sync) :

```json
{
  "version": "1.1.0"
}
```

### 2. Build la nouvelle version

```bash
pnpm build
pnpm cap sync @capacitor-community/electron
cd electron
npm run electron:build-windows
```

### 3. Publier

- **Téléchargement direct** : Uploader `Plumi-Setup-1.1.0.exe` sur le site
- **Auto-update** : Uploader `latest.yml` + `.exe` sur le serveur de updates
- **Microsoft Store** : Soumettre le nouveau `.appx`

### 4. Tag Git

```bash
git tag -a v1.1.0-windows -m "Windows desktop app v1.1.0"
git push --tags
```

---

## Comparaison : Electron vs PWA vs Tauri

| Critère | PWA | Electron | Tauri |
|---------|-----|----------|-------|
| **Taille** | ~5 MB | ~120 MB | ~8 MB |
| **Mémoire** | ~100 MB | ~250 MB | ~80 MB |
| **Startup** | Rapide | Moyen | Rapide |
| **Offline** | ✅ | ✅ | ✅ |
| **Auto-update** | ✅ (automatique) | ✅ (manuel) | ✅ (manuel) |
| **Icône menu démarrer** | ✅ | ✅ | ✅ |
| **API système** | ❌ Limitées | ✅ Complètes | ✅ Complètes |
| **Complexité setup** | Aucune | Moyenne | Élevée |
| **Temps de build** | 0 min | 5-10 min | 10-15 min |

**Recommandation Plumi** :
- **Court terme** : PWA (déjà fonctionnel)
- **Moyen terme** : Electron (si besoin d'API système)
- **Long terme** : Tauri (si taille critique)

---

## Alternative : Tauri (Plus léger)

Si la taille de 120 MB est un problème, voir [windows-tauri.md](./windows-tauri.md) pour une alternative moderne :

- **Taille** : ~5-10 MB (utilise WebView2 de Windows, pas Chromium embarqué)
- **Mémoire** : ~50-100 MB RAM
- **Performance** : Meilleure que Electron
- **Complexité** : Nécessite Rust toolchain

**Trade-off** : Setup plus complexe, écosystème moins mature.
