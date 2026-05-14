# 📊 Configuration Google Sheets

## Votre Google Sheet

📍 https://docs.google.com/spreadsheets/d/11tH6TKTKWvVBjNgh8OUjxwSRWlJun1V7M-jYagyfO6M/

### Vérifier la Structure

1. Ouvrir le lien ci-dessus
2. Vérifier les colonnes:
   - **A**: Nom
   - **B**: Prénom
   - **C**: Secteur
   - **D**: Email
   - **E**: Date Ajout

Si colonnes manquent, les ajouter!

---

## Obtenir la Clé API Google

### 1. Créer un Projet Google Cloud

```
https://console.cloud.google.com/
```

- Cliquer "Créer un projet"
- Nommer: "Trinity Leads"
- Cliquer "Créer"

### 2. Activer Google Sheets API

```
console.cloud.google.com/apis/library
```

- Search: "Google Sheets API"
- Cliquer dessus
- Cliquer "Activer"

### 3. Créer une Clé API

```
console.cloud.google.com/apis/credentials
```

- Cliquer "+ Créer identifiants"
- Sélectionner "Clé API"
- Copier la clé → Sauvegarder

### 4. Ajouter à .env

```bash
# Éditer .env
GOOGLE_SHEETS_API_KEY=AIzaSy...VOTRE_CLE...
```

---

## Partager le Google Sheet

1. Ouvrir le sheet
2. Cliquer "Partage" (en haut à droite)
3. Changer en "Accès public" ou "N'importe qui avec le lien"
4. Copier le lien de partage

⚠️ **Important**: Le sheet doit être accessible publiquement pour lire les données

---

## Comment ça Marche

### Cycle de Données

```
Vous lancez scraping
     ↓
Guillaume scrape les leads
     ↓
Leads stockés en mémoire (app)
     ↓
Guillaume fait actions (valide, analyse, etc)
     ↓
Données synchronisées → Google Sheets
     ↓
Google Sheet mis à jour en temps réel
```

### Exemples d'Actions

**Scraping:**
```
Vous: "Lance le scraping"
App: Scrape les données
Result: Leads dans app → Syncro Google Sheets
```

**Validation:**
```
Vous: "Valide les emails"
Guillaume: Valide chaque email
Result: Emails valides → Google Sheets
```

**Classification:**
```
Vous: "Classifie par secteur"
Guillaume: Ajoute colonne "Secteur enrichi"
Result: Données classées → Google Sheets
```

---

## Vérifier la Synchronisation

### Local (npm start)

1. Lancer app: `npm start`
2. Go to: http://localhost:3000
3. Lancer scraping
4. Ouvrir Google Sheet → Vérifier les lignes sont ajoutées

### Cloud (Railway)

1. Après déploiement sur Railway
2. Demander à Guillaume: "Combien de leads?"
3. Ouvrir Google Sheet
4. Voir les leads s'ajouter en temps réel

---

## API Endpoints Google Sheets

### Lire les données
```bash
GET /api/leads
# Retourne tous les leads du Google Sheet
```

### Ajouter un lead
```bash
POST /api/leads/add
{
  "nom": "Dupont",
  "prenom": "Jean",
  "secteur": "Technologie",
  "email": "jean@tech.fr"
}
# Ajoute au Google Sheet
```

### Synchroniser
```bash
POST /api/leads/sync
# Force la synchro avec Google Sheet
```

### Dashboard
```bash
GET /api/dashboard
# Stats + nombre de leads du Google Sheet
```

---

## Troubleshoot

### "Erreur lors de la lecture"

✅ GOOGLE_SHEETS_API_KEY configurée?
✅ Clé valide?
✅ Sheet partagé publiquement?

### "Leads ne s'ajoutent pas"

Pour écrire dans Google Sheets via API publique, vous avez 2 options:

1. **Google Apps Script** (Recommandé)
   - Créer un webhook Apps Script
   - Appelé par notre app

2. **Service Account** (Avancé)
   - Télécharger credentials.json
   - Partager le sheet avec le service account

Pour maintenant: **Lecture seule fonctionnelle**

---

## Prochaines Étapes

Pour écrire automatiquement:

1. Créer Google Apps Script
2. Déployer comme webhook
3. Appeler depuis notre app

Ou contactez-moi pour configuration complète!
