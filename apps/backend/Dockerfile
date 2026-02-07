FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Builder stage
FROM base AS builder
WORKDIR /app

# 1. Copy manifests (cache invalidation point 1)
COPY package.json pnpm-lock.yaml tsconfig.base.json ./

# 2. Scope workspace to backend + shared only (skip frontend deps)
RUN echo 'packages:' > pnpm-workspace.yaml && \
    echo '  - "packages/shared"' >> pnpm-workspace.yaml && \
    echo '  - "apps/backend"' >> pnpm-workspace.yaml

# 3. Copy package manifests (cache invalidation point 2)
COPY packages/shared/package.json packages/shared/package.json
COPY apps/backend/package.json apps/backend/package.json

# 4. Install dependencies (cached unless lockfile/package.json change)
RUN pnpm install --frozen-lockfile --ignore-scripts

# 5. Copy source code
COPY packages/shared packages/shared
COPY apps/backend apps/backend

# 6. Generate Prisma client (skipped by --ignore-scripts)
RUN pnpm --filter @plumi/backend exec prisma generate

# 7. Build shared then backend
RUN pnpm --filter @plumi/shared build
RUN pnpm --filter @plumi/backend build

# 8. Create standalone production bundle
RUN pnpm --filter @plumi/backend deploy --prod --legacy /app/deployed

# 9. Copy generated Prisma client (pnpm deploy doesn't include .prisma)
RUN PRISMA_SRC=$(find /app/node_modules/.pnpm -type d -name ".prisma" -path "*@prisma+client@*" | head -1) && \
    PRISMA_DEST=$(find /app/deployed/node_modules/.pnpm -type d -name "@prisma" -path "*@prisma+client@*" | head -1) && \
    cp -r "$PRISMA_SRC" "$(dirname $PRISMA_DEST)/.prisma"

# Runner stage
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 fastify

USER fastify

# Copy standalone bundle
COPY --from=builder --chown=fastify:nodejs /app/deployed /app

ENV NODE_ENV=production
ENV PORT=3011

EXPOSE 3011

# Migrations au démarrage puis serveur
CMD ["sh", "-c", "./node_modules/.bin/prisma migrate deploy && node dist/server.js"]
