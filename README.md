# Mamadou Diakité — Site Web
## Structure du projet

```
mamadou-diakite/
├── index.html          ← Page principale (toutes les sections)
├── css/
│   └── style.css       ← Tous les styles
├── js/
│   └── main.js         ← Interactions & animations
├── images/             ← Dossier pour vos photos (à remplir)
├── robots.txt          ← SEO : autorisation crawlers
└── sitemap.xml         ← SEO : carte du site
```

---

## Comment personnaliser

### 1. Ajouter les vraies photos
Placez vos images dans le dossier `images/` et remplacez les blocs `<div class="img-placeholder">` par des balises `<img>` :
```html
<!-- Avant -->
<div class="img-placeholder"><span>Photo conférence</span></div>

<!-- Après -->
<img src="images/nom-de-votre-photo.jpg" alt="Description de la photo" />
```

### 2. Ajouter l'affiche de la prochaine conférence
Dans la section `#conference`, remplacez le `poster-placeholder` par :
```html
<img src="images/affiche-2025.jpg" alt="Affiche conférence 2025" style="width:100%;display:block;" />
```

### 3. Mettre à jour les infos de conférence
Dans `index.html`, recherchez `conf-detail__value` et mettez à jour :
- La date
- Le lieu exact
- Le thème

### 4. Connecter le formulaire à votre service email
Dans `js/main.js`, remplacez la simulation par votre API (Mailchimp, Brevo, etc.) :
```js
// Remplacez la ligne `await new Promise(...)` par votre appel API
const response = await fetch('https://votre-api.com/subscribe', {
  method: 'POST',
  body: JSON.stringify(data)
});
```

### 5. Mettre à jour les liens réseaux sociaux
Dans `index.html`, recherchez `social-link` et ajoutez vos vrais URLs Instagram, YouTube, LinkedIn.

### 6. SEO
- Mettez à jour `sitemap.xml` avec la vraie date de modification
- Ajoutez une vraie image OG (`og-image.jpg`, 1200×630px) à la racine

---

## Hébergement recommandé
- **Netlify** (gratuit, drag & drop du dossier)
- **Vercel** (gratuit)
- **OVH / Infomaniak** (hébergement français)

---

## Contact
judebouity19@gmail.com
# MamsDk_PROJET
