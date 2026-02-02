# EPIC MVP - Application d'Organisation de Voyage

## Vue d'ensemble de l'Epic

**Titre:** MVP Application d'Organisation de Voyage

**Objectif:** Développer les fonctionnalités essentielles permettant aux utilisateurs de créer, organiser et gérer leurs voyages de manière simple et intuitive.

**Valeur métier:** Offrir une solution minimale viable permettant de valider le concept auprès des premiers utilisateurs et collecter des feedbacks pour les itérations futures.

**Plateforme cible MVP:** 
- **Application Web Responsive** (Desktop + Mobile browser)
- Progressive Web App (PWA) pour installation possible
- Design mobile-first pour garantir une excellente expérience sur smartphone
- **Post-MVP:** Encapsulation avec Capacitor pour déploiement natif Android/iOS

**Périmètre MVP:** 
- Gestion de compte utilisateur basique
- Création et gestion de voyages
- Organisation d'itinéraires par jour
- Gestion de points d'intérêt (POI)
- Vue d'ensemble du voyage

**Hors scope MVP:**
- Application mobile native (prévu Sprint 6+)
- Collaboration multi-utilisateurs
- Réservations intégrées
- Gestion budgétaire avancée
- Mode hors-ligne complet
- Partage social

---

## User Stories

### US-001 : Création de compte utilisateur

**En tant que** visiteur  
**Je veux** créer un compte utilisateur  
**Afin de** pouvoir sauvegarder et gérer mes voyages

**Priorité:** MUST HAVE  
**Estimation:** 5 points  
**Sprint:** 1

#### Critères d'acceptation

1. **ÉTANT DONNÉ** que je suis sur la page d'inscription  
   **QUAND** je renseigne email, mot de passe (min 8 caractères) et confirmation  
   **ALORS** mon compte est créé et je reçois un email de confirmation

2. **ÉTANT DONNÉ** que je crée un compte  
   **QUAND** l'email existe déjà  
   **ALORS** j'obtiens un message d'erreur explicite

3. **ÉTANT DONNÉ** que j'ai créé un compte  
   **QUAND** je valide mon email via le lien reçu  
   **ALORS** mon compte est activé et je peux me connecter

#### Détails techniques
- Validation côté client et serveur
- Hash du mot de passe (bcrypt)
- Token JWT pour l'authentification
- Email de confirmation avec lien d'activation (24h de validité)

#### Définition de "Done"
- [ ] Code développé et testé unitairement
- [ ] Tests E2E passants
- [ ] Validation des règles de sécurité
- [ ] Documentation API mise à jour

---

### US-002 : Connexion utilisateur

**En tant qu'** utilisateur enregistré  
**Je veux** me connecter à mon compte  
**Afin d'** accéder à mes voyages sauvegardés

**Priorité:** MUST HAVE  
**Estimation:** 3 points  
**Sprint:** 1

#### Critères d'acceptation

1. **ÉTANT DONNÉ** que je suis sur la page de connexion  
   **QUAND** je saisis mes identifiants corrects  
   **ALORS** je suis redirigé vers mon tableau de bord

2. **ÉTANT DONNÉ** que je me connecte  
   **QUAND** mes identifiants sont incorrects  
   **ALORS** j'obtiens un message d'erreur générique (sécurité)

3. **ÉTANT DONNÉ** que je suis connecté  
   **QUAND** je ferme mon navigateur et reviens sous 7 jours  
   **ALORS** je reste connecté (option "Se souvenir de moi")

#### Détails techniques
- JWT avec refresh token
- Rate limiting sur les tentatives de connexion (5 max / 15min)
- Option "Se souvenir de moi" (cookie sécurisé)

#### Définition de "Done"
- [ ] Authentification fonctionnelle
- [ ] Gestion des erreurs implémentée
- [ ] Tests de sécurité passants
- [ ] Session persistante opérationnelle

---

### US-003 : Créer un nouveau voyage

**En tant qu'** utilisateur connecté  
**Je veux** créer un nouveau voyage  
**Afin de** commencer à organiser mon périple

**Priorité:** MUST HAVE  
**Estimation:** 8 points  
**Sprint:** 2

#### Critères d'acceptation

1. **ÉTANT DONNÉ** que je suis sur mon tableau de bord  
   **QUAND** je clique sur "Nouveau voyage"  
   **ALORS** un formulaire de création s'affiche

