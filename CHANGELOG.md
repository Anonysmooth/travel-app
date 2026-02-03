# Changelog

Toutes les modifications notables du projet Travel App sont documentées ici.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

---

## [0.1.1] - 2026-02-03

### US-001 : Confirmation d'email (complément)

Implémentation complète de la confirmation d'email selon les critères d'acceptation.

#### Backend (.NET 10)

**Nouveaux fichiers :**
- `Configuration/EmailSettings.cs` - Configuration SMTP (Mailtrap/SendGrid)
- `Services/IEmailService.cs` - Interface du service d'envoi d'emails
- `Services/EmailService.cs` - Implémentation avec MailKit
- `DTOs/Auth/RegisterResponse.cs` - Réponse inscription (message sans token)
- `DTOs/Auth/ConfirmEmailRequest.cs` - Requête confirmation email

**Fichiers modifiés :**
- `TravelApp.Api.csproj` - Ajout package MailKit v4.9.0
- `Program.cs` - Injection EmailService et EmailSettings
- `appsettings.json` - Section Email (SMTP config Mailtrap)
- `Controllers/AuthController.cs` - Nouveaux endpoints + envoi email

**Nouveaux endpoints API :**
- `GET /api/auth/confirm-email?token=xxx` - Confirme l'email et retourne JWT
- `POST /api/auth/resend-confirmation` - Renvoie l'email de confirmation

