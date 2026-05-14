# 🚀 COMMENCER ICI

## 3 Étapes pour Lancer

### 1️⃣ Installer (1 min)
```bash
cd Trinity-Leads
npm install
```

### 2️⃣ Configurer Google Sheets (2 min)
```bash
# Aller sur https://console.cloud.google.com/
# Créer projet "Trinity"
# Activer "Google Sheets API"
# Créer clé API
# 
# Éditer .env:
GOOGLE_SHEETS_API_KEY=AIzaSy...VOTRE_CLE...
```

### 3️⃣ Lancer (1 min)
```bash
npm start
# Ouvrir: http://localhost:3000
```

---

## ✅ Vérifier que ça Marche

1. Page charge sans écran blanc ✅
2. Cliquer "Lancer le Scraping" ✅
3. Tableau se remplit ✅
4. Parlez à Guillaume à droite ✅

---

## 🤖 Essayer Guillaume

Taper dans le chat:
```
"Analyse les leads"
"Valide les emails"
"Donne-moi un rapport"
"Classifie par secteur"
```

---

## 🚀 Déployer

### Option Railway (Recommandé)

```bash
# 1. Créer compte railway.app
# 2. Connecter ce GitHub repo
# 3. Ajouter variables:
#    - ANTHROPIC_API_KEY=sk-ant-...
#    - GOOGLE_SHEETS_API_KEY=AIza...
# 4. Deploy!
```

Votre URL: `https://trinity-leads-XXX.railway.app`

### Option Cloudflare
```bash
npm run deploy:cloudflare
```

---

## 📊 Google Sheets

Vos données vont ici:
https://docs.google.com/spreadsheets/d/11tH6TKTKWvVBjNgh8OUjxwSRWlJun1V7M-jYagyfO6M/

---

## 🆘 Problème?

**Écran blanc?**
```bash
npm start
# F12 → Console pour voir erreur
```

**Guillaume ne répond pas?**
- Vérifier ANTHROPIC_API_KEY dans .env

**Google Sheets ne se met pas à jour?**
- Vérifier GOOGLE_SHEETS_API_KEY

---

## 📚 Docs Complètes

- `README.md` - Doc générale
- `QUICK_START.md` - 5 min setup
- `GUILLAUME_COMMANDS.md` - Toutes les commandes
- `GOOGLE_SHEETS_SETUP.md` - Config détaillée Google
- `DEPLOY_NOW.md` - Déploiement
- `CLOUDFLARE_DEPLOY.md` - Cloudflare spécifique

---

**C'est tout! Vous êtes prêt.** 🎉

Questions? Consultez les docs ou relancez npm start.