2. **ÉTANT DONNÉ** que je remplis le formulaire  
   **QUAND** je saisis : titre (obligatoire), destination (pays + ville), dates de début et fin  
   **ALORS** mon voyage est créé et j'accède à sa page détaillée

3. **ÉTANT DONNÉ** que je crée un voyage  
   **QUAND** la date de fin est antérieure à la date de début  
   **ALORS** un message d'erreur s'affiche

4. **ÉTANT DONNÉ** que j'ai créé un voyage  
   **QUAND** je reviens à mon tableau de bord  
   **ALORS** je vois mon voyage dans la liste avec : titre, destination, dates et une image par défaut

#### Détails techniques
- Champs : titre (255 char max), pays (liste ISO), ville (texte libre), dates (date picker)
- Image de destination par défaut via API Unsplash
- Calcul automatique de la durée en jours

#### Définition de "Done"
- [ ] Formulaire responsive
- [ ] Validation des données
- [ ] Sauvegarde en base PostgreSQL
- [ ] Tests unitaires et intégration
- [ ] Image par défaut fonctionnelle

---

### US-004 : Lister mes voyages

**En tant qu'** utilisateur connecté  
**Je veux** voir la liste de tous mes voyages  
**Afin de** naviguer entre eux facilement

**Priorité:** MUST HAVE  
**Estimation:** 5 points  
**Sprint:** 2

#### Critères d'acceptation

1. **ÉTANT DONNÉ** que j'accède à mon tableau de bord  
   **QUAND** la page charge  
   **ALORS** je vois tous mes voyages triés par date de début (plus récent en premier)

2. **ÉTANT DONNÉ** que je consulte ma liste de voyages  
   **QUAND** un voyage est passé  
   **ALORS** il est visuellement distingué (opacité réduite)

3. **ÉTANT DONNÉ** que je n'ai aucun voyage  
   **QUAND** j'accède au tableau de bord  
   **ALORS** je vois un message d'invitation à créer mon premier voyage

4. **ÉTANT DONNÉ** que je clique sur un voyage  
   **QUAND** l'action est effectuée  
   **ALORS** j'accède à la page détaillée de ce voyage

#### Détails techniques
- Affichage en cards (grid responsive)
- Informations par card : titre, destination, dates, durée, image
- Statut voyage : "À venir", "En cours", "Terminé"
- Pagination si > 12 voyages

#### Définition de "Done"
- [ ] Interface responsive
- [ ] Tri et filtrage fonctionnels
- [ ] État vide géré
- [ ] Performance optimisée (lazy loading images)

---

### US-005 : Voir le détail d'un voyage

**En tant qu'** utilisateur  
**Je veux** accéder au détail d'un voyage  
**Afin de** consulter et modifier toutes les informations

**Priorité:** MUST HAVE  
**Estimation:** 5 points  
**Sprint:** 2

#### Critères d'acceptation

1. **ÉTANT DONNÉ** que je clique sur un voyage  
   **QUAND** la page détail charge  
   **ALORS** je vois : titre, destination, dates, durée, description et l'itinéraire par jour

2. **ÉTANT DONNÉ** que je suis sur le détail  
   **QUAND** j'accède à la section itinéraire  
   **ALORS** je vois la liste des jours du voyage avec possibilité d'ajouter des activités

3. **ÉTANT DONNÉ** que je consulte un voyage  
   **QUAND** aucune activité n'est planifiée  
   **ALORS** je vois un message m'invitant à en ajouter

#### Détails techniques
- Navigation : Header avec titre + actions (éditer, supprimer)
- Onglets : Itinéraire / Informations générales / Notes
- Génération automatique des jours entre date début et fin

#### Définition de "Done"
- [ ] Navigation fluide
- [ ] Toutes les sections visibles
- [ ] État vide géré
- [ ] Actions accessibles

---

### US-006 : Modifier un voyage

**En tant qu'** utilisateur  
**Je veux** modifier les informations d'un voyage  
**Afin de** corriger ou mettre à jour les détails

**Priorité:** MUST HAVE  
**Estimation:** 3 points  
**Sprint:** 2

#### Critères d'acceptation

1. **ÉTANT DONNÉ** que je suis sur le détail d'un voyage  
   **QUAND** je clique sur "Modifier"  
   **ALORS** un formulaire pré-rempli s'affiche

2. **ÉTANT DONNÉ** que je modifie les informations  
   **QUAND** je sauvegarde  
   **ALORS** les modifications sont enregistrées et affichées immédiatement

