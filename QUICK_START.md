# ⚡ Démarrage Rapide - 5 minutes!

## 1️⃣ Installation (2 min)

```bash
# Cloner et entrer dans le dossier
git clone <url>
cd Trinity-Leads

# Installer les dépendances
npm install

# Créer le fichier .env avec votre clé
cp .env.example .env
# Éditez .env et ajoutez votre ANTHROPIC_API_KEY
```

## 2️⃣ Lancer l'app (1 min)

```bash
npm start
```

Ouvrez: **http://localhost:3000**

## 3️⃣ Utiliser Guillaume (2 min)

### Via Interface
1. Cliquez "Lancer le Scraping" 🎯
2. Attendez les leads
3. Parlez à Guillaume → "Analyse les leads"

### Via Chat Guillaume
Tapez directement dans le chat:
- "Lance le scraping"
- "Valide les emails"
- "Génère un rapport"
- "Classifie par secteur"

## 🎯 Exemple Workflow

```
1. Interface charge → http://localhost:3000
2. Click "Lancer le Scraping" (ou parlez à Guillaume)
3. Attendez 5-10 secondes
4. Tableau se remplit avec les leads
5. Demandez à Guillaume: "Donne-moi un rapport"
6. Guillaume analyse et répond en français
7. Cliquez "Exporter CSV" pour sauvegarder
```

## 🤖 Guillaume Fait Ceci

```
✅ Analyser les leads
✅ Valider les emails
✅ Classifier par secteur
✅ Générer des insights
✅ Lancer/arrêter le scraping
✅ Donner des recommandations
```

## 💡 Pro Tips

- **Conversation naturelle**: Parlez à Guillaume comme un collègue
- **Actions rapides**: Les 3 boutons du chat pour actions courantes
- **Tout en français**: Demandez en français, réponse en français!
- **Export facile**: CSV avec 1 clic après analyse

## 🆘 Si ça marche pas

**Port 3000 occupé?**
```bash
PORT=3001 npm start
```

**Module manquant?**
```bash
npm install --save @anthropic-ai/sdk validator
npm start
```

**Guillaume ne répond pas?**
- Vérifiez `.env` a la bonne clé API
- Vérifiez la connexion internet
- Relancez l'app

## 📚 Pour Plus

- `README.md` - Documentation complète
- `SETUP.md` - Configuration détaillée  
- `GUILLAUME_COMMANDS.md` - Liste des commandes

---

**Prêt? → http://localhost:3000** 🚀
