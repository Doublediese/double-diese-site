# double-diese.fr

Site de Double Dièse, conseil pour le secteur de la musique classique.

Vite, React, Tailwind. Le contenu éditorial est dans `src/data/content.ts`.

Les critiques Bachtrack et les articles Substack sont récupérés à chaque construction par `scripts/fetch-bachtrack.mjs` et `scripts/fetch-substack.mjs` (fichiers `public/*.json`). En cas d'échec, la version précédente est conservée.

Publication : GitHub Pages, par le workflow `.github/workflows/deploy.yml`, à chaque modification de `main` et chaque nuit.

En local :

```sh
npm ci
npm run dev
```
