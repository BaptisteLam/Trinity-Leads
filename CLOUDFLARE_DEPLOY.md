# 🚀 Déployer sur Cloudflare

## Option 1: Cloudflare Pages (Recommandé - Gratuit)

### 1. Préparation
```bash
npm install -g wrangler
wrangler login
```

### 2. Configuration
```bash
# Créer wrangler.toml (déjà créé)
# Ajouter vos secrets:
wrangler secret put ANTHROPIC_API_KEY
# Coller: sk-ant-api03-...

wrangler secret put GOOGLE_SHEETS_API_KEY
# Coller votre clé Google API
```

### 3. Déployer
```bash
wrangler deploy
```

### 4. URL
Votre app sera sur: `https://trinity-leads.pages.dev`

---

## Option 2: Node.js sur Railway/Render

### Railway.app
```bash
# 1. Créer compte sur railway.app
# 2. Connecter repo GitHub
# 3. Configuration:
   PORT=3000
   ANTHROPIC_API_KEY=sk-ant-...
   GOOGLE_SHEETS_API_KEY=...
# 4. Deploy automatique
```

### Render.com
```bash
# 1. Créer compte render.com
# 2. Connecter repo GitHub
# 3. Build command: npm install
# 4. Start command: npm start
# 5. Environment variables:
   ANTHROPIC_API_KEY
   GOOGLE_SHEETS_API_KEY
```

---

## Google Sheets API Setup

### 1. Créer une clé API Google
1. https://console.cloud.google.com/
2. "Créer un projet" → "Trinity Leads"
3. APIs → Activer "Google Sheets API"
4. Identifiants → Créer "Clé API"
5. Copier la clé

### 2. Partager le Google Sheet
1. https://docs.google.com/spreadsheets/d/11tH6TKTKWvVBjNgh8OUjxwSRWlJun1V7M-jYagyfO6M/
2. Partage → "Accès public" (N'importe qui avec le lien)

### 3. Structure du Sheet
```
Col A: Nom
Col B: Prénom
Col C: Secteur
Col D: Email
Col E: Date Ajout
```

---

## Test Local Avant Deploy

```bash
npm install
npm start
# http://localhost:3000
```

Tester:
- "Lancer le Scraping"
- Chat avec Guillaume
- Vérifier Google Sheets se met à jour

---

## Troubleshooting

**Écran blanc?**
- Vérifier console: F12 → Console
- npm install complété?
- PORT correct?

**Google Sheets pas de connexion?**
- GOOGLE_SHEETS_API_KEY configurée?
- Sheet partagé publiquement?
- ID du sheet correct?

**Guillaume ne répond pas?**
- ANTHROPIC_API_KEY configurée?
- Internet OK?
