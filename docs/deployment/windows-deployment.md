# Déploiement Windows — Guide complet

Plumi peut être déployé sur Windows de 3 manières différentes.

---

## Comparaison rapide

| Solution | Temps setup | Taille | Complexité | Distribution | Recommandé pour |
|----------|-------------|--------|------------|--------------|-----------------|
| **PWA** | 0 min | ~5 MB | ⭐ Facile | Site web | **Démarrage rapide** |
| **Electron** | 1-2h | ~120 MB | ⭐⭐ Moyen | .exe / Microsoft Store | **App "native" complète** |
| **Tauri** | 2-4h | ~8 MB | ⭐⭐⭐ Difficile | .exe / Microsoft Store | **Performance optimale** |

---

## Option 1 : PWA (Progressive Web App) ✅ **DÉJÀ FONCTIONNEL**

### Installation utilisateur

1. Visiter `https://plumi.yourdomain.com` dans **Edge** ou **Chrome**
2. Cliquer sur l'icône **"Installer"** dans la barre d'adresse (ou Menu > Installer Plumi)
3. L'app s'installe comme une application Windows

**Résultat** :
- ✅ Icône dans le menu démarrer
- ✅ Lance dans sa propre fenêtre (sans barre d'adresse)
- ✅ Fonctionne offline (Service Worker)
- ✅ Auto-updates automatiques (pas de téléchargement manuel)

### Avantages

- **Zéro configuration** : Fonctionne aujourd'hui sans rien changer
- **Léger** : ~5 MB (seulement les assets)
- **Auto-update gratuit** : Le navigateur met à jour automatiquement
- **Multiplateforme** : Fonctionne aussi sur macOS, Linux, iOS, Android

### Inconvénients

- Nécessite un navigateur en arrière-plan (Edge/Chrome)
- Accès limité aux API système (pas de fichiers, notifications limitées)
- Moins "natif" visuellement

### Quand choisir PWA

✅ **Vous voulez** : Solution rapide, pas de build Windows séparé, updates automatiques
❌ **Vous voulez** : Accès complet au système, app 100% standalone

---

## Option 2 : Electron via Capacitor ⚡ **RECOMMANDÉ**

### Setup rapide

```bash
cd apps/frontend

# Installer le plugin
pnpm add @capacitor-community/electron

# Initialiser
npx cap add @capacitor-community/electron

# Build et test
pnpm build
pnpm cap sync @capacitor-community/electron
pnpm cap open @capacitor-community/electron
```

**Temps** : ~1-2 heures (setup + build + test)

### Build de production

```bash
cd apps/frontend/electron

# Installer electron-builder
npm install electron-builder --save-dev

# Build l'installeur Windows
npm run electron:build-windows
```

**Sortie** : `Plumi-Setup-1.0.0.exe` (~120 MB)

### Avantages

- **App standalone** : Pas de navigateur visible, vraie fenêtre native
- **API système complètes** : Notifications natives, raccourcis clavier, menu système
- **Icône menu démarrer** : Comme une vraie app Windows
- **Distribution facile** : `.exe` téléchargeable ou Microsoft Store
- **Écosystème mature** : Beaucoup de documentation, plugins, exemples

### Inconvénients

- **Taille** : ~120 MB (Chromium embarqué)
- **Mémoire** : ~200-300 MB RAM
- **Updates manuels** : L'utilisateur doit télécharger un nouveau `.exe` (sauf si auto-update configuré)

### Quand choisir Electron

✅ **Vous voulez** : App vraiment standalone, accès système complet, distribution .exe
✅ **Votre public** : Parents qui préfèrent installer une "vraie app"
❌ **Vous voulez** : App ultra-légère, mémoire minimale

**Guide complet** : [windows-electron.md](./windows-electron.md)

---

## Option 3 : Tauri 🚀 **PERFORMANCE MAXIMALE**

### Concept

Tauri est une alternative moderne à Electron, écrite en **Rust** :
- Utilise le **WebView2** de Windows (déjà installé sur Windows 10/11)
- Pas de Chromium embarqué → **taille ~8 MB** (vs 120 MB pour Electron)
- **Mémoire ~80 MB** (vs 250 MB pour Electron)

### Setup (plus complexe)

```bash
# Prérequis : Installer Rust
https://rustup.rs/

# Installer Tauri CLI
cargo install tauri-cli

# Créer la structure Tauri
cd apps/frontend
pnpm add -D @tauri-apps/cli
pnpm add @tauri-apps/api

# Initialiser
pnpm tauri init

# Build
pnpm tauri build
```

**Temps** : ~2-4 heures (setup Rust + config + build + test)

### Avantages

- **Ultra-léger** : ~8 MB (vs 120 MB Electron)
- **Performant** : Démarrage rapide, faible consommation mémoire
- **Moderne** : Architecture Rust sécurisée
- **Distribution** : Même que Electron (.exe, Microsoft Store)

### Inconvénients

- **Complexité** : Nécessite Rust toolchain, courbe d'apprentissage
- **Écosystème plus jeune** : Moins de plugins et exemples que Electron
- **WebView2** : Nécessite Windows 10+ avec WebView2 installé (automatique sur Win11)

### Quand choisir Tauri

✅ **Vous voulez** : App ultra-légère, performance maximale, bundle minimal
✅ **Vous avez** : Temps pour apprendre Rust/Tauri
❌ **Vous voulez** : Setup rapide, écosystème mature

**Note** : Tauri 2.0 (stable) supporte Capacitor-style APIs, mais l'intégration Capacitor directe n'existe pas encore.

---

## Distribution Windows

### 1. Téléchargement direct (Gratuit)

**Setup** :
- Héberger le `.exe` sur votre site
- Ajouter un bouton "Télécharger pour Windows"

**Avantages** :
- Gratuit, simple
- Contrôle total

**Inconvénients** :
- Avertissement SmartScreen (sans certificat de signature)
- Pas de découvrabilité

### 2. Microsoft Store ($19/an)

**Setup** :
1. Créer un compte **Microsoft Partner Center** ($19/an)
2. Générer un package APPX (Electron) ou MSIX (Tauri)
3. Soumettre pour certification (~1-3 jours)

**Avantages** :
- Découvrabilité (Microsoft Store)
- Auto-updates gérés par Windows
- Pas d'avertissement SmartScreen

**Inconvénients** :
- Coût annuel
- Processus de certification
- Restrictions du Store

### 3. Winget (Gratuit)

Distribution via le gestionnaire de paquets Windows :

```bash
winget install Plumi
```

**Avantages** :
- Gratuit
- Installation CLI
- Auto-updates

**Inconvénients** :
- Processus de soumission GitHub PR
- Moins de découvrabilité que le Store

---

## Signature de code (Optionnel mais recommandé)

### Problème

Sans signature, Windows SmartScreen affiche :
> **"Windows a protégé votre PC — Éditeur inconnu"**

Les utilisateurs peuvent cliquer "Exécuter quand même", mais c'est intimidant.

### Solution : Certificat de signature de code

**Fournisseurs** :
- Sectigo / DigiCert : ~$100-300/an
- SSL.com : ~$150/an

**Types** :
- **OV (Organization Validation)** : Validation de l'organisation (~3-5 jours)
- **EV (Extended Validation)** : Validation étendue, pas d'avertissement SmartScreen immédiatement (~1-2 semaines)

**Setup** :
```bash
# Electron
CSC_LINK=/path/to/cert.pfx CSC_KEY_PASSWORD=xxx npm run electron:build

# Tauri
# Configuré dans tauri.conf.json
```

**Résultat** : Le `.exe` est signé → Pas d'avertissement SmartScreen

---

## Recommandation par cas d'usage

### Cas 1 : Lancement MVP / Test public rapide

**Recommandation** : **PWA**
- Temps de setup : 0 minute (déjà fonctionnel)
- Les utilisateurs installent depuis le navigateur
- Permet de valider le concept avant d'investir dans un build natif

**Prochaine étape** : Si succès, passer à Electron

---

### Cas 2 : Distribution grand public (parents, écoles)

**Recommandation** : **Electron**
- Installeur `.exe` téléchargeable (familier pour les parents)
- Distribution via Microsoft Store pour découvrabilité
- Signature de code pour crédibilité

**Configuration recommandée** :
- Electron avec electron-builder
- Certificat de signature de code
- Microsoft Store + téléchargement direct

---

### Cas 3 : Performance critique / Tablettes bas de gamme

**Recommandation** : **Tauri**
- Taille minimale (~8 MB) → téléchargement rapide
- Mémoire minimale (~80 MB) → fonctionne sur vieux PC
- Startup rapide

**Configuration recommandée** :
- Tauri avec bundle MSI ou APPX
- Distribution Microsoft Store

---

### Cas 4 : Toutes les plateformes (Win + Mac + Linux)

**Recommandation** : **Electron**
- Un seul codebase pour Win + Mac + Linux
- Capacitor déjà configuré pour iOS/Android
- Écosystème mature pour le multiplateforme

**Alternative** : Tauri (supporte aussi Win + Mac + Linux)

---

## Coûts récapitulatifs

| Composant | Coût | Fréquence | Optionnel ? |
|-----------|------|-----------|-------------|
| **PWA** | Gratuit | - | - |
| **Electron/Tauri build** | Gratuit | - | - |
| **Certificat de signature** | $100-300 | Annuel | ✅ Oui (mais recommandé) |
| **Microsoft Store** | $19 | Annuel | ✅ Oui |
| **Hébergement .exe** | Inclus dans site web | - | - |

**Total minimum** : **0€** (PWA ou .exe non signé)
**Total recommandé** : **~150€/an** (certificat + Microsoft Store)

---

## Prochaines étapes

### Étape 1 : Tester PWA (5 minutes)

1. Déployer Plumi sur Coolify (si pas déjà fait)
2. Visiter le site dans Edge
3. Installer comme app
4. Tester : menu démarrer, offline, gameplay

**Si satisfait** → Vous avez terminé ! 🎉
**Si besoin d'app native** → Continuer à l'étape 2

---

### Étape 2 : Setup Electron (1-2 heures)

1. Suivre le guide : [windows-electron.md](./windows-electron.md)
2. Build local : tester sur votre PC Windows
3. Build production : générer `Plumi-Setup.exe`
4. Tester l'installation sur une VM Windows propre

**Si satisfait** → Distribuer le .exe
**Si besoin de taille réduite** → Considérer Tauri (étape 3)

---

### Étape 3 : Optimisation Tauri (2-4 heures)

1. Installer Rust : https://rustup.rs/
2. Suivre le guide Tauri officiel : https://tauri.app/v1/guides/getting-started/setup/
3. Migrer la config Capacitor vers Tauri
4. Build et comparer la taille

**Si satisfait** → Distribuer la version Tauri

---

## Support et troubleshooting

**Questions fréquentes** :

1. **"Dois-je vraiment signer le code ?"**
   - Court terme : Non (les utilisateurs peuvent bypasser l'avertissement)
   - Long terme : Oui (crédibilité professionnelle)

2. **"PWA vs Electron : lequel choisir ?"**
   - **PWA** si : Setup rapide, pas besoin d'API système
   - **Electron** si : Vraie app native, distribution .exe

3. **"Electron vs Tauri : lequel choisir ?"**
   - **Electron** si : Écosystème mature, documentation abondante
   - **Tauri** si : Taille/performance critiques, vous connaissez Rust

4. **"Puis-je avoir PWA ET Electron ?"**
   - Oui ! La même app Vue fonctionne des deux côtés
   - PWA pour utilisateurs web, Electron pour ceux qui veulent télécharger

---

## Ressources

- **PWA** : Déjà fonctionnel (aucune doc supplémentaire nécessaire)
- **Electron** : [windows-electron.md](./windows-electron.md)
- **Tauri** : https://tauri.app/v1/guides/
- **Microsoft Store** : https://partner.microsoft.com/
- **Certificats de code** : https://www.ssl.com/code-signing/

---

**Dernière mise à jour** : 2026-02-13
