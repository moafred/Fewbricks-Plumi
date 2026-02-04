# Charger les variables d'environnement
-include .env

.PHONY: init upgrade install env up-db db-wait build-shared generate migrate dev storybook typecheck lint help

# Afficher l'aide par défaut
help:
	@echo "Commandes disponibles :"
	@echo "  make init      : Initialisation complète (install, docker, db)"
	@echo "  make upgrade   : Mise à jour après git pull (install, generate, migrate)"
	@echo "  make dev       : Lance le serveur de développement"
	@echo "  make storybook : Lance Storybook (design system)"
	@echo "  make typecheck : Vérifie les types TypeScript"
	@echo "  make lint      : Lint du code"
	@echo "  make install   : Installe les dépendances"

# Initialisation complète du projet
init: env install up-db db-wait build-shared generate migrate
	@echo "Projet initialisé avec succès !"

# Mise à jour (dépendances + base de données)
upgrade: install build-shared generate migrate
	@echo "Projet mis à jour avec succès !"

# --- Sous-tâches ---

env:
	@test -f .env || cp .env.example .env && echo ".env créé depuis .env.example"

install:
	pnpm install

up-db:
	docker compose up -d postgres

db-wait:
	@echo "Attente de la base de données..."
	@until docker compose exec postgres pg_isready -U plumi -d plumi > /dev/null 2>&1; do \
		echo "."; \
		sleep 1; \
	done
	@echo "Base de données prête !"

build-shared:
	pnpm --filter @plumi/shared build

generate:
	pnpm db:generate

migrate:
	pnpm db:migrate

lint:
	pnpm lint

typecheck:
	pnpm typecheck

dev:
	pnpm dev

storybook:
	pnpm --filter @plumi/frontend storybook
