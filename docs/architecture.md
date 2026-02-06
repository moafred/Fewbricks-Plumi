# Plumi : Architecture Technique [ARCHI]

> Stack, monorepo, machine à états → voir [CLAUDE.md](../CLAUDE.md) (Conventions Techniques)

## Principes Directeurs
1. **Performance Critique** : Latence d'interaction < 16ms. Feedback immédiat (< 200ms).
2. **Souveraineté des Données** : Fonctionnement 100% Offline via PWA et stockage local.
3. **Qualité & Maintenance** : Typage strict (TS), validation (Zod), et zéro dette technique.

## Stratégie IA 2026
- **Génération d'Exercices** : Scripts automatisés pour peupler `@plumi/shared` à partir du programme EN.
- **Remédiation Dynamique** : Moteur de logique côté backend analysant les tentatives pour proposer des parcours de rattrapage.
- **IA Locale** : Web Speech API pour la reconnaissance vocale et synthèse.
