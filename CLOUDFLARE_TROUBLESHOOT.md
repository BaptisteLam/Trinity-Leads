# 🔧 Troubleshoot Cloudflare

## Problèmes Courants

### ❌ Error: "Worker exceeded CPU time limit"

**Cause:** Express.js + middleware trop lourd pour Workers

**Solution:** Utiliser Railway ou Vercel à la place

### ❌ "Module not found: puppeteer"

**Cause:** Puppeteer n'est pas compatible Cloudflare Workers

**Solution:** Utiliser une API externe pour le scraping

### ❌ "Cannot use CommonJS require() in Workers"

**Cause:** Workers utilise ES Modules, pas CommonJS

**Votre code:** `const express = require('express')` ❌  
**Correction:** `import express from 'express'` ✅

---

## 🚨 Le Vrai Problème

Votre app a besoin:
- ❌ Express.js (pas compatible Workers)
- ❌ Puppeteer (pas compatible Workers)  
- ❌ Node.js modules lourds

Cloudflare Workers a des limites:
- ✅ Idéal pour APIs légères
- ❌ Pas bon pour Node.js complet

---

## ✅ Solutions

### Option 1: Railway.app (RECOMMANDÉ)
- Node.js complet supporté
- Express.js fonctionne
- Puppeteer fonctionne
- Très simple à déployer

→ Voir: `CLOUDFLARE_PAGES_SIMPLE.md`

### Option 2: Vercel
```bash
npm install -g vercel
vercel
```

Fonctionne comme Railway

### Option 3: Render.com
- Similar à Railway
- Support complet Node.js

### Option 4: Heroku
- Gratuit (avec limites)
- Node.js complet

---

## 📋 Checklist Cloudflare Pages

Si vous voulez vraiment Cloudflare:

- [ ] Séparer frontend (Pages) et backend
- [ ] Réécrire backend en Workers JS pur
- [ ] Retirer express.js
- [ ] Retirer puppeteer
- [ ] Utiliser fetch API simple
- [ ] Déployer frontend sur Pages
- [ ] Déployer backend sur Workers

**C'est compliqué.** Railway est 10x plus simple.

---

## 🎯 Décision Rapide

**Vous voulez Node.js complet?** → **Railway** ✅
**Vous voulez Cloudflare?** → **Réécrire l'app** ❌❌❌

---

**Recommandation:** Utilisez Railway!

```bash
1. railway.app
2. Connecter GitHub
3. Deploy!
```

Terminé en 5 minutes.