3. **ÉTANT DONNÉ** que je modifie les dates  
   **QUAND** je change la durée du voyage  
   **ALORS** l'itinéraire est ajusté (ajout/suppression de jours)

#### Détails techniques
- Modal ou page dédiée avec formulaire identique à la création
- Confirmation si modification des dates impactant l'itinéraire
- Sauvegarde optimiste avec rollback en cas d'erreur

#### Définition de "Done"
- [ ] Formulaire pré-rempli
- [ ] Validation identique à la création
- [ ] Gestion des impacts sur l'itinéraire
- [ ] Tests de régression

---

### US-007 : Supprimer un voyage

**En tant qu'** utilisateur  
**Je veux** supprimer un voyage  
**Afin de** nettoyer mes voyages annulés ou terminés

**Priorité:** SHOULD HAVE  
**Estimation:** 2 points  
**Sprint:** 3

#### Critères d'acceptation

1. **ÉTANT DONNÉ** que je suis sur le détail d'un voyage  
   **QUAND** je clique sur "Supprimer"  
   **ALORS** une confirmation m'est demandée

2. **ÉTANT DONNÉ** que je confirme la suppression  
   **QUAND** l'action est validée  
   **ALORS** le voyage et toutes ses données sont supprimés et je retourne au tableau de bord

3. **ÉTANT DONNÉ** que j'annule la suppression  
   **QUAND** je clique sur "Annuler"  
   **ALORS** rien n'est supprimé et je reste sur la page

#### Détails techniques
- Modal de confirmation avec message explicite
- Suppression en cascade (voyage + jours + activités)
- Possibilité future : soft delete avec corbeille (30 jours)

#### Définition de "Done"
- [ ] Confirmation obligatoire
- [ ] Suppression complète en cascade
- [ ] Redirection fonctionnelle
- [ ] Tests de suppression

---

### US-008 : Ajouter une activité à un jour

**En tant qu'** utilisateur  
**Je veux** ajouter une activité à un jour spécifique  
**Afin de** construire mon itinéraire détaillé

**Priorité:** MUST HAVE  
**Estimation:** 8 points  
**Sprint:** 3

#### Critères d'acceptation

1. **ÉTANT DONNÉ** que je suis sur l'itinéraire d'un voyage  
   **QUAND** je clique sur "Ajouter une activité" pour un jour  
   **ALORS** un formulaire s'affiche

2. **ÉTANT DONNÉ** que je remplis le formulaire  
   **QUAND** je saisis : nom (obligatoire), type (restaurant/visite/hôtel/transport/autre), horaire, adresse, notes  
   **ALORS** l'activité est ajoutée au jour concerné

3. **ÉTANT DONNÉ** que j'ai ajouté une activité  
   **QUAND** je consulte le jour  
   **ALORS** je vois l'activité avec ses informations et triée par horaire

4. **ÉTANT DONNÉ** que je saisis une adresse  
   **QUAND** je commence à taper  
   **ALORS** des suggestions d'adresses s'affichent (autocomplétion)

#### Détails techniques
- Types d'activité : icônes différenciées
- Champs : nom (255), type (enum), horaire (time), adresse (texte + lat/long), notes (texte)
- Autocomplétion adresse via Google Places API
- Tri automatique des activités par horaire

#### Définition de "Done"
- [ ] Formulaire complet et validé
- [ ] Autocomplétion adresse fonctionnelle
- [ ] Affichage avec icônes par type
- [ ] Tri automatique opérationnel
- [ ] Tests unitaires et E2E

---

### US-009 : Modifier/Supprimer une activité

**En tant qu'** utilisateur  
**Je veux** modifier ou supprimer une activité  
**Afin de** ajuster mon planning

**Priorité:** MUST HAVE  
**Estimation:** 5 points  
**Sprint:** 3

#### Critères d'acceptation

1. **ÉTANT DONNÉ** qu'une activité est affichée  
   **QUAND** je clique sur "Modifier"  
   **ALORS** le formulaire pré-rempli s'affiche

2. **ÉTANT DONNÉ** que je modifie une activité  
   **QUAND** je sauvegarde  
   **ALORS** les modifications sont visibles immédiatement

3. **ÉTANT DONNÉ** qu'une activité est affichée  
   **QUAND** je clique sur "Supprimer"  
   **ALORS** une confirmation s'affiche et l'activité est supprimée après validation

