# 🤖 Guide Complet des Commandes Guillaume

## 📌 Aperçu

Guillaume est votre assistant IA personnel qui a accès à **100% de l'application**. Il peut:
- 📊 Analyser vos données
- ✅ Nettoyer et valider
- 📁 Classifier et enrichir
- 🚀 Contrôler le scraping
- 💡 Donner des recommandations

---

## 💬 Commandes par Catégorie

### 1️⃣ DÉMARRAGE & CONTRÔLE

#### Lance le scraping
```
"Lance le scraping"
"Démarre la collecte de leads"
"Commence à scraper"
```
**Ce que Guillaume fait:** Appelle `/api/scrape` et démarre la collecte

#### Arrête le scraping
```
"Arrête le scraping"
"Pause la collecte"
"Stoppe les opérations"
```
**Ce que Guillaume fait:** Appelle `/api/scrape/stop`

#### Statut actuel
```
"Combien de leads avons-nous?"
"Quel est le nombre total de leads?"
"Affiche le statut"
```
**Ce que Guillaume fait:** Récupère les données via `/api/leads`

---

### 2️⃣ ANALYSE DES DONNÉES

#### Analyse complète
```
"Analyse les leads et donne-moi un rapport complet"
"Fais une analyse détaillée des leads"
"Analyse tous les leads"
```
**Ce que Guillaume fait:** 
- Compte les leads par secteur
- Identifie les doublons
- Évalue la qualité

#### Analyse par secteur
```
"Quel secteur représente le plus de leads?"
"Quels sont les secteurs les plus représentés?"
"Distribue les leads par secteur"
```
**Ce que Guillaume fait:** Regroupe et compte les leads par secteur

#### Qualité des données
```
"Quelle est la qualité de mes leads?"
"Évalue la qualité globale"
"Comment est la qualité?"
```
**Ce que Guillaume fait:**
- Vérifie les emails valides
- Compte les leads complets
- Donne un score de qualité

#### Doublons
```
"Cherche les doublons"
"Y a-t-il des emails en double?"
"Identifie les leads dupliqués"
```
**Ce que Guillaume fait:** Cherche les emails dupliqués

---

### 3️⃣ NETTOYAGE & VALIDATION

#### Valide tous les emails
```
"Valide tous les emails"
"Vérifie les emails invalides"
"Valide et nettoie les emails"
```
**Ce que Guillaume fait:**
- Valide le format de chaque email
- Signale les problèmes
- Peut les supprimer

#### Supprime les invalides
```
"Supprime les emails invalides"
"Nettoie les mauvais emails"
"Enlève les emails qui ne sont pas valides"
```
**Ce que Guillaume fait:**
- Vérifie chaque email
- Supprime ceux invalides
- Reporte le nombre supprimé

#### Formats d'email
```
"Vérifie le format de tous les emails"
"Quels emails ont un mauvais format?"
"Analyse les formats d'email"
```
**Ce que Guillaume fait:**
- Utilise la validation regex
- Identifie les formats corrects/incorrects
- Donne un rapport détaillé

---

### 4️⃣ CLASSIFICATION

#### Par secteur
```
"Classifie les leads par secteur"
"Groupe par secteur"
"Trie par secteur d'activité"
```
**Ce que Guillaume fait:**
- Crée des groupes par secteur
- Compte les leads par groupe
- Affiche la distribution

#### Par taille d'entreprise
```
"Classifie par taille d'entreprise"
"Trie par taille de company"
"Groupe les startups, PME, enterprise"
```
**Ce que Guillaume fait:**
- Estime la taille d'après le domaine
- Crée 3 catégories (startup/PME/enterprise)
- Donne le nombre par catégorie

#### Par titre de poste
```
"Classifie par titre (PDG/DG)"
"Groupe par poste"
"Trie les PDG et DG"
```
**Ce que Guillaume fait:**
- Analyse les titres
- Crée des groupes (PDG/DG)
- Reporte les nombres

---

### 5️⃣ ENRICHISSEMENT

#### Ajoute les noms d'entreprise
```
"Enrichis avec les noms d'entreprise"
"Ajoute le nom de la company"
"Complète avec les domaines"
```
**Ce que Guillaume fait:**
- Extrait le domaine de l'email
- Génère le nom de l'entreprise
- Ajoute au profil du lead

#### Complète les données
```
"Complète les informations manquantes"
"Enrichis les données"
"Ajoute les infos qu'il manque"
```
**Ce que Guillaume fait:**
- Analyse ce qui manque
- Essaie de compléter intelligemment
- Reutilise les données existantes

---

