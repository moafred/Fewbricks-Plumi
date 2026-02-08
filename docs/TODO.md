# Plumi — Backlog Fonctionnel

## Dépendances

```
#4 Persistence ──► #1 Étagères
                └─► #3 Profils
```

---

## Tâches

### #1 — Étagères thématiques suivant le calendrier scolaire [BLOQUÉ par #4]

Réorganiser la navigation des livres (BookShelf) avec des étagères qui catégorisent par thématique et suivent la progression du temps scolaire CE1.

**Questions ouvertes :**
- Quelles thématiques/étagères ? (Par période scolaire P1-P5 ? Par domaine ? Par difficulté ?)
- Comment lier au calendrier scolaire CE1 (5 périodes) ?
- Déblocage progressif selon la période de l'année ?
- Impact sur la structure actuelle `BOOKS` / `CHAPTERS` dans `@plumi/shared`
- UX : comment représenter visuellement les étagères ?

---

### #2 — Page de présentation du jeu + tips parents in-game

Deux volets :

1. **Page de présentation** : Landing/onboarding qui explique le jeu (pour les parents qui découvrent l'app). Objectifs pédagogiques, fonctionnement, philosophie (zéro punition, programme CE1...).
2. **Tips parents in-game** : Conseils contextuels pour les parents pendant le jeu. Comment accompagner l'enfant, quand intervenir, explication de ce que l'enfant travaille.

**Questions ouvertes :**
- Page de présentation = écran d'onboarding au premier lancement ? Ou page accessible depuis un menu ?
- Tips parents = section dédiée ? Tooltips ? Mode parent séparé ?
- Faut-il un "mode parent" avec code d'accès (comme sur les apps enfants) ?

---

### #3 — Profils par enfant (comme Lumi) [BLOQUÉ par #4]

Permettre à plusieurs enfants d'utiliser l'app avec chacun leur progression.

**Questions ouvertes :**
- Combien de profils max ?
- Sélection de profil au lancement (avatars/prénoms) ?
- Chaque profil a sa propre progression, étoiles, récompenses
- Personnalisation du profil (avatar, couleur, pseudo) ?
- Faut-il un profil parent séparé ?

---

### #4 — Stratégie de persistence et authentification [PRIORITAIRE]

Question fondamentale : comment persister les données et faut-il une connexion ?

**Options :**
- **Local-only** : localStorage/IndexedDB, zéro compte, données sur l'appareil. Simple mais pas de sync multi-device.
- **Local + sync optionnelle** : Données locales par défaut, compte optionnel pour synchroniser. Meilleur des deux mondes mais plus complexe.
- **Compte obligatoire** : Connexion requise. Permet sync mais friction au démarrage.
- **Hybride** : Profil local au démarrage, proposition de compte plus tard.

**Contraintes :**
- [PARENT] : Pas de friction, app utilisable immédiatement
- [KID] : Pas de formulaire de connexion
- RGPD enfants : données mineurs = contraintes légales fortes
- PWA offline-first : doit fonctionner sans connexion
- Multi-device souhaitable ? (tablette école + tablette maison)
- Impact sur l'architecture backend (Fastify + Prisma + PostgreSQL déjà en place)