4. **ÉTANT DONNÉ** que je modifie l'horaire  
   **QUAND** je sauvegarde  
   **ALORS** l'activité est automatiquement repositionnée dans l'ordre chronologique

#### Détails techniques
- Actions en menu contextuel (3 points verticaux)
- Confirmation simple pour la suppression
- Animation de réorganisation après modification horaire

#### Définition de "Done"
- [ ] Modification fonctionnelle
- [ ] Suppression avec confirmation
- [ ] Réorganisation automatique
- [ ] Tests de régression

---

### US-010 : Réorganiser les activités (Drag & Drop)

**En tant qu'** utilisateur  
**Je veux** réorganiser mes activités par glisser-déposer  
**Afin de** ajuster rapidement l'ordre de mon planning

**Priorité:** SHOULD HAVE  
**Estimation:** 5 points  
**Sprint:** 4

#### Critères d'acceptation

1. **ÉTANT DONNÉ** que je consulte les activités d'un jour  
   **QUAND** je fais glisser une activité  
   **ALORS** je peux la déplacer avant ou après une autre activité

2. **ÉTANT DONNÉ** que je déplace une activité  
   **QUAND** je la relâche  
   **ALORS** l'ordre est sauvegardé automatiquement

3. **ÉTANT DONNÉ** que je réorganise  
   **QUAND** une activité a un horaire défini  
   **ALORS** l'horaire est ajusté automatiquement selon la nouvelle position

#### Détails techniques
- Librairie Vue Draggable ou native HTML5 Drag & Drop
- Indicateur visuel pendant le drag
- Sauvegarde optimiste avec rollback si erreur
- Recalcul des horaires si définis

#### Définition de "Done"
- [ ] Drag & drop fluide
- [ ] Sauvegarde automatique
- [ ] Feedback visuel pendant l'action
- [ ] Tests d'interaction

---

### US-011 : Déplacer une activité vers un autre jour

**En tant qu'** utilisateur  
**Je veux** déplacer une activité d'un jour à un autre  
**Afin de** réorganiser mon voyage facilement

**Priorité:** SHOULD HAVE  
**Estimation:** 3 points  
**Sprint:** 4

#### Critères d'acceptation

1. **ÉTANT DONNÉ** qu'une activité est affichée  
   **QUAND** je sélectionne "Déplacer vers"  
   **ALORS** une liste des autres jours du voyage s'affiche

2. **ÉTANT DONNÉ** que je sélectionne un jour  
   **QUAND** je valide  
   **ALORS** l'activité est déplacée vers ce jour (en fin de liste)

3. **ÉTANT DONNÉ** qu'une activité est déplacée  
   **QUAND** le déplacement est effectué  
   **ALORS** je vois une notification de confirmation

#### Détails techniques
- Menu contextuel avec option "Déplacer vers"
- Modal avec liste des jours (sauf le jour actuel)
- Insertion en fin de journée du jour cible
- Toast de confirmation

#### Définition de "Done"
- [ ] Sélection de jour intuitive
- [ ] Déplacement fonctionnel
- [ ] Notification visible
- [ ] Tests de déplacement

---

### US-012 : Ajouter des notes générales au voyage

**En tant qu'** utilisateur  
**Je veux** ajouter des notes générales à mon voyage  
**Afin de** garder des informations importantes accessibles

**Priorité:** COULD HAVE  
**Estimation:** 3 points  
**Sprint:** 4

#### Critères d'acceptation

1. **ÉTANT DONNÉ** que je suis sur le détail d'un voyage  
   **QUAND** j'accède à l'onglet "Notes"  
   **ALORS** je vois un éditeur de texte

2. **ÉTANT DONNÉ** que je saisis des notes  
   **QUAND** je termine  
   **ALORS** les notes sont sauvegardées automatiquement

3. **ÉTANT DONNÉ** que j'ai des notes  
   **QUAND** je reviens plus tard  
   **ALORS** mes notes sont toujours présentes

#### Détails techniques
- Éditeur simple (textarea ou basic rich text)
- Auto-save après 2 secondes d'inactivité
- Indicateur de sauvegarde ("Sauvegardé à XX:XX")

#### Définition de "Done"
- [ ] Éditeur fonctionnel
- [ ] Auto-save opérationnel
- [ ] Indicateur de statut visible
- [ ] Tests de sauvegarde

---

### US-013 : Vue calendrier du voyage