### 6️⃣ INSIGHTS & RECOMMANDATIONS

#### Rapport complet
```
"Donne-moi un rapport complet"
"Résume la situation"
"Fais un recap détaillé"
```
**Ce que Guillaume fait:**
- Stats complètes
- Qualité overview
- Tendances principales
- Recommandations

#### Tendances
```
"Quelles sont les tendances?"
"Analyse les tendances"
"Quels sont les patterns?"
```
**Ce que Guillaume fait:**
- Identifie les secteurs dominants
- Détecte les patterns
- Propose des insights

#### Recommandations
```
"Donne-moi tes recommandations"
"Quoi faire maintenant?"
"Quel est ton avis?"
"Que dois-je faire?"
```
**Ce que Guillaume fait:**
- Analyse la qualité
- Suggestion d'améliorations
- Propose les prochaines étapes

#### Rapport de qualité
```
"Génère un rapport de qualité"
"Score de qualité?"
"C'est bon ma data?"
```
**Ce que Guillaume fait:**
- Score de qualité (%)
- Nombre d'emails valides
- Nombre de leads complets
- Status global (Excellent/À améliorer)

---

## 🎯 Exemples de Conversations

### Exemple 1: Démarrer simple
```
Vous: "Lance le scraping"
Guillaume: ✅ Démarre le scraping
           Lancer le scraping...

Vous: "Combien de leads?"
Guillaume: 📊 45 leads collectés

Vous: "Valide les emails"
Guillaume: ✅ Validation complète
           38 emails valides, 7 invalides
```

### Exemple 2: Analyse complète
```
Vous: "Analyse tout et donne-moi un rapport"
Guillaume: 📊 Rapport complet:
           • 45 leads au total
           • 15 en Technologie, 12 en Finance, 18 autre
           • 92% d'emails valides
           • Score de qualité: 85/100
           ✅ Très bon! Continue ainsi.
```

### Exemple 3: Nettoyage
```
Vous: "Nettoie tout"
Guillaume: 🧹 Nettoyage:
           ✅ Emails validés
           🗑️ 7 emails invalides supprimés
           📁 Classification par secteur
           💾 Donnée enrichie
           
           Résultat: 38 leads de haute qualité
```

---

## 🔧 Conseils Pro

### ✅ Meilleure Pratique
- **Soyez spécifique** - "Valide et nettoie" plutôt que "Fais quelque chose"
- **Utilisez les verbes d'action** - "Analyse", "Valide", "Classifie"
- **Demandez des rapports** - Guillaume aime partager les résultats
- **Chaînez les actions** - "Lance le scraping, attends, puis analyse"

### 💡 Astuces
- Vous pouvez utiliser des questions naturelles
- Guillaume comprend le contexte
- Relancez pour plus de détails: "Explique le secteur Finance"
- Demandez des conseils: "Comment améliorer la qualité?"

### 🚀 Automatisation
- Vous pouvez tout faire via chat
- Pas besoin de cliquer sur les boutons si vous préférez
- Guillaume gère tout en arrière-plan

---

## 📊 Outils Disponibles pour Guillaume

Chaque commande utilise un ou plusieurs de ces outils:

| Outil | Qu'est-ce qu'il fait |
|-------|-------------------|
| `analyze_leads` | Analyse complète des données |
| `validate_emails` | Vérifie la validité des emails |
| `classify_leads` | Groupe par critères |
| `generate_insights` | Crée rapports et stats |
| `enrich_leads` | Ajoute infos manquantes |
| `start_scraping` | Démarre la collecte |
| `stop_scraping` | Arrête la collecte |
| `get_leads_data` | Récupère les données |

---

## 🆘 Dépannage

### Guillaume ne répond pas
```
Vous: "Réinitialise la conversation"
Guillaume: ♻️ Conversation réinitialisée!
```

### Le résultat n'est pas bon
```
Vous: "Peux-tu expliquer pourquoi?"
Guillaume: Explique ses actions
```

### Vous changez d'avis
```
Vous: "Annule la dernière action"
Guillaume: ❌ Action annulée (dans les limites)
```

---

## 💬 Phrases Magiques

Essayez ces formules:

- **Pour tout faire d'un coup:** "Lance un audit complet"
- **Pour nettoyer:** "Nettoie et optimise"
- **Pour explorer:** "Fais une analyse approfondie"
- **Pour décider:** "Que recommandes-tu?"
- **Pour vérifier:** "Montre-moi la qualité"

---

**Astuce finale:** Guillaume apprend votre style. Plus vous discutez, plus il comprend ce que vous voulez! 🚀
