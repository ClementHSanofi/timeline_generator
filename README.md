# Générateur de Ligne de Vie (Timeline)

Application légère de création de timelines personnalisées, **100% locale**, sans installation requise.  
Fonctionne directement dans le navigateur via un simple fichier HTML.

---

## Démarrage rapide

Aucune installation nécessaire.

```bash
# Cloner ou télécharger le projet
git clone https://github.com/ClementHSanofi/timeline_generator.git

# Ouvrir le fichier principal dans votre navigateur
open index.html
```

---

## Architecture du projet

```
timeline-generator/
│
├── index.html                  # Point d'entrée — structure de la page
│
├── css/
│   ├── main.css                # Styles globaux, variables CSS, reset
│   ├── form.css                # Styles du formulaire de saisie
│   └── timeline.css            # Styles du rendu visuel de la timeline
│
├── js/
|   ├── models/
|   |   └── event.model.js      # Structure de donnée d'un événement
|   |
│   ├── app.js                  # Point d'entrée JS — initialisation et orchestration
│   ├── form.js                 # Gestion du formulaire (ajout, suppression, validation)
|   ├── formatting.js           # Changement du format des titres et descriptions (Gras, Italic, Soulignés)
│   ├── timeline.js             # Construction et rendu de la timeline dans le DOM
│   ├── pdf.js                  # Export PDF via jsPDF (chargé en CDN)
│   └── utils.js                # Fonctions utilitaires partagées (formatage dates, tri, etc.)
│
├── assets/
│   └── icons/                  # Icônes SVG utilisées dans l'interface
│
└── README.md
```

> **Note :** Aucune dépendance installée localement. Les librairies externes (ex: jsPDF) sont chargées via CDN directement dans `index.html`.

---

## Fonctionnalités

### Saisie des données
- [x] Formulaire de saisie d'événements (titre, date, heure, description)
- [x] Ajout dynamique d'autant d'événements que nécessaire
- [x] Suppression d'un événement individuel
- [x] Marquage d'un événement comme **élément principal** (mis en valeur visuellement)

### Mise en forme du texte
- [x] Formatage **gras**, *italique*, <u>souligné</u> sur le titre et la description
- [x] Barre d'outils de formatage intégrée au formulaire

### Rendu de la timeline
- [x] Tri automatique des événements du plus ancien au plus récent
- [ ] Séparation visuelle claire entre chaque événement
- [ ] Mise en valeur de l'élément principal (accentuation en rouge)
- [ ] Aperçu en temps réel dans le navigateur

### Export
- [ ] Export en **PDF** fidèle au rendu visuel
- [ ] Export en image PNG *(prévu — v2)*
- [ ] Sauvegarde / chargement d'un projet en JSON *(prévu — v2)*

---
## Stack technique

| Technologie | Rôle |
|-------------|------|
| HTML5 sémantique | Structure de la page |
| CSS3 (variables, flexbox/grid) | Mise en page et styles |
| JavaScript Vanilla (ES6+) | Logique applicative |
| [jsPDF](https://github.com/parallax/jsPDF) *(CDN)* | Génération du PDF |


## Roadmap

### v1 — MVP
- Formulaire complet avec formatage texte
- Rendu timeline trié et mis en forme
- Export PDF

### v2 — Améliorations
- Sauvegarde / rechargement d'un projet (format JSON)
- Export image PNG
- Thèmes visuels (clair / sombre)
- Drag & drop pour réordonner les événements

---

## Licence

ClementH-Sanofi — libre d'utilisation, de modification et de distribution.
