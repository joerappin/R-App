// Les 6 boutons de la page d'accueil, dans l'ordre (gauche → droite, haut → bas).
// Pour activer un bouton : mets l'adresse de l'application dans `url`.
// Un bouton sans `url` s'affiche comme « Bientôt ».
// `wake` (facultatif) : adresse vérifiée avant d'ouvrir l'app (hébergement gratuit en veille);
// si l'app dort, la touche affiche un compte à rebours de `wakeSeconds` puis l'ouvre dès qu'elle répond.
window.R_APPS = [
  { name: "ReviZ",  icon: "⚡", color: "#ffb020", url: "https://joerappin.github.io/Revisions/" },
  // Une fois ReviZ sur Render, remplacer la ligne ci-dessus par :
  // { name: "ReviZ", icon: "⚡", color: "#ffb020", url: "https://reviz.onrender.com/", wake: "https://reviz.onrender.com/api/status", wakeSeconds: 50 },
  { name: "App 2",  icon: "🎬", color: "#4f8cff", url: "" },
  { name: "App 3",  icon: "🎵", color: "#b45cff", url: "" },
  { name: "App 4",  icon: "📅", color: "#22c55e", url: "" },
  { name: "App 5",  icon: "💬", color: "#ff4d6d", url: "" },
  { name: "App 6",  icon: "⚙️", color: "#14b8a6", url: "" },
];
