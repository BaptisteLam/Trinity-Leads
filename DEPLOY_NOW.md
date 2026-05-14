# ⚡ Déployer MAINTENANT en 10 minutes

## Étape 1: Google Sheets API (3 min)

1. Aller sur https://console.cloud.google.com/
2. "Créer un projet" → nommez "Trinity"
3. Search "Google Sheets API" → Activer
4. Identifiants (sidebar) → "+ Créer identifiants" → Clé API
5. Copier la clé

## Étape 2: Configuration Local (2 min)

```bash
# Éditer .env
nano .env

# Remplacer:
GOOGLE_SHEETS_API_KEY=VOTRE_CLE_API_ICI

# Ctrl+X, Y pour sauvegarder
```

## Étape 3: Test Local (3 min)

```bash
npm install
npm start
# http://localhost:3000 dans le navigateur
```

Si ça marche → Screen ne devrait plus être blanc

## Étape 4: Déployer sur Railway (2 min)

```bash
# 1. Créer compte sur railway.app
# 2. Connecter GitHub
# 3. Créer nouveau projet → Connecter ce dépôt
# 4. Variables d'environnement:
#    - ANTHROPIC_API_KEY = sk-ant-...
#    - GOOGLE_SHEETS_API_KEY = ...
# 5. Deploy!
```

Votre URL: `https://trinity-leads-XXXXX.railway.app`

---

## Google Sheet Structure

Assurez-vous que votre sheet a:
```
Ligne 1 (Headers): Nom | Prénom | Secteur | Email | Date Ajout
Ligne 2+: Les données
```

---

## Test Après Deploy

```bash
# Remplacer URL par votre URL Railway
curl https://trinity-leads-XXXXX.railway.app/api/leads
```

Devrait retourner les leads du Google Sheet!

---

## Troubleshoot Écran Blanc

✅ npm install complété?
✅ ANTHROPIC_API_KEY dans .env?
✅ GOOGLE_SHEETS_API_KEY dans .env?
✅ Google Sheet partagé publiquement?

Si toujours blanc:
```bash
npm start
# F12 → Console pour voir erreurs
```
