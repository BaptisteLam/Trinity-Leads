# 🎯 Trinity Leads Scraper

Application intelligente de scraping de leads ciblant les PDG et Directeurs Généraux d'entreprises entre 10 et 300 employés, avec assistant IA intégré.

## ✨ Fonctionnalités

### 🎨 Interface & Dashboard
- 🚀 **Interface intuitive** - Bouton pour lancer le scraping en un clic
- 📊 **Dashboard en temps réel** - Voir le nombre de leads collectés
- 📥 **Export CSV** - Exporter les leads au format CSV
- 🔄 **Mise à jour automatique** - Les données se mettent à jour en temps réel
- 🎯 **Données structurées** - Nom, Prénom, Secteur, Email

### 🤖 Guillaume AI - Assistant IA Intégré
- 💬 **Chat en temps réel** - Conversez avec Claude directement dans l'app
- 📊 **Analyse des leads** - Identificatio de patterns et tendances
- ✅ **Validation d'emails** - Nettoyage et vérification automatique
- 📁 **Classification** - Tri par secteur, taille, titre
- 🔍 **Enrichissement** - Ajout d'informations complémentaires
- 📈 **Insights** - Statistiques, tendances et recommandations
- 🎮 **Contrôle du scraping** - Lancer/arrêter les processus via l'IA

## 🛠️ Installation

### Prérequis
- Node.js v14+ 
- npm ou yarn

### Setup

```bash
# 1. Cloner le dépôt
git clone <repo-url>
cd Trinity-Leads

# 2. Installer les dépendances
npm install

# 3. Créer le fichier .env
cp .env.example .env

# 4. Démarrer le serveur
npm start
# ou en mode développement
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 📖 Utilisation

### Interface Graphique

1. **Lancer le scraping** - Cliquez sur "Lancer le Scraping"
2. **Voir les résultats** - Les leads s'affichent en temps réel dans le tableau
3. **Exporter** - Cliquez sur "Exporter CSV" pour télécharger les données

### 🤖 Utiliser Guillaume (Assistant IA)

Guillaume est disponible dans le panel de chat à droite. Exemples de commandes:

#### Analyse & Rapports
```
"Analyse les leads et donne-moi un rapport complet"
"Quelle est la qualité de mes emails?"
"Quel secteur représente le plus de leads?"
```

#### Nettoyage & Validation
```
"Valide tous les emails et supprime les invalides"
"Nettoie les données dupliquées"
"Vérifie le format de tous les emails"
```

#### Classification
```
"Classifie les leads par secteur"
"Trie les leads par taille d'entreprise"
"Groupe les leads par titre de poste"
```

#### Enrichissement
```
"Enrichis les données avec les noms d'entreprise"
"Complète les informations manquantes"
```

#### Insights & Recommandations
```
"Génère un rapport de qualité"
"Quelles sont les tendances?"
"Donne-moi tes recommandations"
"Résume les statistiques"
```

#### Contrôle du Scraping
```
"Lance le scraping"
"Arrête le scraping"
"Combien de leads avons-nous?"
```

### API REST

#### Démarrer le scraping
```bash
POST /api/scrape
Content-Type: application/json

{
  "scraperType": "directory"
}
```

#### Obtenir les leads
```bash
GET /api/leads
```

#### Ajouter un lead manuellement
```bash
POST /api/leads/add
Content-Type: application/json

{
  "nom": "Martin",
  "prenom": "Jean",
  "secteur": "Technologie",
  "email": "jean.martin@company.fr"
}
```

#### Obtenir le statut
```bash
GET /api/status
```

#### Arrêter le scraping
```bash
POST /api/scrape/stop
```

#### Réinitialiser les leads
```bash
POST /api/leads/reset
```

## 🏗️ Architecture

```
Trinity-Leads/
├── public/
│   ├── index.html      # Interface utilisateur (Dashboard + Chat)
│   ├── style.css       # Styles (incluant panel Guillaume)
│   └── app.js          # Logique client + Chat
├── scrapers/
│   ├── base-scraper.js # Classe de base pour les scrapers
│   ├── directory-scraper.js # Scraper pour annuaires
│   └── index.js        # Gestionnaire des scrapers
├── services/
│   └── guillaume-ai.js  # Assistant IA avec outils Claude
├── server.js           # Serveur Express + endpoints IA
├── .env                # Configuration (clé API)
├── package.json        # Dépendances
├── SETUP.md           # Guide d'installation
└── README.md          # Cette documentation
```

### Guillaume AI Architecture

```
┌─────────────────────────────────────────┐
│         UTILISATEUR (Chat)              │
└────────────────────┬────────────────────┘
                     │
                     ↓
         ┌───────────────────────┐
         │   Express API         │
         │ /api/guillaume/chat   │
         └───────────┬───────────┘
                     │
                     ↓
         ┌───────────────────────┐
         │   GuillaumeAI Class   │
         │  (services/...)       │
         └───────────┬───────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ↓                       ↓
    Claude API          8 Tools d'Exécution:
  (Anthropic)          • analyze_leads
                       • validate_emails
                       • classify_leads
                       • generate_insights
                       • enrich_leads
                       • start_scraping
                       • stop_scraping
                       • get_leads_data
                       │
                       ↓
            ScrapeManager + Base de données
```

## 🔍 Scrapers Disponibles

### DirectoryScraper
Scrape les données à partir d'annuaires publics et sources structurées.

## ✅ Fonctionnalités Implémentées

- ✅ Interface intuitive avec dashboard
- ✅ Assistant IA Guillaume (Claude) intégré
- ✅ Chat en temps réel
- ✅ 8 outils IA pour manipuler les données
- ✅ Validation d'emails
- ✅ Analyse et classification des leads
- ✅ Export CSV
- ✅ Contrôle du scraping par l'IA

## 📈 Prochaines étapes

- [ ] Intégrer des APIs réelles (LinkedIn, Hunter.io, RocketReach)
- [ ] Ajouter une base de données (MongoDB/PostgreSQL)
- [ ] Système d'authentification & gestion des utilisateurs
- [ ] Filtrage avancé par secteur/taille/région
- [ ] Planification automatique des scraping
- [ ] Notifications et alertes
- [ ] Support proxy pour le scraping
- [ ] Améliorer la détection de doublons
- [ ] Dashboard d'analytics avancé
- [ ] Historique complet des opérations
- [ ] Suggestions intelligentes via Claude

## ⚠️ Notes Légales

- Respectez les conditions d'utilisation des sites scrappés
- Vérifiez les lois sur le scraping dans votre juridiction
- Respectez les délais de requête pour ne pas surcharger les serveurs
- Utilisez des emails valides uniquement

## 🤝 Contribution

Pour contribuer, ouvrez une pull request avec vos améliorations.

## 📞 Support

Pour toute question ou problème, créez une issue dans le dépôt.

---

**Créé avec ❤️ pour Trinity**
