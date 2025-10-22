# CampusView - Système de Visualisation 2D

Application React pour la visualisation et la gestion des campus universitaires en 2D avec Tailwind CSS.

## 🚀 Installation

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Créer le projet React**
```bash
npx create-react-app campus-view-2d
cd campus-view-2d
```

2. **Installer Tailwind CSS**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Remplacer les fichiers**
Copiez tous les fichiers fournis dans la structure du projet en remplaçant les fichiers existants.

4. **Démarrer l'application**
```bash
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
campus-view-2d/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── icons/
│   │   │   ├── BuildingIcon.jsx
│   │   │   ├── HomeIcon.jsx
│   │   │   ├── ChartIcon.jsx
│   │   │   ├── LogoutIcon.jsx
│   │   │   ├── RoomsIcon.jsx
│   │   │   ├── OccupancyIcon.jsx
│   │   │   ├── BedIcon.jsx
│   │   │   ├── BookingIcon.jsx
│   │   │   └── index.js
│   │   ├── CampusMapView.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   └── StatisticsDashboard.jsx
│   ├── constants/
│   │   └── roomStatus.js
│   ├── data/
│   │   └── mockData.js
│   ├── App.jsx
│   ├── index.css
│   └── index.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Fonctionnalités

### Vue Accueil
- Visualisation interactive des blocs et étages
- Carte SVG avec chambres colorées selon leur statut
- Sélection des bâtiments et étages
- Légende des statuts (Disponible, Occupée, Maintenance, Hors service)

### Vue Statistiques
- Tableau de bord avec métriques clés
- Cartes statistiques pour :
  - Chambres totales
  - Taux d'occupation
  - Lits vides
  - Réservations en cours
- Espaces réservés pour graphiques

### Navigation
- Sidebar avec navigation fluide
- Indication visuelle de la page active
- Sélection de bâtiments dans le header
- Avatar utilisateur

## 🛠️ Technologies Utilisées

- **React** 18.2.0 - Bibliothèque UI
- **Tailwind CSS** 3.3.0 - Framework CSS utilitaire
- **SVG** - Visualisation 2D des plans de campus
- **PostCSS** - Traitement CSS

## 🎯 Utilisation

### Données Mock
Les données de démonstration se trouvent dans `src/data/mockData.js`. Vous pouvez les modifier pour tester différentes configurations :

```javascript
export const mockBuildings = [
  { id: 'A', name: 'Bloc A - Sciences', floors: 5 },
  { id: 'B', name: 'Bloc B - Arts & Lettres', floors: 3 },
  { id: 'C', name: 'Bloc C - Ingénierie', floors: 7 },
];
```

### Personnalisation des Couleurs
Les couleurs des statuts de chambres sont définies dans `src/constants/roomStatus.js` :

```javascript
export const roomStatusColors = {
  available: 'fill-green-500/80 hover:fill-green-400',
  occupied: 'fill-red-500/80 hover:fill-red-400',
  maintenance: 'fill-yellow-500/80 hover:fill-yellow-400',
  'out-of-service': 'fill-gray-600/80 hover:fill-gray-500',
};
```

## 📦 Build pour Production

```bash
npm run build
```

Cela créera une version optimisée dans le dossier `build/`.

## 🔧 Scripts Disponibles

- `npm start` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm test` - Lance les tests
- `npm run eject` - Éjecte la configuration (irréversible)

## 📝 Notes de Développement

### Ajout de Nouvelles Icônes
1. Créez un nouveau fichier dans `src/components/icons/`
2. Exportez-le dans `src/components/icons/index.js`
3. Utilisez-le dans vos composants

### Ajout de Nouveaux Composants
1. Créez le fichier dans `src/components/`
2. Importez-le dans `App.jsx` si nécessaire
3. Utilisez les classes Tailwind pour le style

## 🤝 Contribution

Ce projet est un addon de visualisation 2D pour la gestion de campus universitaires.

## 📄 Licence

Projet privé - Tous droits réservés

## 👥 Auteur

Développé pour la gestion de campus universitaires