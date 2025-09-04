# `Soundify, a Spotify Controller`

> [!WARNING]
> `🚧 Under construction 🚧`
>
> This project is currently under construction and may not be fully functional.
>
> - Minimal setup to get React working in Vite
> - Discovery and Learning of styled-components

> [!CAUTION]
>> The use of all Spotify features requires a Premium account

## 1. Analyse de l’architecture

### Technologies

- **React** (présence de `package.json`, `vite.config.js`, structure typique React)
- **Node.js** (gestion des dépendances, scripts npm)
- **Vite** (outil de build et de développement)

### Analyse du pattern architectural

- **Pattern principal** : Architecture par composants (React), organisation modulaire, séparation claire UI/état/utilitaires.
- **Organisation des dossiers** :
  - `src/components/` : composants UI réutilisables
  - `src/utils/` : gestion d’état, contextes, helpers
  - `src/assets/` : ressources statiques
  - `public/` : assets publics
- **Flux de dépendances** : Les composants consomment des utilitaires/contextes, les assets sont importés dans les composants.
- **Pas de microservices, monolithique côté frontend**

---

## 2. Vue d’ensemble architecturale

- **Approche** : Modularité, réutilisabilité, séparation des responsabilités.
- **Principes** :
  - Découplage UI/état
  - Centralisation de la configuration
  - Utilisation de contextes pour le partage d’état global
- **Frontière** : `src/` = logique applicative, `public/` = ressources statiques
- **Adaptations** : Utilisation de Vite pour accélérer le développement et le build.

---

## 3. Visualisation de l’architecture (texte)

- **Sous-systèmes** :
  - UI (composants React)
  - Gestion d’état (contextes, reducers)
  - Utilitaires (helpers, constantes)
  - Assets (images, icônes)
- **Dépendances** :
  - Les composants UI importent des contextes et utilitaires
  - Les assets sont importés dans les composants
  - Le point d’entrée (`main.jsx`) monte l’application et injecte les providers
- **Flux de données** :
  - Données descendantes via props/contextes
  - Événements remontants via callbacks

---

## 4. Composants architecturaux principaux

### Composants UI (`src/components/`)

- **Rôle** : Affichage, interaction utilisateur
- **Structure interne** : Un composant par fichier, styles associés
- **Patterns** : Présentation, composition, props, callbacks
- **Extension** : Ajout de nouveaux composants dans le dossier, réutilisation via import

### Gestion d’état (`src/utils/`)

- **Rôle** : Centralisation de l’état global, logique métier légère
- **Structure** : Contextes React, reducers, providers
- **Patterns** : Context API, useReducer, hooks personnalisés
- **Extension** : Ajout de nouveaux contextes ou reducers

### Assets (`src/assets/`, `public/`)

- **Rôle** : Images, icônes, ressources statiques
- **Structure** : Organisation par type ou usage
- **Extension** : Ajout de nouveaux fichiers dans le dossier approprié

---

## 5. Couches architecturales et dépendances

- **Couches** :
  - Présentation (composants)
  - Gestion d’état (contextes, reducers)
  - Utilitaires (helpers)
- **Règles de dépendance** :
  - Les composants peuvent consommer l’état et les utilitaires
  - Les utilitaires ne dépendent pas des composants
- **Injection de dépendances** :
  - Contextes injectés via React Context API

---

## 6. Architecture des données

- **Modélisation** : Pas de modèles complexes, données structurées via objets JS
- **Accès aux données** : Directement dans les composants/contextes
- **Transformation** : Utilitaires pour la manipulation des données
- **Validation** : Validation légère côté composant ou utilitaire

---

## 7. Transverses (cross-cutting concerns)

- **Authentification** : Non implémentée (à ajouter si besoin)
- **Gestion des erreurs** : Gestion locale dans les composants, notifications via contextes
- **Logging/Monitoring** : Non implémenté (à ajouter via outils externes si besoin)
- **Validation** : Validation des entrées utilisateur dans les composants
- **Configuration** : Centralisée dans les fichiers de config ou contextes

---

## 8. Communication entre services

- **API** : Les appels API seraient placés dans des utilitaires ou contextes dédiés (non présents dans la structure actuelle)
- **Protocoles** : HTTP (fetch, axios, etc. à ajouter si besoin)
- **Versionnement** : À gérer côté API externe si besoin

---

## 9. Patterns spécifiques React/Node.js

