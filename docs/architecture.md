# Plumi : Architecture Technique [ARCHI]

## Principes Directeurs
1. **Performance Critique** : Latence d'interaction < 16ms. Feedback immédiat (< 200ms).
2. **Souveraineté des Données** : Fonctionnement 100% Offline via PWA et stockage local.
3. **Qualité & Maintenance** : Typage strict (TS), validation (Zod), et zéro dette technique.

## Stack Technologique
- **Frontend** : Vue 3 + Tailwind CSS 4 + Vite.
- **Backend** : Fastify + Prisma + PostgreSQL 17.
- **Partage** : `@plumi/shared` pour les types et les données pédagogiques (SSOT).
- **IA Locale** : Web Speech API pour la reconnaissance vocale et synthèse.

## Structure du Monorepo
```text
apps/
  frontend/    # PWA Vue 3
  backend/     # API Fastify
packages/
  shared/      # Types + Constantes (Vérité métier)
docs/          # Documentation vivante
```

## Moteur de Jeu (State Machine)
Le jeu suit une machine à états stricte pour garantir la cohérence :
`Discovery` -> `Challenge` -> `Response` -> `Resolution`

## Stratégie IA 2026
- **Génération d'Exercices** : Scripts automatisés pour peupler `@plumi/shared` à partir du programme EN.
- **Remédiation Dynamique** : Moteur de logique côté backend analysant les tentatives pour proposer des parcours de rattrapage.
