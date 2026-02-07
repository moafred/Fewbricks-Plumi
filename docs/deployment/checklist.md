# Deployment Checklist

Checklist complète pour le deploiement multi-plateforme de Plumi (Web, iOS, Android).

---

## Pre-Deployment

### Code Quality

- [ ] `make typecheck` passes with zero errors
- [ ] No `any` types in codebase
- [ ] No `console.log` in production code
- [ ] No dead code, unused imports, or commented-out blocks
- [ ] ESLint + Prettier pass with zero warnings
- [ ] All Storybook stories render without errors (`make storybook`)

### Security

- [ ] No secrets in source code or build args
- [ ] `.env` files are in `.gitignore`
- [ ] `CORS_ORIGIN` set to exact production domain (no wildcard)
- [ ] `POSTGRES_PASSWORD` is strong (32+ chars, generated)
- [ ] Backend runs as non-root user (`fastify`, UID 1001)
- [ ] Nginx security headers configured (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- [ ] No external API keys or third-party service credentials exposed

### Performance

- [ ] Bundle size < 500KB (check with `pnpm --filter @plumi/frontend build`)
- [ ] Assets use cache headers (Nginx: `expires 1y` for `/assets`)
- [ ] Service Worker registered for offline support
- [ ] Gzip enabled in Nginx config
- [ ] Audio assets pre-loaded, no latency during gameplay

### Mobile Readiness

- [ ] Capacitor config validated (`apps/frontend/capacitor.config.ts`)
- [ ] Touch targets >= 80px for all interactive elements
- [ ] No keyboard-only interactions on mobile (keyboard guides hidden on touch devices)
- [ ] SPA works offline via Service Worker

---

## Web Deployment

### Database (PostgreSQL 17)

- [ ] PostgreSQL 17 deployed (Coolify or docker-compose)
- [ ] Database `plumi` created with user `plumi`
- [ ] Strong password configured
- [ ] Persistent volume mounted at `/var/lib/postgresql/data`
- [ ] Health check passing (`pg_isready`)
- [ ] Backup strategy in place

### Backend (Fastify)

- [ ] Docker image builds successfully (`apps/backend/Dockerfile`)
- [ ] `DATABASE_URL` points to production PostgreSQL
- [ ] `NODE_ENV=production`
- [ ] `CORS_ORIGIN` matches frontend domain exactly
- [ ] `PORT=3011`
- [ ] Prisma migrations applied (`prisma migrate deploy` runs on startup)
- [ ] Health endpoint responds (`/api/health`)
- [ ] Backend and PostgreSQL on same Docker network

### Frontend (Vue 3 + Nginx)

- [ ] Docker image builds successfully (`apps/frontend/Dockerfile`)
- [ ] `VITE_API_URL=/api` set as build argument
- [ ] Nginx config serves SPA with fallback to `index.html`
- [ ] Nginx proxies `/api` to backend service on port `3011`
- [ ] Domain configured with HTTPS (Let's Encrypt)
- [ ] Health endpoint responds (`/health`)
- [ ] Frontend and backend on same Docker network

### Integration Testing

- [ ] Home screen loads with Plumi mascot
- [ ] BookShelf displays 6 books with progression
- [ ] Chapter can be started and mini-games function
- [ ] API calls succeed (no CORS errors in browser console)
- [ ] Service Worker caches assets for offline use
- [ ] Audio plays correctly (consignes, feedback)

---

## Mobile Deployment

### iOS -- Pre-Submission

- [ ] Frontend built: `pnpm --filter @plumi/frontend build`
- [ ] Capacitor synced: `npx cap sync ios`
- [ ] App opens in Xcode (`npx cap open ios`)
- [ ] Bundle identifier: `com.plumi.app`
- [ ] App name: `Plumi`
- [ ] Version and build number incremented
- [ ] App icons generated (all required sizes in `Assets.xcassets/AppIcon.appiconset`)
- [ ] Splash screen configured (sky-50 background `#F0F7FF`)
- [ ] Minimum iOS version set (iOS 14+)
- [ ] App runs on iOS Simulator without crashes
- [ ] App runs on physical device without crashes
- [ ] All mini-games functional (TriSorcier, Grimoire, Potion, PontAccords, PotionGn)
- [ ] Audio plays correctly on device
- [ ] Offline mode works (Service Worker)

### iOS -- App Store Submission

- [ ] Apple Developer account active
- [ ] App Store Connect entry created
- [ ] Privacy policy URL provided
- [ ] Age rating: 4+ (educational, no objectionable content)
- [ ] Category: Education
- [ ] Screenshots captured for all required device sizes
- [ ] App description written in French
- [ ] Keywords set (conjugaison, CE1, francais, apprentissage, education)
- [ ] Archive built and uploaded via Xcode
- [ ] TestFlight build tested
- [ ] Submitted for App Review

### Android -- Pre-Submission

- [ ] Frontend built: `pnpm --filter @plumi/frontend build`
- [ ] Capacitor synced: `npx cap sync android`
- [ ] App opens in Android Studio (`npx cap open android`)
- [ ] Package name: `com.plumi.app`
- [ ] App name: `Plumi`
- [ ] Version code and version name incremented
- [ ] App icons generated (mipmap-* directories)
- [ ] Splash screen configured (sky-50 background `#F0F7FF`)
- [ ] Minimum SDK set (API 22 / Android 5.1+)
- [ ] App runs on Android Emulator without crashes
- [ ] App runs on physical device without crashes
- [ ] All mini-games functional
- [ ] Audio plays correctly on device
- [ ] Offline mode works

### Android -- Google Play Submission

- [ ] Google Play Developer account active
- [ ] App listing created in Google Play Console
- [ ] Privacy policy URL provided
- [ ] Content rating questionnaire completed (ESRB: Everyone)
- [ ] Category: Education
- [ ] Target audience: Children (6-7 years)
- [ ] Families Policy compliance verified (no ads, no in-app purchases)
- [ ] Screenshots captured for phone and tablet
- [ ] App description written in French
- [ ] Signed release APK/AAB built
- [ ] Internal testing track tested
- [ ] Submitted for review

---

## Post-Deployment

### Monitoring

- [ ] Health check endpoints monitored (frontend `/health`, backend `/api/health`)
- [ ] PostgreSQL health check monitored (`pg_isready`)
- [ ] Container restart policy: `unless-stopped`
- [ ] Disk space monitored (Docker volumes, logs)
- [ ] Error logging reviewed (no unhandled exceptions)

### User Testing

- [ ] Tested by a child (6-7 years) -- [KID] validation
- [ ] Tested by a parent -- [PARENT] validation
- [ ] All 5 mini-games playable end-to-end
- [ ] Progression saves correctly between sessions
- [ ] Audio works on all target devices
- [ ] No frustrating UX issues (zero game-over, zero stressful timers)

### Documentation

- [ ] Environment variables documented in `docs/deployment/environment-variables.md`
- [ ] Deployment steps documented in `docs/deployment/coolify-setup.md`
- [ ] Version number updated in `package.json`

---

## Rollback Plan

If critical issues are found after deployment:

### Web

1. **Coolify:** Click **Rollback** on the affected service to restore the previous Docker image
2. **docker-compose:** Redeploy with the previous Git tag:
   ```bash
   git checkout <previous-tag>
   docker compose -f docker-compose.prod.yml up -d --build
   ```
3. **Database:** If migrations are irreversible, restore from the latest backup:
   ```bash
   docker exec plumi-postgres-prod pg_restore -U plumi -d plumi /backup/latest.dump
   ```

### Mobile

1. **iOS:** Expedited App Review for a hotfix, or revert to previous TestFlight build
2. **Android:** Halt staged rollout in Google Play Console, promote previous version

---

## Version Increment

Before each release:

1. Update version in root `package.json`
2. Update version in `apps/frontend/package.json`
3. Update version in `apps/backend/package.json`
4. For iOS: increment build number in Xcode project settings
5. For Android: increment `versionCode` in `android/app/build.gradle`
6. Tag the release: `git tag v<X.Y.Z> && git push --tags`
