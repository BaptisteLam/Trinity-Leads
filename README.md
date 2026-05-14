# 🎯 Trinity Leads Scraper

Application de scraping de leads ciblant les PDG et Directeurs Généraux d'entreprises entre 10 et 300 employés.

## ✨ Fonctionnalités

- 🚀 **Interface intuitive** - Bouton pour lancer le scraping en un clic
- 📊 **Dashboard en temps réel** - Voir le nombre de leads collectés
- 📥 **Export CSV** - Exporter les leads au format CSV
- 🔄 **Mise à jour automatique** - Les données se mettent à jour en temps réel
- 🎯 **Données structurées** - Nom, Prénom, Secteur, Email

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
│   ├── index.html      # Interface utilisateur
│   ├── style.css       # Styles
│   └── app.js          # Logique client
├── scrapers/
│   ├── base-scraper.js # Classe de base pour les scrapers
│   ├── directory-scraper.js # Scraper pour annuaires
│   └── index.js        # Gestionnaire des scrapers
├── server.js           # Serveur Express
├── package.json        # Dépendances
└── README.md          # Cette documentation
```

## 🔍 Scrapers Disponibles

### DirectoryScraper
Scrape les données à partir d'annuaires publics et sources structurées.

## 📈 Prochaines étapes

- [ ] Intégrer des APIs réelles (LinkedIn, Hunter.io, RocketReach)
- [ ] Ajouter une base de données (MongoDB/PostgreSQL)
- [ ] Système d'authentification
- [ ] Filtrage avancé par secteur/taille
- [ ] Planification des scraping
- [ ] Notifications d'erreur
- [ ] Support proxy
- [ ] Vérification de la validité des emails

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
