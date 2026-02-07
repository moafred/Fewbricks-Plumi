# Deployment Documentation

All guides for deploying Plumi to web, iOS, and Android.

## Guides

| Document                                               | Description                                  |
| ------------------------------------------------------ | -------------------------------------------- |
| [quick-start.md](./quick-start.md)                     | Concise steps for all platforms               |
| [coolify-setup.md](./coolify-setup.md)                 | Full Coolify web deployment setup             |
| [mobile-builds.md](./mobile-builds.md)                 | iOS and Android build process (Capacitor)     |
| [app-store-metadata.md](./app-store-metadata.md)       | Store listings, screenshots, descriptions     |
| [environment-variables.md](./environment-variables.md) | Required env vars for backend and frontend    |
| [checklist.md](./checklist.md)                         | Pre-deploy verification checklist             |

## Deployment Targets

| Platform    | Technology              | Guide                                        |
| ----------- | ----------------------- | -------------------------------------------- |
| **Web**     | Docker + Coolify        | [coolify-setup.md](./coolify-setup.md)       |
| **iOS**     | Capacitor + Xcode       | [mobile-builds.md](./mobile-builds.md)       |
| **Android** | Capacitor + Gradle      | [mobile-builds.md](./mobile-builds.md)       |

## Quick Commands

### Web

```bash
# Local production test
docker compose -f docker-compose.prod.yml up --build

# Deploy via Coolify: push to main, Coolify auto-deploys
git push origin main
```

### iOS

```bash
pnpm build:mobile
npx cap sync ios
npx cap open ios
# Xcode: Product > Archive > Distribute
```

### Android

```bash
pnpm build:mobile
npx cap sync android
cd apps/frontend/android && ./gradlew bundleRelease
# Upload AAB to Google Play Console
```

## Security Checklist

- [ ] `.env` files are in `.gitignore` and never committed
- [ ] Database passwords are strong and unique per environment
- [ ] HTTPS is enabled on the frontend domain
- [ ] `CORS_ORIGIN` is restricted to the frontend domain only (no wildcards)
- [ ] API keys and secrets are set as environment variables in Coolify, not in code
- [ ] Signing keystores (Android) are stored securely, not in the repository
