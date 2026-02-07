FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared/package.json ./packages/shared/
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
RUN pnpm --filter @plumi/shared build
WORKDIR /app/apps/backend
RUN pnpm db:generate
RUN pnpm build

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 fastify
COPY --from=builder --chown=fastify:nodejs /app/apps/backend/dist ./dist
COPY --from=builder --chown=fastify:nodejs /app/apps/backend/node_modules ./node_modules
COPY --from=builder --chown=fastify:nodejs /app/apps/backend/prisma ./prisma
COPY --from=builder --chown=fastify:nodejs /app/apps/backend/package.json ./
USER fastify
EXPOSE 3011
ENV NODE_ENV=production
ENV PORT=3011
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
