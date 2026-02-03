# Travel App

Application d'organisation de voyages permettant de planifier des itinéraires, gérer des activités et partager ses voyages.

## Stack Technique

| Composant | Technologie |
|-----------|-------------|
| Frontend | Vue.js 3 + Vite |
| Styling | Tailwind CSS |
| Backend | .NET 10 (Web API) |
| Base de données | PostgreSQL |
| ORM | Entity Framework Core |
| Conteneurisation | Docker + Docker Compose |

## Architecture du Projet

```
travel-app/
├── preparation/                 # Documents de référence
│   ├── epic_mvp_voyage(2).md    # Epic et User Stories
│   └── travel-design-system.jsx # Design System de référence
│
├── frontend/                    # Application Vue.js
│   ├── src/
│   │   ├── assets/              # CSS, images
│   │   ├── components/          # Composants réutilisables
│   │   ├── views/               # Pages de l'application
│   │   ├── router/              # Configuration des routes
│   │   ├── stores/              # State management (Pinia)
│   │   ├── App.vue              # Composant racine
│   │   └── main.js              # Point d'entrée
│   ├── tailwind.config.js       # Config Tailwind + Design System
│   ├── package.json
│   └── Dockerfile
│
├── backend/                     # API .NET
│   ├── Controllers/             # Endpoints REST
│   ├── Models/                  # Entités et DTOs
│   ├── Data/                    # DbContext et migrations
│   ├── Services/                # Logique métier
│   ├── Program.cs               # Configuration de l'app
│   ├── TravelApp.Api.csproj
│   └── Dockerfile
│
├── docker-compose.yml           # Orchestration des services
└── .gitignore
```

## Prérequis

- [Node.js](https://nodejs.org/) >= 18
- [.NET SDK](https://dotnet.microsoft.com/download) >= 8.0
- [Docker](https://www.docker.com/) et Docker Compose

## Démarrage Rapide

### Avec Docker (recommandé)

```bash
# Lancer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f
```

Services disponibles :
- Frontend : http://localhost:5173
- Backend API : http://localhost:5000
- PostgreSQL : localhost:5432

### Sans Docker (développement)

**1. Base de données**
```bash
# Lancer uniquement PostgreSQL via Docker
docker-compose up -d db
```

**2. Backend**
```bash
cd backend
dotnet restore
dotnet run
```
L'API sera disponible sur http://localhost:5000

**3. Frontend**
```bash
cd frontend
npm install
npm run dev
```
L'application sera disponible sur http://localhost:5173

## Design System

Le projet utilise un Design System personnalisé avec Tailwind CSS.

### Couleurs principales

| Nom | Hex | Usage |
|-----|-----|-------|
| `primary-500` | #3B82F6 | Actions principales |
| `primary-600` | #2563EB | Hover states |
| `primary-700` | #1D4ED8 | Active states |
| `success` | #10B981 | Confirmations |
| `warning` | #F59E0B | Alertes |
| `error` | #EF4444 | Erreurs |

### Typographie

Police : **Inter** (Google Fonts)

### Utilisation dans les composants

```vue
<button class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg">
  Créer un voyage
</button>
```

## Commandes Utiles

### Frontend

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Prévisualiser le build
```

### Backend

```bash
dotnet run                           # Lancer l'API
dotnet watch run                     # Hot reload
dotnet ef migrations add <Name>      # Créer une migration
dotnet ef database update            # Appliquer les migrations
```

### Docker

```bash
docker-compose up -d                 # Démarrer les services
docker-compose down                  # Arrêter les services
docker-compose down -v               # Arrêter et supprimer les volumes
docker-compose logs -f <service>     # Voir les logs d'un service
docker-compose build                 # Rebuild les images
```

## Variables d'Environnement

### Backend (appsettings.json)

| Variable | Description | Défaut |
|----------|-------------|--------|
| `ConnectionStrings:DefaultConnection` | Connexion PostgreSQL | voir appsettings.json |
| `AllowedOrigins` | CORS origins autorisés | http://localhost:5173 |

### Docker Compose

| Variable | Description | Défaut |
|----------|-------------|--------|
| `POSTGRES_DB` | Nom de la base | travelapp |
| `POSTGRES_USER` | Utilisateur | postgres |
| `POSTGRES_PASSWORD` | Mot de passe | postgres |

## Connexion à la Base de Données

### Depuis votre machine (client SQL externe)

Pour vous connecter avec un client SQL (DBeaver, pgAdmin, DataGrip, etc.) :

| Paramètre | Valeur |
|-----------|--------|
| Host | `localhost` |
| Port | `5432` |
| Database | `travelapp` |
| User | `postgres` |
| Password | `postgres` |

### Depuis un conteneur Docker (interne)

| Paramètre | Valeur |
|-----------|--------|
| Host | `postgres` |
| Port | `5432` |

### Requêtes via CLI

```bash
# Accès direct à psql
docker exec -it travelapp-db psql -U postgres -d travelapp

# Exécuter une requête
docker exec travelapp-db psql -U postgres -d travelapp -c "SELECT * FROM \"Users\";"

# Lister les tables
docker exec travelapp-db psql -U postgres -d travelapp -c "\dt"
```

## Documentation

- [Epic et User Stories](./preparation/epic_mvp_voyage(2).md)
- [Design System](./preparation/travel-design-system.jsx)