**En tant qu'** utilisateur  
**Je veux** voir mon voyage sous forme de calendrier  
**Afin d'** avoir une vision d'ensemble chronologique

**Priorité:** COULD HAVE  
**Estimation:** 8 points  
**Sprint:** 5

#### Critères d'acceptation

1. **ÉTANT DONNÉ** que je suis sur le détail d'un voyage  
   **QUAND** je clique sur "Vue calendrier"  
   **ALORS** je vois un calendrier avec toutes mes activités

2. **ÉTANT DONNÉ** que je consulte le calendrier  
   **QUAND** je clique sur une activité  
   **ALORS** les détails s'affichent dans un panneau latéral

3. **ÉTANT DONNÉ** que je consulte le calendrier  
   **QUAND** il y a plusieurs activités simultanées  
   **ALORS** elles sont empilées visuellement

#### Détails techniques
- Vue calendrier type agenda (jours en lignes)
- Affichage des activités en blocs horaires
- Couleurs par type d'activité
- Vue alternative à la liste des jours

#### Définition de "Done"
- [ ] Calendrier lisible et responsive
- [ ] Activités cliquables
- [ ] Gestion des chevauchements
- [ ] Bascule vue liste/calendrier

---

### US-014 : Recherche d'activités

**En tant qu'** utilisateur  
**Je veux** rechercher parmi mes activités  
**Afin de** retrouver rapidement une information

**Priorité:** COULD HAVE  
**Estimation:** 3 points  
**Sprint:** 5

#### Critères d'acceptation

1. **ÉTANT DONNÉ** que je suis sur un voyage  
   **QUAND** je saisis du texte dans la barre de recherche  
   **ALORS** seules les activités correspondantes s'affichent

2. **ÉTANT DONNÉ** que je recherche  
   **QUAND** aucune activité ne correspond  
   **ALORS** un message "Aucun résultat" s'affiche

3. **ÉTANT DONNÉ** que je recherche  
   **QUAND** je vide la barre de recherche  
   **ALORS** toutes les activités réapparaissent

#### Détails techniques
- Recherche dans : nom, adresse, notes
- Recherche insensible à la casse
- Highlight des résultats
- Filtrage côté client pour le MVP

#### Définition de "Done"
- [ ] Recherche fonctionnelle
- [ ] Highlight des résultats
- [ ] État vide géré
- [ ] Tests de recherche

---

## Récapitulatif des sprints

### Sprint 1 (10 points) - Fondations
- US-001 : Création de compte (5 pts)
- US-002 : Connexion (3 pts)
- Setup initial projet Vue.js + .NET + PostgreSQL (2 pts)

### Sprint 2 (21 points) - Gestion des voyages
- US-003 : Créer un voyage (8 pts)
- US-004 : Lister les voyages (5 pts)
- US-005 : Détail d'un voyage (5 pts)
- US-006 : Modifier un voyage (3 pts)

### Sprint 3 (15 points) - Itinéraire
- US-007 : Supprimer un voyage (2 pts)
- US-008 : Ajouter une activité (8 pts)
- US-009 : Modifier/Supprimer activité (5 pts)

### Sprint 4 (11 points) - Amélioration UX
- US-010 : Drag & Drop activités (5 pts)
- US-011 : Déplacer activité entre jours (3 pts)
- US-012 : Notes générales (3 pts)

### Sprint 5 (11 points) - Vues avancées (Optionnel)
- US-013 : Vue calendrier (8 pts)
- US-014 : Recherche activités (3 pts)

### 🎯 **FIN DU MVP WEB** - Validation utilisateurs et metrics

---

### Sprint 6+ (Post-MVP) - Mobile natif avec Capacitor

**Pré-requis:** MVP web validé avec utilisateurs

**US-015 : Migration Capacitor Android (13 points)**
- Setup Capacitor dans le projet Vue.js
- Configuration Android (build.gradle, AndroidManifest)
- Adaptation UI pour gestes natifs Android
- Tests sur devices physiques Android
- Génération APK de test
- Publication Google Play Console (beta)

**US-016 : Fonctionnalités natives Android (8 points)**
- Plugin Capacitor Geolocation (position actuelle)
- Plugin Camera (photos des lieux)
- Plugin Share (partage de voyage)
- Notifications push (Firebase Cloud Messaging)

**US-017 : Migration Capacitor iOS (8 points)** *(si besoin)*
- Configuration iOS (Xcode, Info.plist)
- Adaptation UI pour iOS
- Tests sur devices physiques iOS
- Génération IPA
- Publication App Store Connect (TestFlight)

