# 🚀 Guide de Configuration - Trinity Leads Scraper

## Installation Complète

### 1. Prérequis
- Node.js v14+
- npm ou yarn
- Clé API Anthropic (pour Guillaume AI)

### 2. Installation des dépendances

```bash
npm install
```

### 3. Configuration

Créez un fichier `.env` (ou copier `.env.example`):

```bash
cp .env.example .env
```

Modifiez `.env` avec votre clé API Anthropic:
```
ANTHROPIC_API_KEY=votre_clé_api_ici
```

### 4. Lancement

```bash
# Mode développement (avec auto-reload)
npm run dev

# Ou mode production
npm start
```

L'application sera disponible sur: **http://localhost:3000**

---

## 🤖 Fonctionnalités de Guillaume (Assistant IA)

Guillaume peut faire tout cela directement depuis l'interface:

### ✅ Analyse des Leads
```
"Analyse les leads et donne-moi un rapport complet"
"Quelle est la qualité de mes emails?"
"Quel secteur représente le plus de leads?"
```

### ✅ Validation & Nettoyage
```
"Valide tous les emails et supprime les invalides"
"Nettoie les données dupliquées"
"Vérifie le format de tous les emails"
```

### ✅ Classification
```
"Classifie les leads par secteur"
"Trie les leads par taille d'entreprise"
"Groupe les leads par titre de poste"
```

### ✅ Enrichissement
```
"Enrichis les données avec les noms d'entreprise"
"Ajoute des numéros de téléphone estimés"
"Complète les informations manquantes"
```

### ✅ Insights & Statistiques
```
"Génère un rapport de qualité"
"Quelles sont les tendances?"
"Donne-moi tes recommandations"
"Résume les statistiques"
```

### ✅ Contrôle du Scraping
```
"Lance le scraping"
"Arrête le scraping"
"Combien de leads avons-nous?"
```

---

## 📊 Structure de l'Application

```
┌─────────────────────────────────────────────────────┐
│              TRINITY LEADS SCRAPER                   │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌──────────────────────┐   ┌──────────────────┐   │
│  │   DASHBOARD          │   │   GUILLAUME AI   │   │
│  │ - Leads Count        │   │ - Chat Interface │   │
│  │ - Status             │   │ - Quick Actions  │   │
│  │ - Leads Table        │   │ - Real-time Help │   │
│  │                      │   │                  │   │
│  └──────────────────────┘   └──────────────────┘   │
│                                                       │
└─────────────────────────────────────────────────────┘
        ↓                              ↓
   ┌─────────────┐              ┌──────────────┐
   │   BACKEND   │              │  GUILLAUME   │
   │  ┌────────┐ │              │      AI      │
   │  │Scraper │ │◄──────────────┤ (Claude)    │
   │  │Manager │ │              │  w/ Tools   │
   │  └────────┘ │              └──────────────┘
   │  ┌────────┐ │
   │  │ Routes │ │
   │  └────────┘ │
   └─────────────┘
```

---

## 🔧 API Endpoints

### Scraping
- `POST /api/scrape` - Démarrer le scraping
- `POST /api/scrape/stop` - Arrêter le scraping
- `GET /api/status` - État du scraping

### Leads
- `GET /api/leads` - Tous les leads
- `POST /api/leads/add` - Ajouter un lead
- `POST /api/leads/reset` - Réinitialiser les leads
- `GET /api/dashboard` - Dashboard stats

### Guillaume AI
- `POST /api/guillaume/chat` - Envoyer un message
- `POST /api/guillaume/reset` - Réinitialiser la conversation
- `GET /api/guillaume/status` - État de Guillaume

---

## 🧪 Test Rapide

1. Ouvrir http://localhost:3000
2. Cliquer sur "Lancer le Scraping"
3. Dans le chat Guillaume (à droite):
   - Dire: "Lance le scraping"
   - Ou: "Analyse les leads"
   - Ou: "Valide les emails"

Guillaume exécutera l'action et te donnera des résultats!

---

## 🔐 Notes de Sécurité

- ⚠️ **Ne commitez JAMAIS le fichier `.env`** avec la clé API
- ✅ `.env` est dans `.gitignore`
- ✅ Utilisez `.env.example` pour les variables sans valeurs sensibles

---

## 🐛 Dépannage

### Guillaume ne répond pas
- Vérifiez que `ANTHROPIC_API_KEY` est correctement définie
- Vérifiez les logs du serveur: `npm run dev`

### Erreur "Cannot find module"
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 déjà utilisé
```bash
# Changer le port
PORT=3001 npm start
```

---

## 📖 Pour Plus d'Infos

Voir `README.md` pour la documentation complète.
