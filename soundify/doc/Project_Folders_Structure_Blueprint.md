# Project Folders Structure Blueprint

Dernière mise à jour : 5 septembre 2025

---

## 1. Phase d’auto-détection

### Technologies détectées

- **React** (présence de `package.json`, `vite.config.js`, structure typique React avec `src/`, `components/`, etc.)
- **Node.js** (présence de `package.json`, gestion des dépendances JS)
- **Vite** (présence de `vite.config.js` pour le build frontend)
- **Pas de monorepo** (un seul projet principal, pas de configuration de workspace multi-projets)
- **Pas de microservices** (pas de structure de services multiples)
- **Frontend détecté** (présence de `src/`, `public/`, composants UI, assets, etc.)

---

## 2. Vue d’ensemble structurelle

- **Approche architecturale** : Organisation par fonctionnalité et par type (composants, utilitaires, assets, etc.), typique d’une application React moderne.
- **Principes d’organisation** :
  - Séparation claire entre logique applicative (`src/`), ressources statiques (`public/`), et configuration.
  - Les composants sont regroupés dans un dossier dédié.
  - Les utilitaires et contextes sont isolés dans des sous-dossiers spécifiques.
- **Répétition de patterns** : Utilisation systématique de dossiers pour chaque type de ressource (composants, assets, styles, utils).
- **Rationalité** : Facilite la maintenance, la scalabilité et la réutilisation des composants.

---

## 3. Visualisation de la structure (Markdown List, profondeur 3)

- soundify/
  - index.html
  - package.json
  - vite.config.js
  - public/
    - vite.svg
  - src/
    - App.css
    - App.jsx
    - index.css
    - main.jsx
    - Notification.css
    - Toast.css
    - assets/
      - react.svg
    - components/
      - Body.jsx
      - CurrentTrack.jsx
      - Footer.jsx
      - Login.jsx
      - Navbar.jsx
      - Notification.jsx
      - PlayerControls.jsx
      - Playlists.jsx
      - Sidebar.jsx
      - Soundify.jsx
      - Toast.jsx
      - Volume.jsx
    - utils/
      - Constants.jsx
      - NotificationContext.jsx
      - Provider.jsx
      - reducer.jsx

---

## 4. Analyse des dossiers clés

### soundify/

- **Rôle** : Racine du projet applicatif.
- **Contenu** : Fichiers de configuration, scripts de build, ressources statiques, code source.

#### public/

- **Rôle** : Contient les ressources statiques accessibles directement (images, favicon, etc.).
- **Pattern** : Uniquement des fichiers statiques, pas de logique JS.

#### src/

- **Rôle** : Code source principal de l’application.
- **Organisation** :
  - **components/** : Composants React réutilisables, organisés par fonctionnalité.
  - **assets/** : Images, icônes, ressources statiques utilisées dans le code.
  - **utils/** : Fonctions utilitaires, contextes React, gestion d’état, etc.
  - **Fichiers CSS** : Styles globaux et spécifiques à certains composants.
  - **App.jsx / main.jsx** : Points d’entrée de l’application.

---

## 5. Patterns de placement des fichiers

- **Fichiers de configuration** : Racine du dossier `soundify/` (`package.json`, `vite.config.js`).
- **Définitions de modèles/entités** : Non applicable (pas de backend, logique métier côté client).
- **Logique métier** : Principalement dans les composants et les utilitaires (`src/components/`, `src/utils/`).
- **Interfaces/abstractions** : Contextes React dans `src/utils/`.
- **Fichiers de test** : Non détectés (à ajouter dans `src/__tests__/` ou à côté des composants).
- **Documentation** : `README.md` à la racine du projet.

---

## 6. Conventions de nommage et d’organisation

- **Fichiers** : PascalCase pour les composants (`Body.jsx`), camelCase pour les utilitaires (`reducer.jsx`), extensions `.jsx` ou `.css`.
- **Dossiers** : camelCase ou kebab-case (`components`, `assets`, `utils`).
- **Modules** : Correspondance entre le nom du composant et le nom du fichier.
- **Organisation** : Co-localisation du style et du composant possible, séparation claire des responsabilités.

---

## 7. Navigation et workflow de développement

- **Points d’entrée** : `src/main.jsx` (montage de l’app), `src/App.jsx` (composant racine).
- **Ajout de fonctionnalités** : Créer un nouveau composant dans `src/components/`, ajouter les utilitaires dans `src/utils/`.
- **Ajout de tests** : (Suggestion) Créer un dossier `src/__tests__/` ou des fichiers `.test.jsx` à côté des composants.
- **Modification de la configuration** : Modifier `vite.config.js` ou `package.json` à la racine.
- **Flux de dépendances** : Les composants importent des utilitaires, les assets sont importés dans les composants.

---

## 8. Organisation du build et des outputs

- **Configuration du build** : `vite.config.js` (Vite), scripts dans `package.json`.
- **Structure de sortie** : (Non générée ici, mais typiquement `dist/` après build Vite).
- **Builds spécifiques à l’environnement** : Gérés via Vite et variables d’environnement.

---

## 9. Organisation spécifique React/Node.js

### React

- **Organisation des composants** : Un composant par fichier, regroupés dans `components/`.
- **Gestion d’état** : Contextes dans `utils/`, logique de réduction dans `reducer.jsx`.
- **Styles** : Fichiers CSS globaux et spécifiques.

### Node.js

- **Scripts** : Scripts de build et de démarrage dans `package.json`.
- **Gestion des dépendances** : `node_modules/` (non inclus dans la doc), versions dans `package.json`.

---

## 10. Extension et évolution

- **Points d’extension** : Ajouter de nouveaux composants dans `components/`, nouveaux contextes ou utilitaires dans `utils/`.
- **Scalabilité** : Possibilité de créer des sous-dossiers par fonctionnalité dans `components/` si le projet grandit.
- **Refactoring** : Déplacement facile des composants, modularité encouragée.

---

## 11. Templates de structure (exemples)

### Nouveau composant React

```bash
src/components/NouveauComposant/
  NouveauComposant.jsx
  NouveauComposant.css
  index.js
```

### Nouveau contexte React

```bash
src/utils/NouveauContexte.jsx
```

### Nouveau test (suggestion)

```bash
src/components/NouveauComposant/NouveauComposant.test.jsx
```

---

## 12. Enforcement de la structure

- **Validation** : Utilisation de linters (ESLint), conventions de nommage via Prettier, scripts de build qui échouent si la structure est incorrecte.
- **Documentation** : Ce blueprint, le `README.md`, et éventuellement des commentaires dans le code.
- **Historique** : Les changements majeurs de structure doivent être documentés dans le `README.md` ou un fichier `CHANGELOG.md`.

---

## Maintenance du blueprint

Ce document doit être mis à jour à chaque modification majeure de la structure du projet, lors de l’ajout de nouvelles fonctionnalités ou de la refonte de l’architecture.  
**Dernière mise à jour : 5 septembre 2025**
