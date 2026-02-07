# Mobile Build Instructions — Plumi

Guide complet pour compiler et distribuer Plumi sur iOS et Android via Capacitor.

---

## Prerequisites

### iOS

- **macOS** (required — iOS builds cannot be done on Windows/Linux)
- **Xcode 14+** — Install from the Mac App Store
- **Apple Developer Program** — $99/year, required for App Store distribution and physical device testing
- **CocoaPods** — Install via `sudo gem install cocoapods` or `brew install cocoapods`
- **Xcode Command Line Tools** — `xcode-select --install`

### Android

- **Android Studio** (latest stable) — [developer.android.com/studio](https://developer.android.com/studio)
- **JDK 17+** — Bundled with Android Studio or install separately
- **Android SDK 34+** — Install via Android Studio SDK Manager
- **Android SDK Build-Tools** — Install via SDK Manager
- **Android Emulator** (optional) — For local testing without a physical device

### Common

- **Node.js 20+** and **pnpm** — Already configured in the monorepo
- **Capacitor CLI** — Installed as a project dependency (`@capacitor/cli`)

---

## Development Builds

All commands are run from the monorepo root unless otherwise specified.

### Step 1: Build the Frontend

```bash
cd apps/frontend
pnpm build
npx cap sync
```

`cap sync` copies the web build into the native projects and updates native dependencies.

### iOS Simulator

```bash
npx cap open ios
```

This opens the project in Xcode. Then:

1. Select a simulator target (e.g., iPhone 15) from the device dropdown
2. Click the **Run** button (or press `Cmd+R`)
3. The app launches in the iOS Simulator

### iOS Physical Device

1. Connect your iPhone via USB
2. In Xcode, select your device from the device dropdown
3. Go to **Signing & Capabilities**:
   - Select your Team (Apple Developer account)
   - Xcode will auto-generate a provisioning profile for development
4. Click **Run** (`Cmd+R`)
5. On first install, go to **Settings > General > VPN & Device Management** on the device and trust your developer certificate

### Android Emulator

```bash
npx cap open android
```

This opens the project in Android Studio. Then:

1. Open **Device Manager** and create a virtual device if none exists (e.g., Pixel 7, API 34)
2. Select the emulator from the device dropdown
3. Click the **Run** button (or press `Shift+F10`)

### Android Physical Device

1. Enable **Developer Options** on the device:
   - Go to **Settings > About Phone**
   - Tap **Build Number** 7 times
2. Enable **USB Debugging** in **Settings > Developer Options**
3. Connect the device via USB and accept the debugging prompt
4. In Android Studio, select the device from the dropdown
5. Click **Run** (`Shift+F10`)

---

## Production Builds

### iOS — App Store

#### 1. Configure Signing

In Xcode, under **Signing & Capabilities**:

- Set **Team** to your Apple Developer account
- Set **Bundle Identifier** to `com.plumi.app` (must match App Store Connect)
- Use **Automatic Signing** for simplicity, or configure manual provisioning profiles

#### 2. Archive

1. Select **Any iOS Device (arm64)** as the build target
2. Go to **Product > Archive**
3. Wait for the archive to complete

#### 3. Distribute

1. In the **Organizer** window (`Window > Organizer`), select the archive
2. Click **Distribute App**
3. Choose **App Store Connect**
4. Follow the wizard: upload to App Store Connect

#### 4. Submit via App Store Connect

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Create a new app or select the existing one
3. Fill in metadata: description, screenshots, age rating, privacy policy
4. Select the uploaded build
5. Submit for review

#### 5. TestFlight (Beta Testing)

1. In App Store Connect, go to **TestFlight**
2. The uploaded build appears automatically after processing
3. Add internal testers (up to 25, no review required)
4. For external testers, submit for Beta App Review first
5. Share the TestFlight invite link

### Android — Google Play

#### 1. Generate a Signing Keystore

```bash
keytool -genkey -v \
  -keystore apps/frontend/android/plumi-release.keystore \
  -alias plumi \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Store this keystore securely. **Never commit it to git.**

#### 2. Create `key.properties`

Create the file `apps/frontend/android/key.properties`:

```properties
storePassword=<your-store-password>
keyPassword=<your-key-password>
keyAlias=plumi
storeFile=../plumi-release.keystore
```

**Never commit this file to git.**

#### 3. Configure `build.gradle` Signing

In `apps/frontend/android/app/build.gradle`, add the signing configuration:

```groovy
// Load keystore properties
def keystorePropertiesFile = rootProject.file("key.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    // ... existing config ...

    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

#### 4. Build the Release Bundle

```bash
cd apps/frontend/android
./gradlew bundleRelease
```

The AAB (Android App Bundle) is generated at:
`app/build/outputs/bundle/release/app-release.aab`

#### 5. Upload to Google Play Console

1. Go to [play.google.com/console](https://play.google.com/console)
2. Create a new app or select the existing one
3. Go to **Release > Production** (or **Internal testing** for beta)
4. Upload the `.aab` file
5. Fill in the store listing: description, screenshots, content rating, privacy policy
6. Submit for review

---

## Troubleshooting

### iOS

| Issue | Solution |
|-------|----------|
| `pod install` fails | Run `cd ios/App && pod repo update && pod install` |
| Signing errors | Ensure your Apple Developer account is active and the bundle ID matches |
| Build fails after `cap sync` | Delete `ios/App/Pods` and `ios/App/Podfile.lock`, then run `pod install` again |
| Simulator not booting | Reset the simulator via **Device > Erase All Content and Settings** |
| White screen on device | Check that `cap sync` was run after `pnpm build` |

### Android

| Issue | Solution |
|-------|----------|
| Gradle sync fails | Ensure JDK 17+ is set in Android Studio **Preferences > Build > Gradle > JDK** |
| SDK not found | Set `ANDROID_HOME` env variable or configure in `local.properties` |
| `bundleRelease` fails on signing | Verify `key.properties` paths and passwords are correct |
| Build tools missing | Open SDK Manager and install the required build-tools version |
| APK not installing on device | Ensure USB debugging is enabled and the device is authorized |

### General

| Issue | Solution |
|-------|----------|
| Web assets outdated in native app | Run `pnpm build && npx cap sync` from `apps/frontend` |
| Plugin not found after install | Run `npx cap sync` to update native projects |
| Live reload not working | Use `npx cap run ios --livereload` or `npx cap run android --livereload` |

---

## Versioning

Plumi follows **semantic versioning** (`MAJOR.MINOR.PATCH`):

- **MAJOR** — Breaking changes (data migration required, API incompatibility)
- **MINOR** — New features (new mini-game, new book)
- **PATCH** — Bug fixes, small improvements

### How to Increment

Update the version in the following locations:

1. **`apps/frontend/package.json`** — `"version": "X.Y.Z"`
2. **iOS** — In Xcode under **General > Identity**, update **Version** and increment **Build**
3. **Android** — In `apps/frontend/android/app/build.gradle`, update `versionName` and increment `versionCode`

After updating, run `npx cap sync` to propagate changes.

### Convention

- Each App Store / Play Store release gets a unique build number
- Build numbers always increment (never reuse)
- Tag releases in git: `git tag v1.2.3`
