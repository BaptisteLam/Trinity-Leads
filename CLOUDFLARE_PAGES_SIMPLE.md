# 🚀 Déployer sur Cloudflare Pages (Version Simple)

## ⚡ Méthode Recommandée: Railway.app

**Franchement, Cloudflare Pages n'est pas idéale pour Node.js**

Utilisez plutôt **Railway.app** (plus simple):

```bash
1. Créer compte: railway.app
2. Connecter ce GitHub repo
3. Ajouter variables d'env
4. Deploy! (automatique)
```

→ URL: `https://trinity-leads-XXX.railway.app`

---

## ☁️ Si vous voulez Cloudflare Pages quand même:

### Option 1: Cloudflare Pages + Workers (Recommandé)

```bash
# 1. Installer Wrangler
npm install -D wrangler

# 2. Login
wrangler login

# 3. Créer KV Namespace
wrangler kv:namespace create "LEADS_KV"

# 4. Ajouter secrets
wrangler secret put ANTHROPIC_API_KEY
# Coller votre clé

# 5. Deploy
wrangler deploy
```

**Mais:** Node modules (puppeteer, express) ne marchent pas sur Workers

---

### Option 2: Static Site + API Externe

**Déployer le frontend sur Cloudflare Pages**, backend ailleurs:

1. **Frontend:** Cloudflare Pages (public/ folder)
2. **Backend:** Railway.app, Vercel, ou Render

```
Frontend (Pages)  ←→  Backend (Railway)
```

**Avantage:** Séparation claire, facile à maintenir

---

## 🔧 Setup Détaillé Railway (RECOMMANDÉ)

### 1. Créer Compte
- https://railway.app
- Sign up avec GitHub

### 2. Créer Nouveau Projet
- "Create New Project"
- "Deploy from GitHub repo"
- Sélectionner "trinity-leads"

### 3. Configuration
```
Environment Variables:
  ANTHROPIC_API_KEY = sk-ant-...
  GOOGLE_SHEETS_API_KEY = AIza...
  NODE_ENV = production
  PORT = 3000
```

### 4. Deploy
- Railway détecte automatique Node.js
- Build: `npm install`
- Start: `npm start`
- Auto deploy!

### 5. Votre URL
```
https://trinity-leads-XXXXX.railway.app
```

---

## 🌐 Pourquoi Cloudflare Pages n'est pas idéale?

| Aspect | Cloudflare | Railway |
|--------|-----------|---------|
| Node.js Backend | ❌ Limited | ✅ Full support |
| npm packages | ⚠️ Limité | ✅ Tous |
| Puppeteer | ❌ Non | ✅ Oui |
| Express.js | ❌ Non | ✅ Oui |
| Gratuit | ✅ Oui | ✅ $5/mois |
| Setup | ❌ Complexe | ✅ Simple |

---

## 📝 Si vous insistez pour Cloudflare:

### Créer Frontend Séparé

```bash
# public/ dossier → Cloudflare Pages
# Backend → Autres services

# Adapter app.js pour API externe:
const API_URL = 'https://votre-backend.railway.app/api'
```

---

## ✅ Recommandation Finale

**Utilisez Railway** - C'est:
- ✅ Plus simple
- ✅ Plus rapide
- ✅ Mieux supporté
- ✅ Coût raisonnable
- ✅ Gratuit pour 5GB/mois

**Instructions:** Voir ci-dessus "Setup Détaillé Railway"

---

**Prêt?** → https://railway.app
