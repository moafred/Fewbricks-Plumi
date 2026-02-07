# Android — Build & Play Store (Test Interne)

Guide pour builder l'APK/AAB depuis WSL + Windows et distribuer via le canal de test interne Google Play.

## Prérequis

### Windows

- **Android Studio** installé (inclut le SDK Android + Java 17)
- **adb** dans le PATH (installé avec Android Studio, dans `%LOCALAPPDATA%\Android\Sdk\platform-tools`)

### WSL

- **Java** : `sudo apt install default-jdk` (pour `keytool`)
- **Node/pnpm** : déjà en place pour le projet

---

## 1. Générer la clé de signature (une seule fois)

```bash
# Dans WSL
keytool -genkey -v \
  -keystore ~/plumi-release.keystore \
  -alias plumi \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Retenir le mot de passe choisi. Sauvegarder le fichier `plumi-release.keystore` dans un endroit sûr (USB, cloud privé). **Si cette clé est perdue, impossible de mettre à jour l'app sur le Play Store.**

---

## 2. Configurer la signature dans le projet Android

### 2.1 Copier la clé

```bash
cp ~/plumi-release.keystore /mnt/c/Users/<ton-user>/plumi-android/
```

### 2.2 Créer `keystore.properties`

Créer le fichier `/mnt/c/Users/<ton-user>/plumi-android/app/keystore.properties` :

```properties
storeFile=../../plumi-release.keystore
storePassword=MOT_DE_PASSE
keyAlias=plumi
keyPassword=MOT_DE_PASSE
```

**Ne jamais commit ce fichier.**

### 2.3 Configurer `build.gradle`

Dans `plumi-android/app/build.gradle`, ajouter :

```groovy
android {
    signingConfigs {
        release {
            def props = new Properties()
            props.load(new FileInputStream(file("keystore.properties")))
            storeFile file(props['storeFile'])
            storePassword props['storePassword']
            keyAlias props['keyAlias']
            keyPassword props['keyPassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
        }
    }
}
```

---

## 3. Build

### 3.1 APK debug (test rapide)

```bash
# WSL : build frontend + sync Capacitor
cd apps/frontend
pnpm build:mobile
cp -r android /mnt/c/Users/<ton-user>/plumi-android
```

```powershell
# Windows (PowerShell)
cd C:\Users\<ton-user>\plumi-android
.\gradlew.bat assembleDebug
```

APK : `app\build\outputs\apk\debug\app-debug.apk`

### 3.2 AAB release (Play Store)

```bash
# WSL
cd apps/frontend
pnpm build:mobile
cp -r android /mnt/c/Users/<ton-user>/plumi-android
cp ~/plumi-release.keystore /mnt/c/Users/<ton-user>/plumi-android/
```

```powershell
# Windows (PowerShell)
cd C:\Users\<ton-user>\plumi-android
.\gradlew.bat bundleRelease
```

AAB : `app\build\outputs\bundle\release\app-release.aab`

---

## 4. Installer sur un appareil (debug)

### Via USB

```powershell
adb install app\build\outputs\apk\debug\app-debug.apk
```

Prérequis : activer "Debogage USB" dans les parametres developpeur du telephone.

### Sans USB

Copier l'APK sur le telephone (Drive, email, cable USB en mode fichier) et ouvrir pour installer. Activer "Sources inconnues" dans les parametres Android.

---

## 5. Google Play Console — Test Interne

### 5.1 Setup initial (une seule fois)

1. Creer un compte developpeur sur [play.google.com/console](https://play.google.com/console) (25$ une fois)
2. Creer l'application "Plumi"
3. Remplir les infos obligatoires :
   - Nom : Plumi
   - Categorie : Education
   - Description courte + longue
   - Screenshots (au moins 2)
   - Icone 512x512
   - Politique de confidentialite (URL)

### 5.2 Upload d'une version de test

1. Google Play Console → **Plumi** → **Test** → **Test interne**
2. **Creer une version**
3. Upload l'AAB (`app-release.aab`)
4. Ajouter des notes de version
5. **Publier**

### 5.3 Ajouter des testeurs

1. Test interne → **Testeurs**
2. Creer une liste d'emails (ou un Google Group)
3. Ajouter les emails des testeurs
4. Partager le lien d'inscription

Les testeurs recoivent un lien → acceptent l'invitation → installent depuis le Play Store. Pas de review Google, disponible en quelques minutes.

---

## 6. Automatiser avec Fastlane (optionnel)

### 6.1 Installation

```bash
# WSL ou Windows avec Ruby
gem install fastlane
```

### 6.2 Clef API Google Play

1. Google Play Console → **Setup** → **API access**
2. Creer un compte de service (Google Cloud)
3. Donner les droits "Release manager" au compte de service
4. Telecharger la cle JSON → `plumi-android/fastlane/play-store-key.json`

**Ne jamais commit ce fichier.**

### 6.3 Fastfile

Creer `plumi-android/fastlane/Fastfile` :

```ruby
default_platform(:android)

platform :android do
  desc "Build et upload en test interne"
  lane :internal do
    gradle(
      task: "bundle",
      build_type: "Release"
    )
    upload_to_play_store(
      track: "internal",
      aab: "app/build/outputs/bundle/release/app-release.aab",
      json_key: "fastlane/play-store-key.json"
    )
  end
end
```

### 6.4 Usage

```powershell
cd C:\Users\<ton-user>\plumi-android
fastlane internal
```

Build + upload en une commande.

---

## Workflow quotidien resume

```bash
# 1. WSL — build + copie
cd apps/frontend && pnpm build:mobile && cp -r android /mnt/c/Users/<ton-user>/plumi-android

# 2. Windows — build AAB
cd C:\Users\<ton-user>\plumi-android && .\gradlew.bat bundleRelease

# 3. Upload
# Manuel : drag & drop dans Google Play Console
# Automatise : fastlane internal
```