**Changements de comportement :**
- `POST /api/auth/register` ne retourne plus de token JWT
- `IsEmailConfirmed = false` par défaut (plus d'auto-confirmation)
- Token de confirmation expire après 24h

#### Frontend (Vue.js 3)

**Nouveaux fichiers :**
- `src/views/ConfirmEmailView.vue` - Page de confirmation email

**Fichiers modifiés :**
- `src/views/RegisterView.vue` - Affiche "Vérifiez votre email" après inscription
- `src/services/authService.js` - Ajout confirmEmail() et resendConfirmation()
- `src/stores/auth.js` - Ajout actions confirmEmail et resendConfirmation
- `src/router/index.js` - Ajout route /confirm-email

#### Fonctionnalités ajoutées

- [x] Envoi d'email de confirmation après inscription
- [x] Template email HTML responsive avec lien de confirmation
- [x] Page "Vérifiez votre email" après inscription
- [x] Bouton "Renvoyer l'email" sur la page d'inscription
- [x] Page de confirmation /confirm-email
- [x] Gestion des erreurs (token expiré, déjà confirmé, invalide)
- [x] Connexion automatique après confirmation réussie
- [x] Redirection vers accueil après confirmation
- [x] Configuration Mailtrap (dev) / SendGrid (prod)

#### API Endpoints mis à jour

| Méthode | Route | Description | Codes |
|---------|-------|-------------|-------|
| POST | `/api/auth/register` | Inscription (envoie email) | 201, 400, 409 |
| GET | `/api/auth/confirm-email` | Confirme email + retourne JWT | 200, 400 |
| POST | `/api/auth/resend-confirmation` | Renvoie email confirmation | 200 |

---

## [0.1.0] - 2026-02-02

### US-001 : Création de compte utilisateur

#### Backend (.NET 10)

**Nouveaux fichiers :**
- `Models/User.cs` - Entité utilisateur avec email, passwordHash, dates
- `DTOs/Auth/RegisterRequest.cs` - DTO pour la requête d'inscription
- `DTOs/Auth/AuthResponse.cs` - DTO pour la réponse avec token JWT
- `DTOs/Auth/ApiError.cs` - DTO pour les erreurs API standardisées
- `Configuration/JwtSettings.cs` - Configuration JWT (SecretKey, Issuer, Audience)
- `Services/ITokenService.cs` - Interface du service de tokens
- `Services/TokenService.cs` - Génération de tokens JWT
- `Validators/RegisterRequestValidator.cs` - Validation FluentValidation
- `Controllers/AuthController.cs` - Endpoint POST /api/auth/register

**Fichiers modifiés :**
- `TravelApp.Api.csproj` - Ajout packages BCrypt.Net-Next, JWT, FluentValidation, upgrade .NET 10
- `Data/AppDbContext.cs` - Ajout DbSet<User> avec index unique sur Email
- `Program.cs` - Configuration JWT Auth, FluentValidation, injection TokenService
- `appsettings.json` - Section Jwt avec configuration tokens
- `Dockerfile` - Mise à jour vers .NET SDK/Runtime 10.0

**Migration EF Core :**
- `Migrations/[timestamp]_AddUserEntity.cs` - Création table Users

**Packages NuGet ajoutés :**
- `BCrypt.Net-Next` v4.0.3 - Hash des mots de passe
- `Microsoft.AspNetCore.Authentication.JwtBearer` v10.0.0 - Auth JWT
- `FluentValidation.AspNetCore` v11.3.0 - Validation des requêtes
- `Microsoft.EntityFrameworkCore` v10.0.0 - ORM (upgrade)
- `Npgsql.EntityFrameworkCore.PostgreSQL` v10.0.0 - Provider PostgreSQL (upgrade)
- `MailKit` v4.9.0 - Envoi d'emails SMTP

#### Frontend (Vue.js 3)

**Nouveaux fichiers :**
- `src/services/api.js` - Instance Axios avec intercepteurs JWT
- `src/services/authService.js` - Appels API authentification
- `src/stores/auth.js` - Store Pinia (user, token, register, logout)
- `src/composables/useToast.js` - Composable notifications toast
- `src/components/ToastContainer.vue` - Composant UI des toasts
- `src/views/RegisterView.vue` - Page d'inscription avec formulaire
- `src/views/ConfirmEmailView.vue` - Page de confirmation email

**Fichiers modifiés :**
- `vite.config.js` - Ajout alias @, proxy API dynamique avec VITE_API_URL
- `src/router/index.js` - Ajout routes /register et /confirm-email
- `src/App.vue` - Import ToastContainer

**Packages npm ajoutés :**
- `lucide-vue-next` - Icônes (Mail, Lock, Eye, UserPlus, etc.)

#### Infrastructure (Docker)

**Fichiers modifiés :**
- `docker-compose.yml` - Ajout variable VITE_API_URL pour proxy frontend

#### Fonctionnalités implémentées (US-001 complète)

- [x] Formulaire d'inscription (email, password, confirmation)
- [x] Validation côté client (format email, min 8 caractères, correspondance)
- [x] Validation côté serveur (FluentValidation)
- [x] Hash sécurisé du mot de passe (BCrypt)
- [x] Envoi d'email de confirmation avec lien d'activation
- [x] Token de confirmation valide 24h
- [x] Page de confirmation d'email avec gestion des erreurs
- [x] Génération token JWT après confirmation
- [x] Stockage token dans localStorage
- [x] Détection email existant (erreur 409 Conflict)
- [x] Messages d'erreur localisés en français
- [x] Toast de succès après confirmation
- [x] Redirection vers accueil après confirmation
- [x] Design system respecté (Tailwind CSS, couleurs primaires)

#### Schéma base de données

```sql
CREATE TABLE "Users" (
    "Id" UUID PRIMARY KEY,
    "Email" VARCHAR(256) NOT NULL UNIQUE,
    "PasswordHash" TEXT NOT NULL,
    "IsEmailConfirmed" BOOLEAN DEFAULT FALSE,
    "EmailConfirmationToken" TEXT NULL,
    "EmailConfirmationTokenExpiry" TIMESTAMP NULL,
    "CreatedAt" TIMESTAMP NOT NULL,
    "UpdatedAt" TIMESTAMP NULL
);
```

---

## [0.0.1] - 2026-02-01

### Setup initial

- Création projet Vue.js 3 avec Vite
- Création projet .NET Web API
- Configuration Docker Compose (PostgreSQL, Backend, Frontend)
- Configuration Tailwind CSS
- Setup Pinia pour state management
- Setup Vue Router
