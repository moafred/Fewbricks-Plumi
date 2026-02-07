# Coolify Deployment Guide

Guide de deploiement de Plumi sur [Coolify](https://coolify.io), plateforme open-source self-hosted.

## Prerequisites

| Requirement | Details |
|---|---|
| **Coolify instance** | v4+ installed on a VPS (2 vCPU, 4GB RAM minimum) |
| **Domain** | DNS configured, e.g. `plumi.yourdomain.com` |
| **GitHub repo** | Access to `Fewbricks-Plumi` repository |
| **Docker** | Available on Coolify host (installed by default) |

## Step-by-Step Deployment

### 1. Create Project in Coolify

1. Open Coolify dashboard
2. Click **New Project** > name it `plumi`
3. Select the target server (or add one)

### 2. Deploy PostgreSQL 17

1. In the project, click **New Resource** > **Database** > **PostgreSQL**
2. Configure:

| Setting | Value |
|---|---|
| Image | `postgres:17-alpine` |
| Database name | `plumi` |
| Username | `plumi` |
| Password | Generate a strong password |
| Volume | `/var/lib/postgresql/data` (persistent) |

3. Click **Deploy**
4. Note the internal hostname (e.g. `postgres-xxxxx`) for the backend `DATABASE_URL`

### 3. Deploy Backend

1. **New Resource** > **Application** > **GitHub** (select repo)
2. Configure:

| Setting | Value |
|---|---|
| Dockerfile | `apps/backend/Dockerfile` |
| Build context | `.` (repository root) |
| Port | `3011` |
| Health check | `GET /api/health` |

3. Set environment variables (see [environment-variables.md](./environment-variables.md)):

```env
DATABASE_URL=postgresql://plumi:<PASSWORD>@<POSTGRES_HOST>:5432/plumi
PORT=3011
NODE_ENV=production
CORS_ORIGIN=https://plumi.yourdomain.com
```

4. Click **Deploy**
5. The Dockerfile runs `prisma migrate deploy` on startup automatically

### 4. Deploy Frontend

1. **New Resource** > **Application** > **GitHub** (select repo)
2. Configure:

| Setting | Value |
|---|---|
| Dockerfile | `apps/frontend/Dockerfile` |
| Build context | `.` (repository root) |
| Port | `80` |
| Domain | `plumi.yourdomain.com` |
| HTTPS | Enabled (Let's Encrypt) |

3. Set build argument:

```env
VITE_API_URL=/api
```

> **Note:** The frontend Nginx config (`apps/frontend/nginx.conf`) proxies `/api` requests to the backend service at `http://backend:3011`. In Coolify, both services must be on the same Docker network for this to work. Set the Nginx proxy_pass to match the backend's Coolify internal hostname.

4. Click **Deploy**

### 5. Network Configuration

Ensure all three services (PostgreSQL, Backend, Frontend) share the same Docker network in Coolify:

1. Go to each service's **Network** settings
2. Add them to the same custom network (e.g. `plumi-network`)
3. The frontend Nginx proxies `/api` to `http://backend:3011` -- update `proxy_pass` in `nginx.conf` if the Coolify backend hostname differs

### 6. Webhook Auto-Deploy

1. In each application's settings, go to **Webhooks**
2. Copy the webhook URL
3. In GitHub: **Settings** > **Webhooks** > **Add webhook**
4. Paste the URL, set content type to `application/json`
5. Select **Just the push event** on branch `main`
6. Now pushes to `main` trigger automatic redeployment

## Verification

After deployment, verify each service:

```bash
# Health check -- Frontend
curl -s https://plumi.yourdomain.com/health
# Expected: "healthy"

# Health check -- Backend (via proxy)
curl -s https://plumi.yourdomain.com/api/health
# Expected: JSON response

# Database -- check from Coolify terminal on backend container
npx prisma db seed  # if seeding is configured
```

**Browser check:**
1. Open `https://plumi.yourdomain.com`
2. Verify the home screen loads with Plumi mascot
3. Navigate to BookShelf, confirm books render
4. Start a chapter, verify API calls succeed (no CORS errors in console)

## Troubleshooting

### CORS Errors

**Symptom:** Browser console shows `Access-Control-Allow-Origin` errors.

**Fix:** Ensure `CORS_ORIGIN` on the backend matches exactly the frontend domain including protocol:
```env
# Correct
CORS_ORIGIN=https://plumi.yourdomain.com

# Wrong -- no trailing slash, no port
CORS_ORIGIN=https://plumi.yourdomain.com/
```

### Database Connection Refused

**Symptom:** Backend logs show `ECONNREFUSED` on startup.

**Checklist:**
1. Verify PostgreSQL container is running in Coolify
2. Check all services share the same Docker network
3. Verify `DATABASE_URL` uses the correct Coolify internal hostname (not `localhost`)
4. Confirm PostgreSQL health check passes

### Build Failures

**Symptom:** Docker build fails during `pnpm install`.

**Checklist:**
1. Ensure build context is set to `.` (repository root), not `apps/backend/` or `apps/frontend/`
2. Both Dockerfiles expect `pnpm-lock.yaml` and `pnpm-workspace.yaml` at root
3. Check Coolify has enough disk space for the build cache
4. Verify the `@plumi/shared` package builds before the app (`pnpm --filter @plumi/shared build`)

### Frontend Shows Blank Page

**Checklist:**
1. Open browser DevTools > Console for errors
2. Verify `VITE_API_URL` build arg was set to `/api`
3. Confirm Nginx serves `index.html` for all routes (SPA fallback in `nginx.conf`)
4. Check that static assets are accessible (no 404 on `/assets/*`)

## Manual Deployment via docker-compose

For environments without Coolify, use the production compose file:

```bash
# 1. Copy and configure environment
cp .env.production.example .env.production

# 2. Edit .env.production with real values
#    - POSTGRES_PASSWORD (strong password)
#    - CORS_ORIGIN (your domain)

# 3. Deploy
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build

# 4. Verify
docker compose -f docker-compose.prod.yml ps
curl http://localhost/health
```

**Reference files:**
- `docker-compose.prod.yml` -- production stack (PostgreSQL + Backend + Frontend)
- `apps/backend/Dockerfile` -- multi-stage build, runs as non-root `fastify` user
- `apps/frontend/Dockerfile` -- multi-stage build, serves via Nginx Alpine
- `apps/frontend/nginx.conf` -- Nginx config with API proxy, gzip, security headers, SPA fallback