**US-018 : Mode hors-ligne (13 points)**
- Mise en cache des voyages consultés
- Synchronisation automatique online/offline
- Gestion des conflits de données
- Indicateur de statut réseau

---

## Stratégie de déploiement

### MVP Web (Sprints 1-5)

**Pourquoi commencer par le web ?**
- ✅ Développement et itérations plus rapides
- ✅ Déploiement immédiat sans validation des stores
- ✅ Tests utilisateurs facilités (simple URL)
- ✅ Pas de contraintes des stores (politique, review)
- ✅ Updates instantanées sans réinstallation
- ✅ Un seul codebase à maintenir

**Hébergement recommandé**
- **Frontend:** Vercel, Netlify ou Azure Static Web Apps
- **Backend:** Azure App Service ou Railway
- **Base de données:** Azure Database for PostgreSQL ou Supabase
- **Assets:** Cloudflare CDN

**Environnements**
- `dev` : Développement local (localhost)
- `staging` : Tests pré-production (staging.monapp.com)
- `prod` : Production (app.monapp.com)

### Migration Capacitor (Sprint 6+)

**Quand migrer vers le mobile ?**
Uniquement après validation du MVP web :
- ✅ 100+ utilisateurs actifs
- ✅ Taux de rétention J7 > 40%
- ✅ Feedbacks positifs sur l'UX mobile web
- ✅ Demande explicite pour une app native

**Avantages de Capacitor**
- 🔄 Même code Vue.js réutilisé à 95%
- 📱 Accès aux APIs natives (caméra, GPS, notifications)
- 🚀 Publication sur Google Play et App Store
- 💾 Stockage local performant
- 📡 Fonctionnement hors-ligne avancé

**Process de migration**
1. Installation Capacitor dans le projet Vue.js existant
2. Configuration Android SDK / Xcode
3. Ajout des plugins Capacitor nécessaires
4. Tests sur émulateurs et devices physiques
5. Optimisations spécifiques mobile (gestes, performance)
6. Build et signature des packages
7. Publication sur les stores (beta fermée → publique)

**Coûts supplémentaires mobile**
- Compte développeur Google Play : 25€ one-time
- Compte développeur Apple : 99€/an
- Certificats de signature (gratuits avec Capacitor CLI)
- Device physique pour tests (optionnel mais recommandé)

---

## Métriques de succès du MVP

### Métriques techniques
- Temps de chargement page < 2s
- Disponibilité 99%
- 0 bug critique en production
- Couverture de tests > 80%

### Métriques utilisateur
- Taux d'inscription complétée > 70%
- Temps moyen de création d'un voyage < 3 min
- Nombre moyen d'activités par voyage > 5
- Taux de rétention J7 > 40%

### Critères de validation MVP
- ✅ Un utilisateur peut créer un compte et se connecter
- ✅ Un utilisateur peut créer un voyage complet avec itinéraire
- ✅ Un utilisateur peut organiser des activités jour par jour
- ✅ **L'application est responsive mobile-first** (optimisée smartphone, tablette, desktop)
- ✅ Les interactions tactiles sont fluides (swipe, tap, long press)
- ✅ Les données sont sauvegardées de façon fiable
- ✅ L'application fonctionne sur Chrome, Safari, Firefox, Edge
- ✅ Installation possible en PWA (Add to Home Screen)

**Note importante:** Le design mobile-first garantit une transition fluide vers Capacitor en Sprint 6+. Toutes les US doivent être testées prioritairement sur mobile (viewport 375px).

---

## Risques identifiés

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Complexité autocomplétion Google Places | Haut | Moyen | Prévoir fallback sur saisie manuelle |
| Performance avec beaucoup d'activités | Moyen | Faible | Pagination + lazy loading |
| Adoption utilisateur faible | Haut | Moyen | Tests utilisateurs pendant développement |
| Scope creep | Moyen | Haut | Priorisation stricte MUST/SHOULD/COULD |

---

## Dépendances techniques

### Architecture
**MVP (Sprints 1-5) : Application Web Responsive**
- SPA (Single Page Application) Vue.js 3
- API REST .NET Core
- Base de données PostgreSQL
- Hébergement : Azure App Service / Netlify (front) + Azure (back)

