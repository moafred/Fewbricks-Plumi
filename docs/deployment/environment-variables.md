# Environment Variables Reference

All environment variables required for Plumi deployment.

## Backend Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `DATABASE_URL` | Yes | -- | PostgreSQL connection string |
| `PORT` | No | `3011` | HTTP server port (Dockerfile sets `3011`) |
| `NODE_ENV` | Yes | -- | `development` or `production` |
| `CORS_ORIGIN` | Yes | -- | Allowed origin for CORS (exact frontend URL) |

### DATABASE_URL Format

```
postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
```

**Development:**
```
postgresql://plumi:plumi_dev@localhost:5445/plumi
```

**Production (Coolify):**
```
postgresql://plumi:<STRONG_PASSWORD>@<postgres-internal-hostname>:5432/plumi
```

**Production (docker-compose):**
```
postgresql://plumi:<STRONG_PASSWORD>@postgres:5432/plumi
```

### CORS_ORIGIN

Must match the frontend URL exactly. No trailing slash, no wildcard in production.

```env
# Development
CORS_ORIGIN=http://localhost:5184

# Production
CORS_ORIGIN=https://plumi.yourdomain.com
```

## Frontend Variables

| Variable | Required | Build-time | Description |
|---|---|---|---|
| `VITE_API_URL` | Yes | Yes | API base URL, baked into the build |

> **Important:** Vite variables prefixed with `VITE_` are embedded at build time, not runtime. Changing them requires a rebuild.

**Development:**
```env
VITE_API_URL=http://localhost:4817
```

**Production:**
```env
VITE_API_URL=/api
```

Using `/api` as a relative path allows Nginx to proxy API requests to the backend service, avoiding CORS issues entirely.

## PostgreSQL Variables (docker-compose only)

| Variable | Required | Default | Description |
|---|---|---|---|
| `POSTGRES_USER` | No | `plumi` | Database username |
| `POSTGRES_PASSWORD` | Yes | -- | Database password |
| `POSTGRES_DB` | No | `plumi` | Database name |

## Production Values for Coolify

### Backend Service

```env
DATABASE_URL=postgresql://plumi:<GENERATED_PASSWORD>@<postgres-service>:5432/plumi
PORT=3011
NODE_ENV=production
CORS_ORIGIN=https://plumi.yourdomain.com
```

### Frontend Service (Build Arg)

```env
VITE_API_URL=/api
```

### PostgreSQL Service

Configure directly in Coolify's database resource settings (username, password, database name).

## Reference Files

| File | Purpose |
|---|---|
| `.env.example` | Development template |
| `.env.production.example` | Production template |
| `apps/backend/Dockerfile` | Backend -- exposes port `3011`, sets `NODE_ENV=production` |
| `apps/frontend/Dockerfile` | Frontend -- accepts `VITE_API_URL` as build arg |
| `docker-compose.prod.yml` | Full stack with variable substitution |

## Security Notes

1. **Never commit `.env` files** -- `.env` is in `.gitignore`. Only `.env.example` and `.env.production.example` are tracked.
2. **Strong passwords** -- Use a generated password for `POSTGRES_PASSWORD` (32+ characters, alphanumeric).
3. **No wildcard CORS** -- `CORS_ORIGIN` must be the exact frontend URL in production. Never use `*`.
4. **HTTPS mandatory** -- Configure TLS via Coolify (Let's Encrypt) or a reverse proxy. `CORS_ORIGIN` must use `https://`.
5. **No secrets in build args** -- `VITE_API_URL` is the only build arg. It contains no secrets. Never pass database credentials as build args.
6. **Non-root containers** -- The backend Dockerfile runs as user `fastify` (UID 1001). The frontend uses the default Nginx user.
