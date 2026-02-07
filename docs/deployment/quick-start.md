# Quick Start Guide

Deploying Plumi to all three platforms. For detailed instructions, see the linked guides.

---

## Web (Coolify) — ~15 min

> Full guide: [coolify-setup.md](./coolify-setup.md) | Env vars: [environment-variables.md](./environment-variables.md)

### 1. Create PostgreSQL database

In Coolify, add a new PostgreSQL 17 resource:

| Setting       | Value       |
| ------------- | ----------- |
| Name          | `plumi-db`  |
| Version       | `17`        |
| Database name | `plumi`     |

Copy the internal connection string for the next step.

### 2. Deploy Backend

Create a new service from the monorepo:

| Setting          | Value                          |
| ---------------- | ------------------------------ |
| Dockerfile       | `apps/backend/Dockerfile`      |
| Port             | `3011`                         |
| `DATABASE_URL`   | *(connection string from step 1)* |
| `NODE_ENV`       | `production`                   |
| `CORS_ORIGIN`    | `https://your-frontend-domain` |

### 3. Deploy Frontend

| Setting          | Value                          |
| ---------------- | ------------------------------ |
| Dockerfile       | `apps/frontend/Dockerfile`     |
| Port             | `80`                           |
| Build arg        | `VITE_API_URL=/api`            |
| Domain           | your domain + enable HTTPS     |

### 4. Verify

Visit the frontend URL, navigate to the bookshelf, and play a mini-game end to end.

---

## iOS — ~2h

> Full guide: [mobile-builds.md](./mobile-builds.md) | Store metadata: [app-store-metadata.md](./app-store-metadata.md)

### Prerequisites

- macOS with Xcode 14+
- Apple Developer Program ($99/year)
- Node 18+, pnpm, Cocoapods

### Build and Submit

```bash
pnpm build:mobile
npx cap sync ios
npx cap open ios
```

In Xcode: **Product > Archive > Distribute App > App Store Connect**.

Upload, fill metadata (see [app-store-metadata.md](./app-store-metadata.md)), submit for review.

**Review time:** 1-3 days.

---

## Android — ~1.5h

> Full guide: [mobile-builds.md](./mobile-builds.md) | Store metadata: [app-store-metadata.md](./app-store-metadata.md)

### Prerequisites

- Android Studio
- Google Play Developer account ($25 one-time)
- Java 17+

### Build and Submit

```bash
# Generate signing keystore (first time only)
keytool -genkey -v -keystore plumi-release.keystore \
  -alias plumi -keyalg RSA -keysize 2048 -validity 10000

# Build
pnpm build:mobile
npx cap sync android
cd apps/frontend/android
./gradlew bundleRelease
```

Upload the AAB from `app/build/outputs/bundle/release/` to Google Play Console.

**Review time:** 1-7 days.

---

## Local Testing (production build)

```bash
docker compose -f docker-compose.prod.yml up --build
```

Access at [http://localhost](http://localhost). This runs the full production stack (frontend + backend + PostgreSQL) locally.

---

## Pre-deploy Checklist

Run through [checklist.md](./checklist.md) before every deployment.