**Post-MVP (Sprint 6+) : Mobile natif**
- Capacitor 6+ pour encapsuler l'app web
- Génération APK Android et IPA iOS
- Plugins Capacitor pour fonctionnalités natives

### Frontend (Vue.js 3)
**Core**
- Vue 3 (Composition API)
- Vue Router 4 (navigation SPA)
- Pinia (state management)
- TypeScript (fortement recommandé)

**UI/UX**
- Tailwind CSS (styling responsive mobile-first)
- VueUse (utilitaires composables)
- Vue Draggable (réorganisation activités)
- Headless UI ou Radix Vue (composants accessibles)

**Utilitaires**
- Axios (requêtes HTTP)
- Date-fns (manipulation dates)
- VeeValidate (validation formulaires côté client)
- Vue-toastification (notifications)

**PWA**
- Vite PWA Plugin (manifest, service worker)
- Workbox (stratégies de cache)

### Backend (.NET/C# 8)
**Framework**
- ASP.NET Core 8 Web API
- Entity Framework Core 8
- PostgreSQL Provider (Npgsql)

**Sécurité & Auth**
- JWT Authentication
- BCrypt.Net (hash passwords)
- CORS configuré pour le frontend
- Rate Limiting (AspNetCoreRateLimit)

**Validation & Mapping**
- FluentValidation (validation DTO)
- AutoMapper (mapping entités/DTO)

**Email**
- MailKit ou SendGrid (emails de confirmation)

### Base de données (PostgreSQL 15+)
**Tables principales**
- Users (id, email, password_hash, created_at, email_confirmed)
- Trips (id, user_id, title, country, city, start_date, end_date, description, image_url, created_at)
- Days (id, trip_id, date, day_number)
- Activities (id, day_id, name, type, time, address, latitude, longitude, notes, order_index, created_at)

**Index**
- user_id sur Trips
- trip_id sur Days
- day_id sur Activities

### APIs externes
- **Google Places API** (autocomplétion adresses + geocoding)
- **Unsplash API** (images de destinations par défaut)

### DevOps
**Développement**
- Vite (build frontend)
- Docker Compose (dev local)
- Hot reload front & back

**CI/CD**
- GitHub Actions ou Azure DevOps
- Tests automatisés (Vitest + xUnit)
- Déploiement automatique staging/prod

### Testing
**Frontend**
- Vitest (tests unitaires)
- Cypress ou Playwright (tests E2E)
- Vue Test Utils

**Backend**
- xUnit (tests unitaires)
- FluentAssertions
- Moq (mocking)
- Integration tests avec TestContainers (PostgreSQL)

### Monitoring (Post-MVP)
- Application Insights (Azure)
- Sentry (error tracking)
- Google Analytics (usage)

---

## Prochaines étapes post-MVP

### Phase 1 : Mobile natif (Sprint 6-7)
1. **Capacitor Android** : Encapsulation de l'app web, plugins natifs
2. **Capacitor iOS** : Déploiement App Store (si besoin)
3. **Mode hors-ligne** : Synchronisation et cache local
4. **Notifications push** : Rappels avant départ, suggestions

### Phase 2 : Fonctionnalités avancées (Sprint 8+)
5. **Collaboration** : Partage de voyage, invitations, édition collaborative
6. **Budget** : Gestion des dépenses par activité, devise, répartition
7. **Réservations** : Intégration booking.com, Skyscanner, SNCF Connect
8. **Documents** : Stockage billets, réservations, passeport
9. **Export** : PDF du voyage complet, envoi par email

### Phase 3 : Intelligence (Sprint 10+)
10. **Suggestions IA** : Recommandations d'activités basées sur préférences
11. **Itinéraire optimisé** : Calcul du meilleur ordre des visites
12. **Météo prédictive** : Suggestions selon les prévisions
13. **Traduction** : Intégration Google Translate pour les activités

### Phase 4 : Social & Communauté (Sprint 12+)
14. **Partage social** : Publication Instagram, Facebook
15. **Voyages publics** : Inspiration depuis voyages d'autres utilisateurs
16. **Avis et notes** : Notation des lieux visités
17. **Carnets de voyage** : Blog intégré avec photos

### Roadmap visuelle

```
MVP Web (Sprints 1-5)
    ↓
Validation utilisateurs + Métriques
    ↓
Mobile Capacitor (Sprints 6-7) ← TU ES ICI après MVP
    ↓
Features avancées (Sprints 8+)
    ↓
Monétisation (Premium, commissions)
```
