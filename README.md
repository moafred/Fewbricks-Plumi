# Plumi — Apprendre le Français CE1

Application éducative gamifiée d'apprentissage du français pour enfants CE1 (6-7 ans).

## Deploiement

### Web (Coolify)

Plumi se deploie sur Coolify (PaaS auto-heberge) via Docker :

- **Frontend** : Nginx + Vue 3 statique
- **Backend** : Fastify + Prisma
- **Database** : PostgreSQL 17

Guide complet : [docs/deployment/coolify-setup.md](docs/deployment/coolify-setup.md)

### Mobile (iOS & Android)

Plumi est disponible comme application native via Capacitor :

```bash
cd apps/frontend
pnpm build:mobile        # Build + sync
pnpm cap:open:ios        # Ouvrir dans Xcode
pnpm cap:open:android    # Ouvrir dans Android Studio
```

Guides :
- [Build mobile](docs/deployment/mobile-builds.md)
- [Metadata stores](docs/deployment/app-store-metadata.md)
- [Checklist deploiement](docs/deployment/checklist.md)