### React

- **Composition** : Composants enfants, props, composition fonctionnelle
- **Gestion d’état** : Context API, useReducer, hooks personnalisés
- **Effets de bord** : useEffect pour la gestion des effets
- **Routage** : À ajouter via React Router si besoin
- **Optimisation** : Memoization, PureComponent, React.memo

### Node.js

- **Scripts** : Définis dans `package.json` (build, start, etc.)
- **Gestion des dépendances** : npm, versionnement dans `package.json`

---

## 10. Patterns d’implémentation

- **Interfaces** : Utilisation de PropTypes ou TypeScript possible (non présent ici)
- **Services** : À implémenter dans `utils/` ou contextes
- **Repositories** : Non applicable (pas de persistance locale)
- **Contrôleurs/API** : À ajouter dans des utilitaires dédiés si besoin
- **Domain Model** : Données structurées via objets JS

---

## 11. Architecture des tests

- **Stratégie** : Tests unitaires à placer dans `src/__tests__/` ou à côté des composants
- **Doubles de test** : Mocks via Jest ou outils similaires
- **Données de test** : Fixtures dans des fichiers dédiés
- **Outils** : Jest, React Testing Library (à ajouter)

---

## 12. Architecture de déploiement

- **Topologie** : Application frontend statique, déployable sur n’importe quel serveur statique
- **Adaptations par environnement** : Variables d’environnement via Vite
- **Dépendances runtime** : Aucune côté client, dépendances Node.js pour le build
- **Conteneurisation** : Possible via Docker (non présent)
- **Cloud** : Déploiement possible sur Netlify, Vercel, etc.

---

## 13. Extension et évolution

- **Ajout de fonctionnalités** : Créer de nouveaux composants/contextes dans les dossiers dédiés
- **Modification** : Refactoriser sans casser l’API publique des composants
- **Intégration** : Ajouter des utilitaires ou services dans `utils/`
- **Points d’extension** : Contextes, hooks personnalisés, nouveaux composants

---

## 14. Exemples de patterns architecturaux

### Séparation des couches

```jsx
// src/components/MonComposant.jsx
import { useContext } from 'react';
import { MonContexte } from '../utils/MonContexte';

export default function MonComposant() {
  const valeur = useContext(MonContexte);
  return <div>{valeur}</div>;
}
```

### Communication composant <-> contexte

```jsx
// src/utils/MonContexte.jsx
import { createContext, useReducer } from 'react';
export const MonContexte = createContext();
export function MonProvider({ children }) {
  const [state, dispatch] = useReducer((s, a) => s, {});
  return <MonContexte.Provider value={state}>{children}</MonContexte.Provider>;
}
```

---

## 15. Décisions architecturales

- **Choix React** : Pour la modularité, l’écosystème, la maintenabilité
- **Vite** : Pour la rapidité de build et l’expérience développeur
- **Organisation par composants** : Pour la réutilisabilité et la clarté
- **Pas de backend** : Simplicité, focus sur l’UI

---

## 16. Gouvernance architecturale

- **Cohérence** : Maintenue via conventions, code review, linters
- **Automatisation** : ESLint, Prettier, scripts de build
- **Documentation** : Ce blueprint, le `README.md`, commentaires dans le code

---

## 17. Guide pour le développement de nouvelles fonctionnalités

- **Workflow** :
  - Créer un composant dans `src/components/`
  - Ajouter la logique d’état dans `src/utils/` si besoin
  - Importer les assets dans `src/assets/` ou `public/`
  - Ajouter des tests dans `src/__tests__/` ou à côté du composant
- **Templates** :
  - Composant : `MonComposant.jsx`, `MonComposant.css`
  - Contexte : `MonContexte.jsx`
- **Pièges à éviter** :
  - Mélanger logique métier et UI
  - Dupliquer la logique d’état
  - Oublier de documenter les nouveaux patterns

---

## Create an Application

First, we need to create a Spotify App to give us credentials to authenticate with the API.

- Go to your Spotify Developer Dashboard and log in.
- Click Create an App.
- Fill out the name and description and click create.
- Click Show Client Secret.
- Save your Client ID and Secret.
- Click Edit Settings.
- Add <http://localhost:5173> as a redirect URI.

All done! You now have a properly configured Spotify application and the correct credentials to make requests.

## Running Locally

```bash
cd soundify
npm install
npm run dev
```
