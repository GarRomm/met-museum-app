# MET Museum App

Application de découverte des collections du [Metropolitan Museum of Art](https://www.metmuseum.org), construite avec l'API publique du MET.

## Prérequis

- Node.js 18 ou supérieur

## Lancer en développement

```
npm run dev
```

## Build de production

```
npm run build
npm run preview
```

## Fonctionnalités

- Recherche d'œuvres par mot-clé
- Filtres par département, médium, géolocalisation, plage de dates
- Filtres rapides : œuvres phares, avec images, en cours d'exposition, par titre ou artiste
- Fiche détail de chaque œuvre avec galerie d'images
- Liste de favoris persistante (localStorage)
- Pagination des résultats

## Stack technique

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [TanStack Query v5](https://tanstack.com/query) — gestion du cache et des requêtes
- [Zustand v5](https://zustand-demo.pmnd.rs) — state global et persistance
- [React Router v7](https://reactrouter.com)
- [Tailwind CSS v4](https://tailwindcss.com)
