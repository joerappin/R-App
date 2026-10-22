# R App'

Page d'accueil façon Stream Deck (6 boutons) vers les applications Level Studios.
En ligne sur **https://levelstudios-corp.com** (hébergement Hostinger).

## Modifier les boutons

Tout se règle dans [`apps.js`](apps.js) : nom, icône, couleur et adresse (`url`) de chaque bouton.
Un bouton sans `url` s'affiche « Bientôt ».

## Mise en ligne

Site statique (HTML/CSS/JS, aucun build). Chaque `git push` sur `main` est déployé par Hostinger
(hPanel → levelstudios-corp.com → Avancé → Git) dans `public_html`.

> ⚠️ Ne jamais toucher au dépôt ni à l'hébergement de **levelstudios.ca**.
