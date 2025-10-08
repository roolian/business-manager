# business-manager

Petit guide pour démarrer le projet en local (AdonisJS + Inertia + React).

## Prérequis

- Node.js >= 18
- npm (ou pnpm/yarn)
- Git

Le projet utilise SQLite par défaut (fichier : `tmp/db.sqlite3`).

## Installation

1. Installer les dépendances :

```bash
npm install
# ou
# pnpm install
# yarn install
```

2. Copier l'exemple d'environnement et l'éditer :

```bash
cp .env.example .env
# puis ouvrez .env et ajustez les variables (APP_KEY, DB, PORT, ...)
```

3. Générer la clé d'application et la coller dans `.env` si nécessaire :

```bash
node ace generate:key
# copier la clé dans APP_KEY dans .env
```

4. Lancer les migrations et (optionnel) les seeders :

```bash
node ace migration:run
# optionnel :
node ace db:seed
```

> Remarque : si vous utilisez SQLite, assurez-vous que le dossier `tmp/` est accessible en écriture.

## Démarrage (mode développement)

La commande `dev` démarre le serveur Adonis avec Vite pour le frontend :

```bash
npm run dev
```

Par défaut l'application écoute sur le port défini dans `.env` (ex : `3333`). Ouvrez `http://localhost:3333`.

## Commandes utiles

- Build production :

```bash
npm run build
npm start
```

- Linter / format :

```bash
npm run lint
npm run fix
npm run format
```

- Typecheck :

```bash
npm run typecheck
```

- Tests :

```bash
npm run test
```

## Dépannage rapide

- ESLint indique `You are linting '.', but all of the files matching the glob pattern '.' are ignored` :
  - Vérifiez `.eslintignore` et la configuration de votre IDE. Vous pouvez forcer ESLint avec :

```bash
npx eslint . --no-ignore
```

- Problèmes de migration SQLite :
  - Supprimez `tmp/db.sqlite3` puis relancez `node ace migration:run`.

- Si Inertia/SSR ne trouve pas les pages : vérifiez `start/routes.ts` et la configuration `config/inertia.ts`.

## Remarques

- Backend : AdonisJS (Lucid ORM).
- Frontend : React + Inertia + Vite.

---

Si vous voulez, je peux aussi :
- ajouter un `README.dev.md` avec des étapes plus détaillées, ou
- créer un `.env.example` si celui-ci manque, ou
- corriger l'erreur ESLint en vérifiant `.eslintignore` et `eslint.config.js`.

Dites-moi ce que vous préférez.